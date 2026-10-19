# Cookiebot setup

The site uses React and Vite. Install Cookiebot through the HTML integration in
`vite.config.ts`; no WordPress plugin is needed.

1. Register the production domain and any additional hostnames that serve the site
   in Cookiebot. Complete its first scan and categorize the detected trackers.
2. Configure the English banner in Cookiebot, including reject, selection, and
   accept controls. Enable its privacy trigger so visitors can reopen preferences
   and withdraw consent later.
3. Copy the Domain Group ID from Cookiebot's implementation settings. Set the public
   build variable `VITE_COOKIEBOT_ID` to that UUID in the frontend hosting environment.
   For local development, put it in `.env.local` and register the test hostname
   with Cookiebot as appropriate.
4. Restart Vite locally or rebuild and deploy the static frontend. The integration
   places the synchronous Cookiebot script first in the HTML head, with automatic
   blocking enabled. Do not install another copy through a tag manager.
5. On the registered site, test in a clean browser session: before consent, reject
   all, accept selected categories, accept all, and withdraw consent. Inspect
   cookies and network requests in each state, including after route navigation.
   Check Zoom booking and other external embeds against the scan classifications.

An empty ID leaves Cookiebot disabled and makes no Cookiebot requests. An invalid
ID fails the build rather than silently publishing a broken installation.

The ID, account configuration, scan results, and live consent tests are required
before the integration can be considered active and verified. Adding the script
alone does not establish UK GDPR or PECR compliance.

Reference: [Cookiebot automatic blocking](https://support.cookiebot.com/hc/en-us/articles/360009074960-Automatic-cookie-blocking).
