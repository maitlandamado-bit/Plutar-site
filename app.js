const CONFIG = {
  ownerEmail: "amaitland@augusta.edu",
  ownerKey: "PlutarOwner-2026!Launch#A9",
  accessCodes: {
    "PLUTAR-STARTER-001": "starter",
    "PLUTAR-STARTER-002": "starter",
    "PLUTAR-STARTER-003": "starter",
    "PLUTAR-GROWTH-001": "growth",
    "PLUTAR-GROWTH-002": "growth",
    "PLUTAR-GROWTH-003": "growth",
    "PLUTAR-SCALE-001": "scale",
    "PLUTAR-SCALE-002": "scale",
    "PLUTAR-SCALE-003": "scale"
  }
};

const SESSION_KEY = "plutar_app_session";
const WORKSPACE_KEY = "plutar_workspace";

const ownerTab = document.getElementById("ownerTab");
const customerTab = document.getElementById("customerTab");
const ownerForm = document.getElementById("ownerForm");
const customerForm = document.getElementById("customerForm");
const accessMessage = document.getElementById("accessMessage");
const appMessage = document.getElementById("appMessage");
const appPanel = document.getElementById("appPanel");
const accessCard = document.getElementById("accessCard");
const userTag = document.getElementById("userTag");

const businessNameInput = document.getElementById("businessName");
const nicheInput = document.getElementById("niche");
const offerInput = document.getElementById("offer");
const ticketInput = document.getElementById("ticket");
const goalInput = document.getElementById("goal");
const channelInput = document.getElementById("channel");

const offerOutput = document.getElementById("offerOutput");
const followupOutput = document.getElementById("followupOutput");
const callOutput = document.getElementById("callOutput");

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function setAccessMessage(text, type = "info") {
  accessMessage.textContent = text;
  if (type === "error") {
    accessMessage.style.color = "#ffd5df";
    accessMessage.style.borderColor = "rgba(255, 127, 143, 0.45)";
    accessMessage.style.background = "rgba(255, 127, 143, 0.12)";
    return;
  }
  if (type === "success") {
    accessMessage.style.color = "#d8ffe9";
    accessMessage.style.borderColor = "rgba(140, 255, 198, 0.45)";
    accessMessage.style.background = "rgba(140, 255, 198, 0.12)";
    return;
  }
  accessMessage.style.color = "";
  accessMessage.style.borderColor = "";
  accessMessage.style.background = "";
}

function setAppMessage(text, type = "info") {
  appMessage.textContent = text;
  if (type === "error") {
    appMessage.style.color = "#ffd5df";
    appMessage.style.borderColor = "rgba(255, 127, 143, 0.45)";
    appMessage.style.background = "rgba(255, 127, 143, 0.12)";
    return;
  }
  if (type === "success") {
    appMessage.style.color = "#d8ffe9";
    appMessage.style.borderColor = "rgba(140, 255, 198, 0.45)";
    appMessage.style.background = "rgba(140, 255, 198, 0.12)";
    return;
  }
  appMessage.style.color = "";
  appMessage.style.borderColor = "";
  appMessage.style.background = "";
}

function toggleTabs(type) {
  const ownerActive = type === "owner";
  ownerTab.classList.toggle("active", ownerActive);
  customerTab.classList.toggle("active", !ownerActive);
  ownerForm.classList.toggle("hidden", !ownerActive);
  customerForm.classList.toggle("hidden", ownerActive);
}

function createSession(role, plan, email) {
  const session = {
    role,
    plan,
    email,
    signedAt: new Date().toISOString()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.plan || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function showWorkspace(session) {
  accessCard.classList.add("hidden");
  appPanel.classList.remove("hidden");
  userTag.textContent = `${session.role} | ${session.plan}`;
  hydrateWorkspace();
  if (session.role === "owner" && CONFIG.ownerKey === "CHANGE_THIS_OWNER_KEY_NOW") {
    setAppMessage("Owner key is still default in app.js. Change CONFIG.ownerKey before sharing widely.", "error");
  } else {
    setAppMessage("Workspace unlocked. Generate and export assets for your client.", "success");
  }
}

function showAccessCard() {
  appPanel.classList.add("hidden");
  accessCard.classList.remove("hidden");
}

function buildOfferCopy(data) {
  return [
    `Headline: ${data.business} helps ${data.niche} buyers get ${data.goal}.`,
    "",
    `Core Offer: ${data.offer}.`,
    `Primary Channel: ${data.channel.toUpperCase()}.`,
    "",
    "Value Stack:",
    `- Fast response system mapped for ${data.channel}.`,
    "- Follow-up automation with clear conversion steps.",
    "- Booking handoff process so leads do not leak.",
    "",
    `Price Anchor: When an average deal is $${data.ticket}, one extra close can cover this setup quickly.`,
    "",
    "Call To Action:",
    "Book onboarding and launch your first automation workflow this week."
  ].join("\n");
}

function buildFollowupSequence(data) {
  const channelName = data.channel.toUpperCase();
  return [
    `Day 1 (${channelName}): Hey [Name], this is ${data.business}. We can help with ${data.offer}. Want details?`,
    `Day 2 (${channelName}): Quick reminder, we help ${data.niche} leads achieve ${data.goal}. Open to a 10-min call?`,
    `Day 3 (${channelName}): Most clients start by fixing response time and follow-up speed. Want the same setup?`,
    `Day 4 (${channelName}): We mapped a simple plan for your situation. Can I send the 3-step rollout?`,
    `Day 5 (${channelName}): Checking in before we close this thread. Still interested in ${data.offer}?`,
    `Day 6 (${channelName}): Last reminder. If now is not the right time, I can follow up next month.`,
    `Day 7 (${channelName}): Closing this for now. Reply READY anytime and we will restart with priority support.`
  ].join("\n\n");
}

function buildCallScript(data) {
  return [
    "1) Opening",
    `Thanks for booking. I want to understand your current lead flow for ${data.business}.`,
    "",
    "2) Diagnosis Questions",
    "- Where are leads currently coming from?",
    "- How long does it take to follow up today?",
    "- What % of leads become booked calls?",
    "- What is the average deal value?",
    "",
    "3) Positioning",
    `Based on what you shared, we can deploy ${data.offer} aligned to ${data.channel.toUpperCase()} first.`,
    `Goal target: ${data.goal}.`,
    "",
    "4) Offer Close",
    "We launch in under 7 days, then optimize weekly.",
    "If this sounds right, we can begin onboarding now."
  ].join("\n");
}

function getWorkspaceData() {
  return {
    business: businessNameInput.value.trim(),
    niche: nicheInput.value.trim(),
    offer: offerInput.value.trim(),
    ticket: ticketInput.value.trim(),
    goal: goalInput.value.trim(),
    channel: channelInput.value.trim()
  };
}

function validateWorkspace(data) {
  return Boolean(data.business && data.niche && data.offer && data.ticket && data.goal && data.channel);
}

function saveWorkspaceToStorage() {
  const payload = {
    fields: {
      businessName: businessNameInput.value,
      niche: nicheInput.value,
      offer: offerInput.value,
      ticket: ticketInput.value,
      goal: goalInput.value,
      channel: channelInput.value
    },
    outputs: {
      offer: offerOutput.value,
      followup: followupOutput.value,
      call: callOutput.value
    },
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(payload));
}

function hydrateWorkspace() {
  const raw = localStorage.getItem(WORKSPACE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (!saved || !saved.fields) return;
    businessNameInput.value = saved.fields.businessName || "";
    nicheInput.value = saved.fields.niche || "";
    offerInput.value = saved.fields.offer || "";
    ticketInput.value = saved.fields.ticket || "";
    goalInput.value = saved.fields.goal || "";
    channelInput.value = saved.fields.channel || "";
    offerOutput.value = saved.outputs?.offer || "";
    followupOutput.value = saved.outputs?.followup || "";
    callOutput.value = saved.outputs?.call || "";
  } catch {
    // Keep app usable even if storage is malformed.
  }
}

function exportWorkspace() {
  const chunks = [
    "PLUTAR WORKSPACE EXPORT",
    `Saved: ${new Date().toISOString()}`,
    "",
    "OFFER POSITIONING COPY",
    offerOutput.value || "(empty)",
    "",
    "7-DAY FOLLOW-UP SEQUENCE",
    followupOutput.value || "(empty)",
    "",
    "DISCOVERY CALL SCRIPT",
    callOutput.value || "(empty)"
  ];
  const content = chunks.join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "plutar-workspace-export.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

ownerTab.addEventListener("click", () => toggleTabs("owner"));
customerTab.addEventListener("click", () => toggleTabs("customer"));

ownerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = normalize(document.getElementById("ownerEmail").value);
  const key = document.getElementById("ownerKey").value;

  if (email !== normalize(CONFIG.ownerEmail) || key !== CONFIG.ownerKey) {
    setAccessMessage("Owner credentials are invalid.", "error");
    return;
  }

  const session = createSession("owner", "scale", email);
  setAccessMessage("Owner access granted.", "success");
  showWorkspace(session);
});

customerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = normalize(document.getElementById("customerEmail").value);
  const code = document.getElementById("accessCode").value.trim().toUpperCase();
  const plan = CONFIG.accessCodes[code];

  if (!plan) {
    setAccessMessage("Access code not recognized. Contact Plutar support.", "error");
    return;
  }

  const session = createSession("customer", plan, email);
  setAccessMessage(`Access granted for ${plan.toUpperCase()} plan.`, "success");
  showWorkspace(session);
});

document.getElementById("generateBtn").addEventListener("click", () => {
  const data = getWorkspaceData();
  if (!validateWorkspace(data)) {
    setAppMessage("Complete all workspace inputs before generating assets.", "error");
    return;
  }

  offerOutput.value = buildOfferCopy(data);
  followupOutput.value = buildFollowupSequence(data);
  callOutput.value = buildCallScript(data);
  saveWorkspaceToStorage();
  setAppMessage("Assets generated and saved locally.", "success");
});

document.getElementById("saveBtn").addEventListener("click", () => {
  saveWorkspaceToStorage();
  setAppMessage("Workspace saved locally on this browser.", "success");
});

document.getElementById("exportBtn").addEventListener("click", () => {
  exportWorkspace();
  setAppMessage("Export generated as text file.", "success");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  clearSession();
  showAccessCard();
  setAccessMessage("Session closed.", "success");
});

const existingSession = loadSession();
if (existingSession) {
  showWorkspace(existingSession);
} else {
  showAccessCard();
}
