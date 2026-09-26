/**
 * Quote request receiver for the Law and Lawyers website.
 *
 * Deployment: Extensions > Apps Script from the supplied spreadsheet, paste
 * this file, then Deploy > New deployment > Web app. Run as: Me. Who has
 * access: Anyone. Copy that Web app URL into VITE_QUOTE_SHEET_ENDPOINT.
 */
const SHEET_ID = "1jDVaHxWoqd0xG8go6xLh3N8v-CerxNeLcOgwLEQXCzk";
const SHEET_NAME = "Sheet1";

const HEADERS = [
  "Submitted at", "Form type", "Purchase price", "Purchase address", "Property location", "Tenure", "Transaction details", "Purchase purpose", "New mortgage", "Number of buyers",
  "Buyer 1 name", "Buyer 1 email", "Buyer 1 telephone", "Buyer 2 name", "Buyer 2 email", "Buyer 2 telephone",
  "Buyer 3 name", "Buyer 3 email", "Buyer 3 telephone", "Buyer 4 name", "Buyer 4 email", "Buyer 4 telephone",
  "Current address", "New build", "First-time buyer", "Mortgage advisor", "Mortgage bank", "Gifted money",
  "Gift details", "How did you hear about us", "Referrer's name", "Additional notes",
];

function doPost(event) {
  try {
    const payload = JSON.parse(event.parameter.payload || "{}");
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Missing worksheet: ${SHEET_NAME}`);

    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(), payload.formType || "New purchase quote request",
      payload.purchasePrice || "", payload.purchaseAddress || "", payload.propertyLocation || "", payload.tenure || "", payload.transactionDetail || "", payload.purchasePurpose || "", payload.newMortgage || "", payload.numberOfBuyers || "",
      payload.buyer1Name || "", payload.buyer1Email || "", payload.buyer1Telephone || "",
      payload.buyer2Name || "", payload.buyer2Email || "", payload.buyer2Telephone || "",
      payload.buyer3Name || "", payload.buyer3Email || "", payload.buyer3Telephone || "",
      payload.buyer4Name || "", payload.buyer4Email || "", payload.buyer4Telephone || "",
      payload.currentAddress || "", payload.newBuild || "", payload.firstTimeBuyer || "",
      payload.mortgageAdvisor || "", payload.mortgageBank || "", payload.giftedMoney || "",
      payload.giftDetails || "", payload.referralSource || "", payload.referralName || "", payload.notes || "",
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(error) })).setMimeType(ContentService.MimeType.JSON);
  }
}
