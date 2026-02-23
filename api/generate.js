function parseModelJSON(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    const match = String(text).match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    res.status(503).json({ error: "OPENAI_API_KEY is not configured on server." });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const workspace = body.workspace || {};

  const business = String(workspace.business || "").trim();
  const niche = String(workspace.niche || "").trim();
  const offer = String(workspace.offer || "").trim();
  const ticket = String(workspace.ticket || "").trim();
  const goal = String(workspace.goal || "").trim();
  const channel = String(workspace.channel || "").trim();
  const profileTone = String(workspace.profileTone || "strategic").trim().toLowerCase();
  const profileName = String(workspace.profileName || "").trim();
  const profileTitle = String(workspace.profileTitle || "").trim();

  if (!business || !niche || !offer || !ticket || !goal || !channel) {
    res.status(400).json({ error: "Missing required workspace fields." });
    return;
  }

  const systemPrompt = [
    "You are an expert revenue operations strategist for small service businesses.",
    "Return only strict JSON with keys: offerCopy, followupSequence, callScript.",
    "Make outputs realistic, specific, concise, and immediately usable by sales teams.",
    "Do not include markdown code blocks."
  ].join(" ");

  const userPrompt = [
    `Business: ${business}`,
    `Niche: ${niche}`,
    `Core Offer: ${offer}`,
    `Average Ticket: ${ticket}`,
    `Goal: ${goal}`,
    `Channel: ${channel}`,
    `Preferred Tone: ${profileTone}`,
    `Account Name: ${profileName || "Not provided"}`,
    `Account Title: ${profileTitle || "Not provided"}`,
    "",
    "Generate:",
    "1) Strategic offer positioning copy",
    "2) Practical 7-day follow-up sequence",
    "3) Discovery call script with structure and close question"
  ].join("\n");

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  });

  const rawText = await upstream.text();
  if (!upstream.ok) {
    res.status(502).json({
      error: "Upstream AI request failed.",
      details: rawText.slice(0, 400)
    });
    return;
  }

  let parsedUpstream;
  try {
    parsedUpstream = JSON.parse(rawText);
  } catch {
    res.status(502).json({ error: "Invalid upstream JSON response." });
    return;
  }

  const modelText = parsedUpstream?.choices?.[0]?.message?.content || "";
  const output = parseModelJSON(modelText);

  if (!output || !output.offerCopy || !output.followupSequence || !output.callScript) {
    res.status(502).json({ error: "AI output missing required fields." });
    return;
  }

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    offerCopy: String(output.offerCopy),
    followupSequence: String(output.followupSequence),
    callScript: String(output.callScript)
  });
};
