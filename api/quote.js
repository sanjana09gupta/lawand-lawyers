import { createHmac } from "node:crypto";

const MAX_BODY_BYTES = 32_000;
const MIN_FORM_TIME_MS = 2_000;
const MAX_FORM_TIME_MS = 7_200_000;

const text = (value, limit = 500) => typeof value === "string" ? value.trim().slice(0, limit) : "";
const safeCell = (value, limit) => {
  const result = text(value, limit);
  return /^[=+\-@]/.test(result) ? `'${result}` : result;
};

function trustedOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  const protocol = request.headers["x-forwarded-proto"] || (String(host).startsWith("localhost") || String(host).startsWith("127.0.0.1") ? "http" : "https");
  const configured = (process.env.ALLOWED_QUOTE_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
  return Boolean(origin && host && new Set([`${protocol}://${host}`, ...configured]).has(origin));
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function normaliseQuote(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const quote = {
    submittedAt: new Date().toISOString(), formType: "New purchase quote request", purchasePrice: safeCell(input.purchasePrice, 80), purchaseAddress: safeCell(input.purchaseAddress, 1_000), propertyLocation: safeCell(input.propertyLocation, 40), tenure: safeCell(input.tenure, 60), transactionDetail: safeCell(input.transactionDetail, 100), purchasePurpose: safeCell(input.purchasePurpose, 100), newMortgage: safeCell(input.newMortgage, 60), numberOfBuyers: Number(input.numberOfBuyers), buyer1Name: safeCell(input.buyer1Name, 160), buyer1Email: text(input.buyer1Email, 254).toLowerCase(), buyer1Telephone: safeCell(input.buyer1Telephone, 40), buyer2Name: safeCell(input.buyer2Name, 160), buyer2Email: text(input.buyer2Email, 254).toLowerCase(), buyer2Telephone: safeCell(input.buyer2Telephone, 40), buyer3Name: safeCell(input.buyer3Name, 160), buyer3Email: text(input.buyer3Email, 254).toLowerCase(), buyer3Telephone: safeCell(input.buyer3Telephone, 40), buyer4Name: safeCell(input.buyer4Name, 160), buyer4Email: text(input.buyer4Email, 254).toLowerCase(), buyer4Telephone: safeCell(input.buyer4Telephone, 40), currentAddress: safeCell(input.currentAddress, 1_000), newBuild: safeCell(input.newBuild, 20), firstTimeBuyer: safeCell(input.firstTimeBuyer, 20), mortgageAdvisor: safeCell(input.mortgageAdvisor, 200), mortgageBank: safeCell(input.mortgageBank, 200), giftedMoney: safeCell(input.giftedMoney, 20), giftDetails: safeCell(input.giftDetails, 500), referralSource: safeCell(input.referralSource, 100), referralName: safeCell(input.referralName, 160), notes: safeCell(input.notes, 2_000), privacyConsent: input.privacyConsent === true,
  };
  const buyers = Number.isInteger(quote.numberOfBuyers) && quote.numberOfBuyers >= 1 && quote.numberOfBuyers <= 4 ? quote.numberOfBuyers : 0;
  if (!quote.purchasePrice || !quote.purchaseAddress || !quote.propertyLocation || !quote.tenure || !quote.buyer1Name || !validEmail(quote.buyer1Email) || !quote.buyer1Telephone || !quote.currentAddress || !quote.newBuild || !quote.firstTimeBuyer || !quote.giftedMoney || !quote.newMortgage || !quote.referralSource || !quote.privacyConsent || !buyers) return null;
  for (let index = 2; index <= buyers; index += 1) if (!quote[`buyer${index}Name`] || !validEmail(quote[`buyer${index}Email`]) || !quote[`buyer${index}Telephone`]) return null;
  return quote;
}

function normaliseCareerApplication(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const application = {
    submittedAt: new Date().toISOString(),
    formType: "Career application",
    fullName: safeCell(input.fullName, 160),
    email: text(input.email, 254).toLowerCase(),
    telephone: safeCell(input.telephone, 40),
    role: safeCell(input.role, 160),
    profileUrl: safeCell(input.profileUrl, 500),
    coverLetter: safeCell(input.coverLetter, 2_000),
    privacyConsent: input.privacyConsent === true,
  };
  if (!application.fullName || !validEmail(application.email) || !application.telephone || !application.role || !application.privacyConsent) return null;
  return application;
}

export function createSubmissionHandler(formKind = "quote") {
  return async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ ok: false, error: "Method not allowed." });
  if (!trustedOrigin(request)) return response.status(403).json({ ok: false, error: "Invalid submission origin." });
  if (JSON.stringify(request.body || {}).length > MAX_BODY_BYTES) return response.status(413).json({ ok: false, error: "Submission is too large." });
  if (request.body?.website || !Number.isFinite(request.body?.formStartedAt) || Date.now() - request.body.formStartedAt < MIN_FORM_TIME_MS || Date.now() - request.body.formStartedAt > MAX_FORM_TIME_MS) return response.status(400).json({ ok: false, error: "Unable to accept this submission." });

  const submission = formKind === "career" ? normaliseCareerApplication(request.body) : normaliseQuote(request.body);
  if (!submission) return response.status(400).json({ ok: false, error: "Please check the required fields and consent." });
  const scriptUrl = process.env.APPS_SCRIPT_WEB_APP_URL;
  const secret = process.env.APPS_SCRIPT_WEBHOOK_SECRET;
  if (!scriptUrl || !secret) return response.status(503).json({ ok: false, error: "Quote service is not configured." });

  try {
    const timestamp = Date.now();
    const payload = JSON.stringify(submission);
    const signature = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
    const scriptResponse = await fetch(scriptUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ timestamp, payload, signature }) });
    const result = await scriptResponse.json().catch(() => null);
    if (!scriptResponse.ok || !result?.ok) throw new Error("Apps Script rejected the submission.");
    return response.status(201).json({ ok: true });
  } catch {
    return response.status(502).json({ ok: false, error: "Quote service is temporarily unavailable." });
  }
  };
}

export default createSubmissionHandler();
