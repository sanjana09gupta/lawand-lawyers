# Quote request sheet setup

The website submits new-purchase quote requests to the Google Sheet supplied by the business. This keeps Google account credentials out of the website code.

1. Open the supplied Google Sheet and choose **Extensions > Apps Script**.
2. Replace the default script with `QuoteSheet.gs` from this folder and save it.
3. Deploy it as a **Web app**. It must run as the spreadsheet owner and allow access to anyone.
4. Copy the deployed `/exec` URL into a local `.env` file using `.env.example` as the template:

   `VITE_QUOTE_SHEET_ENDPOINT=https://script.google.com/macros/s/.../exec`

5. Add the same environment variable in Vercel, then redeploy.

The endpoint receives only the new-purchase quote form and appends one row per submission. Until the URL is configured, the website deliberately keeps the existing email fallback.
