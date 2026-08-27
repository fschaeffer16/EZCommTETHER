# EZCommTETHER / EZvoxa — working notes for Claude

## What this is

An AAC (augmentative & alternative communication) app built by **Frank Schaeffer** for his
nonverbal teenage son, **Evan Zachary Schaeffer** (b. Aug 12, 2010; speech apraxia). Evan's
mother is **Raniyah Allen**.

Evan uses this **every day to communicate**. It runs on a dedicated iPhone locked to this app.
Treat `main` as a live medical-adjacent device: a broken deploy means Evan can't talk.

The project is also becoming a business (**EZvoxa**) — sold to other families, with a hardship
program for low-income/disability families.

## How Frank wants me to work

- **Always lead with a recommendation.** When asking him to choose, say what I'd do and why
  first, then let him overrule. Never present options without a recommendation.
- **Verify claims — don't accept them.** If he (or anyone) states something as fact — market
  sizes, prevalence, what competitors do — research it and confirm before building on it.
  Correcting him with evidence is welcome; agreeing without checking is not.
- **No guessing on numbers.** Every figure in a projection or plan traces to a cited source, or
  is explicitly labeled a conservative assumption. Never invent a number to fill a gap.
- **Revenue always ships with unit counts.** Any financial table must show the number of buyers
  and the number of active subscribers behind the dollars, not just the dollars.
- **Deliver documents as Word (.docx)**, not markdown — he can't open `.md` files.
- **Keep the interactive model and the business plan in sync.** They are one artifact in two
  forms; if one changes, change the other.

## Deploys

- **Two lanes — see `RELEASE.md`.** `main` is the family lane and reaches our three phones
  within minutes. `release` is the customer lane at `app.ezvoxa.com` and only moves when a
  release is cut deliberately, fast-forward only, so paying families can never run code our
  own phones haven't already been running. Merging to `main` does **not** reach a customer.
- **Vercel deploys `main`.** Merging to `main` puts code on **all three phones** — Evan's,
  Frank's, and Raniyah's — within minutes. All three are production; there is no "staging" phone.
- **Ship to `main` by default.** Frank's standing instruction: anything I build for him should
  reach all three phones. Work on a branch, then merge it — don't leave finished work sitting on
  a branch waiting for approval, and don't make him ask why the change didn't show up.
- Because there's no preview step, **I verify before merging**: syntax-check the logic block,
  check `sc-if`/`sc-for` balance, and confirm the change survives saved localStorage state (see
  below). A broken deploy means Evan can't talk.
- Only hold for a preview URL when a change is risky enough to be worth it (rewrites, the
  emergency path, anything touching the store) — and say so plainly rather than silently sitting
  on the work.
- After a deploy each phone should force-close and reopen the app — the service worker caches hard.
- **Bump `APP_BUILD()` to today's date in any commit that changes `index.html` or `demo.html`**
  (each file has its own). It is the Settings build line — the one answer to "did this phone
  actually update?" (RELEASE.md) — and a stale stamp lies to whoever is debugging.
- **Saved state beats new defaults.** The store keeps `homeOrder`, family order, and overrides, so
  shipping a new default order changes nothing on a phone that already has the app. Bump the
  one-time `applyLayoutRev()` migration when a layout default changes, or the work is invisible.

## Architecture notes

- **`APP_MAP.md` is the map of every board, tile, and route** in both apps — read it
  before touching layout or navigation so I always know where a thing lives (e.g.
  Numbers is a *School button*, not a home tile). Keep it current in the same commit
  as any board/tile/route change.
- `index.html` — the whole app: a `class Component extends DCLogic` inside a moustache-style
  template (`{{ }}`, `<sc-if>`, `<sc-for>`). Large file; edit surgically, don't rewrite.
- **`index.html` and `demo.html` are two INDEPENDENT apps — separate files, separate pushes.**
  `index.html` is Evan's personal app (the family lane, `main` → the three phones). `demo.html`
  is the standalone **EZvoxa** template — the product we sell and demo. They began as copies but
  are meant to diverge: a change to one does **not** flow to the other, so edit and push each on
  its own. This is deliberate — a sellable product needs a stable identity that doesn't shift
  every time Evan's board is tweaked. `demo.html` carries EZvoxa's static `<head>` tags and sets
  `__EZ_FORCE_TEMPLATE`, so iOS "Add to Home Screen" saves it as EZvoxa, never Evan (see #182);
  the demo link is `…/demo.html` and the old `?template` link redirects there.
  - The **safety-critical backend is shared** — emergency SOS, texting, and voice live in
    `api/*.js` and both apps call the same endpoints, so separating the front ends does not fork
    that code. But **client-side** fixes are now applied per file: if one matters to both
    (an emergency-UI or voice-playback fix, a security fix), apply it to both on purpose.
- `tether-icons.js` / `tether-photos.js` — `window.TETHER_ICONS` / `window.TETHER_PHOTOS`
  data-URI maps, loaded via `<script src>`. `iconUri(key)` resolves against these.
- `api/sos.js` — emergency: Twilio SMS + SendGrid email + live location.
- `api/text.js` — cloud texting (Evan's phone is locked, so he can't press Send in Messages).
- `api/family.js` — server-side family directory (`FAMILY_DIRECTORY`): phones, birthdates.
- `api/settings.js` — Family Sync via Upstash KV.
- **Secrets never ship in the app.** Phone numbers, keys, and the medical note live only in
  Vercel environment variables. The client sends person *ids*, never numbers.
- Prefer CSS over base64 images for UI chrome — sharper on every screen and the file is
  already large.

## Design principles for the app itself

- Evan is the user. Big tap targets, few words, no clutter. Don't shrink primary buttons.
- Parent/editor UI (hints, edit controls) should be hidden unless edit mode is unlocked.
- Emergency features must work independently of sync, cache, or customization state.
- Red is reserved for the emergency/SOS bar.

## THE PICTURE IS THE BUTTON — the rule I keep breaking

Frank has told me this **at least three times** (the Night board, then twice on 15 Aug 2026,
the last time in capitals). Read this before touching any board layout.

**Evan does not read.** The picture is not decoration next to a label — the picture *is* the
button, and the label is the caption. Every pixel taken from the picture takes away the thing
he actually uses to choose.

**The rule:**

1. **No box.** No border, no card, no panel around a button. The box is what eats the space.
2. **Picture as large as the column allows** — at 430px wide that is about **124px at three
   across**. Never below **96px**, which is what the Food board (the one he has never
   complained about) uses.
3. **Label goes UNDER the picture, never beside it.** A label beside the picture is a text-first
   layout, and it forces the picture small.
4. **Three across** for lists of items. Two across only when the picture is a full scene at
   180px+ (Home, Fun, Places).
5. **Removing a box must make the picture bigger.** If a "space saving" change made a picture
   smaller, it is wrong — the space came out of the wrong thing.

**The model to copy is the Food board and the McDonald's board:** no box, three across, picture
96px+, caption underneath. Copy that, don't invent a new arrangement.

**When he says a layout wastes space, he means the chrome, not the picture.** Delete the border
and the padding; grow the artwork into the space that frees up.

**Audit before changing any board layout.** Render it at 430×900, measure the actual picture
width with `document.elementFromPoint` hit-testing (the home grid stays in the DOM behind
overlays and will contaminate the numbers), and report the measurements. Do not change layout
on a hunch.

*Measured 15 Aug 2026 — eleven of eighteen boards had pictures under 100px while Food had 96px
at three across. Small pictures are the default failure of this codebase; assume a board is
wrong until measured.*
