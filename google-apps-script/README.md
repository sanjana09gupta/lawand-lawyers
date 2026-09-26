# Secure Google Apps Script quote receiver

The browser sends quote data only to the site's server endpoint. The server signs the request before forwarding it to Apps Script, so the sheet cannot be written by direct browser requests.

1. Open the target Google Sheet and choose **Extensions > Apps Script**.
2. Replace the default script with `QuoteSheet.gs` and save it.
3. In Apps Script, open **Project Settings > Script Properties** and add:
   - `SHEET_ID`: `1jDVaHxWoqd0xG8go6xLh3N8v-CerxNeLcOgwLEQXCzk`
   - `QUOTE_WEBHOOK_SECRET`: a long random secret
   - `SHEET_NAME`: `Sheet1` (optional)
4. Deploy as a **Web app**. Set **Execute as** to **Me** and **Who has access** to **Anyone**. Copy the deployed `/exec` URL.
5. In Vercel Project Settings > Environment Variables, add the values from `.env.example`:
   - `APPS_SCRIPT_WEB_APP_URL`: deployed Apps Script `/exec` URL
   - `APPS_SCRIPT_WEBHOOK_SECRET`: exactly the same secret stored in Apps Script
   - `ALLOWED_QUOTE_ORIGINS`: production website origin
6. Redeploy after adding the variables.

Keep the webhook secret in Script Properties and Vercel only. Never add it to frontend code, a `VITE_` environment variable, Git, or chat.
