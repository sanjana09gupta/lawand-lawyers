# Legacy Google Apps Script alternative

The production website now uses the Vercel server-side endpoint in `api/quote.js`, because it confirms Google has saved a row before showing success to the user. The Apps Script option is retained only as an alternative.

1. Open the supplied Google Sheet and choose **Extensions > Apps Script**.
2. Replace the default script with `QuoteSheet.gs` from this folder and save it.
3. Deploy it as a **Web app**. It must run as the spreadsheet owner and allow access to anyone.
4. Copy the deployed `/exec` URL into a local `.env` file using `.env.example` as the template:

   `VITE_QUOTE_SHEET_ENDPOINT=https://script.google.com/macros/s/.../exec`

5. Add the same environment variable in Vercel, then redeploy.

The endpoint receives only the new-purchase quote form and appends one row per submission. Until the URL is configured, the website deliberately keeps the existing email fallback.
