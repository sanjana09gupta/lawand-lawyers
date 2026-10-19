import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const cookiebotId = loadEnv(mode, process.cwd(), 'VITE_').VITE_COOKIEBOT_ID?.trim()
  if (cookiebotId && !/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(cookiebotId)) {
    throw new Error('VITE_COOKIEBOT_ID must be the Domain Group ID from Cookiebot.')
  }

  return {
    plugins: [react(), {
      name: 'cookiebot-consent',
      transformIndexHtml: {
        order: 'pre',
        handler: () => cookiebotId ? [{
          tag: 'script',
          attrs: {
            id: 'Cookiebot',
            src: 'https://consent.cookiebot.com/uc.js',
            'data-cbid': cookiebotId,
            'data-blockingmode': 'auto',
            'data-culture': 'EN',
            type: 'text/javascript',
          },
          injectTo: 'head-prepend',
        }] : [],
      },
    }],
  }
})
