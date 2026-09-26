/**
 * Secure quote receiver for Law and Lawyers.
 *
 * Script Properties required before deployment:
 * - SHEET_ID: destination Google Sheet ID
 * - QUOTE_WEBHOOK_SECRET: long random secret shared only with Vercel
 * Optional: SHEET_NAME, defaults to Sheet1.
 *
 * Deploy as Web app: Execute as Me, Who has access: Anyone.
 * The public URL cannot write to the sheet without a valid Vercel HMAC signature.
 */
const HEADERS = [
  "Submitted at", "Form type", "Purchase price", "Purchase address", "Property location", "Tenure", "Transaction details", "Purchase purpose", "New mortgage", "Number of buyers",
  "Buyer 1 name", "Buyer 1 email", "Buyer 1 telephone", "Buyer 2 name", "Buyer 2 email", "Buyer 2 telephone", "Buyer 3 name", "Buyer 3 email", "Buyer 3 telephone", "Buyer 4 name", "Buyer 4 email", "Buyer 4 telephone",
  "Current address", "New build", "First-time buyer", "Mortgage advisor", "Mortgage bank", "Gifted money", "Gift details", "How did you hear about us", "Referrer's name", "Additional notes", "Privacy notice confirmed",
];

function output_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function hex_(bytes) {
  return bytes.map(function(byte) { return (byte + 256).toString(16).slice(-2); }).join("");
}

function equal_(left, right) {
  if (typeof left !== "string" || typeof right !== "string" || left.length !== right.length) return false;
  var different = 0;
  for (var index = 0; index < left.length; index += 1) different |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return different === 0;
}

function cell_(value, limit) {
  var result = typeof value === "string" ? value.trim().slice(0, limit) : "";
  return /^[=+\-@]/.test(result) ? "'" + result : result;
}

function valid_(quote) {
  return quote && quote.purchasePrice && quote.purchaseAddress && quote.propertyLocation && quote.tenure && quote.buyer1Name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.buyer1Email || "") && quote.buyer1Telephone && quote.currentAddress && quote.newBuild && quote.firstTimeBuyer && quote.giftedMoney && quote.newMortgage && quote.referralSource && quote.privacyConsent === true;
}

function doPost(event) {
  try {
    var properties = PropertiesService.getScriptProperties();
    var sheetId = properties.getProperty("SHEET_ID");
    var secret = properties.getProperty("QUOTE_WEBHOOK_SECRET");
    var sheetName = properties.getProperty("SHEET_NAME") || "Sheet1";
    if (!sheetId || !secret) throw new Error("Quote receiver is not configured.");

    var envelope = JSON.parse((event.postData && event.postData.contents) || "{}");
    if (!envelope.payload || !envelope.signature || !Number.isFinite(envelope.timestamp) || Math.abs(Date.now() - envelope.timestamp) > 300000) throw new Error("Invalid request.");
    var expected = hex_(Utilities.computeHmacSha256Signature(String(envelope.timestamp) + "." + envelope.payload, secret));
    if (!equal_(expected, envelope.signature)) throw new Error("Invalid request.");

    var quote = JSON.parse(envelope.payload);
    if (!valid_(quote)) throw new Error("Invalid quote data.");

    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error("Please try again shortly.");
    try {
      var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
      if (!sheet) throw new Error("Quote receiver is not configured.");
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      sheet.appendRow([
        quote.submittedAt || new Date().toISOString(), "New purchase quote request", cell_(quote.purchasePrice, 80), cell_(quote.purchaseAddress, 1000), cell_(quote.propertyLocation, 40), cell_(quote.tenure, 60), cell_(quote.transactionDetail, 100), cell_(quote.purchasePurpose, 100), cell_(quote.newMortgage, 60), quote.numberOfBuyers || "",
        cell_(quote.buyer1Name, 160), cell_(quote.buyer1Email, 254), cell_(quote.buyer1Telephone, 40), cell_(quote.buyer2Name, 160), cell_(quote.buyer2Email, 254), cell_(quote.buyer2Telephone, 40), cell_(quote.buyer3Name, 160), cell_(quote.buyer3Email, 254), cell_(quote.buyer3Telephone, 40), cell_(quote.buyer4Name, 160), cell_(quote.buyer4Email, 254), cell_(quote.buyer4Telephone, 40),
        cell_(quote.currentAddress, 1000), cell_(quote.newBuild, 20), cell_(quote.firstTimeBuyer, 20), cell_(quote.mortgageAdvisor, 200), cell_(quote.mortgageBank, 200), cell_(quote.giftedMoney, 20), cell_(quote.giftDetails, 500), cell_(quote.referralSource, 100), cell_(quote.referralName, 160), cell_(quote.notes, 2000), "Yes",
      ]);
    } finally {
      lock.releaseLock();
    }
    return output_({ ok: true });
  } catch (error) {
    console.log("Quote receiver rejected a request.");
    return output_({ ok: false, error: "Unable to save quote request." });
  }
}
