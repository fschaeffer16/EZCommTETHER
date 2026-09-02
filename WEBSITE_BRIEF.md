# EZvoxa. Brief for the public website.

**Who this is for:** a designer or developer building ezvoxa.com
**Who wrote the product facts:** Frank Schaeffer, EZ Voice LLC, Fort Pierce, Florida
**What this is not:** source code, the App Store submission, or Evan's private talker
**Facts checked against the app and the repo on 2 Sep 2026.** This file is the
master copy; the Word version Frank hands out is generated from it.

Use only what is in this document. Do not invent features, dates, medical
claims, or 911 language. Frank is a writer. Draft is fine; he will put the
copy in his own voice.

---

## 1. What you are selling on the site

EZvoxa is a **phrase-first talker** for nonverbal and semi-verbal **teens and
young adults** who can tap a phone.

It is a pocket device: huge photo buttons, boards from real life, one-tap
phrases. It is **not** a $4,000 speech-generating device. It is **not** a
language curriculum. It is **not** a medical device. It **does not call 911**.

The site's job is to make a parent (or the young person) feel the story and
understand the product. It is **not** a teacher-district landing page. Schools
can have a quiet link. People come first.

**Market:** about ages 12 to 21, people who can tap a phone and who have
outgrown or underused childlike AAC (too many screens to say a simple
sentence).

---

## 2. The story the site must carry

Evan was born August 2010. He is nonverbal. Frank is his father, not a speech
pathologist.

A four-thousand-dollar board taught Evan that words exist. Then a sentence
like "I'm tired, can I go to bed" cost a minute of menus. Evan stopped
paying. He was not failing the device. The device was pricing him out of his
own voice.

Frank became the student. Evan became the teacher. When a board was wrong,
Evan ignored it. When it was right, he used it without being asked. Then he
opened the app himself and said what he wanted to watch. Unprompted.

**Locked headlines (use these words unless Frank rewrites them):**

1. *He didn't need a better device. He needed one that would grow with him.*
2. *I had to find a way to meet him where he was. So I became the student and
   he became my teacher.*

**Do not put on the site:** the parents' split, courts, child support, or
co-parenting narrative. Mom may appear in photos as Evan's mom. That is
family, not a legal story.

**Photos:** real photos of Evan and family only. No stock children. No Disney
or Netflix art. No screenshots that expose Evan's private board (family
names, his alert list). A **generic** home-board screenshot is fine. Custom
photos of people they know are part of the product thesis. Show that idea
without publishing Evan's address book.

---

## 3. The app (so the website does not lie)

There are **two live apps** on the same Vercel project. Do not mix them up.

| | **Evan's Talker (private life)** | **EZvoxa template (what you may market)** |
|---|---|---|
| URL | https://ez-comm-tether.vercel.app/index.html | https://ez-comm-tether.vercel.app/demo.html |
| What it is | Evan's full customized board | Sellable, store-oriented template |
| Public site | **Do not** send strangers here | Demo of the *product*, not Evan's life |

**GitHub:** `fschaeffer16/EZCommTETHER`
**Domains:** ezvoxa.com and myezvoice.com are both live and pointed at the
site (myezvoice.com connected 2 Sep 2026). One brand: myezvoice.com exists so
a misheard name still finds us. It is never presented as a second product.

### What the talker actually is

Phone-first. Phrase-first, not word-by-word first. The pictures **are** the
buttons.

**Built today, safe for the site to promise:**

- Home board with huge picture tiles
- Quick phrases (Yes, No, Help, and more)
- **Hurt**, its own button on the Home Screen: a body map so he can point to
  where it hurts (communication, not medical advice)
- School: the people in the building, faces and names, shown as a *feature*,
  not a district pitch
- Friends, feelings, food, morning, night, places
- Sentence Build plus a spelling board (phrase-first is not phrase-only)
- Custom photos, the people they actually know
- Device voice (the phone's own voice; the natural voice is a later paid
  layer)
- Caregiver editing
- **Backup & Restore** (built 2 Sep 2026): one file saves the whole setup,
  and restoring it brings everything to a new phone

**Vision. Say it as vision. Do not fake it live:**

- **SOS Family Alert** (see the box below)
- Family texting
- Inbound family voice notes
- Sync of buttons and people across phones (after a real account system)
- Printable board

### Get these three features straight. The site must not blend them.

- **SOS Family Alert** is the emergency button. Two taps sends a message and
  location to the people the family chose. Recipients may call 911. The app
  does not. Not a monitored alarm. Not a medical device. **It is free
  forever, on every tier. It is never part of the subscription. Decided and
  final, 2 Sep 2026. Never present it as paid.**
- **Family texting** is the user sending pre-written texts to family members
  whose phone numbers a parent loaded. This is a paid feature.
- **Voice notes** are recordings family members send *to* the user's phone
  from the same app. This is a paid feature.

They share plumbing and nothing else.

**Do not show as working live on a public page:** alert sending, Twilio SMS,
location attach, voice relay, cloud family sync. A **narrated film** that
walks those screens as a demonstration is the right website move. A clickable
toy that hits production APIs is the wrong one.

**Voice:** the site narrator must **not** be Evan's cloned voice. Device TTS
or a separate guide voice.

---

## 4. What the website must do

Frank owns design. You are implementing **his** front door, not a SaaS
template.

### Must

- Feel like a **personal business** (a father, a son, a real product), not a
  feature grid with three CTAs and a giant phone mockup on top.
- Lead with **Evan's story** and the two locked headlines. Use the **whole
  page**, not a skinny column of leftover layout.
- Keep a **small** presence for: one honest screenshot of the home board,
  **The App** (demo or film), and **Sign up** (email waitlist). Story first;
  those three do not own the hero.
- **Logo:** the EZvoxa mark only (the neon rounded icon). Do not repeat the
  word "EZvoxa" next to it. Top left.
- Navigation, in this order: **EZ's story**, **The App**, **Sign up**. Do
  **not** put schools or districts in the header.
- **The App** is a narrated walkthrough (captions on screen plus a guide
  voice). It must hit: Hurt, School, sentence builder, word and spelling,
  family, and SOS Family Alert as **demo-only**.
- **Sign up** is the email waitlist (`POST /api/waitlist` already exists on
  the Vercel project). Not for sale yet. Do not invent a price or a store
  date.
- Mobile and desktop. Photos never stretched: `height: auto` and
  `object-fit: contain` unless Frank specifies a crop, and never drawn
  larger than the image file's own pixels.
- Footer legal line: not a medical device; does not replace 911.

### Existing pages to keep and link (do not rebuild unless asked)

These already exist and Frank likes them as they are:

- **EZ's Voice (the story):** https://ez-comm-tether.vercel.app/hearhim.html
  Interactive story plus the teacher guide. **Link it.** Do not replace the
  home page with a school packet.
- **Opening statement for schools:**
  https://ez-comm-tether.vercel.app/opening-statement.html
  Quiet link in the footer or the story page. Not the home hero.

### Must not

- Sell to teachers before people.
- Claim 911, alert-as-emergency-service, or "help is coming."
- Claim switch or eye-gaze access for v1.
- Claim "no servers, no third parties, no student data on servers." The live
  stack uses network APIs; the privacy copy must be honest.
- Publish Evan's private contacts, setup codes, default PINs, or his
  personal alert list.
- Reuse the earlier stretched-collage layout as a base. A clean slate is
  allowed.
- Promise App Store or Google Play dates, or live family SMS, until Frank
  says so in writing.

---

## 5. Pricing (say only this)

- **Core talker** (phrases, boards, Hurt, device voice, Backup & Restore):
  intended **free**, no card on file.
- **SOS Family Alert: free forever, on every tier.** Never in the paid list.
- **Paid later:** family texting, inbound voice notes, sync of boards across
  phones, the natural voice.
- District and classroom licenses, and scholarship or IEP-pay so a child is
  not silenced if a parent stops paying: **vision**, not a checkout on the
  home page.

Do not put dollar amounts anywhere until Frank sets them.

---

## 6. Legal lines (required)

Use language equivalent to:

> EZvoxa helps someone communicate. It is not a medical device and does not
> replace 911.
> SOS Family Alert notifies people the family chooses. It is not a monitored
> emergency service.

Company: **EZ Voice LLC**, Fort Pierce, Florida.

The privacy policy is drafted at `/privacy.html` and is marked DRAFT. Frank
has to approve the wording before it is linked as final, and it must be live
on ezvoxa.com before any store listing goes in.

---

## 7. Technical notes for whoever builds the site

- Home today is served as `ezvoxa.html` via a rewrite (`/` to `/home` to
  that file) on the same Vercel project as the talker.
- Waitlist: existing `POST /api/waitlist`, JSON
  `{ email, how: "email", source: "..." }`.
- Do **not** deploy a partial file tree to Vercel (that can wipe the HTML
  apps). Ship through GitHub `fschaeffer16/EZCommTETHER` on `main`, or only
  the files Frank names.
- Do **not** merge branches named like `fix/lock-apis-and-ui` or
  `fix/template-clean` if they contain placeholder HTML.
- The talker files (`index.html`, `demo.html`) are huge. Do not overwrite
  them while building the marketing site.

---

## 8. Checklist for "the website is done"

- Full-viewport story page, not a leftover SaaS layout
- Both locked headlines, Frank's voice after he rewrites
- Logo top left, no extra wordmark
- Nav: EZ's story, The App, Sign up. No schools in the header
- Small screenshot plus demo film plus email: present, not dominant
- Real family photos, never stretched, room for more of mom when they arrive
- Narrated demo covers Hurt, School, sentence and words, family, and SOS
  Family Alert with no live send
- SOS Family Alert never shown as paid, anywhere
- Links to EZ's Voice and the opening statement without making home a
  district pitch
- Footer: not a medical device, not 911
- Waitlist works on ezvoxa.com
- Mobile and desktop

---

## 9. One sentence you can give a designer

Build a full-page, personal site for a father who made a phone talker with
his nonverbal teenage son: story first, real photos, two given headlines, a
short narrated demo of the app, and an email list. Not a teacher product
page, not a medical device, not 911.
