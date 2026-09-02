#!/usr/bin/env node
// Packages the EZvoxa template (demo.html) into native/www/ for the store
// builds. demo.html stays the single source of truth: run this before every
// `npx cap sync` so the shells always carry the current template.
//
//   node native/build.js
//
// What it does, and why:
//  - demo.html -> www/index.html with one <script> injected after the
//    manifest link: sets window.__EZ_NATIVE and rewrites '/api/...' fetches
//    to API_BASE (a WKWebView page has no origin to resolve them against).
//    CORS never applies because capacitor.config.json enables CapacitorHttp,
//    which routes fetch through native HTTP.
//  - tether-icons.js is copied as-is (the template's artwork).
//  - tether-photos.js is replaced with an empty stub: that file holds our own
//    family's photos and must never ship inside a customer binary. The app
//    only requires the global to exist before it renders.
//  - Icons and the template manifest are copied so relative refs resolve.

const fs = require('fs');
const path = require('path');

// The customer lane. Until app.ezvoxa.com is live (RELEASE.md setup), point
// TestFlight builds at the family lane by running:
//   EZ_API_BASE=https://ez-comm-tether.vercel.app node native/build.js
const API_BASE = process.env.EZ_API_BASE || 'https://app.ezvoxa.com';

const root = path.join(__dirname, '..');
const www = path.join(__dirname, 'www');

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });

let html = fs.readFileSync(path.join(root, 'demo.html'), 'utf8');

const MARKER = '<link rel="manifest" href="manifest-template.webmanifest">';
if (!html.includes(MARKER)) {
  console.error('build failed: manifest marker not found in demo.html');
  process.exit(1);
}
const nativeBoot = MARKER + '\n<script>\n'
  + '// Injected by native/build.js — native shells only, never the web app.\n'
  + 'window.__EZ_NATIVE = true;\n'
  + 'window.__EZ_API_BASE = ' + JSON.stringify(API_BASE) + ';\n'
  + '(function () {\n'
  + '  var f = window.fetch.bind(window);\n'
  + "  window.fetch = function (input, init) {\n"
  + "    if (typeof input === 'string' && input.indexOf('/api/') === 0) input = window.__EZ_API_BASE + input;\n"
  + "    else if (input && input.url && input.url.indexOf('/api/') === 0) input = new Request(window.__EZ_API_BASE + input.url, input);\n"
  + '    return f(input, init);\n'
  + '  };\n'
  + '})();\n'
  + '</script>';
html = html.replace(MARKER, nativeBoot);

// Subscriptions are opt-in per build: EZ_BILLING=1 injects the billing
// bridge (billing.js) plus the RevenueCat public SDK keys, and demo.html's
// Subscription card comes alive. Without the flag nothing billing-related
// ships and the app is fully unlocked — the v1 store posture.
if (process.env.EZ_BILLING === '1') {
  const keyIos = process.env.EZ_RC_KEY_IOS || '';
  const keyAndroid = process.env.EZ_RC_KEY_ANDROID || '';
  if (!keyIos && !keyAndroid) {
    console.error('build failed: EZ_BILLING=1 but neither EZ_RC_KEY_IOS nor EZ_RC_KEY_ANDROID is set');
    process.exit(1);
  }
  const billingBoot = '<script>\n'
    + 'window.__EZ_RC_KEY_IOS = ' + JSON.stringify(keyIos) + ';\n'
    + 'window.__EZ_RC_KEY_ANDROID = ' + JSON.stringify(keyAndroid) + ';\n'
    + '</script>\n<script src="billing.js"></script>';
  html = html.replace('</head>', billingBoot + '\n</head>');
  fs.copyFileSync(path.join(__dirname, 'billing.js'), path.join(www, 'billing.js'));
  console.log('billing: ENABLED (RevenueCat keys injected for ' + [keyIos && 'ios', keyAndroid && 'android'].filter(Boolean).join(', ') + ')');
} else {
  console.log('billing: off (set EZ_BILLING=1 with EZ_RC_KEY_IOS/EZ_RC_KEY_ANDROID to enable)');
}

// One URL bypasses fetch: the AI-voice <audio> element. Rewrite that literal
// so it too resolves against the API base. Media loads are not CORS requests,
// so this needs no CapacitorHttp involvement server-side.
const AUDIO_LIT = "new Audio('/api/speak?";
const audioCount = html.split(AUDIO_LIT).length - 1;
if (audioCount !== 1) {
  console.error('build failed: expected exactly 1 speak-audio literal, found ' + audioCount);
  process.exit(1);
}
html = html.replace(AUDIO_LIT, "new Audio(window.__EZ_API_BASE + '/api/speak?");

fs.writeFileSync(path.join(www, 'index.html'), html);

// tether-icons.js mostly holds the generic neon set, but some keys are
// EVAN'S AVATAR ART or OUR FAMILY'S OWN HOUSES and must never ship inside a
// customer binary, the same rule as the family photos. Their data is
// replaced with a blank pixel so the globals still resolve if some code path
// asks for them (the template never renders these keys; it has its own
// neon versions). Audited 2 Sep 2026 across all 253 icons.
{
  const EVAN_LIKENESS_KEYS = [
    // the avatar (sick-day art, sleep, the McDonald's picture, the school pages)
    'hurt_tile', 'headache', 'sore_throat', 'cold', 'cough', 'fever', 'stomachache',
    'rest', 'sleep', 'hamburger', 'abc_evan', 'numbers_evan',
    // photographs of the family's actual homes
    'houses_tile', 'houses_tile_alt', 'house_dad', 'house_mom',
  ];
  let icons = fs.readFileSync(path.join(root, 'tether-icons.js'), 'utf8');
  // a 1x1 transparent PNG: blank if ever drawn, never a wrong picture
  const generic = [null, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='];
  for (const key of EVAN_LIKENESS_KEYS) {
    const re = new RegExp('"' + key + '":\\s*"data:image\\/[a-z+]+;base64,[^"]+"');
    if (!re.test(icons)) {
      console.error('build failed: expected icon key "' + key + '" not found in tether-icons.js');
      process.exit(1);
    }
    icons = icons.replace(re, '"' + key + '": ' + JSON.stringify(generic[1]));
  }
  fs.writeFileSync(path.join(www, 'tether-icons.js'), icons);
  console.log('likeness strip: blanked ' + EVAN_LIKENESS_KEYS.length + ' keys (' + EVAN_LIKENESS_KEYS.join(', ') + ')');
}
fs.writeFileSync(path.join(www, 'tether-photos.js'),
  '// Stub for store builds: the real tether-photos.js holds our family\'s\n'
  + '// photos and never ships to customers. The app only needs the global.\n'
  + 'window.TETHER_PHOTOS = {};\n');

for (const f of ['manifest-template.webmanifest', 'icon-ezvoxa-180.png', 'icon-ezvoxa-192.png', 'icon-ezvoxa-512.png']) {
  fs.copyFileSync(path.join(root, f), path.join(www, f));
}

// One version number for both stores. Bump native/version.json for each
// release (1.0.1, 1.0.2 ...); this stamps the iOS marketing version and the
// Android versionName so nothing is hand-edited in two places. Build
// numbers are separate and come from Codemagic's BUILD_NUMBER.
{
  const version = JSON.parse(fs.readFileSync(path.join(__dirname, 'version.json'), 'utf8')).version;
  if (!/^\d+\.\d+\.\d+$/.test(version)) { console.error('build failed: version.json must be like 1.0.0, got ' + version); process.exit(1); }
  const pbxPath = path.join(__dirname, 'ios', 'App', 'App.xcodeproj', 'project.pbxproj');
  let pbx = fs.readFileSync(pbxPath, 'utf8');
  const hits = (pbx.match(/MARKETING_VERSION = [^;]+;/g) || []).length;
  if (hits < 1) { console.error('build failed: MARKETING_VERSION not found in the Xcode project'); process.exit(1); }
  pbx = pbx.replace(/MARKETING_VERSION = [^;]+;/g, 'MARKETING_VERSION = ' + version + ';');
  fs.writeFileSync(pbxPath, pbx);
  const gradlePath = path.join(__dirname, 'android', 'app', 'build.gradle');
  let gradle = fs.readFileSync(gradlePath, 'utf8');
  if (!/versionName "[^"]*"/.test(gradle)) { console.error('build failed: versionName not found in android/app/build.gradle'); process.exit(1); }
  gradle = gradle.replace(/versionName "[^"]*"/, 'versionName "' + version + '"');
  fs.writeFileSync(gradlePath, gradle);
  console.log('version: ' + version + ' stamped on iOS (' + hits + ' configs) and Android');
}

const kb = (p) => Math.round(fs.statSync(p).size / 1024) + 'KB';
console.log('www built:', fs.readdirSync(www).map((f) => f + ' (' + kb(path.join(www, f)) + ')').join(', '));
console.log('API base:', API_BASE);
