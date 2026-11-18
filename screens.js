/* screens.js — each route is a factory returning a DOM node.
 * Flow 1 · Splash → Flow 2 · Onboarding (Welcome → City → About → Vibe → Budget)
 */

import {
  el,
  button,
  icon,
  toast,
  topAppBar,
  progressSteps,
  screenHeader,
  sectionLabel,
  chip,
  optionCard,
  vibeTile,
  cityRow,
  infoBanner,
  openSheet,
  stepper,
  dropdownChip,
  progressBar,
  bottomNav,
  appBar,
  tag,
  toggleSwitch,
} from "./components.js";
import { logoMark, logoWordmark, icons } from "./icons.js";
import {
  brand,
  splashTimeline,
  welcome,
  popularCities,
  getawayOptions,
  aboutHint,
  companyOptions,
  vibeOptions,
  VIBE_LIMIT,
  budgetOptions,
  budgetHint,
  transportOptions,
  offbeatOptions,
  persona,
  profilePicks,
  answerTags,
  home,
  tripDetails,
  planning,
  top3,
  comparePairs,
  placeDetailsLansdowne,
  placeDetails,
  groupShare,
  decide,
  weekendPlan,
  swapIdeas,
  savedTrip,
  sharePlan,
  myTrips,
  gems,
  feedTabs,
  reelCheck,
  profilePage,
} from "./data.js";
import { store } from "./store.js";

/* ================================================================ *
 * 00 · Splash  (auto-advances to Welcome)
 * ================================================================ */
export function Splash(_params, router) {
  const screen = el("section", { class: "screen-splash", "aria-label": "untrail" });
  screen.append(
    el("div", { class: "splash__lockup" }, [
      el("div", { class: "splash__mark", html: logoMark }),
      el("div", { class: "splash__wordmark", html: logoWordmark }),
      el("p", { class: "splash__tagline", text: brand.tagline }),
    ])
  );

  const srLive = document.getElementById("sr-live");
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toWelcome = () => router.replace("welcome", {}, { direction: "forward" });

  requestAnimationFrame(() =>
    requestAnimationFrame(() => screen.classList.add("is-playing"))
  );

  if (reduceMotion) {
    screen.classList.add("is-playing", "is-settled");
    if (srLive) srLive.textContent = `${brand.name}. ${brand.tagline}`;
    store.set({ hasSeenSplash: true });
    setTimeout(toWelcome, 650);
  } else {
    const t1 = setTimeout(() => {
      if (srLive) srLive.textContent = `${brand.name}. ${brand.tagline}`;
      store.set({ hasSeenSplash: true });
      screen.classList.add("is-settled");
    }, splashTimeline.settle);
    const t2 = setTimeout(toWelcome, splashTimeline.handoff);
    screen.addEventListener(
      "screen:destroy",
      () => {
        clearTimeout(t1);
        clearTimeout(t2);
      },
      { once: true }
    );
  }
  return screen;
}

/* Shared onboarding step shell: app bar + scroll content + sticky footer. */
function stepShell({ step, onBack, onSkip, content, footer }) {
  const screen = el("section", { class: "screen-onb" });
  screen.append(topAppBar({ onBack, onSkip }));
  const scroll = el("main", { class: "onb-scroll" });
  scroll.append(progressSteps(step));
  content.forEach((n) => scroll.append(n));
  screen.append(scroll);
  if (footer) {
    screen.append(el("div", { class: "onb-footer" }, [footer]));
  }
  return screen;
}

/* ================================================================ *
 * 01 · Welcome
 * ================================================================ */
export function Welcome(_params, router) {
  const screen = el("section", { class: "screen-welcome" });

  const header = el("header", { class: "welcome__brand" }, [
    el("span", { class: "logo-lockup", "aria-label": "untrail" }, [
      el("span", { class: "logo-lockup__mark", html: logoMark }),
      el("span", { class: "logo-lockup__word", html: logoWordmark }),
    ]),
  ]);

  const scroll = el("main", { class: "welcome__scroll" }, [
    el("div", { class: "welcome__hero" }, [
      el("img", { src: welcome.hero, alt: "A misty Himalayan hill town at sunrise" }),
    ]),
    el("h1", { class: "t-h1 welcome__title", text: welcome.heading }),
    el("p", { class: "t-body-lg welcome__body", text: welcome.body }),
    el(
      "ul",
      { class: "welcome__list" },
      welcome.bullets.map((b) =>
        el("li", { class: "welcome__bullet" }, [
          el("span", { class: "welcome__check", html: icons.check }),
          el("span", { text: b }),
        ])
      )
    ),
  ]);

  const footer = el("div", { class: "welcome__footer" }, [
    button("Get started", {
      variant: "primary",
      full: true,
      onClick: () => router.go("city"),
    }),
    el("button", {
      class: "link-btn",
      text: "I already have an account",
      onClick: () => toast("Sign in — coming soon"),
    }),
  ]);

  screen.append(header, scroll, footer);
  return screen;
}

/* ================================================================ *
 * 02 · Starting city  (Step 1)
 * ================================================================ */
export function StartingCity(_params, router) {
  const onb = store.get("onboarding");

  const locateBtn = button("Use my current location", {
    variant: "primary",
    full: true,
    icon: "locate",
    onClick: () => {
      toast("Finding your location…");
      locateBtn.disabled = true;
      setTimeout(() => {
        store.patchOnboarding({ startCity: "Delhi NCR" });
        router.go("about");
      }, 900);
    },
  });

  const divider = el("div", { class: "or-divider" }, [
    el("span", { class: "or-divider__line" }),
    el("span", { class: "or-divider__text", text: "or type your city" }),
    el("span", { class: "or-divider__line" }),
  ]);

  const input = el("input", {
    class: "field__input",
    type: "text",
    placeholder: "Search city, e.g. Indore",
    "aria-label": "Search city",
    autocomplete: "off",
  });
  const field = el("div", { class: "field" }, [icon("search", "field__ico"), input]);

  const listLabel = el("p", { class: "t-overline list-label", text: "POPULAR STARTING POINTS" });
  const list = el("div", { class: "city-list" });
  const empty = el("p", { class: "t-body city-empty", text: "No cities match — try another name." });
  empty.hidden = true;

  const pick = (city) => {
    store.patchOnboarding({ startCity: city.name });
    router.go("about");
  };

  function renderList(q = "") {
    list.innerHTML = "";
    const needle = q.trim().toLowerCase();
    const rows = popularCities.filter(
      (c) => !needle || c.name.toLowerCase().includes(needle) || c.sub.toLowerCase().includes(needle)
    );
    if (rows.length === 0) {
      empty.hidden = false;
    } else {
      empty.hidden = true;
      rows.forEach((c) => list.append(cityRow({ name: c.name, sub: c.sub, onClick: () => pick(c) })));
    }
  }
  renderList();
  input.addEventListener("input", (e) => renderList(e.target.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const needle = input.value.trim().toLowerCase();
      const match = popularCities.find((c) => c.name.toLowerCase().includes(needle));
      if (match) pick(match);
    }
  });

  const footerNote = el("p", {
    class: "t-caption onb-note",
    text: "Location is only used to find trips near you. Change it anytime in Profile.",
  });

  return stepShell({
    step: 1,
    onBack: () => router.back(),
    content: [
      screenHeader(
        "Where do your trips usually start?",
        "We only suggest places you can reach and enjoy in a weekend from here."
      ),
      locateBtn,
      divider,
      field,
      listLabel,
      list,
      empty,
      footerNote,
    ],
    footer: null,
  });
}

/* ================================================================ *
 * 02b · About you  (Step 2)
 * ================================================================ */
export function AboutYou(_params, router) {
  const onb = store.get("onboarding");

  // "When can you usually get away?" — single select grid
  const grid = el("div", { class: "opt-grid" });
  let getaway = onb.getaway;
  const cards = getawayOptions.map((o) => {
    const card = optionCard({
      icon: o.icon,
      title: o.title,
      sub: o.sub,
      selected: getaway === o.id,
      onClick: () => {
        getaway = o.id;
        store.patchOnboarding({ getaway });
        refreshCards();
      },
    });
    card.dataset.id = o.id;
    return card;
  });
  function refreshCards() {
    cards.forEach((c) => {
      const sel = c.dataset.id === getaway;
      c.classList.toggle("is-selected", sel);
      c.setAttribute("aria-checked", sel ? "true" : "false");
      const existing = c.querySelector(".opt-card__badge");
      if (sel && !existing) {
        c.querySelector(".opt-card__top").append(el("span", { class: "opt-card__badge", html: icons.check }));
      } else if (!sel && existing) {
        existing.remove();
      }
    });
  }
  cards.forEach((c) => grid.append(c));

  // "Who do you usually go with?" — single select chips
  let company = onb.company;
  const chipRow = el("div", { class: "chip-row" });
  const companyChips = companyOptions.map((label) => {
    const c = chip(label, {
      selected: company === label,
      onClick: () => {
        company = label;
        store.patchOnboarding({ company });
        refreshChips();
      },
    });
    c.dataset.label = label;
    return c;
  });
  function refreshChips() {
    companyChips.forEach((c) => setChipSelected(c, c.dataset.label === company));
  }
  companyChips.forEach((c) => chipRow.append(c));

  return stepShell({
    step: 2,
    onBack: () => router.back(),
    onSkip: () => router.go("vibe"),
    content: [
      screenHeader("A bit about you", "Helps us suggest dates that actually work for you."),
      sectionLabel("When can you usually get away?"),
      grid,
      infoBanner(aboutHint),
      sectionLabel("Who do you usually go with?"),
      chipRow,
    ],
    footer: button("Continue", { variant: "primary", full: true, onClick: () => router.go("vibe") }),
  });
}

/* ================================================================ *
 * 03 · Weekend vibe  (Step 3)
 * ================================================================ */
export function WeekendVibe(_params, router) {
  const onb = store.get("onboarding");
  let selected = [...onb.vibes];

  const grid = el("div", { class: "vibe-grid" });
  const tiles = vibeOptions.map((o) => {
    const tile = vibeTile({
      label: o.label,
      img: o.img,
      selected: selected.includes(o.id),
      onClick: () => toggle(o.id),
    });
    tile.dataset.id = o.id;
    return tile;
  });
  tiles.forEach((t) => grid.append(t));

  function toggle(id) {
    const idx = selected.indexOf(id);
    if (idx >= 0) selected.splice(idx, 1);
    else {
      if (selected.length >= VIBE_LIMIT) {
        toast(`Choose up to ${VIBE_LIMIT}`);
        return;
      }
      selected.push(id);
    }
    store.patchOnboarding({ vibes: selected });
    refresh();
  }
  function refresh() {
    const limit = selected.length >= VIBE_LIMIT;
    tiles.forEach((t) => {
      const sel = selected.includes(t.dataset.id);
      t.classList.toggle("is-selected", sel);
      t.setAttribute("aria-checked", sel ? "true" : "false");
      const dis = limit && !sel;
      t.classList.toggle("is-disabled", dis);
      t.setAttribute("aria-disabled", dis ? "true" : "false");
      const photo = t.querySelector(".vibe__photo");
      const badge = t.querySelector(".vibe__badge");
      if (sel && !badge) photo.append(el("span", { class: "vibe__badge", html: icons.check }));
      else if (!sel && badge) badge.remove();
    });
  }
  refresh();

  return stepShell({
    step: 3,
    onBack: () => router.back(),
    content: [screenHeader("Pick your weekend vibe", "Choose up to 3."), grid],
    footer: button("Continue", {
      variant: "primary",
      full: true,
      onClick: () => {
        if (selected.length === 0) {
          toast("Pick at least one vibe");
          return;
        }
        router.go("budget");
      },
    }),
  });
}

/* ================================================================ *
 * 04 · Budget & trip style  (Step 4)
 * ================================================================ */
export function Budget(_params, router) {
  const onb = store.get("onboarding");

  // Budget — single select
  let budget = onb.budget;
  const budgetRow = el("div", { class: "chip-row chip-row--wrap" });
  const budgetChips = budgetOptions.map((label) => {
    const c = chip(label, {
      selected: budget === label,
      onClick: () => {
        budget = label;
        store.patchOnboarding({ budget });
        budgetChips.forEach((x) => setChipSelected(x, x.dataset.label === budget));
      },
    });
    c.dataset.label = label;
    return c;
  });
  budgetChips.forEach((c) => budgetRow.append(c));

  // Transport — multi select
  let transport = [...onb.transport];
  const transportRow = el("div", { class: "chip-row" });
  const transportChips = transportOptions.map((label) => {
    const c = chip(label, {
      selected: transport.includes(label),
      onClick: () => {
        const i = transport.indexOf(label);
        if (i >= 0) transport.splice(i, 1);
        else transport.push(label);
        store.patchOnboarding({ transport });
        setChipSelected(c, transport.includes(label));
      },
    });
    c.dataset.label = label;
    return c;
  });
  transportChips.forEach((c) => transportRow.append(c));

  // Offbeat — single select
  let offbeat = onb.offbeat;
  const offbeatRow = el("div", { class: "chip-row chip-row--wrap" });
  const offbeatChips = offbeatOptions.map((label) => {
    const c = chip(label, {
      selected: offbeat === label,
      onClick: () => {
        offbeat = label;
        store.patchOnboarding({ offbeat });
        offbeatChips.forEach((x) => setChipSelected(x, x.dataset.label === offbeat));
      },
    });
    c.dataset.label = label;
    return c;
  });
  offbeatChips.forEach((c) => offbeatRow.append(c));

  return stepShell({
    step: 4,
    onBack: () => router.back(),
    content: [
      screenHeader("Budget & trip style", "So we can show real costs, not guesses."),
      sectionLabel("Budget per person, for 2–3 days"),
      budgetRow,
      infoBanner(budgetHint),
      sectionLabel("How do you get there?"),
      transportRow,
      sectionLabel("How offbeat should we go?"),
      offbeatRow,
    ],
    footer: button("See my weekend profile", {
      variant: "primary",
      full: true,
      onClick: () => {
        store.set({ onboardingComplete: true });
        router.go("profile");
      },
    }),
  });
}

/* ================================================================ *
 * 05 · Weekend profile
 * ================================================================ */
export function WeekendProfile(_params, router) {
  const screen = el("section", { class: "screen-bar" });
  screen.append(topAppBar({ onBack: () => router.back() }));

  const personaCard = el("div", { class: "persona" }, [
    el("p", { class: "persona__overline", text: persona.overline }),
    el("h1", { class: "persona__title", text: persona.title }),
    el("p", { class: "persona__body", text: persona.body }),
    el("p", { class: "persona__built" }, [
      icon("sparkles", "persona__spark"),
      el("span", { text: persona.builtFrom }),
    ]),
  ]);

  const picksGrid = el(
    "div",
    { class: "pick3" },
    profilePicks.map((p) =>
      el("button", { class: "pick3__item", onClick: () => toast(`${p.name} — why it fits (coming soon)`) }, [
        el("span", { class: "pick3__photo" }, [el("img", { src: p.img, alt: p.name })]),
        el("span", { class: "pick3__name", text: p.name }),
        el("span", { class: "pick3__meta", text: p.meta }),
      ])
    )
  );

  const answersCard = el("div", { class: "answers-card" }, [
    el("div", { class: "answers-card__head" }, [
      el("p", { class: "t-title", text: "Your answers" }),
      el("button", { class: "link-btn link-btn--sm", text: "Edit", onClick: () => router.go("budget", {}, { direction: "back" }) }),
    ]),
    el(
      "div",
      { class: "answers-card__tags" },
      answerTags.map((t) => el("span", { class: "tag-neutral", text: t }))
    ),
  ]);

  const scroll = el("main", { class: "bar-scroll" }, [
    personaCard,
    el("div", { class: "profile-section" }, [
      el("div", { class: "section-heading" }, [
        el("p", { class: "t-title-lg", text: "Fits this weekend" }),
        el("p", { class: "t-caption", text: "Matched to your answers — tap one to see why" }),
      ]),
      picksGrid,
    ]),
    answersCard,
  ]);

  const footer = el("div", { class: "bar-footer bar-footer--stack" }, [
    button("Save & see my picks", { variant: "primary", full: true, onClick: () => openSaveSheet(router) }),
    button("Continue without an account", { variant: "tertiary", full: true, onClick: () => router.go("home") }),
  ]);

  screen.append(scroll, footer);
  return screen;
}

/* 06 · Save your profile — bottom sheet over the profile screen */
function openSaveSheet(router) {
  const goHome = (msg) => {
    sheet.close();
    store.set({ accountSaved: true });
    if (msg) toast(msg);
    router.go("home");
  };

  const sheet = openSheet({ title: "Save your weekend profile", closeButton: true, body: [] });
  const titleEl = sheet.el.querySelector(".sheet__head h2");
  const bodyEl = sheet.el.querySelector(".sheet__body");
  let phone = "";

  /* ---- Step 1 · phone number with validation ---- */
  function showPhoneStep() {
    titleEl.textContent = "Save your weekend profile";
    const input = el("input", {
      class: "phone-field__input",
      type: "tel",
      inputmode: "numeric",
      autocomplete: "tel-national",
      placeholder: "Mobile number",
      "aria-label": "Mobile number",
      "aria-describedby": "phone-hint phone-error",
      maxlength: "10",
      value: phone,
    });
    const field = el("div", { class: "phone-field" }, [
      el("button", { class: "phone-field__cc", "aria-label": "Country code +91", onClick: () => toast("Only +91 for now") }, [
        el("span", { text: "+91" }),
        icon("chevronDown", "chip__chev"),
      ]),
      el("span", { class: "phone-field__divider" }),
      input,
    ]);
    const errText = el("span");
    const err = el("p", { class: "field-error", id: "phone-error", role: "alert", "aria-live": "polite" }, [
      icon("alert", "field-error__ico"),
      errText,
    ]);
    err.hidden = true;
    const hint = el("p", { class: "t-caption sheet__hint", id: "phone-hint", text: "We’ll send a 6-digit code by SMS. No spam." });

    const validate = (v) => {
      if (!v) return "Enter your mobile number";
      if (v.length < 10) return "Enter all 10 digits of your mobile number";
      if (!/^[6-9]/.test(v)) return "Indian mobile numbers start with 6, 7, 8 or 9";
      return "";
    };
    const setError = (msg) => {
      const on = !!msg;
      field.classList.toggle("is-error", on);
      input.setAttribute("aria-invalid", on ? "true" : "false");
      err.hidden = !on;
      hint.hidden = on;
      errText.textContent = msg;
    };
    let tried = false;
    input.addEventListener("input", () => {
      const digits = input.value.replace(/\D/g, "").slice(0, 10);
      if (digits !== input.value) input.value = digits;
      phone = digits;
      if (tried) setError(validate(digits)); // live-clear once they've tried
    });
    const submit = () => {
      tried = true;
      const msg = validate(phone);
      setError(msg);
      if (msg) { input.focus(); return; }
      showOtpStep();
    };
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });

    bodyEl.replaceChildren(
      el("p", { class: "t-body sheet__lead", text: "Keep your picks, budget and saved places for next time. Takes 10 seconds." }),
      field,
      err,
      hint,
      button("Get OTP", { variant: "primary", full: true, onClick: submit }),
      button("Continue with Google", { variant: "outline", full: true, onClick: () => goHome("Signed in with Google (demo)") }),
      el("button", { class: "link-btn sheet__later", text: "Maybe later", onClick: () => goHome() }),
      el("p", { class: "t-caption sheet__terms", text: "By continuing you agree to the Terms & Privacy Policy." })
    );
  }

  /* ---- Step 2 · OTP (prototype: any 6 digits verify) ---- */
  function showOtpStep() {
    titleEl.textContent = "Enter the 6-digit code";
    const pretty = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
    const boxes = Array.from({ length: 6 }, (_, i) =>
      el("input", {
        class: "otp__box",
        type: "text",
        inputmode: "numeric",
        pattern: "[0-9]*", // iPhone number pad
        enterkeyhint: i === 5 ? "done" : "next",
        // no maxlength: SMS autofill / paste puts the whole code in one box — we spread it across all six
        autocomplete: i === 0 ? "one-time-code" : "off",
        "aria-label": `Digit ${i + 1} of 6`,
      })
    );
    const otp = el("div", { class: "otp", role: "group", "aria-label": "6-digit code" }, boxes);
    const verify = button("Verify", { variant: "primary", full: true, onClick: () => {
      if (code().length === 6) goHome("Profile saved — welcome to untrail");
    }});
    const code = () => boxes.map((b) => b.value).join("");
    const sync = () => {
      const done = code().length === 6;
      verify.disabled = !done;
      verify.classList.toggle("is-disabled", !done);
      boxes.forEach((b) => b.classList.toggle("is-filled", !!b.value));
    };
    const fill = (start, str) => {
      const ds = str.replace(/\D/g, "").split("");
      let i = start;
      ds.forEach((d) => { if (i < 6) boxes[i++].value = d; });
      boxes[Math.min(i, 5)].focus();
      sync();
      if (code().length === 6) setTimeout(() => verify.click(), 250); // auto-submit like SMS autofill
    };
    boxes.forEach((b, i) => {
      b.addEventListener("input", () => {
        const v = b.value.replace(/\D/g, "");
        if (v.length > 1) { b.value = ""; fill(i, v); return; }
        b.value = v;
        if (v && i < 5) boxes[i + 1].focus();
        sync();
        if (code().length === 6) setTimeout(() => verify.click(), 250);
      });
      b.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !b.value && i > 0) { boxes[i - 1].value = ""; boxes[i - 1].focus(); sync(); }
        if (e.key === "ArrowLeft" && i > 0) boxes[i - 1].focus();
        if (e.key === "ArrowRight" && i < 5) boxes[i + 1].focus();
      });
      b.addEventListener("paste", (e) => { e.preventDefault(); fill(i, (e.clipboardData || window.clipboardData).getData("text")); });
    });

    // Resend countdown
    const resend = el("button", { class: "otp-resend link-btn--sm", disabled: true });
    let left = 30;
    const tick = () => {
      if (left > 0) { resend.disabled = true; resend.textContent = `Resend code in 0:${String(left).padStart(2, "0")}`; }
      else { resend.disabled = false; resend.textContent = "Resend code"; }
    };
    tick();
    const timer = setInterval(() => { left--; tick(); if (left <= 0) clearInterval(timer); }, 1000);
    resend.addEventListener("click", () => { toast("New code sent (demo)"); left = 30; tick(); });

    bodyEl.replaceChildren(
      el("p", { class: "t-body sheet__lead" }, [
        el("span", { text: `Sent to ${pretty} · ` }),
        el("button", { class: "otp-sub__link", text: "Change number", onClick: () => { clearInterval(timer); showPhoneStep(); } }),
      ]),
      otp,
      el("p", { class: "t-caption", text: "Prototype: any 6 digits will work." }),
      verify,
      resend
    );
    sync();
    requestAnimationFrame(() => boxes[0].focus());
    toast(`Code sent to ${pretty} (demo)`);
  }

  showPhoneStep();
}

/* ================================================================ *
 * 07 · Home
 * ================================================================ */
export function Home(_params, router) {
  const screen = el("section", { class: "screen-home", dataset: { sb: "home" } });
  // Figma "AI glow (decorative)" — the exact asset, behind the status bar, fixed while content scrolls
  // (Figma values are 35/35/25% opacity; raised to 60/60/40% to read as vividly as in Figma on screen.)
  screen.append(el("img", { class: "home__glow", src: "home-glow.svg?v=2", alt: "", "aria-hidden": "true" }));

  // Top location row
  const locRow = el("div", { class: "home__top" }, [
    el("button", { class: "home__loc", onClick: () => toast("Change location — coming soon") }, [
      icon("mapPin", "home__loc-pin"),
      el("span", { class: "home__loc-name", text: home.location }),
      icon("chevronDown", "home__loc-chev"),
    ]),
    el("button", { class: "icon-btn", "aria-label": "Notifications", html: icons.bell, onClick: () => toast("No new notifications") }),
  ]);

  const greeting = el("div", { class: "home__greet" }, [
    el("p", { class: "t-body", text: home.greeting }),
    el("h1", { class: "t-h1", text: home.title }),
  ]);

  // AI composer card
  const prefChips = el("div", { class: "chip-row chip-row--wrap" },
    home.prefChips.map((label) => dropdownChip(label, { onClick: () => openTripSheet(router) })));
  const composer = el("div", { class: "composer" }, [
    el("button", { class: "composer__prompt", onClick: () => openTripSheet(router) }, [
      icon("sparkles", "composer__spark"),
      el("span", { class: "composer__placeholder", text: home.composerPlaceholder }),
      el("span", { class: "composer__mic", "aria-hidden": "true", html: icons.mic }),
    ]),
    el("div", { class: "composer__prefs" }, [
      el("p", { class: "t-caption", text: "Using your preferences" }),
      prefChips,
    ]),
    button("Plan it for me", { variant: "primary", full: true, icon: "sparkles", onClick: () => openTripSheet(router) }),
  ]);

  // Try asking
  const tryAsking = el("div", { class: "home__section" }, [
    el("p", { class: "home__eyebrow", text: "Try asking" }),
    el("div", { class: "hscroll" },
      home.tryAsking.map((label) =>
        el("button", { class: "chip chip--prompt", onClick: () => (label === "Check a reel" ? router.go("reel") : openTripSheet(router)) }, [
          icon("sparkle", "chip__spark"),
          el("span", { text: label }),
        ])
      )
    ),
  ]);

  // Hidden gems
  const gems = el("div", { class: "home__section" }, [
    sectionRow("Hidden gems near you", "From real traveller reels this week", () => router.go("explore")),
    el("div", { class: "hscroll" },
      home.gems.map((g) =>
        el("button", { class: "gem-card", onClick: () => router.go("gem", { id: g.id }) }, [
          el("span", { class: "gem-card__photo" }, [
            el("img", { src: g.img, alt: g.name }),
            el("span", { class: "gem-card__scrim" }),
            el("span", { class: "gem-card__top" }, [
              el("span", { class: "tag-onphoto" }, [icon("sparkle", "tag__spark"), el("span", { text: "Hidden gem" })]),
              icon("play", "gem-card__play"),
            ]),
            el("span", { class: "gem-card__text" }, [
              el("span", { class: "gem-card__name", text: g.name }),
              el("span", { class: "gem-card__meta", text: g.meta }),
            ]),
          ]),
        ])
      )
    ),
  ]);

  // Nudge card
  const nudge = el("div", { class: "nudge" }, [
    el("span", { class: "nudge__tile", html: icons.calendar }),
    el("div", { class: "nudge__text" }, [
      el("p", { class: "nudge__title", text: home.nudge.title }),
      el("p", { class: "nudge__sub", text: home.nudge.sub }),
    ]),
    el("button", { class: "btn-small", text: "Plan it", onClick: () => openTripSheet(router) }),
  ]);

  // Picks for you
  const picks = el("div", { class: "home__section" }, [
    sectionRow("Picks for you this weekend", null, () => router.go("top3")),
    el("div", { class: "hscroll" },
      home.picks.map((p) =>
        el("button", { class: "pick-card", onClick: () => openTripSheet(router) }, [
          el("span", { class: "pick-card__photo" }, [
            el("img", { src: p.img, alt: p.name }),
            el("span", { class: "tag-weather" }, [icon("sun", "tag__sun"), el("span", { text: p.weather })]),
          ]),
          el("span", { class: "pick-card__name", text: p.name }),
          el("span", { class: "pick-card__meta", text: p.meta }),
        ])
      )
    ),
  ]);

  const scroll = el("main", { class: "home__scroll" }, [
    locRow, greeting, composer, tryAsking, gems, nudge, picks,
  ]);
  solidStatusOnScroll(scroll);

  const nav = bottomNav(home.tabs, "home", (t) => goTab(router, t));

  screen.append(scroll, nav);
  return screen;
}

function sectionRow(title, sub, onSeeAll) {
  const head = el("div", { class: "section-heading" }, [
    el("div", { class: "section-heading__row" }, [
      el("p", { class: "t-title-lg", text: title }),
      onSeeAll ? el("button", { class: "link-btn link-btn--sm", text: "See all", onClick: onSeeAll }) : null,
    ]),
    sub ? el("p", { class: "t-caption", text: sub }) : null,
  ]);
  return head;
}

/* 08 · Trip details — bottom sheet over Home */
function openTripSheet(router) {
  let when = tripDetails.when[0];
  let budget = tripDetails.budget[1];
  let count = tripDetails.group.count;

  const whenRow = el("div", { class: "chip-row chip-row--wrap" });
  const whenChips = tripDetails.when.map((label) => {
    const c = chip(label, { selected: when === label, onClick: () => { when = label; whenChips.forEach((x) => setChipSelected(x, x.dataset.label === when)); } });
    c.dataset.label = label;
    return c;
  });
  whenChips.forEach((c) => whenRow.append(c));

  const budgetRow = el("div", { class: "chip-row chip-row--wrap" });
  const budgetChips = tripDetails.budget.map((label) => {
    const c = chip(label, { selected: budget === label, onClick: () => { budget = label; budgetChips.forEach((x) => setChipSelected(x, x.dataset.label === budget)); } });
    c.dataset.label = label;
    return c;
  });
  budgetChips.forEach((c) => budgetRow.append(c));

  const whoRow = el("div", { class: "who-row" }, [
    el("div", { class: "who-row__text" }, [
      el("p", { class: "who-row__name", text: tripDetails.group.label }),
      el("p", { class: "who-row__sub", text: tripDetails.group.sub }),
    ]),
    stepper(count, { min: 1, max: 12, onChange: (v) => { count = v; } }),
  ]);

  const sheet = openSheet({
    title: tripDetails.title,
    closeButton: true,
    body: [
      sectionLabel("When"),
      whenRow,
      sectionLabel("Who’s coming"),
      whoRow,
      sectionLabel("Budget per person"),
      budgetRow,
      button("Find my weekends", { variant: "primary", full: true, onClick: () => { sheet.close(); router.go("planning"); } }),
    ],
  });
}

/* ================================================================ *
 * 09 · Planning (live)
 * ================================================================ */
export function Planning(_params, router) {
  const screen = el("section", { class: "screen-bar screen-planning" });
  screen.append(topAppBar({ onBack: () => router.back() }));

  const pct = el("span", { class: "planning__pct", text: "0%" });
  const statusLine = el("p", { class: "planning__status t-body", text: "Starting…" });
  const bar = progressBar(0);

  const stepEls = planning.steps.map((label, i) =>
    el("div", { class: "pstep", dataset: { i } }, [
      el("span", { class: "pstep__mark" }, [el("span", { class: "pstep__spinner" })]),
      el("p", { class: "pstep__label", text: label }),
    ])
  );

  const body = el("main", { class: "planning__body" }, [
    el("div", { class: "planning__hero" }, [
      el("span", { class: "planning__glyph", html: icons.sparkles }),
      el("h1", { class: "t-h1 planning__title", text: planning.title }),
      el("p", { class: "planning__sub t-body", text: planning.subtitle }),
    ]),
    el("div", { class: "planning__progress" }, [
      bar.el,
      el("div", { class: "planning__meta" }, [statusLine, pct]),
    ]),
    el("div", { class: "planning__steps" }, stepEls),
    el("p", { class: "planning__foot t-caption", text: planning.footer }),
  ]);
  screen.append(body);

  // Animated timeline
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let progress = 8;
  const marks = [
    { at: 40, step: 0, status: "Checking routes…" },
    { at: 72, step: 1, status: "Checking weather…" },
    { at: 92, step: 2, status: "Almost there — about 5 seconds left" },
  ];
  const completeStep = (i) => {
    const s = stepEls[i];
    if (s) { s.classList.add("is-done"); s.querySelector(".pstep__mark").innerHTML = icons.check; }
  };
  const activateStep = (i) => stepEls[i] && stepEls[i].classList.add("is-active");

  activateStep(0);
  bar.set(progress);

  let timer = null;
  const finish = () => {
    bar.set(100); pct.textContent = "100%";
    statusLine.textContent = "Done";
    completeStep(0); completeStep(1); completeStep(2);
    setTimeout(() => router.replace("top3", {}, { direction: "forward" }), 600);
  };

  if (reduce) {
    finish();
  } else {
    const start = Date.now();
    const DUR = 4200;
    timer = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / DUR);
      progress = Math.round(8 + t * 92);
      bar.set(progress);
      pct.textContent = progress + "%";
      marks.forEach((m) => {
        if (progress >= m.at && !m.fired) {
          m.fired = true;
          if (m.step > 0) completeStep(m.step - 1);
          activateStep(m.step);
          statusLine.textContent = m.status;
        }
      });
      if (t >= 1) { clearInterval(timer); timer = null; finish(); }
    }, 60);
    screen.addEventListener("screen:destroy", () => timer && clearInterval(timer), { once: true });
  }

  return screen;
}

/* ================================================================ *
 * 10 · Your top 3
 * ================================================================ */
export function Top3(_params, router) {
  const screen = el("section", { class: "screen-bar" });
  screen.append(
    appBar("3 weekends for you", {
      onBack: () => router.back(),
      actions: [{ icon: "share", label: "Share", onClick: () => toast("Share — coming soon") }],
    })
  );

  let selected = ["kasauli", "lansdowne"]; // preselected for compare

  const footerCaption = el("p", { class: "t-caption top3__cmp" });
  // Compare the two you picked, in Top-3 order (e.g. "kasauli|chakrata")
  const compareBtn = button("", { variant: "primary", onClick: () => {
    const ids = top3.places.map((p) => p.id).filter((id) => selected.includes(id));
    router.go("compare", { pair: ids.join("|") });
  } });
  const syncFooter = () => {
    const names = top3.places.filter((p) => selected.includes(p.id)).map((p) => p.name);
    footerCaption.textContent = names.length === 2 ? `Comparing ${names[0]} and ${names[1]}` : "Pick two to compare";
    compareBtn.querySelector("span").textContent = `Compare (${selected.length})`;
    compareBtn.disabled = selected.length !== 2;
  };

  const cards = top3.places.map((p) => {
    const checkBadge = el("span", { class: "result__check", html: icons.check });
    const photo = el("button", { class: "result__photo", "aria-label": `Toggle ${p.name} for compare` }, [
      el("img", { src: p.img, alt: p.name }),
      checkBadge,
    ]);
    const toggleSel = () => {
      const i = selected.indexOf(p.id);
      if (i >= 0) selected.splice(i, 1);
      else {
        if (selected.length >= 2) { toast("Compare up to 2 — tap one to swap"); return; }
        selected.push(p.id);
      }
      card.classList.toggle("is-selected", selected.includes(p.id));
      syncFooter();
    };
    photo.addEventListener("click", toggleSel);

    const card = el("article", { class: `result${selected.includes(p.id) ? " is-selected" : ""}` }, [
      photo,
      el("div", { class: "result__body" }, [
        el("div", { class: "result__head" }, [
          el("h2", { class: "result__name", text: p.name }),
          tag(p.badge.label, p.badge),
        ]),
        el("p", { class: "result__line" }, [icon(p.transport.icon, "result__ico"), el("span", { text: p.transport.text })]),
        el("p", { class: "result__line" }, [icon(p.weather.icon, "result__ico"), el("span", { text: p.weather.text })]),
        el("p", { class: "result__note" }, [icon("check", "result__notecheck"), el("span", { text: p.note })]),
        el("div", { class: "result__actions" }, [
          button("View plan", { variant: "outline", onClick: () => openPlace(router, p.id) }),
        ]),
      ]),
    ]);
    return card;
  });

  const scroll = el("main", { class: "bar-scroll" }, [
    el("div", { class: "top3__status" }, [
      el("span", { class: "top3__statusdot", html: icons.check }),
      el("span", { class: "t-body", text: top3.statusNote }),
    ]),
    el("div", { class: "chip-row chip-row--wrap" },
      top3.filters.map((f) =>
        el("button", { class: "chip chip--filter", onClick: () => toast(`${f} — refine coming soon`) }, [
          el("span", { class: "chip__plus", text: "+" }),
          el("span", { text: f }),
        ])
      )
    ),
    ...cards,
  ]);

  const footer = el("div", { class: "onb-footer top3__footer" }, [
    footerCaption,
    el("div", { class: "top3__btns" }, [
      button("Ask my group", { variant: "outline", onClick: () => openGroupSheet(router) }),
      compareBtn,
    ]),
  ]);

  syncFooter();
  screen.append(scroll, footer);
  return screen;
}

/* ================================================================ *
 * 11 · Compare
 * ================================================================ */
/* Chakrata is a hidden gem → its gem page; Kasauli/Lansdowne → their Place details. */
function openPlace(router, id) {
  if (id === "chakrata") router.go("gem", { id });
  else router.go("place", { id });
}

export function Compare(params, router) {
  const compareData = comparePairs[(params && params.pair) || ""] || comparePairs["kasauli|lansdowne"];
  const screen = el("section", { class: "screen-bar" });
  let pick = compareData.a.id;

  screen.append(
    appBar(`${compareData.a.name} vs ${compareData.b.name}`, {
      onBack: () => router.back(),
      actions: [{ icon: "share", label: "Share", onClick: () => toast("Share — coming soon") }],
    })
  );

  const makeCard = (place) => {
    const card = el("button", { class: `cmp-card${pick === place.id ? " is-selected" : ""}`, dataset: { id: place.id } }, [
      el("span", { class: "cmp-card__photo" }, [
        el("img", { src: place.img, alt: place.name }),
        el("span", { class: "cmp-card__check", html: icons.check }),
      ]),
      el("span", { class: "cmp-card__name", text: place.name }),
      tag(place.badge.label, place.badge),
    ]);
    card.addEventListener("click", () => {
      pick = place.id;
      [cardA, cardB].forEach((c) => c.classList.toggle("is-selected", c.dataset.id === pick));
      pickBtn.querySelector("span").textContent = `Pick ${pick === compareData.a.id ? compareData.a.name : compareData.b.name}`;
    });
    return card;
  };
  const cardA = makeCard(compareData.a);
  const cardB = makeCard(compareData.b);

  const table = el("div", { class: "cmp-table" },
    compareData.rows.map((r) =>
      el("div", { class: "cmp-row" }, [
        el("span", { class: "cmp-row__label", text: r.label }),
        el("span", { class: `cmp-row__val${r.win === "a" ? " is-win" : ""}` }, winCell(r.a, r.win === "a")),
        el("span", { class: `cmp-row__val${r.win === "b" ? " is-win" : ""}` }, winCell(r.b, r.win === "b")),
      ])
    )
  );

  const take = el("div", { class: "our-take" }, [
    el("div", { class: "our-take__head" }, [icon("sparkles", "our-take__spark"), el("span", { class: "t-overline our-take__label", text: "OUR TAKE" })]),
    el("p", { class: "our-take__body", text: compareData.take }),
  ]);

  const pickBtn = button(`Pick ${compareData.a.name}`, { variant: "primary", onClick: () => openPlace(router, pick) });

  const scroll = el("main", { class: "bar-scroll cmp-scroll" }, [
    el("p", { class: "t-caption cmp-hint", text: "Tap the one you prefer" }),
    el("div", { class: "cmp-cards" }, [cardA, cardB]),
    table,
    take,
  ]);

  const footer = el("div", { class: "onb-footer top3__btns" }, [
    button("Ask my group", { variant: "outline", onClick: () => openGroupSheet(router) }),
    pickBtn,
  ]);

  screen.append(scroll, footer);
  return screen;
}
function winCell(text, win) {
  return win ? [icon("checkCircle", "cmp-row__wincheck"), el("span", { text })] : [el("span", { text })];
}

/* ================================================================ *
 * 12 · Place details
 * ================================================================ */
export function PlaceDetails(params, router) {
  const d = params && params.id === "lansdowne" ? placeDetailsLansdowne : placeDetails;
  const name = d.name;

  const screen = el("section", { class: "screen-bar screen-place screen-place--bleed", dataset: { sb: "photo" } });

  // Floating app bar over the hero
  const floatBar = el("div", { class: "place__floatbar" }, [
    el("button", { class: "icon-btn icon-btn--float", "aria-label": "Back", html: icons.arrowLeft, onClick: () => router.back() }),
    el("div", { class: "place__floatactions" }, [
      el("button", { class: "icon-btn icon-btn--float", "aria-label": "Share", html: icons.share, onClick: () => toast("Share — coming soon") }),
      el("button", { class: "icon-btn icon-btn--float", "aria-label": "Save", html: icons.heart, onClick: () => toast("Saved to Trips") }),
    ]),
  ]);

  // Hero carousel
  const total = d.slides.length;
  const carousel = el("div", { class: "place__carousel", "aria-label": `${name} photos`, role: "region" },
    d.slides.map((src, i) =>
      el("div", { class: "place__slide", "aria-hidden": i === 0 ? null : "true" }, [
        el("img", { src, alt: `${name} — photo ${i + 1}` }),
        el("span", { class: "place__scrim" }),
        el("div", { class: "place__herotext" }, [
          tag(d.tag.label, { tone: "onphoto", icon: d.tag.icon }),
          el(i === 0 ? "h1" : "p", { class: "place__title", text: name }),
        ]),
      ])
    )
  );

  // Single overlay: page dots (bottom-centre) + "n/4" counter (bottom-right)
  const counter = el("span", { class: "place__counter", text: `1/${total}`, "aria-live": "polite" });
  const dots = d.slides.map((_, i) =>
    el("button", {
      class: `place__dot${i === 0 ? " is-active" : ""}`,
      "aria-label": `Photo ${i + 1} of ${total}`,
      onClick: () => carousel.scrollTo({ left: i * carousel.clientWidth, behavior: "smooth" }),
    })
  );
  const setActive = (idx) => {
    dots.forEach((dt, i) => dt.classList.toggle("is-active", i === idx));
    counter.textContent = `${idx + 1}/${total}`;
  };
  let raf = 0;
  carousel.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const idx = Math.round(carousel.scrollLeft / Math.max(1, carousel.clientWidth));
      setActive(Math.min(total - 1, Math.max(0, idx)));
    });
  }, { passive: true });

  const slides = el("div", { class: "place__hero" }, [
    carousel,
    counter,
    el("div", { class: "place__dots" }, dots),
  ]);

  const reasons = el("div", { class: "place__reasons" },
    d.reasons.map((r) =>
      el("div", { class: "reason" }, [
        el("span", { class: "reason__mark", html: icons.check }),
        el("div", { class: "reason__text" }, [
          el("p", { class: "reason__title", text: r.title }),
          el("p", { class: "reason__sub", text: r.sub }),
        ]),
      ])
    )
  );

  const review = el("div", { class: "review" }, [
    el("div", { class: "review__head" }, [
      el("span", { class: "review__avatar", text: d.review.initials }),
      el("span", { class: "review__handle", text: d.review.handle }),
      tag("Verified trip", { tone: "success", icon: "check" }),
    ]),
    el("p", { class: "review__quote", text: d.review.quote }),
    el("p", { class: "review__meta", text: d.review.meta }),
  ]);

  const routeMap = el("div", { class: "routemap" }, [
    el("div", { class: "routemap__map", html: mapArt() }, [
      el("span", { class: "routemap__pill routemap__from", text: d.route.from }),
      el("span", { class: "routemap__pill routemap__to", text: d.route.to }),
    ]),
    el("div", { class: "routemap__info" }, [
      el("div", { class: "routemap__text" }, [
        el("p", { class: "routemap__dist", text: d.route.distance }),
        el("p", { class: "routemap__via", text: d.route.via }),
      ]),
      el("button", { class: "btn-small btn-small--ico", onClick: () => toast("Opening Maps (demo)") }, [
        icon("external", "btn-small__ico"),
        el("span", { text: "Open in Maps" }),
      ]),
    ]),
  ]);

  const transport = el("div", { class: "place__transport" },
    d.transport.map((t) =>
      el("div", { class: "trow" }, [
        el("span", { class: "trow__tile", html: icons[t.icon] }),
        el("div", { class: "trow__text" }, [
          el("p", { class: "trow__title", text: t.title }),
          el("p", { class: "trow__sub", text: t.sub }),
        ]),
        el("span", { class: "trow__price", text: t.price }),
      ])
    )
  );

  const stay = el("div", { class: "stay-card" }, [
    el("span", { class: "stay-card__photo" }, [el("img", { src: d.stay.img, alt: d.stay.name })]),
    el("div", { class: "stay-card__text" }, [
      el("p", { class: "stay-card__name", text: d.stay.name }),
      el("p", { class: "stay-card__sub", text: d.stay.sub }),
      el("p", { class: "stay-card__price" }, [
        el("span", { class: "stay-card__amt", text: d.stay.price }),
        el("span", { class: "stay-card__psub", text: d.stay.priceSub }),
      ]),
    ]),
  ]);

  const scroll = el("main", { class: "place__scroll" }, [
    slides,
    el("div", { class: "place__body" }, [
      el("p", { class: "place__dist" }, [icon("mapPin", "place__distpin"), el("span", { text: d.distance })]),
      el("h2", { class: "t-title-lg", text: "Why it fits you" }),
      reasons,
      review,
      el("h2", { class: "t-title-lg", text: "How to get there" }),
      routeMap,
      transport,
      el("h2", { class: "t-title-lg", text: "Where to stay" }),
      stay,
    ]),
  ]);

  const footer = el("div", { class: "place__footer" }, [
    el("div", { class: "place__price" }, [
      el("p", { class: "place__priceamt", text: d.price }),
      el("button", { class: "place__pricesub-btn", text: d.priceSub, onClick: () => toast("Cost breakdown — coming soon") }),
    ]),
    d.cta === "Save to Trips"
      ? button("Save to Trips", { variant: "primary", onClick: () => {
          setIdeaSaved(d.id, true);
          toast(`${name.split(",")[0]} saved to your trip ideas`, { icon: "heartFilled", action: { label: "View", onClick: () => router.go("trips", { tab: "ideas" }) } });
        } })
      : button("Save & share", { variant: "primary", onClick: () => openGroupSheet(router) }),
  ]);

  solidStatusOnScroll(scroll, 250); // past the hero photo
  screen.append(floatBar, scroll, footer);
  return screen;
}

/* Lightweight illustrative route map (no asset). */
function mapArt() {
  return `<svg viewBox="0 0 370 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="370" height="150" fill="#f4f6f5"/>
    <path d="M0 0H370V38C300 52 230 30 160 44C100 56 50 40 0 50Z" fill="#e3efe9"/>
    <path d="M-10 84C60 70 120 92 190 82C260 72 310 88 380 76" stroke="#d6e8f0" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M70 160 L128 64 L170 -10" stroke="#e1e6e3" stroke-width="4" fill="none"/>
    <path d="M-10 118 L150 106 L230 130 L380 112" stroke="#e1e6e3" stroke-width="4" fill="none"/>
    <path d="M250 160 L275 70 L340 -10" stroke="#e1e6e3" stroke-width="3" fill="none"/>
    <path d="M58 116 C 110 110, 140 90, 190 82 S 270 64, 304 34" stroke="#0f6e5c" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="58" cy="116" r="6" fill="#fff" stroke="#0f6e5c" stroke-width="3"/>
    <path d="M311 23c0 8-9 15-9 15s-9-7-9-15a9 9 0 0 1 18 0Z" fill="#faae25"/>
    <circle cx="302" cy="23" r="3" fill="#fff"/>
  </svg>`;
}

/* 13 · Ask your group — bottom sheet */
function openGroupSheet(router) {
  const g = groupShare;
  const preview = el("div", { class: "msg-preview" }, [
    el("p", { class: "t-overline msg-preview__label", text: "MESSAGE PREVIEW" }),
    el("p", { class: "msg-preview__heading", text: g.preview.heading }),
    ...g.preview.lines.map((l) => el("p", { class: "msg-preview__line", text: l })),
    el("p", { class: "msg-preview__link" }, [icon("link", "msg-preview__linkico"), el("span", { text: `See both plans: ${g.preview.link}` })]),
  ]);

  const toggles = el("div", { class: "sheet-toggles" },
    g.toggles.map((t) =>
      el("div", { class: "toggle-row" }, [
        el("span", { class: "toggle-row__label", text: t.label }),
        toggleSwitch(t.on, { label: t.label, onChange: () => {} }),
      ])
    )
  );

  const sheet = openSheet({
    title: g.title,
    closeButton: true,
    body: [
      el("p", { class: "t-body sheet__lead", text: g.body }),
      preview,
      toggles,
      button("Open WhatsApp", { variant: "primary", full: true, icon: "share", onClick: () => { toast("Opening WhatsApp (demo)"); sheet.close(); router.go("decide"); } }),
      button("Copy message", { variant: "outline", full: true, onClick: () => { toast("Message copied"); sheet.close(); router.go("decide"); } }),
    ],
  });
}

/* ================================================================ *
 * 14 · Did your group decide?
 * ================================================================ */
export function Decide(_params, router) {
  const screen = el("section", { class: "screen-bar" });
  screen.append(
    appBar("Kasauli weekend", {
      onBack: () => router.back(),
      actions: [{ icon: "share", label: "Share", onClick: () => toast("Share — coming soon") }],
    })
  );

  let pick = decide.options[0].id;
  const cta = button("", { variant: "primary", full: true, onClick: () => {
    if (pick === "undecided") { toast("Reminder sent to your group", { icon: "checkCircle" }); return; }
    store.set({ decided: pick, planSaved: false });
    router.go("plan");
  }});
  const syncCta = () => {
    const opt = decide.options.find((o) => o.id === pick);
    cta.querySelector("span").textContent = pick === "undecided" ? "Remind the group" : `We picked ${opt.name}`;
  };

  const options = decide.options.map((o) => {
    const row = el("button", {
      class: `radio-opt${pick === o.id ? " is-selected" : ""}`,
      role: "radio",
      "aria-checked": pick === o.id ? "true" : "false",
      dataset: { id: o.id },
    }, [
      el("span", { class: "radio-opt__dot" }),
      el("span", { class: "radio-opt__text" }, [
        el("span", { class: "radio-opt__name", text: o.name }),
        el("span", { class: "radio-opt__sub", text: o.sub }),
      ]),
    ]);
    row.addEventListener("click", () => {
      pick = o.id;
      options.forEach((r) => {
        const sel = r.dataset.id === pick;
        r.classList.toggle("is-selected", sel);
        r.setAttribute("aria-checked", sel ? "true" : "false");
      });
      syncCta();
    });
    return row;
  });

  const scroll = el("main", { class: "bar-scroll" }, [
    screenHeader(decide.title, decide.body),
    el("div", { class: "radio-list" }, options),
    infoBanner(decide.hint),
  ]);

  syncCta();
  screen.append(scroll, el("div", { class: "onb-footer" }, [cta]));
  return screen;
}

/* ================================================================ *
 * Flow 5 · The plan, swaps & your trips
 * ================================================================ */

/* Plan state lives in the store so swaps survive navigation + reloads. */
function getPlan() {
  const p = store.get("plan");
  return p ? p : JSON.parse(JSON.stringify(weekendPlan.days));
}
function savePlan(days) {
  store.set({ plan: days });
}

/* Edge-to-edge screens: frost the status bar once content scrolls under it. */
function solidStatusOnScroll(scrollEl, threshold = 8) {
  const sb = document.getElementById("statusbar");
  scrollEl.addEventListener("scroll", () => {
    if (sb) sb.classList.toggle("is-solid", scrollEl.scrollTop > threshold); // cheap; no rAF needed
  }, { passive: true });
}

/* Shared bottom-nav routing — all four tabs are live. Explore is immersive (has its own back). */
function goTab(router, t) {
  if (t.id === "home") router.replace("home", {}, { direction: "none" });
  else if (t.id === "trips") router.replace("trips", {}, { direction: "none" });
  else if (t.id === "profile") router.replace("me", {}, { direction: "none" });
  else if (t.id === "explore") router.go("explore", {}, { direction: "none" });
}

/* Footer price bar: price + caption + one action button. */
function priceBar({ price, sub, subAction, btn }) {
  return el("div", { class: "place__footer" }, [
    el("div", { class: "place__price" }, [
      el("p", { class: "place__priceamt", text: price }),
      subAction
        ? el("button", { class: "place__pricesub-btn", text: sub, onClick: subAction })
        : el("p", { class: "t-caption", text: sub }),
    ]),
    btn,
  ]);
}

/* ---------------- 15 · Weekend plan (+ saved state, 16 swap, 17 updated) ---------------- */
export function WeekendPlan(params, router) {
  const saved = !!store.get("planSaved");
  const screen = el("section", { class: "screen-bar" });
  screen.append(
    appBar(weekendPlan.title, {
      onBack: () => router.back(),
      actions: [{ icon: "share", label: "Share plan", onClick: () => openSharePlanSheet(router) }],
    })
  );

  const summary = el("div", { class: "trip-summary" }, [
    el("p", { class: "trip-summary__row" }, [icon("calendar", "trip-summary__ico"), el("span", { text: weekendPlan.dates })]),
    el("p", { class: "trip-summary__row" }, [
      icon("checkCircle", "trip-summary__ico trip-summary__ico--ok"),
      el("span", { class: "trip-summary__strong", text: weekendPlan.budget }),
      el("button", { class: "trip-summary__link", text: "About Kasauli ›", onClick: () => router.go("place") }),
    ]),
  ]);

  // Refine chips (editable plan) vs. replan nudge (saved plan)
  const refine = saved
    ? el("div", { class: "replan-card" }, [
        el("div", { class: "replan-card__text" }, [
          el("p", { class: "replan-card__title", text: "Dates or group changed?" }),
          el("p", { class: "replan-card__sub", text: "We’ll rebuild it in about 20 seconds" }),
        ]),
        el("button", { class: "btn-small btn-small--ico", onClick: () => router.go("planning") }, [icon("replan", "btn-small__ico"), el("span", { text: "Replan" })]),
      ])
    : el("div", { class: "hscroll plan__refine" },
        weekendPlan.refine.map((r) =>
          el("button", { class: "chip chip--prompt", onClick: () => toast(`Making it ${r.toLowerCase()}… (demo)`) }, [
            el("span", { class: "chip__plus", text: "+" }),
            el("span", { text: r }),
          ])
        )
      );

  const timeline = el("div", { class: "plan__timeline" });
  let days = getPlan();
  const highlightId = params && params.updated;

  function render() {
    timeline.replaceChildren();
    days.forEach((day, di) => {
      timeline.append(el("p", { class: "t-overline plan__day", text: day.label }));
      day.stops.forEach((s) => timeline.append(stopRow(s, di)));
    });
    if (!saved) {
      timeline.append(
        el("div", { class: "tstop" }, [
          el("span", { class: "tstop__rail tstop__rail--empty" }),
          el("button", { class: "tstop__add", onClick: () => toast("Add a stop — coming soon") }, [
            icon("plus", "tstop__addico"),
            el("span", { text: "Add a stop" }),
          ]),
        ])
      );
    }
  }

  function stopRow(s, di) {
    const isUpdated = s.id === highlightId || s.updated;
    const card = el("div", { class: `tstop__card${isUpdated ? " is-updated" : ""}` }, [
      el("span", { class: "tstop__tile", html: icons[s.icon] || icons.walk }),
      el("div", { class: "tstop__text" }, [
        isUpdated ? tag("Updated", { tone: "success", icon: "check" }) : null,
        el("p", { class: "tstop__time", text: s.time }),
        el("p", { class: "tstop__title", text: s.title }),
        el("p", { class: "tstop__sub", text: s.sub }),
      ]),
    ]);
    if (!saved) {
      const isSwap = s.type === "activity";
      card.append(
        el("button", {
          class: "btn-small btn-small--ico tstop__btn",
          "aria-label": `${isSwap ? "Swap" : "Change"} ${s.title}`,
          onClick: () => (isSwap ? openSwapSheet(s, di) : toast(`Change ${s.title.toLowerCase()} — coming soon`)),
        }, [icon(isSwap ? "swap" : "edit", "btn-small__ico"), el("span", { text: isSwap ? "Swap" : "Change" })])
      );
    }
    return el("div", { class: "tstop" }, [
      el("span", { class: `tstop__rail${isUpdated ? " is-updated" : ""}` }),
      card,
    ]);
  }

  /* 16 · Swap a stop — bottom sheet of ideas for the same time slot */
  function openSwapSheet(stop, dayIndex) {
    const ideas = swapIdeas[stop.id] || swapIdeas.default;
    const dayName = days[dayIndex].label === "FRI NIGHT" ? "Friday" : days[dayIndex].label[0] + days[dayIndex].label.slice(1).toLowerCase();
    const before = JSON.parse(JSON.stringify(days));

    const commit = (mutate, msg) => {
      mutate();
      savePlan(days);
      sheet.close();
      render();
      toast(msg, {
        action: { label: "Undo", onClick: () => { days = before; savePlan(days); render(); toast("Change undone"); } },
      });
    };

    const options = ideas.map((o) =>
      el("button", { class: "swap-opt" }, [
        el("span", { class: "swap-opt__photo" }, [el("img", { src: o.img, alt: "" })]),
        el("span", { class: "swap-opt__text" }, [
          el("span", { class: "swap-opt__title", text: o.title }),
          el("span", { class: "swap-opt__sub", text: o.sub }),
          el("span", { class: "swap-opt__note", text: o.note }),
        ]),
        tag(o.delta, { tone: o.tone }),
      ])
    );
    options.forEach((btn, i) =>
      btn.addEventListener("click", () => {
        const o = ideas[i];
        commit(() => {
          days.forEach((d) => d.stops.forEach((x) => delete x.updated));
          const target = days[dayIndex].stops.find((x) => x.id === stop.id);
          Object.assign(target, { title: o.short, sub: o.sub, icon: o.icon, updated: true });
        }, o.toast);
      })
    );

    const sheet = openSheet({
      title: `Swap “${stop.title}”`,
      closeButton: true,
      body: [
        el("p", { class: "t-body sheet__lead", text: `${dayName}, ${stop.time} · ideas for the same time slot that match your vibe` }),
        el("div", { class: "swap-list" }, options),
        el("div", { class: "swap-actions" }, [
          el("button", { class: "swap-actions__btn", onClick: () => commit(() => {
            const d = days[dayIndex];
            const idx = d.stops.findIndex((x) => x.id === stop.id);
            const [moved] = d.stops.splice(idx, 1);
            days[days.length - 1].stops.unshift(moved);
          }, `Moved “${stop.title}” to Sunday`) }, [icon("calendar", "swap-actions__ico"), el("span", { text: "Move to Sunday" })]),
          el("button", { class: "swap-actions__btn", onClick: () => commit(() => {
            const d = days[dayIndex];
            d.stops = d.stops.filter((x) => x.id !== stop.id);
          }, `Removed “${stop.title}”`) }, [icon("trash", "swap-actions__ico"), el("span", { text: "Remove from plan" })]),
        ]),
        el("p", { class: "t-caption", text: "Tap an option to swap it in. You can undo right after." }),
      ],
    });
  }

  render();

  const scroll = el("main", { class: "bar-scroll plan__scroll" }, [summary, refine, timeline]);
  const footer = saved
    ? priceBar({
        price: weekendPlan.price,
        sub: "In My Trips",
        btn: button("Share plan", { variant: "primary", icon: "share", onClick: () => openSharePlanSheet(router) }),
      })
    : priceBar({
        price: weekendPlan.price,
        sub: weekendPlan.priceSub,
        subAction: () => toast("Cost breakdown — coming soon"),
        btn: button("Save & share", { variant: "primary", onClick: () => { store.set({ planSaved: true }); router.go("saved"); } }),
      });

  screen.append(scroll, footer);
  return screen;
}

/* 15 · Share your plan — bottom sheet */
function openSharePlanSheet(router) {
  const s = sharePlan;
  const preview = el("div", { class: "msg-preview" }, [
    el("p", { class: "t-overline msg-preview__label", text: "MESSAGE PREVIEW" }),
    el("p", { class: "msg-preview__heading", text: s.heading }),
    ...s.lines.map((l) => el("p", { class: "msg-preview__line", text: l })),
    el("p", { class: "msg-preview__link" }, [icon("link", "msg-preview__linkico"), el("span", { text: `See the full plan: ${s.link}` })]),
  ]);
  const rows = s.options.map((o) =>
    el("button", { class: "share-row", onClick: () => {
      if (o.id === "copy" && navigator.clipboard) navigator.clipboard.writeText(`https://${s.link}`).catch(() => {});
      store.set({ planSaved: true, planShared: true });
      sheet.close();
      router.go("trips", { toast: o.toast, toastIcon: o.toastIcon });
    } }, [
      el("span", { class: `share-row__tile${o.brand ? " is-brand" : ""}`, html: icons[o.icon] }),
      el("span", { class: "share-row__text" }, [
        el("span", { class: "share-row__title", text: o.title }),
        el("span", { class: "share-row__sub", text: o.sub }),
      ]),
      icon("chevronRight", "share-row__chev"),
    ])
  );
  const sheet = openSheet({
    title: "Share your plan",
    closeButton: true,
    body: [preview, el("div", { class: "share-list" }, rows)],
  });
}

/* ---------------- 19 · Saved — share with your group ---------------- */
export function SavedTrip(_params, router) {
  const d = savedTrip;
  const screen = el("section", { class: "screen-bar" });
  screen.append(topAppBar({ onBack: () => router.back() }));

  const scroll = el("main", { class: "bar-scroll saved__scroll" }, [
    el("div", { class: "saved__hero" }, [
      el("span", { class: "saved__check", html: icons.check }),
      el("h1", { class: "t-h2 saved__title", text: d.title }),
      el("p", { class: "t-body", text: d.meta }),
    ]),
    tripCard(router),
    el("div", { class: "saved__tip" }, [icon("clockLine", "saved__tipico"), el("p", { text: d.tip })]),
  ]);

  const footer = el("div", { class: "bar-footer bar-footer--stack" }, [
    button("Share with your group", { variant: "primary", full: true, icon: "share", onClick: () => openSharePlanSheet(router) }),
    button("View full plan", { variant: "tertiary", full: true, onClick: () => router.go("plan") }),
  ]);

  screen.append(scroll, footer);
  return screen;
}

/* Upcoming trip card (shared by Saved + My Trips) */
function tripCard(router) {
  const c = savedTrip.card;
  return el("article", { class: "trip-card" }, [
    el("span", { class: "trip-card__photo" }, [el("img", { src: c.img, alt: "Kasauli hillside" })]),
    el("div", { class: "trip-card__body" }, [
      el("h2", { class: "t-title-lg", text: c.name }),
      el("p", { class: "t-caption", text: c.sub }),
      el("div", { class: "trip-card__row" }, [
        el("span", { class: "trip-card__shared" }, [icon("checkCircle", "trip-card__sharedico"), el("span", { text: c.shared })]),
        el("button", { class: "link-btn link-btn--sm", text: "View plan", onClick: () => router.go("plan") }),
      ]),
      el("p", { class: "trip-card__leave" }, [icon("clockLine", "trip-card__leaveico"), el("span", { text: c.leave })]),
    ]),
  ]);
}

/* ---------------- 20 · My Trips (Upcoming · Ideas · Past) ---------------- */
export function MyTrips(params, router) {
  const t = myTrips;
  const screen = el("section", { class: "screen-bar screen-trips" });
  let tab = (params && params.tab) || "upcoming";

  const head = el("div", { class: "trips__head" }, [
    el("div", { class: "trips__actions" }, [
      el("button", { class: "icon-btn", "aria-label": "Notifications", html: icons.bell, onClick: () => toast("No new notifications") }),
      el("button", { class: "icon-btn", "aria-label": "Settings", html: icons.settings, onClick: () => router.replace("me", {}, { direction: "none" }) }),
    ]),
    el("h1", { class: "t-h1 trips__title", text: "My Trips" }),
  ]);

  const tabs = el("div", { class: "chip-row", role: "radiogroup", "aria-label": "Trips view" });
  const tabDefs = [["upcoming", "Upcoming"], ["ideas", "Ideas"], ["past", "Past"]];
  const tabChips = tabDefs.map(([id, label]) => {
    const c = chip(label, { selected: tab === id, onClick: () => { tab = id; tabChips.forEach((x) => setChipSelected(x, x.dataset.id === tab)); renderBody(); } });
    c.dataset.id = id;
    return c;
  });
  tabChips.forEach((c) => tabs.append(c));

  const body = el("div", { class: "trips__body" });
  let ideas = getIdeaIds();

  function row({ img, tile, title, sub, extra, trailing, onClick, big }) {
    const r = el(onClick ? "button" : "div", { class: `list-row${big ? " list-row--idea" : ""}` }, [
      img
        ? el("span", { class: `list-row__photo${big ? " is-big" : ""}` }, [el("img", { src: img, alt: "" })])
        : el("span", { class: "list-row__tile", html: icons[tile] }),
      el("span", { class: "list-row__text" }, [
        el("span", { class: "list-row__title", text: title }),
        el("span", { class: "list-row__sub", text: sub }),
        extra || null,
      ]),
      trailing || null,
    ]);
    if (onClick) r.addEventListener("click", onClick);
    return r;
  }

  function renderBody() {
    body.replaceChildren();
    if (tab === "upcoming") {
      body.append(
        tripCard(router),
        el("div", { class: "nudge" }, [
          el("span", { class: "nudge__tile nudge__tile--warn", html: icons.cloudRain }),
          el("div", { class: "nudge__text" }, [
            el("p", { class: "nudge__title", text: t.rain.title }),
            el("p", { class: "nudge__sub", text: t.rain.sub }),
          ]),
          el("button", { class: "btn-small", text: t.rain.cta, onClick: () => toast("Rain plan applied to Saturday afternoon", { icon: "checkCircle" }) }),
        ]),
        row({ tile: "chat", title: t.waiting.title, sub: t.waiting.sub,
          trailing: el("button", { class: "btn-small", text: t.waiting.cta, onClick: () => router.go("decide") }) }),
        el("p", { class: "t-overline trips__section", text: "DRAFTS" }),
        ...t.drafts.map((d) => row({ img: d.img, title: d.title, sub: d.sub, trailing: icon("chevronRight", "list-row__chev"),
          onClick: () => toast("Resume draft — coming soon") }))
      );
    } else if (tab === "ideas") {
      const entries = ideaEntries();
      const list = ideas.map((id) => entries.find((e) => e.id === id)).filter(Boolean);
      if (!list.length) {
        body.append(
          el("div", { class: "empty" }, [
            el("span", { class: "empty__glyph", html: icons.heart }),
            el("h2", { class: "t-title-lg empty__title", text: t.empty.title }),
            el("p", { class: "t-body empty__body", text: t.empty.body }),
            button(t.empty.cta, { variant: "primary", onClick: () => router.go("explore") }),
            el("button", { class: "link-btn", text: t.empty.link, onClick: () => router.go("sharereel") }),
          ])
        );
        return;
      }
      body.append(el("p", { class: "t-caption", text: t.ideasNote }));
      list.forEach((i) => {
        const heart = el("button", { class: "list-row__heart", "aria-label": `Remove ${i.name} from ideas`, "aria-pressed": "true", html: icons.heartFilled });
        heart.addEventListener("click", (e) => {
          e.stopPropagation();
          ideas = ideas.filter((x) => x !== i.id);
          store.set({ ideas });
          renderBody();
          toast(`${i.name.split(",")[0]} removed from your trip ideas`, {
            icon: "heart",
            action: { label: "Undo", onClick: () => { ideas = [i.id, ...ideas.filter((x) => x !== i.id)]; store.set({ ideas }); renderBody(); toast(`${i.name.split(",")[0]} saved to your trip ideas`, { icon: "heartFilled" }); } },
          });
        });
        body.append(row({ img: i.img, big: true, title: i.name, sub: i.sub,
          extra: el("span", { class: "list-row__tag" }, [tag(i.tag.label, { tone: i.tag.tone, icon: i.tag.icon })]),
          trailing: heart,
          onClick: () => toast(`${i.name.split(",")[0]} — details coming soon`) }));
      });
    } else {
      t.past.forEach((p) => body.append(row({ img: p.img, title: p.title, sub: p.sub, trailing: icon("chevronRight", "list-row__chev"),
        onClick: () => toast("Rate your trip — coming soon") })));
    }
  }
  renderBody();

  const scroll = el("main", { class: "bar-scroll trips__scroll" }, [head, tabs, body]);
  screen.append(scroll, bottomNav(home.tabs, "trips", (tb) => goTab(router, tb)));

  if (params && params.toast) setTimeout(() => toast(params.toast, { icon: params.toastIcon }), 350);
  return screen;
}

/* ================================================================ *
 * Flow 6 · Explore (hidden gems), reel check, profile
 * ================================================================ */

/* Saved ideas are shared by Explore, Reel check and Trips → Ideas. */
function ideaEntries() {
  const extra = gems
    .filter((g) => !myTrips.ideas.some((i) => i.id === g.id))
    .map((g) => ({ id: g.id, name: g.name, sub: `${g.hours}h from Delhi · ₹${g.price.toLocaleString("en-IN")} each`, tag: { tone: "gem", icon: "sparkle", label: "Hidden gem" }, img: g.img }));
  const lansdowne = { id: "lansdowne", name: "Lansdowne, Uttarakhand", sub: "6h from Delhi · ₹3,200 each", tag: { tone: "neutral", icon: "rupee", label: "Cheapest" }, img: "beaches.png" };
  return [...myTrips.ideas, ...extra, lansdowne];
}
function getIdeaIds() {
  return store.get("ideas") || myTrips.ideas.map((i) => i.id);
}
function setIdeaSaved(id, saved) {
  const ids = getIdeaIds().filter((x) => x !== id);
  if (saved) ids.unshift(id);
  store.set({ ideas: ids });
}

/* ---------------- 24 · Hidden gems feed (Explore tab) ---------------- */
export function Explore(_params, router) {
  const screen = el("section", { class: "screen-reel", dataset: { sb: "reel" } }); // full-bleed, like the Figma
  let tab = "foryou";

  const feed = el("div", { class: "reel-feed", "aria-label": "Hidden gems", role: "feed" });

  const top = el("div", { class: "reel-top" }, [
    el("button", { class: "icon-btn icon-btn--onphoto", "aria-label": "Back", html: icons.arrowLeft, onClick: () => router.back() }),
  ]);
  const tabsRow = el("div", { class: "reel-tabs", role: "tablist" });
  const tabBtns = feedTabs.map((t) => {
    const b = el("button", { class: `reel-tab${t.id === tab ? " is-active" : ""}`, role: "tab", "aria-selected": t.id === tab ? "true" : "false", text: t.label });
    b.addEventListener("click", () => {
      tab = t.id;
      tabBtns.forEach((x, i) => { const on = feedTabs[i].id === tab; x.classList.toggle("is-active", on); x.setAttribute("aria-selected", on ? "true" : "false"); });
      render();
      feed.scrollTo({ top: 0 });
    });
    return b;
  });
  tabBtns.forEach((b) => tabsRow.append(b));
  top.append(tabsRow);

  const list = () =>
    gems.filter((g) => (tab === "under6" ? g.hours < 6 : tab === "under4k" ? g.price < 4000 : true));

  function reel(g, i, total) {
    let saved = getIdeaIds().includes(g.id);
    const saveIcon = el("span", { class: "reel-action__btn", html: saved ? icons.heartFilled : icons.heart });
    const save = el("button", { class: `reel-action${saved ? " is-active" : ""}`, "aria-pressed": saved ? "true" : "false" }, [saveIcon, el("span", { class: "reel-action__label", text: saved ? "Saved" : "Save" })]);
    save.addEventListener("click", () => {
      saved = !saved;
      setIdeaSaved(g.id, saved);
      save.classList.toggle("is-active", saved);
      save.setAttribute("aria-pressed", saved ? "true" : "false");
      saveIcon.innerHTML = saved ? icons.heartFilled : icons.heart;
      save.querySelector(".reel-action__label").textContent = saved ? "Saved" : "Save";
      toast(saved ? `${g.short} saved to your trip ideas` : `${g.short} removed from your trip ideas`, {
        icon: saved ? "heartFilled" : "heart",
        action: saved ? { label: "View", onClick: () => router.go("trips", { tab: "ideas" }) } : null,
      });
    });

    return el("article", { class: "reel", "aria-label": g.name }, [
      el("img", { class: "reel__img", src: g.img, alt: "" }),
      el("span", { class: "reel__scrim-top" }),
      el("span", { class: "reel__scrim-bottom" }),
      el("div", { class: "reel__rail" }, [
        save,
        el("button", { class: "reel-action", onClick: () => toast(`Sent ${g.short} to your group on WhatsApp (demo)`, { icon: "chat" }) }, [
          el("span", { class: "reel-action__btn", html: icons.chat }), el("span", { class: "reel-action__label", text: "Ask group" }),
        ]),
        el("button", { class: "reel-action", onClick: () => openTripSheet(router) }, [
          el("span", { class: "reel-action__btn", html: icons.sparkles }), el("span", { class: "reel-action__label", text: "Plan" }),
        ]),
      ]),
      el("button", { class: "reel__info", onClick: () => router.go("gem", { id: g.id }) }, [
        el("span", { class: "reel__tags" }, [
          tag("Hidden gem", { tone: "onphoto", icon: "sparkle" }),
          g.doable ? tag("Doable this weekend", { tone: "onphoto", icon: "check" }) : tag("Long weekend best", { tone: "onphoto", icon: "calendar" }),
        ]),
        el("span", { class: "reel__name", text: g.name }),
        el("span", { class: "reel__line" }, [icon("bus", "reel__ico"), el("span", { text: g.travel })]),
        el("span", { class: "reel__line" }, [icon("sun", "reel__ico"), el("span", { text: g.weather })]),
        el("span", { class: "reel__take", text: g.take }),
        el("span", { class: "reel__by" }, [el("span", { class: "reel__avatar", html: icons.user }), el("span", { text: g.by })]),
      ]),
      el("div", { class: "reel__cta" }, [
        el("button", { class: "reel__details", onClick: () => router.go("gem", { id: g.id }) }, [el("span", { text: "Details" }), icon("chevronRight", "reel__detailsico")]),
        el("button", { class: "reel__plan", text: "Plan this weekend", onClick: () => openTripSheet(router) }),
      ]),
      i < total - 1
        ? el("p", { class: "reel__hint" }, [icon("chevronUp", "reel__hintico"), el("span", { text: "Swipe up for the next hidden gem" })])
        : el("p", { class: "reel__hint" }, [el("span", { text: "That’s all for now — new gems every Thursday" })]),
    ]);
  }

  function render() {
    const items = list();
    feed.replaceChildren(...items.map((g, i) => reel(g, i, items.length)));
  }
  render();

  screen.append(feed, top);
  return screen;
}

/* ---------------- 25 · Hidden gem details ---------------- */
export function GemDetails(params, router) {
  const g = gems.find((x) => x.id === (params && params.id)) || gems[0];
  const screen = el("section", { class: "screen-bar screen-place" });
  let saved = getIdeaIds().includes(g.id);

  const heart = el("button", { class: "icon-btn icon-btn--float", "aria-label": saved ? "Remove from ideas" : "Save to ideas", "aria-pressed": saved ? "true" : "false", html: saved ? icons.heartFilled : icons.heart });
  heart.addEventListener("click", () => {
    saved = !saved;
    setIdeaSaved(g.id, saved);
    heart.innerHTML = saved ? icons.heartFilled : icons.heart;
    heart.classList.toggle("is-saved", saved);
    heart.setAttribute("aria-pressed", saved ? "true" : "false");
    toast(saved ? `${g.short} saved to your trip ideas` : `${g.short} removed from your trip ideas`, { icon: saved ? "heartFilled" : "heart" });
  });
  heart.classList.toggle("is-saved", saved);

  const floatBar = el("div", { class: "place__floatbar" }, [
    el("button", { class: "icon-btn icon-btn--float", "aria-label": "Back", html: icons.arrowLeft, onClick: () => router.back() }),
    el("div", { class: "place__floatactions" }, [
      el("button", { class: "icon-btn icon-btn--float", "aria-label": "Share", html: icons.share, onClick: () => toast("Share — coming soon") }),
      heart,
    ]),
  ]);

  const hero = el("div", { class: "gem-hero" }, [
    el("img", { src: g.img, alt: g.name }),
    el("span", { class: "gem-hero__scrim" }),
    el("div", { class: "gem-hero__text" }, [
      tag("Hidden gem", { tone: "onphoto", icon: "sparkle" }),
      el("h1", { class: "place__title", text: g.name }),
    ]),
    el("button", { class: "gem-hero__count", "aria-label": `See all ${g.photos} photos`, onClick: () => toast("Photo gallery — coming soon") }, [icon("image", "gem-hero__countico"), el("span", { text: `1/${g.photos}` })]),
  ]);

  const honest = el("div", { class: "honest" }, [
    el("div", { class: "honest__row honest__row--head" }, [el("span"), el("span", { text: g.short }), el("span", { text: g.vs })]),
    ...g.rows.map((r) =>
      el("div", { class: "honest__row" }, [
        el("span", { class: "honest__label", text: r.label }),
        el("span", { class: `honest__val${r.win === "a" ? " is-win" : ""}` }, r.win === "a" ? [icon("checkCircle", "honest__ico"), el("span", { text: r.a })] : [el("span", { text: r.a })]),
        el("span", { class: `honest__val${r.win === "b" ? " is-win" : ""}` }, r.win === "b" ? [icon("checkCircle", "honest__ico"), el("span", { text: r.b })] : [el("span", { text: r.b })]),
      ])
    ),
  ]);

  const routeMap = el("div", { class: "routemap" }, [
    el("div", { class: "routemap__map", html: mapArt() }, [
      el("span", { class: "routemap__pill routemap__from", text: "Delhi NCR" }),
      el("span", { class: "routemap__pill routemap__to", text: g.short }),
    ]),
    el("div", { class: "routemap__info" }, [
      el("div", { class: "routemap__text" }, [
        el("p", { class: "routemap__dist", text: g.route.distance }),
        el("p", { class: "routemap__via", text: g.route.via }),
      ]),
      el("button", { class: "btn-small btn-small--ico", onClick: () => toast("Opening Maps (demo)") }, [icon("external", "btn-small__ico"), el("span", { text: "Open in Maps" })]),
    ]),
  ]);

  const review = el("div", { class: "review" }, [
    el("div", { class: "review__head" }, [
      el("span", { class: "review__avatar", text: g.review.initials }),
      el("span", { class: "review__handle", text: g.review.handle }),
      tag("Verified trip", { tone: "success", icon: "check" }),
    ]),
    el("p", { class: "review__quote", text: g.review.quote }),
    el("p", { class: "review__meta", text: g.review.meta }),
  ]);

  const scroll = el("main", { class: "place__scroll" }, [
    hero,
    el("div", { class: "place__body" }, [
      el("p", { class: "place__dist" }, [icon("mapPin", "place__distpin"), el("span", { text: g.distance })]),
      el("div", { class: "our-take our-take--row" }, [
        icon("sparkles", "our-take__spark"),
        el("div", {}, [el("p", { class: "t-overline our-take__label", text: "OUR TAKE" }), el("p", { class: "our-take__body", text: g.take })]),
      ]),
      el("h2", { class: "t-title-lg", text: "Honest check" }),
      honest,
      el("h2", { class: "t-title-lg", text: "How to get there" }),
      routeMap,
      review,
    ]),
  ]);

  const footer = priceBar({
    price: `₹${g.price.toLocaleString("en-IN")} / person`,
    sub: `${g.total} · see breakdown`,
    subAction: () => toast("Cost breakdown — coming soon"),
    btn: button("Plan this weekend", { variant: "primary", onClick: () => openTripSheet(router) }),
  });

  screen.append(floatBar, scroll, footer);
  return screen;
}

/* ---------------- 22 · Reel check ---------------- */
export function ReelCheck(params, router) {
  const r = reelCheck;
  const screen = el("section", { class: "screen-bar" });
  screen.append(appBar("Check a reel", { onBack: () => router.back(), actions: [{ icon: "share", label: "Share", onClick: () => toast("Share — coming soon") }] }));

  const input = el("input", {
    class: "link-field__input",
    type: "url",
    inputmode: "url",
    placeholder: "Paste an Instagram reel link",
    "aria-label": "Reel link",
    "aria-describedby": "reel-helper",
    autocomplete: "off",
  });
  const field = el("div", { class: "link-field" }, [icon("link", "link-field__ico"), input]);
  const helperText = el("span");
  const helperIco = el("span", { class: "link-helper__ico" });
  const helper = el("p", { class: "link-helper", id: "reel-helper", "aria-live": "polite" }, [helperIco, helperText]);
  const sample = el("button", { class: "link-btn link-btn--sm reel-sample", text: "Try a sample reel link", onClick: () => { input.value = r.sampleLink; check(); } });
  const result = el("div", { class: "reel-result" });

  let timer = null;
  function setState(state) {
    field.className = `link-field is-${state}`;
    helper.className = `link-helper is-${state}`;
    sample.hidden = state !== "empty";
    result.replaceChildren();
    if (state === "empty") { helperIco.innerHTML = ""; helperText.textContent = "Paste a reel from Instagram — we’ll check if it fits a weekend."; }
    if (state === "checking") { helperIco.innerHTML = '<span class="spinner"></span>'; helperText.textContent = "Checking traveller reels…"; }
    if (state === "notfound") { helperIco.innerHTML = icons.alert; helperText.textContent = "We couldn’t find a place in that link. Try an Instagram reel link."; }
    if (state === "found") {
      helperIco.innerHTML = icons.checkCircle;
      helperText.textContent = `Found: ${r.found.name} · in ${r.found.reels} traveller reels`;
      result.append(feasibility());
    }
  }
  function check() {
    clearTimeout(timer);
    const v = input.value.trim();
    if (!v) return setState("empty");
    setState("checking");
    timer = setTimeout(() => setState(/instagram\.com\/(reel|p)\//i.test(v) ? "found" : "notfound"), 1100);
  }
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(check, 450); });
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
  screen.addEventListener("screen:destroy", () => clearTimeout(timer), { once: true });

  function feasibility() {
    const card = el("div", { class: "feas" }, [
      el("div", { class: "feas__head" }, [el("p", { class: "t-title-lg", text: r.found.name }), tag("Doable this weekend", { tone: "success", icon: "check" })]),
      ...r.found.rows.map((x) =>
        el("div", { class: "feas__row" }, [
          icon(x.icon, "feas__ico"),
          el("span", { class: "feas__label", text: x.label }),
          el("span", { class: "feas__value", text: x.value }),
          icon("checkCircle", "feas__ok"),
        ])
      ),
      button("Plan this weekend", { variant: "primary", full: true, onClick: () => openTripSheet(router) }),
    ]);
    return el("div", { class: "reel-result__inner" }, [
      card,
      button("Save to Trips", { variant: "outline", full: true, icon: "heart", onClick: () => {
        setIdeaSaved("kasol", true);
        toast("Kasol saved to your trip ideas", { icon: "heartFilled", action: { label: "View", onClick: () => router.go("trips", { tab: "ideas" }) } });
      } }),
      el("div", { class: "info-banner" }, [icon("info", "info-banner__ico"), el("p", { class: "info-banner__text", text: r.found.hint })]),
    ]);
  }

  const scroll = el("main", { class: "bar-scroll reel-check" }, [
    el("h1", { class: "t-h2", text: "Can you do this weekend?" }),
    el("div", { class: "link-checker" }, [field, helper, sample]),
    result,
  ]);
  screen.append(scroll);

  if (params && params.link) { input.value = params.link; check(); }
  else setState("empty");
  return screen;
}

/* ---------------- 22a · Share a reel to untrail (phone's share sheet) ---------------- */
export function ShareReel(_params, router) {
  const screen = el("section", { class: "screen-reel screen-sharereel", dataset: { sb: "reel" } });
  const os = (label) => () => toast(`${label} — this is your phone’s share sheet (demo)`);
  screen.append(
    el("img", { class: "reel__img", src: "adventure.png", alt: "" }),
    el("span", { class: "sharereel__pill", text: "Watching a reel in any app" }),
    el("button", { class: "sharereel__scrim", "aria-label": "Close share sheet", onClick: () => router.back() }),
    el("div", { class: "os-sheet", role: "dialog", "aria-label": "Share to" }, [
      el("span", { class: "sheet__grabber" }),
      el("p", { class: "t-title", text: "Share to" }),
      el("div", { class: "os-sheet__apps" }, [
        el("button", { class: "os-app", onClick: () => router.replace("reel", { link: reelCheck.sampleLink }, { direction: "forward" }) }, [
          el("span", { class: "os-app__icon app-icon", html: logoMark }),
          el("span", { class: "os-app__label is-strong", text: "untrail" }),
        ]),
        ...["Messages", "Mail", "More"].map((n) => el("button", { class: "os-app", onClick: os(n) }, [el("span", { class: "os-app__icon is-blank" }), el("span", { class: "os-app__label", text: n })])),
      ]),
      el("div", { class: "share-list" }, [
        el("button", { class: "share-row", onClick: () => { navigator.clipboard && navigator.clipboard.writeText(`https://${reelCheck.sampleLink}`).catch(() => {}); toast("Link copied", { icon: "copy" }); } }, [
          el("span", { class: "share-row__tile", html: icons.copy }), el("span", { class: "share-row__text" }, [el("span", { class: "share-row__title", text: "Copy link" })]), icon("chevronRight", "share-row__chev"),
        ]),
        el("button", { class: "share-row", onClick: os("Open in browser") }, [
          el("span", { class: "share-row__tile", html: icons.link }), el("span", { class: "share-row__text" }, [el("span", { class: "share-row__title", text: "Open in browser" })]), icon("chevronRight", "share-row__chev"),
        ]),
      ]),
      el("p", { class: "t-caption", text: "This is the phone’s own share sheet. untrail shows up here after install — no copy-paste needed." }),
    ])
  );
  return screen;
}

/* ---------------- 23 · Profile (tab) ---------------- */
export function Me(_params, router) {
  const p = profilePage;
  const screen = el("section", { class: "screen-bar screen-trips" });
  const city = (store.get("onboarding") || {}).startCity || "Delhi NCR";

  const head = el("div", { class: "trips__head" }, [
    el("div", { class: "trips__actions" }, [
      el("button", { class: "icon-btn", "aria-label": "Notifications", html: icons.bell, onClick: () => toast("No new notifications") }),
      el("button", { class: "icon-btn", "aria-label": "Settings", html: icons.settings, onClick: () => toast("Settings — coming soon") }),
    ]),
    el("h1", { class: "t-h1 trips__title", text: "Profile" }),
  ]);

  const card = el("div", { class: "me-card" }, [
    el("span", { class: "me-card__avatar", text: p.initials }),
    el("div", { class: "me-card__text" }, [
      el("p", { class: "t-title-lg", text: p.name }),
      el("p", { class: "me-card__persona" }, [icon("sparkles", "me-card__spark"), el("span", { text: persona.title })]),
    ]),
    el("button", { class: "btn-small", text: "Edit", onClick: () => router.go("profile") }),
  ]);

  const free = el("div", { class: "nudge" }, [
    el("span", { class: "nudge__tile nudge__tile--brand", html: icons.calendar }),
    el("div", { class: "nudge__text" }, [el("p", { class: "nudge__title", text: p.freeWeekends.title }), el("p", { class: "nudge__sub", text: p.freeWeekends.sub })]),
    toggleSwitch(store.get("freeWeekendAlerts") !== false, {
      label: p.freeWeekends.title,
      onChange: (on) => { store.set({ freeWeekendAlerts: on }); toast(on ? "Free-weekend alerts on" : "Free-weekend alerts off", { icon: on ? "checkCircle" : "bell" }); },
    }),
  ]);

  const go = {
    prefs: () => router.go("vibe"),
    city: () => router.go("city"),
    notifs: () => toast("Notification settings — coming soon"),
    lang: () => toast("हिंदी — coming soon"),
    help: () => toast("Thanks! Feedback form — coming soon"),
  };
  const rows = el("div", { class: "me-rows" },
    p.rows.map((r) =>
      el("button", { class: "list-row", onClick: go[r.id] }, [
        el("span", { class: "list-row__tile", html: icons[r.icon] }),
        el("span", { class: "list-row__text" }, [
          el("span", { class: "list-row__title", text: r.title }),
          el("span", { class: "list-row__sub", text: r.id === "city" ? city : r.sub }),
        ]),
        icon("chevronRight", "list-row__chev"),
      ])
    )
  );

  screen.append(el("main", { class: "bar-scroll trips__scroll" }, [head, card, free, rows]), bottomNav(home.tabs, "profile", (t) => goTab(router, t)));
  return screen;
}

/* Toggle a chip's selected visual + the leading check glyph. */
function setChipSelected(chipEl, selected) {
  chipEl.classList.toggle("is-selected", selected);
  chipEl.setAttribute("aria-checked", selected ? "true" : "false");
  const existing = chipEl.querySelector(".chip__check");
  if (selected && !existing) {
    chipEl.prepend(icon("check", "chip__check"));
  } else if (!selected && existing) {
    existing.remove();
  }
}

export const routes = {
  splash: Splash,
  welcome: Welcome,
  city: StartingCity,
  about: AboutYou,
  vibe: WeekendVibe,
  budget: Budget,
  profile: WeekendProfile,
  home: Home,
  planning: Planning,
  top3: Top3,
  compare: Compare,
  place: PlaceDetails,
  decide: Decide,
  plan: WeekendPlan,
  saved: SavedTrip,
  trips: MyTrips,
  explore: Explore,
  gem: GemDetails,
  reel: ReelCheck,
  sharereel: ShareReel,
  me: Me,
};
