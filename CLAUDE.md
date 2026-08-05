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

- **Vercel deploys `main`.** Merging to `main` puts code on Evan's phone within minutes.
- Work on a branch, open/refresh a PR, let him review the Vercel **preview URL** on the phone,
  then merge. Don't push straight to `main` without asking.
- After a deploy he should force-close and reopen the app — the service worker caches hard.

## Architecture notes

- `index.html` — the whole app: a `class Component extends DCLogic` inside a moustache-style
  template (`{{ }}`, `<sc-if>`, `<sc-for>`). Large file; edit surgically, don't rewrite.
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
