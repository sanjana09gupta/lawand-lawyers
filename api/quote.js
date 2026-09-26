import { createSign } from "node:crypto";

const headers = [
  "Submitted at", "Form type", "Purchase price", "Purchase address", "Property location", "Tenure", "Transaction details", "Purchase purpose", "New mortgage", "Number of buyers",
  "Buyer 1 name", "Buyer 1 email", "Buyer 1 telephone", "Buyer 2 name", "Buyer 2 email", "Buyer 2 telephone", "Buyer 3 name", "Buyer 3 email", "Buyer 3 telephone", "Buyer 4 name", "Buyer 4 email", "Buyer 4 telephone",
  "Current address", "New build", "First-time buyer", "Mortgage advisor", "Mortgage bank", "Gifted money", "Gift details", "How did you hear about us", "Referrer's name", "Additional notes",
];

const base64url = (value) => Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

async function googleAccessToken(email, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const assertionHead = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const assertionBody = base64url(JSON.stringify({ iss: email, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${assertionHead}.${assertionBody}`);
  const assertion = `${assertionHead}.${assertionBody}.${signer.sign(privateKey, "base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }) });
  if (!response.ok) throw new Error("Google authentication failed.");
  return (await response.json()).access_token;
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ ok: false, error: "Method not allowed" });
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) return response.status(503).json({ ok: false, error: "Quote service is not configured." });

  const quote = request.body || {};
  if (!quote.purchasePrice || !quote.propertyAddress || !quote.buyer1Name || !quote.buyer1Email) return response.status(400).json({ ok: false, error: "Please complete the required quote fields." });

  try {
    const token = await googleAccessToken(GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"));
    const auth = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const tab = "Sheet1";
    const firstRow = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodeURIComponent(`${tab}!1:1`)}`, { headers: auth });
    const firstRowData = await firstRow.json();
    if (!firstRow.ok) throw new Error("Unable to read the quote sheet.");
    if (!firstRowData.values?.length) {
      const setup = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodeURIComponent(`${tab}!A1:AF1`)}?valueInputOption=RAW`, { method: "PUT", headers: auth, body: JSON.stringify({ values: [headers] }) });
      if (!setup.ok) throw new Error("Unable to prepare the quote sheet.");
    }
    const row = [quote.submittedAt || new Date().toISOString(), quote.formType || "New purchase quote request", quote.purchasePrice, quote.purchaseAddress, quote.propertyLocation || "", quote.tenure || "", quote.transactionDetail || "", quote.purchasePurpose || "", quote.newMortgage || "", quote.numberOfBuyers || "", quote.buyer1Name || "", quote.buyer1Email || "", quote.buyer1Telephone || "", quote.buyer2Name || "", quote.buyer2Email || "", quote.buyer2Telephone || "", quote.buyer3Name || "", quote.buyer3Email || "", quote.buyer3Telephone || "", quote.buyer4Name || "", quote.buyer4Email || "", quote.buyer4Telephone || "", quote.currentAddress || "", quote.newBuild || "", quote.firstTimeBuyer || "", quote.mortgageAdvisor || "", quote.mortgageBank || "", quote.giftedMoney || "", quote.giftDetails || "", quote.referralSource || "", quote.referralName || "", quote.notes || ""];
    const append = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodeURIComponent(`${tab}!A:AF`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, { method: "POST", headers: auth, body: JSON.stringify({ values: [row] }) });
    if (!append.ok) throw new Error("Unable to save the quote request.");
    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error("Quote submission failed", error);
    return response.status(502).json({ ok: false, error: "Quote service is temporarily unavailable." });
  }
}
