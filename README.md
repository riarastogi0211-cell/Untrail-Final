# untrail — hi-fi prototype

**One-line pitch:** Your weekend, planned in 60 seconds.
**Brand:** untrail · _Find your weekend._
**Device target:** iPhone 17 Pro — 402 × 874 px.

Static, mobile-only HTML/CSS/JS prototype built flow-by-flow from the Figma
file **Short trip ICS Prototype** (page _Final Hi-fi · end-to-end flow_),
styled strictly to the **untrail · Design System** page (colours, type, logo).

No framework, no build step, no runtime dependencies (Google Fonts only).

---

## Built so far

### Flow 1 · Splash (`00 Splash · 1 → 2 → 3`)

A professional ~2-second launch animation (Uber/Ola style), then the branded
lockup settles:

| Phase | Figma frame | What happens |
| ----- | ----------- | ------------ |
| 1 | `00 Splash · 1 (start)` | Blank canvas, iOS status bar only |
| 2 | `00 Splash · 2 (road)` | The **road (u)** draws upward into place |
| 3 | `00 Splash · 3 (logo)` | The **place-pin** drops in with a spring, the **untrail** wordmark rises, the amber i-dot pops, and the tagline _Find your weekend._ fades in |

- Logo is the exact design-system vector (Road `#0F6E5C`, Pin/i-dot `#FAAE25`,
  Wordmark `#0B5A4B`), embedded as inline SVG in `js/icons.js`.
- A compact header lockup (`logoLockupInline`) is ready in `icons.js` to carry
  the brand across later flows as the persistent "stakeholder" logo.
- `@media (prefers-reduced-motion: reduce)` collapses the whole intro — the
  final lockup shows instantly with no stagger.

> Layout and content of the three screens are untouched — only turned into a
> live, animated app.

### Flow 2 · Onboarding (5 screens) — connected to the splash

The splash now auto-advances (~2.5s) into the onboarding flow:

| # | Figma frame | Screen |
| - | ----------- | ------ |
| 1 | `Screen · 01 Welcome` | Brand header, hero photo, value props, **Get started** + sign-in link |
| 2 | `Screen · 02 Starting city` | Step 1 — current-location CTA, live city search, popular-city list |
| 3 | `Screen · 02b About you` | Step 2 — "get away" option grid (single), company chips (single), **Skip** |
| 4 | `Screen · 03 Weekend vibe` | Step 3 — 8 photo tiles, multi-select **up to 3** |
| 5 | `Screen · 04 Budget & trip style` | Step 4 — budget (single), transport (multi), offbeat (single) |

Built to design-system spec: Heading/H1–H2, Title/Body/Caption/Overline type
ramp, `--ut-*` colour + radius + spacing tokens, 52px primary buttons, pill
chips, selection cards/tiles (`#eef7f4` subtle bg, `#0f6e5c` brand border),
4-step progress, 56px app bar, and line icons (1.75) in `js/icons.js`.

**Interactions & states**
- Live search filters the city list, with a "no matches" empty state; Enter
  picks the top match.
- "Use my current location" shows a finding-location toast, then advances.
- Vibe multi-select enforces the limit of 3 — extra tiles dim (DS "limit
  reached" state) and tapping one toasts "Choose up to 3".
- Selected defaults mirror the Figma (Weekends · Friends · Hills + Cafés ·
  ₹3–6k · Bus + Train · A mix) so each step starts valid.
- Back / Skip / Continue wired through the router with slide transitions;
  choices persist via `store.js` (localStorage + in-memory fallback).
- Final **See my weekend profile** marks onboarding complete and toasts
  "coming soon" (the weekend-profile flow is the next one to build).

**Real imagery** lives in `assets/photos/` (welcome hero + 8 vibe photos,
pulled from the Figma frames). Icons remain inline SVG — no icon assets.

> Layout and content of all five screens are untouched — only turned into a
> live app.

### Flow 3 · Profile → Home → Planning (5 screens) — connected to onboarding

Onboarding's **See my weekend profile** now leads straight into:

| # | Figma frame | Screen |
| - | ----------- | ------ |
| 1 | `Screen · 05 Weekend profile` | Green **persona card** ("Hills & Café Explorer"), 3 matched picks, **Your answers** card (Edit → back to the wizard), Save / Continue-without-account |
| 2 | `Screen · 06 Save your profile` | **Bottom sheet** — phone field (+91), Get OTP, Continue with Google, Maybe later, terms |
| 3 | `Screen · 07 Home` | AI-glow gradient header, location + bell, **AI composer** (prompt, mic, preference chips, Plan it for me), Try-asking chips, **Hidden gems** reel cards, long-weekend nudge, **Picks** with weather tags, **bottom tab bar** |
| 4 | `Screen · 08 Trip details` | **Bottom sheet** — When chips, Who's-coming **stepper**, Budget chips, Find my weekends |
| 5 | `Screen · 09 Planning (live)` | Animated **progress bar + live checklist** (routes → weather → reviews), ~4s, then → results (next flow) |

**New design-system components** (all in `components.js` / `components.css`):
reusable **bottom sheet** (backdrop dim, grabber, Escape + backdrop-tap
dismiss, focus-in), **stepper**, **progress bar**, **bottom nav**, persona
card, gem/pick/place cards, weather + on-photo tags, nudge card, phone field,
dropdown chips — on the `--ut-*` tokens (info + inverse colours, radius-xs,
Elevation/2 shadow) and the full type ramp (H1/H2, Title, Body, Caption,
Overline, Label).

**Interactions & states**
- The Home gradient tints the status bar (per-screen status-bar theming via
  the router); it resets to white on every other screen.
- Trip details sheet is reachable from the composer, preference chips, the
  nudge and pick cards; its When/Budget chips single-select and the
  Who's-coming stepper clamps 1–12.
- Planning animates an 8→100% progress bar with a 3-step checklist (two ticks
  + a live spinner), then toasts the next flow as "coming soon"; it collapses
  instantly under `prefers-reduced-motion`.
- Every non-flow control (bottom-nav tabs, location, bell, See-all, gem reels,
  country code) gives a "coming soon" toast — no dead buttons.
- Choices persist via `store.js`; sheets never leave orphan nodes (the router
  clears them on navigation).

> Layout and content of all five screens are untouched — only turned into a
> live app. Home shows every Figma section (including the nudge and "Picks for
> you" rows below the reference crop).

### Flow 4 · Pick a weekend & decide with your group (5 screens) — connected to Planning

When Planning (live) finishes, it hands off into:

| # | Figma frame | Screen |
| - | ----------- | ------ |
| 1 | `Screen · 10 Your top 3` | "3 weekends for you" — 3 **result cards** (Best match / Cheapest / Hidden gem tags, transport + weather + why lines), filter chips, tap-to-select for **Compare (2)** |
| 2 | `Screen · 11 Compare` | Two preference cards + a 5-row **comparison table** (winning cells ticked green) + an **"Our take"** card |
| 3 | `Screen · 12 Place details` | 4-slide **photo carousel** (scrim + Best-match + counter), floating back/share/save, "Why it fits you" reasons, a **verified traveller review**, a **route map** + transport rows, a **stay card**, and a price action bar |
| 4 | `Screen · 13 Ask your group` | **Bottom sheet** — auto-written WhatsApp message preview, cost + reply-by **toggles**, Open WhatsApp / Copy message |
| 5 | `Screen · 14 Did your group decide?` | **Radio list** (Kasauli / Lansdowne / Not decided yet) + reminder hint; CTA adapts to the choice |

**New design-system components** added: `tag` with all tones (Best match,
Cheapest, Hidden gem, Verified, On-photo), **toggle switch** (`role="switch"`),
titled **app bar**, result card, compare card + table, our-take card, review
card, route map (inline-SVG, no asset), transport rows, stay card, radio
option rows — on the Flow-4 tokens (success + gem colours, H3, Data/Price).

**Interactions & states**
- Top-3 cards toggle into the compare set (max 2, with a swap hint); the footer
  reflects "Comparing X and Y" and enables Compare only at 2.
- Compare lets you tap the preferred place; the primary button relabels to
  "Pick <place>".
- Place details is a real horizontal **carousel** with a sticky price bar; back
  / share / save float over the hero.
- The Ask-your-group sheet is reachable from Top-3, Compare and Place details;
  Open WhatsApp / Copy both lead to "Did your group decide?".
- Decide's radio choice drives the CTA ("We picked Kasauli" vs "Remind the
  group"); the final pick hands off to the weekend-plan flow (next, "coming
  soon").
- Every out-of-flow control (filters, Open in Maps, share, cost breakdown)
  gives a toast — no dead buttons.

> Layout and content of all five screens are untouched — only turned into a
> live app.

### Flow 5 · The plan, swaps & your trips — connected to "We picked Kasauli"

| # | Figma frame(s) | Screen / state |
| - | -------------- | -------------- |
| 1 | `15 Weekend plan` | Trip summary, refine chips, day-by-day **timeline** (Fri night → Sat → Sun), Swap on activities / Change on transport & stay, Add a stop, price bar |
| 2 | `16 Swap a stop` | **Sheet** of ideas for the same slot with price-delta tags, Move to Sunday, Remove from plan |
| 3 | `17 Plan updated` | Swapped stop highlighted (✓ Updated, green rail dot) + **toast with Undo** |
| 4 | `19 Saved — share with your group` | Success check, trip card with leave-by reminder, "planned in 2 min" tip, Share / View full plan |
| 5 | `15 Weekend plan · saved` + `15 Share your plan` | Read-only plan with a **Replan** nudge; share sheet (WhatsApp · Copy link · More apps) |
| 6 | `20 My Trips` (+ shared / link copied / other app, Ideas, Ideas · just saved, Ideas · empty, Past) | **Upcoming · Ideas · Past** tabs, rain nudge, "We picked" waiting row, drafts, hearted ideas with un-heart + Undo, **empty state**, past trip |

- Swaps, moves and removals persist in `store.js` and every one is undoable.
- The **Trips** tab in the bottom nav is now live (Home ↔ Trips); Explore and
  Profile stay "coming soon".
- The toast is now the design-system snackbar (full-width dark card, optional
  icon + action) everywhere in the app.
- Swap ideas for stops other than Gilbert Trail are plausible sample data (the
  Figma only defines that one).

### Also added (from the design system, not the flow frames)

- **Phone validation + OTP step** in the Save-profile sheet, built from the DS
  "Invalid phone" and "Wrong OTP" patterns: 10 digits starting 6–9, inline
  error, six-box OTP (paste / auto-advance / backspace), resend countdown.
  Prototype accepts any 6 digits.

### Flow 6 · Explore, reels & profile — all four tabs live

| # | Figma frame | Screen | Reached from |
| - | ----------- | ------ | ------------ |
| 1 | `24 Hidden gems feed` | Full-screen **reel feed** (swipe up, snap), For you · Under 6h · Under ₹4k tabs, Save / Ask group / Plan rail, Details + Plan this weekend | **Explore tab**, Home "Hidden gems → See all", Trips empty state |
| 2 | `25 Hidden gem details` | Place hero (save ♥, 1/12 photos), Our take, **Honest check** vs the famous alternative, route map, traveller review, price bar | Feed "Details", Home gem cards |
| 3 | `22 Reel check` | **Link checker** (empty → checking → found / not found), feasibility card, Save to Trips, leave-by hint | Home "Check a reel" chip |
| 4 | `22a Share a reel to untrail` | The phone's own share sheet over a reel; tapping **untrail** opens Reel check with the link already found | Trips → Ideas empty → "How to save a reel from Instagram" |
| 5 | `23 Profile` | Profile card, free-weekend alerts **toggle**, rows into preferences / starting city / … | **Profile tab**, Trips ⚙ |

- Saved places are one shared list: hearting a gem in the feed or on its page,
  or "Save to Trips" in Reel check, shows up in Trips → Ideas (and un-hearting
  removes it, with Undo).
- Immersive reel screens switch the status bar and home indicator to black
  (per-screen theming in the router).
- Only Chakrata's details are in the Figma; Kanatal, Mukteshwar and Tijara are
  plausible sample data so the feed and filters have something to show.

### Fidelity pass against the "Full scroll (review only)" frames + variants

- **Edge-to-edge screens** as in the Figma: Home's AI glow (the exact Figma
  asset, `assets/home-glow.svg`) and Place details' photo run behind a
  transparent status bar; the Explore reel fills the whole phone. The status
  bar frosts once content scrolls under it.
- Picks use the DS **Weather** tag (blue, bottom-left); route maps redrawn
  with the solid curved route + river from the Figma map art.
- **Variants built:** `11 Compare · Kasauli vs Chakrata`,
  `11 Compare · Lansdowne vs Chakrata` and `12 Place details · Lansdowne`.
  Compare now follows whichever two you select in Top 3; View plan / Pick
  opens that place (Chakrata → its hidden-gem page). Lansdowne has its own
  reasons, review, train/stay and a **Save to Trips** action.
- Cheapest / Hidden gem tags use the DS rupee and sparkle icons.

### Still "coming soon" (outside the designed screens)

Small leaf actions the Figma doesn't define a screen for — e.g. notification
settings, language, photo gallery, cost breakdown, Change bus/stay, Add a stop.
Each gives a toast rather than a dead tap.

---

## Run locally

No bundler needed — any static file server works. From the `prototype/` folder:

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173/>.

(If you don't have Python, any static server works — e.g. `npx serve`, or the
VS Code "Live Server" extension.)

## Deploy to GitHub Pages

1. Push the contents of `prototype/` to `main` (keep `index.html` at the repo
   root, or move everything under `/docs`).
2. Repo **Settings → Pages** → Source: **main** / **/ (root)** (or **/docs**).
3. Open `https://<user>.github.io/<repo>/`.

Pages-safe by construction: all paths are relative and leading-slash-free,
filenames are lowercase/kebab-case, ES modules load via
`<script type="module" src="js/app.js">`, `.nojekyll` is present, and
`404.html` is a byte-for-byte copy of `index.html` so deep-link refreshes boot.

---

## File layout

```
prototype/
├── index.html
├── 404.html            byte-for-byte copy of index.html
├── .nojekyll
├── favicon.svg         the untrail mark
├── README.md
├── css/
│   ├── reset.css        reset + prefers-reduced-motion guard
│   ├── variables.css    design tokens (untrail · Design System)
│   ├── base.css         body, phone frame, status bar, theme shell
│   ├── components.css    type ramp, buttons, chips, cards, tiles, field,
│   │                     progress, app bar, city rows, banner, toast, lockup
│   ├── screens.css      splash + welcome + onboarding-step layouts
│   └── animations.css   keyframes + route transitions + splash timeline
├── js/
│   ├── icons.js         inline SVG logo, status-bar glyphs + UI line icons
│   ├── data.js          static data (onboarding entities) + splash timeline
│   ├── store.js         localStorage + in-memory fallback + pub/sub
│   ├── components.js    DOM builders (buttons, chips, cards, tiles, app bar…)
│   ├── router.js        screen stack + enter/exit transitions
│   ├── screens.js       route factories for every screen (Splash → … → Explore / Trips / Profile)
│   └── app.js           entry: status bar, routes, initial route
└── assets/
    └── photos/          welcome hero + 8 vibe photos (from Figma)
```

## Design tokens (source of truth: `css/variables.css`)

| Token | Value |
| ----- | ----- |
| `--ut-color-brand-logo-front` | `#0F6E5C` |
| `--ut-color-brand-logo-gem` | `#FAAE25` |
| `--ut-color-brand-logo-wordmark` | `#0B5A4B` |
| `--ut-color-text-primary` | `#18201D` |
| `--ut-color-text-secondary` | `#545F5A` |
| `--ut-color-bg-canvas` | `#FFFFFF` |
| `--ut-color-border-default` | `#C0C8C4` |
| Font | Plus Jakarta Sans (400–800) |

A `.phone[data-theme="dark"]` override is scaffolded with accessible dark
counterparts for future flows (splash is light per the design).

## Assets handoff

Logos and all UI icons are inline SVG (no icon files). Photography lives under
`assets/photos/` with relative paths; swap any file to rebrand with no code
change:

| Where in the UI | Path | Format | Target size |
| --------------- | ---- | ------ | ----------- |
| App logo (mark) | inline (`js/icons.js`) / `favicon.svg` | SVG | 128 × 128 |
| Welcome hero | `assets/photos/welcome-hero.jpg` | JPG / WebP | 740 × 580 |
| Vibe tiles (×8) | `assets/photos/<id>.png` | PNG / WebP | 360 × 192 |
| Favicon | `favicon.svg` | SVG | 512 × 512 |
| iOS touch icon | `apple-touch-icon.png` | PNG | 180 × 180 |

Vibe ids: `hills, beaches, cafes, heritage, adventure, chill, waterfalls,
spiritual`.
