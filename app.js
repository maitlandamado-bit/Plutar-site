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
const PROFILE_STORE_KEY = "plutar_profile_store";
const MEMBER_BOOKING_URL = "https://calendly.com/maitlandamado/30min";

const ownerTab = document.getElementById("ownerTab");
const customerTab = document.getElementById("customerTab");
const ownerForm = document.getElementById("ownerForm");
const customerForm = document.getElementById("customerForm");
const accessMessage = document.getElementById("accessMessage");
const appMessage = document.getElementById("appMessage");
const appPanel = document.getElementById("appPanel");
const accessCard = document.getElementById("accessCard");
const userTag = document.getElementById("userTag");
const memberBookingLink = document.getElementById("memberBookingLink");

const businessNameInput = document.getElementById("businessName");
const nicheInput = document.getElementById("niche");
const offerInput = document.getElementById("offer");
const ticketInput = document.getElementById("ticket");
const goalInput = document.getElementById("goal");
const channelInput = document.getElementById("channel");

const offerOutput = document.getElementById("offerOutput");
const followupOutput = document.getElementById("followupOutput");
const callOutput = document.getElementById("callOutput");
const aiModeInput = document.getElementById("aiMode");
const loadingState = document.getElementById("loadingState");
const generateBtn = document.getElementById("generateBtn");
const demoBtn = document.getElementById("demoBtn");
const saveBtn = document.getElementById("saveBtn");
const exportBtn = document.getElementById("exportBtn");
const logoutBtn = document.getElementById("logoutBtn");
const profileNameInput = document.getElementById("profileName");
const profileTitleInput = document.getElementById("profileTitle");
const profileToneInput = document.getElementById("profileTone");
const profileThemeInput = document.getElementById("profileTheme");
const profileGreeting = document.getElementById("profileGreeting");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const resetProfileBtn = document.getElementById("resetProfileBtn");

const CHANNEL_PLAYBOOKS = {
  sms: {
    label: "SMS",
    speedLine: "Target first response under 2 minutes during business hours.",
    compliance: "Keep each message concise and provide a clear opt-out if required in your region.",
    cta: "Reply YES for quick details"
  },
  email: {
    label: "Email",
    speedLine: "Respond within 15 minutes to warm inbound leads when possible.",
    compliance: "Use clear subject lines and keep message purpose explicit.",
    cta: "Reply with BEST TIME and we will send options"
  },
  instagram: {
    label: "Instagram DM",
    speedLine: "Reply to inbound DMs within 5 minutes to keep intent high.",
    compliance: "Keep tone conversational and avoid large blocks of text.",
    cta: "DM READY and we will map next steps"
  },
  facebook: {
    label: "Facebook DM",
    speedLine: "Respond quickly to new inquiries while post engagement is still active.",
    compliance: "Reference their comment or inquiry context for higher reply rates.",
    cta: "Reply READY and we will schedule your call"
  },
  linkedin: {
    label: "LinkedIn DM",
    speedLine: "Lead with relevance and keep first touch under 2 short sentences.",
    compliance: "Personalize one detail to avoid generic outreach feel.",
    cta: "Reply OPEN and I will send the 3-step plan"
  }
};

const DEMO_SCENARIOS = [
  {
    business: "Northline Roofing",
    niche: "residential roofing contractor",
    offer: "storm damage inspection with same-week quote",
    ticketRange: [1800, 6200],
    goals: ["book 18 qualified inspections per month", "increase booked quotes by 30%"]
  },
  {
    business: "Halo Med Spa",
    niche: "medical spa clinic",
    offer: "new client skin rejuvenation package",
    ticketRange: [450, 2200],
    goals: ["book 40 new consults this quarter", "increase repeat treatment rate by 20%"]
  },
  {
    business: "Summit Legal Group",
    niche: "personal injury law firm",
    offer: "free case review and same-day intake call",
    ticketRange: [3500, 12000],
    goals: ["increase qualified case intakes by 25%", "cut lead response delay below 5 minutes"]
  },
  {
    business: "Velocity Fitness Studio",
    niche: "local fitness studio",
    offer: "14-day transformation onboarding program",
    ticketRange: [150, 900],
    goals: ["convert 35 trial leads per month", "reduce no-show rate by 40%"]
  },
  {
    business: "ClearPath Solar",
    niche: "solar installation company",
    offer: "home savings assessment with financing plan",
    ticketRange: [7000, 24000],
    goals: ["book 22 homeowner assessments per month", "improve close rate from consults by 15%"]
  },
  {
    business: "Elite Auto Detail",
    niche: "auto detailing service",
    offer: "same-day interior and exterior premium detail",
    ticketRange: [120, 480],
    goals: ["book 60 appointments per month", "increase recurring customers by 25%"]
  },
  {
    business: "Prime Dental Studio",
    niche: "cosmetic dentist",
    offer: "new patient whitening + exam package",
    ticketRange: [300, 3800],
    goals: ["add 30 high-intent consults monthly", "increase treatment acceptance rate by 18%"]
  },
  {
    business: "Harbor HVAC Solutions",
    niche: "HVAC repair and install company",
    offer: "24-hour emergency service and maintenance plan",
    ticketRange: [250, 6800],
    goals: ["book 45 service calls monthly", "raise maintenance plan conversions by 20%"]
  }
];

const PLAN_DELAY_PROFILE = {
  starter: {
    ai: [2400, 4200],
    local: [1700, 3000],
    fallback: [1300, 2200]
  },
  growth: {
    ai: [1700, 3000],
    local: [1200, 2200],
    fallback: [900, 1600]
  },
  scale: {
    ai: [900, 1800],
    local: [700, 1400],
    fallback: [600, 1200]
  }
};

const TONE_PRESETS = {
  strategic: {
    label: "Strategic",
    framing: "measured, ROI-driven, and consultative",
    sequenceStyle: "clear and data-backed",
    callStyle: "diagnostic and analytical"
  },
  friendly: {
    label: "Friendly",
    framing: "warm, approachable, and confidence-building",
    sequenceStyle: "helpful and conversational",
    callStyle: "human and trust-first"
  },
  direct: {
    label: "Direct",
    framing: "decisive, concise, and outcome-first",
    sequenceStyle: "short and action-oriented",
    callStyle: "no-fluff and commitment-focused"
  }
};

const THEME_PRESETS = {
  aqua: {
    accent: "#36e7ff",
    accent2: "#8cffc6",
    accentRgb: "54, 231, 255",
    accent2Rgb: "140, 255, 198"
  },
  mint: {
    accent: "#52f7b8",
    accent2: "#7be4ff",
    accentRgb: "82, 247, 184",
    accent2Rgb: "123, 228, 255"
  },
  sunset: {
    accent: "#ff9b5f",
    accent2: "#ffd36f",
    accentRgb: "255, 155, 95",
    accent2Rgb: "255, 211, 111"
  }
};

const DEFAULT_PROFILE = {
  displayName: "",
  title: "",
  tone: "strategic",
  theme: "aqua"
};

let activeSession = null;
let activeProfile = { ...DEFAULT_PROFILE };

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getTonePreset(tone) {
  return TONE_PRESETS[tone] || TONE_PRESETS.strategic;
}

function getThemePreset(theme) {
  return THEME_PRESETS[theme] || THEME_PRESETS.aqua;
}

function sanitizeProfile(profile) {
  const draft = profile || {};
  const tone = String(draft.tone || DEFAULT_PROFILE.tone).toLowerCase();
  const theme = String(draft.theme || DEFAULT_PROFILE.theme).toLowerCase();
  return {
    displayName: String(draft.displayName || "").trim().slice(0, 40),
    title: String(draft.title || "").trim().slice(0, 60),
    tone: TONE_PRESETS[tone] ? tone : DEFAULT_PROFILE.tone,
    theme: THEME_PRESETS[theme] ? theme : DEFAULT_PROFILE.theme
  };
}

function getProfileStore() {
  const raw = localStorage.getItem(PROFILE_STORE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function setProfileStore(store) {
  localStorage.setItem(PROFILE_STORE_KEY, JSON.stringify(store));
}

function loadProfileForEmail(email) {
  const key = normalize(email);
  const store = getProfileStore();
  return sanitizeProfile(store[key]);
}

function saveProfileForEmail(email, profile) {
  const key = normalize(email);
  if (!key) return;
  const store = getProfileStore();
  store[key] = sanitizeProfile(profile);
  setProfileStore(store);
}

function applyTheme(themeName) {
  const theme = getThemePreset(themeName);
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-2", theme.accent2);
  root.style.setProperty("--accent-rgb", theme.accentRgb);
  root.style.setProperty("--accent2-rgb", theme.accent2Rgb);
}

function deriveIdentityLabel(session, profile) {
  const rawName = profile?.displayName || session?.email || "";
  const fallback = rawName.includes("@") ? rawName.split("@")[0] : rawName;
  return String(fallback || "User").trim().slice(0, 24);
}

function refreshUserTag() {
  if (!activeSession) {
    userTag.textContent = "";
    return;
  }
  const identity = deriveIdentityLabel(activeSession, activeProfile);
  userTag.textContent = `${identity} | ${activeSession.plan.toUpperCase()}`;
}

function refreshProfileGreeting() {
  if (!profileGreeting) return;
  if (!activeSession) {
    profileGreeting.textContent = "Welcome to your workspace.";
    return;
  }
  const identity = deriveIdentityLabel(activeSession, activeProfile);
  const title = activeProfile.title ? `, ${activeProfile.title}` : "";
  const toneLabel = getTonePreset(activeProfile.tone).label;
  profileGreeting.textContent = `Welcome back ${identity}${title}. Tone: ${toneLabel}.`;
}

function syncProfileInputs(profile) {
  if (profileNameInput) profileNameInput.value = profile.displayName || "";
  if (profileTitleInput) profileTitleInput.value = profile.title || "";
  if (profileToneInput) profileToneInput.value = profile.tone || DEFAULT_PROFILE.tone;
  if (profileThemeInput) profileThemeInput.value = profile.theme || DEFAULT_PROFILE.theme;
}

function setActiveProfile(profile, persist = false) {
  activeProfile = sanitizeProfile(profile);
  applyTheme(activeProfile.theme);
  syncProfileInputs(activeProfile);
  refreshUserTag();
  refreshProfileGreeting();
  if (persist && activeSession?.email) {
    saveProfileForEmail(activeSession.email, activeProfile);
  }
}

function getChannelPlaybook(channel) {
  return CHANNEL_PLAYBOOKS[channel] || CHANNEL_PLAYBOOKS.sms;
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function calculatePerformanceTargets(ticket, goalText) {
  const avgTicket = Math.max(1, Number(ticket || 0));
  const monthlyTargetRevenue = Math.round(avgTicket * 8);
  const requiredWins = Math.max(1, Math.ceil(monthlyTargetRevenue / avgTicket));
  const leadToCallRate = avgTicket > 2000 ? "18-25%" : "22-35%";
  const callToCloseRate = avgTicket > 2000 ? "20-30%" : "28-40%";
  return {
    avgTicket,
    monthlyTargetRevenue,
    requiredWins,
    leadToCallRate,
    callToCloseRate,
    goalText
  };
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

function sessionHasBookingAccess(session) {
  if (!session) return false;
  if (session.role === "owner") return true;
  return ["starter", "growth", "scale"].includes(String(session.plan || "").toLowerCase());
}

function updateMemberBookingLink(session) {
  if (!memberBookingLink) return;

  if (sessionHasBookingAccess(session)) {
    memberBookingLink.href = MEMBER_BOOKING_URL;
    memberBookingLink.target = "_blank";
    memberBookingLink.rel = "noopener";
    memberBookingLink.classList.remove("locked");
    memberBookingLink.textContent = "Book Member Call";
    memberBookingLink.removeAttribute("aria-disabled");
    return;
  }

  memberBookingLink.href = "#";
  memberBookingLink.removeAttribute("target");
  memberBookingLink.removeAttribute("rel");
  memberBookingLink.classList.add("locked");
  memberBookingLink.textContent = "Member Booking (Paid)";
  memberBookingLink.setAttribute("aria-disabled", "true");
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
  activeSession = session;
  accessCard.classList.add("hidden");
  appPanel.classList.remove("hidden");
  updateMemberBookingLink(session);
  setActiveProfile(loadProfileForEmail(session.email));
  hydrateWorkspace();
  if (session.role === "owner" && CONFIG.ownerKey === "CHANGE_THIS_OWNER_KEY_NOW") {
    setAppMessage("Owner key is still default in app.js. Change CONFIG.ownerKey before sharing widely.", "error");
  } else {
    setAppMessage("Workspace unlocked. Generate and export assets for your client.", "success");
  }
}

function showAccessCard() {
  activeSession = null;
  setActiveProfile(DEFAULT_PROFILE);
  appPanel.classList.add("hidden");
  accessCard.classList.remove("hidden");
  updateMemberBookingLink(null);
}

function buildOfferCopy(data) {
  const channel = getChannelPlaybook(data.channel);
  const tone = getTonePreset(data.profileTone);
  const performance = calculatePerformanceTargets(data.ticket, data.goal);
  const hook = pick([
    `${data.business} can stop lead leakage and turn interest into booked calls with a ${tone.framing} message layer.`,
    `${data.business} can capture higher-intent buyers with faster follow-up and ${tone.sequenceStyle} copy.`,
    `${data.business} can convert more inbound leads by removing response delays using a ${tone.callStyle} sales flow.`
  ]);
  const riskReversal = pick([
    "Launch with a 7-day optimization window and weekly revisions.",
    "Start with one channel, track results, then scale once conversion lifts.",
    "Deploy fast, monitor reply rates, and adjust scripts based on live objections."
  ]);

  return [
    `Strategic Headline (${tone.label}): ${hook}`,
    "",
    `ICP Focus: ${data.niche}.`,
    `Core Offer: ${data.offer}.`,
    `Primary Channel: ${channel.label}.`,
    `Voice: ${tone.framing}.`,
    "",
    "Positioning Angle:",
    `- Promise: ${data.goal}.`,
    `- Mechanism: fast-response workflow + structured ${channel.label} nurture sequence.`,
    `- Differentiator: decision-ready script blocks tuned to your offer and sales cycle.`,
    "",
    "Performance Targets:",
    `- Average ticket: $${formatMoney(performance.avgTicket)}.`,
    `- Suggested monthly target revenue from this funnel: $${formatMoney(performance.monthlyTargetRevenue)}.`,
    `- Required additional wins to hit target: ${performance.requiredWins}.`,
    `- Benchmark rates: Lead->Call ${performance.leadToCallRate}, Call->Close ${performance.callToCloseRate}.`,
    "",
    `Execution Note: ${channel.speedLine}`,
    `Messaging Style: ${tone.sequenceStyle}.`,
    `Compliance Note: ${channel.compliance}`,
    "",
    "Close:",
    `${riskReversal}`,
    `CTA: ${channel.cta}.`
  ].join("\n");
}

function buildFollowupSequence(data) {
  const channel = getChannelPlaybook(data.channel);
  const tone = getTonePreset(data.profileTone);
  const sender = data.profileName || data.business;
  const softCta = pick([
    "Want the quick breakdown?",
    "Open to seeing the 3-step plan?",
    "Should I send the short version?"
  ]);
  const objectionHandle = pick([
    "If timing is the issue, we can start lean and scale once results show.",
    "If budget is the concern, we can prioritize the highest-return workflow first.",
    "If you already have leads, we can focus only on conversion lift."
  ]);
  const proofLine = pick([
    "Most teams improve response speed first, then booking rates follow.",
    "Fast follow-up usually lifts show-up rates within the first 2 weeks.",
    "Clear message sequencing removes most drop-off before the sales call."
  ]);

  return [
    `Day 1 (${channel.label}, ${tone.label} tone)`,
    `Hey [Name], this is ${sender}. We help ${data.niche} teams with ${data.offer}. ${softCta}`,
    "",
    `Day 2 (${channel.label})`,
    `Quick follow-up: goal is ${data.goal} without adding manual admin. This sequence is ${tone.sequenceStyle}. Open to a short call this week?`,
    "",
    `Day 3 (${channel.label})`,
    `${proofLine} If useful, I can send the exact first workflow we would launch.`,
    "",
    `Day 4 (${channel.label})`,
    `Built a simple rollout for your situation: capture -> qualify -> book. Want me to send it?`,
    "",
    `Day 5 (${channel.label})`,
    `Common question I hear: "Will this actually fit our process?" ${objectionHandle}`,
    "",
    `Day 6 (${channel.label})`,
    `If now is bad timing, no problem. I can pause and circle back next month.`,
    "",
    `Day 7 (${channel.label})`,
    `Closing this thread for now. ${channel.cta} and we will prioritize your setup.`
  ].join("\n\n");
}

function buildCallScript(data) {
  const channel = getChannelPlaybook(data.channel);
  const tone = getTonePreset(data.profileTone);
  const closeOption = pick([
    "Would you like to start with setup this week or next week?",
    "If this plan fits, should we reserve your onboarding slot now?",
    "Want us to begin with the fastest-win channel first?"
  ]);

  return [
    "1) Opening (2 min)",
    `Thanks for meeting. Today I want to map how ${data.business} currently turns leads into revenue.`,
    `Call style: ${tone.callStyle}.`,
    "",
    "2) Diagnosis (8 min)",
    "- Where are leads currently coming from?",
    "- How long does it take to follow up today?",
    "- What % of leads become booked calls or appointments?",
    "- What is the average deal value?",
    "- What is your current no-show rate?",
    "- Who owns follow-up after the first inquiry?",
    "",
    "3) Gap Summary (3 min)",
    `Main leak: delayed or inconsistent follow-up in ${channel.label}.`,
    `Target outcome: ${data.goal}.`,
    `Offer to launch: ${data.offer}.`,
    "",
    "4) Proposed Plan (5 min)",
    "- Week 1: deploy messaging + qualification sequence.",
    "- Week 2: tighten objections and booking handoff.",
    "- Week 3+: weekly optimization using response and booking data.",
    "",
    "5) Commitment Close (2 min)",
    closeOption
  ].join("\n");
}

function getWorkspaceData() {
  return {
    business: businessNameInput.value.trim(),
    niche: nicheInput.value.trim(),
    offer: offerInput.value.trim(),
    ticket: ticketInput.value.trim(),
    goal: goalInput.value.trim(),
    channel: channelInput.value.trim(),
    profileTone: activeProfile.tone,
    profileName: activeProfile.displayName,
    profileTitle: activeProfile.title
  };
}

function validateWorkspace(data) {
  return Boolean(data.business && data.niche && data.offer && data.ticket && data.goal && data.channel);
}

function applyGeneratedOutputs(outputs) {
  offerOutput.value = outputs.offerCopy;
  followupOutput.value = outputs.followupSequence;
  callOutput.value = outputs.callScript;
}

function generateLocalOutputs(data) {
  return {
    offerCopy: buildOfferCopy(data),
    followupSequence: buildFollowupSequence(data),
    callScript: buildCallScript(data)
  };
}

async function generateServerOutputs(data) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      workspace: data
    })
  });

  if (!response.ok) {
    throw new Error(`AI endpoint failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (!payload || !payload.offerCopy || !payload.followupSequence || !payload.callScript) {
    throw new Error("AI endpoint response missing required fields.");
  }

  return payload;
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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getActivePlan() {
  const plan = activeSession?.plan;
  if (plan && PLAN_DELAY_PROFILE[plan]) return plan;
  return "starter";
}

function getDelayRange(mode) {
  const plan = getActivePlan();
  const profile = PLAN_DELAY_PROFILE[plan] || PLAN_DELAY_PROFILE.starter;
  return profile[mode] || profile.local;
}

function randomDelay(mode) {
  const [min, max] = getDelayRange(mode);
  return randomInt(min, max);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setGenerationBusy(isBusy, message = "AI is thinking...") {
  if (loadingState) {
    loadingState.textContent = message;
    loadingState.classList.toggle("active", isBusy);
  }

  [generateBtn, demoBtn, saveBtn, exportBtn, saveProfileBtn, resetProfileBtn].forEach((button) => {
    if (!button) return;
    button.disabled = isBusy;
  });

  if (generateBtn) {
    generateBtn.textContent = isBusy ? "Thinking..." : "Generate Assets";
  }
}

function randomizeDemoInputs() {
  const scenario = pick(DEMO_SCENARIOS);
  const channels = Object.keys(CHANNEL_PLAYBOOKS);
  const selectedChannel = pick(channels);
  const ticket = randomInt(scenario.ticketRange[0], scenario.ticketRange[1]);
  const goal = pick(scenario.goals);

  businessNameInput.value = scenario.business;
  nicheInput.value = scenario.niche;
  offerInput.value = scenario.offer;
  ticketInput.value = String(ticket);
  goalInput.value = goal;
  channelInput.value = selectedChannel;

  return { scenario, ticket, selectedChannel };
}

function saveProfileFromInputs() {
  if (!activeSession) {
    setAppMessage("Sign in before saving profile settings.", "error");
    return;
  }
  const nextProfile = sanitizeProfile({
    displayName: profileNameInput?.value,
    title: profileTitleInput?.value,
    tone: profileToneInput?.value,
    theme: profileThemeInput?.value
  });
  setActiveProfile(nextProfile, true);
  setAppMessage("Profile saved. Your workspace now matches your preferences.", "success");
}

function resetProfile() {
  if (!activeSession) {
    setAppMessage("Sign in before resetting profile settings.", "error");
    return;
  }
  setActiveProfile(DEFAULT_PROFILE, true);
  setAppMessage("Profile reset to default settings.", "success");
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

generateBtn.addEventListener("click", async () => {
  const data = getWorkspaceData();
  if (!validateWorkspace(data)) {
    setAppMessage("Complete all workspace inputs before generating assets.", "error");
    return;
  }

  const aiModeEnabled = Boolean(aiModeInput && aiModeInput.checked);
  const plan = getActivePlan();
  const planLabel = plan.toUpperCase();
  setGenerationBusy(
    true,
    aiModeEnabled ? `AI is thinking (${planLabel} profile)...` : `Building assets (${planLabel} profile)...`
  );

  try {
    if (aiModeEnabled) {
      setAppMessage(`AI Pro Mode is analyzing your inputs (${planLabel}).`, "info");
      try {
        const [aiOutputs] = await Promise.all([
          generateServerOutputs(data),
          sleep(randomDelay("ai"))
        ]);
        applyGeneratedOutputs(aiOutputs);
        saveWorkspaceToStorage();
        setAppMessage("AI-generated assets are ready.", "success");
        return;
      } catch (error) {
        console.error(error);
        setAppMessage("AI backend unavailable. Falling back to local smart generation...", "error");
        await sleep(randomDelay("fallback"));
        const localOutputs = generateLocalOutputs(data);
        applyGeneratedOutputs(localOutputs);
        saveWorkspaceToStorage();
        setAppMessage("Local smart assets are ready.", "success");
        return;
      }
    }

    setAppMessage("Generating assets...", "info");
    await sleep(randomDelay("local"));
    const localOutputs = generateLocalOutputs(data);
    applyGeneratedOutputs(localOutputs);
    saveWorkspaceToStorage();
    setAppMessage("Assets generated and saved locally.", "success");
  } finally {
    setGenerationBusy(false);
  }
});

demoBtn.addEventListener("click", () => {
  const demo = randomizeDemoInputs();
  const channelName = getChannelPlaybook(demo.selectedChannel).label;
  setAppMessage(`Random demo loaded for ${demo.scenario.business} (${channelName}). Click Generate Assets.`, "success");
});

saveBtn.addEventListener("click", () => {
  saveWorkspaceToStorage();
  setAppMessage("Workspace saved locally on this browser.", "success");
});

exportBtn.addEventListener("click", () => {
  exportWorkspace();
  setAppMessage("Export generated as text file.", "success");
});

saveProfileBtn.addEventListener("click", () => {
  saveProfileFromInputs();
});

resetProfileBtn.addEventListener("click", () => {
  resetProfile();
});

if (memberBookingLink) {
  memberBookingLink.addEventListener("click", (event) => {
    if (sessionHasBookingAccess(activeSession)) return;
    event.preventDefault();
    if (activeSession) {
      setAppMessage("Booking calls are only for paid members.", "error");
      return;
    }
    setAccessMessage("Booking calls are only for paid members. Sign in with a paid access code first.", "error");
  });
}

logoutBtn.addEventListener("click", () => {
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
