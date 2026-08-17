# Two lanes: Evan's phones and customers' phones

## The short version

| | Address | Git branch | Updates when |
|---|---|---|---|
| **Family lane** | `ez-comm-tether.vercel.app` | `main` | I merge — within minutes |
| **Release lane** | `app.ezvoxa.com` | `release` | You and I deliberately cut a release |
| **Website + demo** | `ezvoxa.com` | `main` | I merge |
| **Second name** | `myezvoice.com` | — | redirects to `ezvoxa.com` |

Evan's, Frank's and Raniyah's phones **do not move**. They stay on the
`vercel.app` address they are installed from today. Moving them is a fresh
install with empty storage — the same wipe that cost Raniyah her setup — and we
do not do that until backup and restore exist.

## What I recommend, and why

**Use `ezvoxa.com` as the brand and `app.ezvoxa.com` as the app. Point
`myezvoice.com` at `ezvoxa.com` and do not run it as a second brand.**

Two names for one product splits the story in half, and the story is the whole
marketing plan. `myezvoice.com` is worth keeping so that somebody who hears the
name spoken out loud and guesses at it still lands on you — but it should arrive
at EZvoxa, not at a second front door.

Beyond that, the lane split buys two things:

1. **A bad Friday-night change stops at our own family.** Today one merge
   reaches every phone in the world at once, silently. For us that is a feature.
   For a stranger's nonverbal child it is a talker that goes quiet with no
   warning and nobody to call.
2. **Installed apps on your own domain survive a hosting move.** Anyone who
   installs from `ez-comm-tether.vercel.app` is tied to Vercel forever — leave
   Vercel and their app is simply gone, along with everything they built in it.
   An app installed from `app.ezvoxa.com` follows the domain wherever it goes.

## The other half of the address rule

The address already decided that our copy is ours (#171). This adds the mirror
of it: **their address is theirs.**

Before this change, a stranger who installed from `ezvoxa.com` would have opened
Evan's board — his photograph, his family, his food, his mother one tap away.
The `?template` link was the only thing that produced the buyer's app, and a
customer will never type `?template`.

Now the customer domains count exactly the same as that link: EZvoxa icon,
EZvoxa name, the neutral starter board, its own storage, no voice-note polling,
and no path to our family directory. Decided in the boot script at the top of
`index.html`, before the manifest is fetched, so the icon on the home screen and
the board behind it can never disagree.

Anything that is not a customer domain is unchanged. `notezvoxa.com` and
`ezvoxa.com.something-else.net` are not customer domains — the check is anchored
at both ends.

## Setting it up (yours, about 15 minutes, one time)

**In Vercel:**

1. **New Project** → import this same repository again.
2. Name it something like `ezvoxa-app`.
3. **Settings → Git → Production Branch:** change from `main` to `release`.
4. **Settings → Git → Ignored Build Step:** leave off. Turn *off* deploys for
   other branches so nothing but `release` can reach a customer.
5. Copy every environment variable from the existing project into this one.
6. **Settings → Domains:** add `app.ezvoxa.com`.

**In your domain registrar (wherever you bought the names):**

7. `app.ezvoxa.com` → CNAME → `cname.vercel-dns.com`
8. `ezvoxa.com` and `www.ezvoxa.com` → add as domains on the **existing**
   project; Vercel prints the exact A/CNAME records to paste.
9. `myezvoice.com` → add to the existing project and set it to redirect to
   `ezvoxa.com`.

Vercel shows a green check on each domain when DNS has propagated. It can take
anywhere from a few minutes to a few hours; nothing is broken while you wait.

## Cutting a release (mine, about a minute)

Nothing reaches a paying family until this is run deliberately.

```
git checkout release
git merge --ff-only main      # only what is already live for us
# bump APP_BUILD in index.html to today's date
git commit -am "Release 2026.MM.DD"
git push -u origin release
```

`--ff-only` is the point: the release lane can only ever contain code that has
already been running on our own three phones. We are the first users of every
change, always.

## How to tell what a phone is running

Bottom of **Settings**, in small grey type:

```
Family · build 2026.08.17 · ez-comm-tether.vercel.app
Release · build 2026.08.17 · app.ezvoxa.com
```

That line is the whole answer to "did that phone actually pick up the fix?" —
which lane, which build, which address. It is the one thing to ask a customer
for over email, and the first thing to read before believing anything else.

## What this does not do yet

- **No backup or restore.** A customer who deletes the icon still loses
  everything. That is the next item and it is the important one.
- **No licenses and no trial.** Nothing yet separates a paying customer from
  someone who found the address.
- **Emergency and voice messages are off on the release lane**, because they
  currently resolve against our family directory. They come back on with
  licensing, pointed at the buyer's own family.

Nothing goes on sale until at least backup, restore and licensing are done and
the dress rehearsal has passed on a clean phone.
