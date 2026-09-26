import { createHmac } from "node:crypto";

const MAX_MESSAGE_LENGTH = 900;
const MAX_BODY_BYTES = 2_000;
const MIN_FORM_TIME_MS = 1_000;
const RATE_LIMIT_WINDOW_MS = 300_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const requestLog = new Map();

function trustedOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  const protocol = request.headers["x-forwarded-proto"] || (String(host).startsWith("localhost") || String(host).startsWith("127.0.0.1") ? "http" : "https");
  const configured = (process.env.ALLOWED_QUOTE_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
  return Boolean(origin && host && new Set([`${protocol}://${host}`, ...configured]).has(origin));
}

function withinRateLimit(request) {
  const ip = String(request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return false;
  recent.push(now);
  requestLog.set(ip, recent);
  return true;
}

function fallbackAnswer(question) {
  const lower = question.toLowerCase();
  if (/(quote|conveyancing fee|price)/.test(lower)) return "You can request a conveyancing quote through the Get a Quote button or the New Purchase Details form. Fees information is also available on the Residential Conveyancing fees page.";
  if (/(career|job|apply|vacancy)/.test(lower)) return "Current vacancies and the secure application form are available on the Careers page. Applications are saved to the firm's careers team sheet.";
  if (/(contact|phone|email|office|address)/.test(lower)) return "You can call +44 20 8586 5657 or email Sales@lawandlawyers.co.uk. The head office is at Second Floor, 31-41 Worship Street, London EC2A 2DX.";
  if (/(immigration|visa|sponsor)/.test(lower)) return "The Immigration and Corporate Immigration Services pages cover personal visas, settlement and employer sponsor support. Please contact the team for advice based on your circumstances.";
  if (/(service|help|law)/.test(lower)) return "The firm provides conveyancing, immigration, wills and probate, employment, family, landlord and tenant, dispute resolution, and business legal services. I can help you find the relevant website page.";
  return "I can help you find a Law & Lawyers service, quote form, contact details, careers information or a page on this website. For legal advice about your specific circumstances, please contact the firm directly.";
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ ok: false, error: "Method not allowed." });
  if (!trustedOrigin(request)) return response.status(403).json({ ok: false, error: "Invalid request origin." });
  if (!withinRateLimit(request)) return response.status(429).json({ ok: false, error: "Please wait a few minutes before sending another question." });
  if (Number(request.headers["content-length"] || 0) > MAX_BODY_BYTES) return response.status(413).json({ ok: false, error: "Message is too large." });
  const message = typeof request.body?.message === "string" ? request.body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
  const formStartedAt = Number(request.body?.formStartedAt || 0);
  if (!message) return response.status(400).json({ ok: false, error: "Please enter a question." });
  if (request.body?.website) return response.status(400).json({ ok: false, error: "Unable to send this message." });
  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FORM_TIME_MS || Date.now() - formStartedAt > 7_200_000) return response.status(400).json({ ok: false, error: "Please try again." });

  const scriptUrl = process.env.APPS_SCRIPT_WEB_APP_URL;
  const secret = process.env.APPS_SCRIPT_WEBHOOK_SECRET;
  if (!scriptUrl || !secret) return response.status(200).json({ ok: true, answer: fallbackAnswer(message), fallback: true });

  try {
    const payload = JSON.stringify({ formType: "Website assistant", message });
    const timestamp = Date.now();
    const signature = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
    const scriptResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp, payload, signature }),
    });
    const data = await scriptResponse.json().catch(() => null);
    const answer = scriptResponse.ok && data?.ok && typeof data.answer === "string" ? data.answer.trim() : "";
    if (!answer) throw new Error("No assistant response.");
    return response.status(200).json({ ok: true, answer: answer.slice(0, 2_000) });
  } catch {
    return response.status(200).json({ ok: true, answer: fallbackAnswer(message), fallback: true });
  }
}
