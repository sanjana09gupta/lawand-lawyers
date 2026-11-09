import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import handler from "../api/quote.js";

const contact = { formType: "Conveyancing quote request", forename: "Test", surname: "Client", telephone: "0123456789", email: "test@example.com", privacyConsent: true, formStartedAt: Date.now() - 3000 };
const sale = { saleAmount: "200000", saleTenure: "Freehold", saleMortgage: "Yes", sellers: "1", saleAddress1: "1 Test Street", salePostcode: "AA1 1AA", saleSharedOwnership: "No", helpToBuyMortgage: "No" };
const purchase = { purchaseAmount: "300000", purchaseTenure: "Freehold", purchaseMortgage: "Yes", buyers: "1", purchaseAddress1: "2 Test Street", purchasePostcode: "AA1 1AB", jurisdiction: "England", ukResident: "Yes", additionalProperty: "No", firstTimeBuyer: "No", purchaseSharedOwnership: "No", giftedDeposit: "No", newBuild: "No", helpToBuyIsa: "No", lifetimeIsa: "No" };

async function send(body) {
  let status, data;
  const response = { setHeader() {}, status(value) { status = value; return this; }, json(value) { data = value; return this; } };
  await handler({ method: "POST", headers: { origin: "http://localhost", host: "localhost" }, body }, response);
  return { status, data };
}

test("quote types are validated and forwarded without inactive fields", async () => {
  process.env.APPS_SCRIPT_WEB_APP_URL = "https://example.test";
  process.env.APPS_SCRIPT_WEBHOOK_SECRET = "test";
  const original = globalThis.fetch;
  const payloads = [];
  globalThis.fetch = async (_url, options) => { payloads.push(JSON.parse(JSON.parse(options.body).payload)); return { ok: true, json: async () => ({ ok: true }) }; };
  try {
    for (const [quoteType, details] of [["Sale", sale], ["Purchase", purchase], ["Sale & Purchase", { ...sale, ...purchase }]]) {
      assert.equal((await send({ ...contact, ...details, quoteType })).status, 201);
    }
    assert.equal((await send({ ...contact, ...purchase, quoteType: "Purchase", purchaseTenure: "Leasehold" })).status, 400);
    assert.equal((await send({ ...contact, ...sale, quoteType: "Sale", saleAmount: "0" })).status, 400);
    assert.equal(payloads[0].purchaseAmount, undefined);
    assert.equal(payloads[1].saleAmount, undefined);
  } finally { globalThis.fetch = original; }
});

test("receiver sends the request to the specified To and CC", () => {
  let mail;
  const rows = [];
  const context = { GmailApp: { sendEmail: (...args) => { mail = args; } }, SpreadsheetApp: {}, console };
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL("../google-apps-script/QuoteSheet.gs", import.meta.url), "utf8"), context);
  context.appendConveyancing_({ getSheetByName: () => ({ getLastRow: () => 0, appendRow: (row) => rows.push(row) }) }, { ...contact, ...sale, quoteType: "Sale", submittedAt: "2026-01-01" });
  assert.equal(mail[0], "info@lawandlawyers.co.uk");
  assert.equal(mail[3].cc, "mohit@lawandlawyers.co.uk");
  assert.match(mail[2], /Sale Amount: 200000/);
  assert.equal(rows.length, 2);
});
