# APPSTORE — the native store builds of the EZvoxa template

*How the App Store (and later Google Play) version of EZvoxa is built from this
repo. Companion to the "EZvoxa App Store Compliance Audit" document. Started
27 Aug 2026.*

## The one-sentence architecture

`demo.html` stays the single source of truth; `native/build.js` packages it
into `native/www/`, and the Capacitor shell in `native/ios/` wraps that into a
real iOS app. **Nothing about the web app, Evan's app, or the deploy lanes
changes.**

## Layout

- `native/capacitor.config.json` — app id `com.ezvoxa.app`, name EZvoxa,
  `CapacitorHttp` enabled (routes fetch through native HTTP, so our `api/*`
  endpoints need no CORS headers and see no browser Origin).
- `native/build.js` — the packaging step. Run before every sync:
  - `demo.html` → `www/index.html`, injecting `window.__EZ_NATIVE`, an API
    base (`https://app.ezvoxa.com`, override with `EZ_API_BASE=` for
    TestFlight against the family lane), a fetch wrapper that prefixes
    `/api/...` calls, and a rewrite of the one speak-audio literal.
  - `tether-icons.js` copied; **`tether-photos.js` replaced with an empty
    stub — our family's photos must never ship inside a customer binary.**
  - Service-worker code needs no change: WKWebView has no `serviceWorker`,
    so the existing guard skips it. Native updates ship as app releases.
- `native/ios/` — the generated Xcode project (committed). Already done:
  - `Info.plist`: purpose strings for location (SOS only), microphone
    (voice notes), camera + photo library (personalizing buttons);
    portrait-only on iPhone.
  - `PrivacyInfo.xcprivacy`: no tracking; precise location + audio collected
    for app functionality only, not linked to identity; UserDefaults CA92.1.
    (Must be added to the App target in Xcode once — drag it into the project
    navigator on the first Mac build.)
  - App icon 1024 in `Assets.xcassets` (upscaled from the 512 PWA icon —
    replace with original-resolution art before submission if available).
- `privacy.html` — the privacy policy, served at `ezvoxa.com/privacy.html`
  once merged (App Store Connect requires this URL).
- The template SOS screen now carries "EZvoxa alerts your family. It is not a
  substitute for calling 911." (in `demo.html`, so web and native match).

## Building (needs a Mac with Xcode, or a cloud build service)

```
cd native
node build.js            # or EZ_API_BASE=https://ez-comm-tether.vercel.app node build.js
npx cap sync ios
npx cap open ios         # Mac only: opens Xcode; set the signing team, build
```

No Mac in the house → Codemagic (or similar) builds and uploads to TestFlight
from this repo; the steps above become its build script.

## Still to do — code

- [ ] Server: `api/speak.js` honors `ALLOWED_ORIGIN`; CapacitorHttp sends no
      browser Origin so it passes today, but decide the policy for native
      before launch (e.g. an app token) rather than relying on that.
- [ ] Quiet the harmless boot-time `appendChild` error (pre-existing, shows
      under `file://`; verify it does not appear under `capacitor://`).
- [ ] Native niceties for the Guideline 4.2 case: haptics on tap, push
      notifications for family voice notes (needs a plugin build pass).
- [ ] Android: `npx cap add android` when iOS is through review.
- [ ] Backup/restore before any paid launch (RELEASE.md gate).

## Still to do — Frank / accounts

- [ ] D-U-N-S number for EZ VOICE LLC (free; start immediately — long pole).
- [ ] Apple Developer Program, Organization, $99/yr (needs the D-U-N-S).
- [ ] Decide: Mac available, or set up Codemagic?
- [ ] App Store Connect once enrolled: listing text, screenshots (6.7" and
      6.1"), privacy questionnaire (answers mirror privacy.html), age rating,
      support URL `ezvoxa.com`, marketing URL `ezvoxa.com`.

## Review posture (from the audit)

v1 ships **free with everything unlocked** — no IAP, no licensing, which keeps
the review surface minimal. The 4.2 defense: fully offline single-file app,
real assistive function, established AAC category. Expect and budget for one
rejection/fix cycle.
