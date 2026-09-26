/**
 * Secure quote receiver for Law and Lawyers.
 *
 * Script Properties required before deployment:
 * - SHEET_ID: destination Google Sheet ID
 * - QUOTE_WEBHOOK_SECRET: long random secret shared only with Vercel
 * - OPENAI_API_KEY: OpenAI key for the website assistant, stored only in Apps Script
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

const CAREER_HEADERS = ["Submitted at", "Form type", "Full name", "Email", "Telephone", "Role applied for", "CV or profile link", "Cover letter", "Privacy notice confirmed"];
const CHAT_MAX_MESSAGE_LENGTH = 900;
const CHAT_MAX_ANSWER_LENGTH = 2000;
const WEBSITE_CONTEXT = "Law & Lawyers is an SRA-regulated law firm (SRA ID: 613159). The website covers residential and commercial conveyancing, immigration, corporate immigration services, wills and probate, employment, employment law, landlord and tenant, family law and dispute resolution. Main contact: +44 20 8586 5657, Sales@lawandlawyers.co.uk. The head office is Second Floor, 31-41 Worship Street, London EC2A 2DX. Opening hours are Monday to Friday, 9:30 to 17:30. Website routes include services, contact, careers, consultation and conveyancing quote pages. Client Login links to lawandlawyers.perfectportal.co.uk/login.";

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

function validCareer_(application) {
  return application && application.fullName && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email || "") && application.telephone && application.role && application.privacyConsent === true;
}

function validChat_(submission) {
  return submission && typeof submission.message === "string" && submission.message.trim().length > 0 && submission.message.trim().length <= CHAT_MAX_MESSAGE_LENGTH;
}

function fallbackChat_(question) {
  var lower = question.toLowerCase();
  if (/(quote|conveyancing fee|price)/.test(lower)) return "You can request a conveyancing quote through the Get a Quote button or the New Purchase Details form. Fees information is also available on the Residential Conveyancing fees page.";
  if (/(career|job|apply|vacancy)/.test(lower)) return "Current vacancies and the secure application form are available on the Careers page. Applications are saved to the firm's careers team sheet.";
  if (/(contact|phone|email|office|address)/.test(lower)) return "You can call +44 20 8586 5657 or email Sales@lawandlawyers.co.uk. The head office is at Second Floor, 31-41 Worship Street, London EC2A 2DX.";
  if (/(immigration|visa|sponsor)/.test(lower)) return "The Immigration and Corporate Immigration Services pages cover personal visas, settlement and employer sponsor support. Please contact the team for advice based on your circumstances.";
  return "I can help you find a Law & Lawyers service, quote form, contact details, careers information or a page on this website. For legal advice about your specific circumstances, please contact the firm directly.";
}

function assistantText_(data) {
  if (data && typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  var output = data && Array.isArray(data.output) ? data.output : [];
  var text = [];
  for (var i = 0; i < output.length; i += 1) {
    var content = Array.isArray(output[i].content) ? output[i].content : [];
    for (var j = 0; j < content.length; j += 1) if (typeof content[j].text === "string") text.push(content[j].text);
  }
  return text.join("\n").trim();
}

function chatAnswer_(properties, message) {
  var apiKey = properties.getProperty("OPENAI_API_KEY");
  if (!apiKey) return fallbackChat_(message);
  try {
    var apiResponse = UrlFetchApp.fetch("https://api.openai.com/v1/responses", {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + apiKey },
      payload: JSON.stringify({
        model: properties.getProperty("OPENAI_CHAT_MODEL") || "gpt-4.1-mini",
        max_output_tokens: 350,
        instructions: "You are the website assistant for Law & Lawyers. Answer only about the website and the firm's listed services using the supplied context. Be concise, factual and helpful. Do not provide legal advice, legal conclusions, case assessments, immigration eligibility decisions, pricing promises or tax advice. Never ask for or accept identity documents, passwords, financial details, case documents or other sensitive personal information. If a question needs legal advice, invite the visitor to contact the firm. If the answer is not in the context, say so and offer the contact page. Website context: " + WEBSITE_CONTEXT,
        input: message,
      }),
      muteHttpExceptions: true,
    });
    if (apiResponse.getResponseCode() < 200 || apiResponse.getResponseCode() >= 300) return fallbackChat_(message);
    var answer = assistantText_(JSON.parse(apiResponse.getContentText()));
    return answer ? answer.slice(0, CHAT_MAX_ANSWER_LENGTH) : fallbackChat_(message);
  } catch (error) {
    console.log("Website assistant request failed.");
    return fallbackChat_(message);
  }
}

function appendCareer_(spreadsheet, application) {
  var sheet = spreadsheet.getSheetByName("Career Applications");
  if (!sheet) sheet = spreadsheet.insertSheet("Career Applications");
  if (sheet.getLastRow() === 0) sheet.appendRow(CAREER_HEADERS);
  sheet.appendRow([
    application.submittedAt || new Date().toISOString(), "Career application", cell_(application.fullName, 160), cell_(application.email, 254), cell_(application.telephone, 40), cell_(application.role, 160), cell_(application.profileUrl, 500), cell_(application.coverLetter, 2000), "Yes",
  ]);
}

function doPost(event) {
  try {
    var properties = PropertiesService.getScriptProperties();
    var secret = properties.getProperty("QUOTE_WEBHOOK_SECRET");
    if (!secret) throw new Error("Receiver is not configured.");

    var envelope = JSON.parse((event.postData && event.postData.contents) || "{}");
    if (!envelope.payload || !envelope.signature || !Number.isFinite(envelope.timestamp) || Math.abs(Date.now() - envelope.timestamp) > 300000) throw new Error("Invalid request.");
    var expected = hex_(Utilities.computeHmacSha256Signature(String(envelope.timestamp) + "." + envelope.payload, secret));
    if (!equal_(expected, envelope.signature)) throw new Error("Invalid request.");

    var submission = JSON.parse(envelope.payload);
    var isChat = submission.formType === "Website assistant";
    var isCareerApplication = submission.formType === "Career application";
    if (isChat) {
      if (!validChat_(submission)) throw new Error("Invalid assistant request.");
      return output_({ ok: true, answer: chatAnswer_(properties, submission.message.trim()) });
    }
    if (isCareerApplication ? !validCareer_(submission) : !valid_(submission)) throw new Error("Invalid submission data.");

    var sheetId = properties.getProperty("SHEET_ID");
    var sheetName = properties.getProperty("SHEET_NAME") || "Sheet1";
    if (!sheetId) throw new Error("Quote receiver is not configured.");

    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error("Please try again shortly.");
    try {
      var spreadsheet = SpreadsheetApp.openById(sheetId);
      if (isCareerApplication) {
        appendCareer_(spreadsheet, submission);
      } else {
        var sheet = spreadsheet.getSheetByName(sheetName);
        if (!sheet) throw new Error("Quote receiver is not configured.");
        if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
        sheet.appendRow([
          submission.submittedAt || new Date().toISOString(), "New purchase quote request", cell_(submission.purchasePrice, 80), cell_(submission.purchaseAddress, 1000), cell_(submission.propertyLocation, 40), cell_(submission.tenure, 60), cell_(submission.transactionDetail, 100), cell_(submission.purchasePurpose, 100), cell_(submission.newMortgage, 60), submission.numberOfBuyers || "",
          cell_(submission.buyer1Name, 160), cell_(submission.buyer1Email, 254), cell_(submission.buyer1Telephone, 40), cell_(submission.buyer2Name, 160), cell_(submission.buyer2Email, 254), cell_(submission.buyer2Telephone, 40), cell_(submission.buyer3Name, 160), cell_(submission.buyer3Email, 254), cell_(submission.buyer3Telephone, 40), cell_(submission.buyer4Name, 160), cell_(submission.buyer4Email, 254), cell_(submission.buyer4Telephone, 40),
          cell_(submission.currentAddress, 1000), cell_(submission.newBuild, 20), cell_(submission.firstTimeBuyer, 20), cell_(submission.mortgageAdvisor, 200), cell_(submission.mortgageBank, 200), cell_(submission.giftedMoney, 20), cell_(submission.giftDetails, 500), cell_(submission.referralSource, 100), cell_(submission.referralName, 160), cell_(submission.notes, 2000), "Yes",
        ]);
      }
    } finally {
      lock.releaseLock();
    }
    return output_({ ok: true });
  } catch (error) {
    console.log("Apps Script receiver rejected a request.");
    return output_({ ok: false, error: "Unable to process request." });
  }
}
