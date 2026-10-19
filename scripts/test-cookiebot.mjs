import assert from 'node:assert/strict';
import { build, resolveConfig } from 'vite';

const previousId = process.env.VITE_COOKIEBOT_ID;
try {
  process.env.VITE_COOKIEBOT_ID = '';
  const disabled = await resolveConfig({}, 'build');
  const disabledPlugin = disabled.plugins.find(plugin => plugin.name === 'cookiebot-consent');
  assert.deepEqual(disabledPlugin.transformIndexHtml.handler(), []);

  process.env.VITE_COOKIEBOT_ID = 'not-a-domain-group-id';
  await assert.rejects(resolveConfig({}, 'build'), /Domain Group ID/);

  // Test a synthetic ID in memory; never write it into deployment artifacts.
  const testId = '11111111-2222-4333-8444-555555555555';
  process.env.VITE_COOKIEBOT_ID = testId;
  const result = await build({ logLevel: 'silent', build: { write: false } });
  const html = result.output.find(file => file.fileName === 'index.html').source;
  const scripts = [...html.matchAll(/<script\b[^>]*>/g)].map(match => match[0]);
  assert.match(scripts[0], /id="Cookiebot"/);
  assert.match(scripts[0], new RegExp(`data-cbid="${testId}"`));
  assert.match(scripts[0], /data-blockingmode="auto"/);
  assert.doesNotMatch(scripts[0], /\b(?:async|defer)\b/);
  assert.equal(scripts.filter(script => script.includes('id="Cookiebot"')).length, 1);
  console.log('Cookiebot checks passed: disabled, invalid ID, first-script order, automatic blocking, single installation.');
} finally {
  if (previousId === undefined) delete process.env.VITE_COOKIEBOT_ID;
  else process.env.VITE_COOKIEBOT_ID = previousId;
}
