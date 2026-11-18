/* components.js — DOM builders for reusable UI pieces.
 * Screens compose these; they never re-author their own primitives.
 */

import { sbCellular, sbWifi, sbBattery, icons } from "./icons.js";

/** Tiny hyperscript helper. */
export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else node.setAttribute(k, v === true ? "" : String(v));
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  });
  return node;
}

/** Render the iOS-style status bar into a host element. */
export function renderStatusBar(host) {
  host.innerHTML = `
    <span class="statusbar__time">9:41</span>
    <span class="statusbar__right">${sbCellular}${sbWifi}${sbBattery}</span>
  `;
}

/** Icon helper — returns a span with inline SVG from the icon map. */
export function icon(name, cls = "ico") {
  return el("span", { class: cls, html: icons[name] || "" });
}

/** Primary/secondary/tertiary button. `icon` prepends a leading glyph. */
export function button(
  label,
  { variant = "primary", onClick, type = "button", icon: ic, full = false } = {}
) {
  const b = el("button", {
    class: `btn btn--${variant}${full ? " btn--full" : ""}`,
    type,
  });
  if (ic) b.append(icon(ic, "btn__ico"));
  b.append(el("span", { text: label }));
  if (onClick) b.addEventListener("click", onClick);
  return b;
}

/** Onboarding top app bar: back button + optional Skip link. */
export function topAppBar({ onBack, onSkip } = {}) {
  const bar = el("div", { class: "appbar" });
  const back = el("button", {
    class: "icon-btn",
    "aria-label": "Back",
    html: icons.arrowLeft,
  });
  if (onBack) back.addEventListener("click", onBack);
  bar.append(back);
  if (onSkip) {
    const skip = el("button", { class: "appbar__skip", text: "Skip" });
    skip.addEventListener("click", onSkip);
    bar.append(skip);
  }
  return bar;
}

/** Titled app bar: back + title + trailing icon actions. */
export function appBar(title, { onBack, actions = [] } = {}) {
  const bar = el("div", { class: "appbar appbar--titled" });
  const left = el("div", { class: "appbar__left" });
  if (onBack) {
    const back = el("button", { class: "icon-btn", "aria-label": "Back", html: icons.arrowLeft });
    back.addEventListener("click", onBack);
    left.append(back);
  }
  if (title) left.append(el("h1", { class: "appbar__title", text: title }));
  bar.append(left);
  if (actions.length) {
    const right = el("div", { class: "appbar__actions" });
    actions.forEach((a) => {
      const b = el("button", { class: "icon-btn", "aria-label": a.label, html: icons[a.icon] || "" });
      if (a.onClick) b.addEventListener("click", a.onClick);
      right.append(b);
    });
    bar.append(right);
  }
  return bar;
}

/** DS Tag — tones: brand, neutral, gem, success, onphoto. */
export function tag(label, { tone = "neutral", icon: ic, rupee = false, plus = false } = {}) {
  const t = el("span", { class: `tag tag--${tone}` });
  if (rupee) t.append(icon("rupee", "tag__ico")); // DS Icon/rupee
  if (plus) t.append(el("span", { class: "tag__plus", text: "+" }));
  if (ic) t.append(icon(ic, "tag__ico"));
  t.append(el("span", { text: label }));
  return t;
}

/** Toggle switch (role=switch). */
export function toggleSwitch(on, { label, onChange } = {}) {
  const sw = el("button", {
    class: `switch${on ? " is-on" : ""}`,
    role: "switch",
    "aria-checked": on ? "true" : "false",
    "aria-label": label || "Toggle",
  }, [el("span", { class: "switch__thumb" })]);
  let state = on;
  sw.addEventListener("click", () => {
    state = !state;
    sw.classList.toggle("is-on", state);
    sw.setAttribute("aria-checked", state ? "true" : "false");
    onChange && onChange(state);
  });
  return sw;
}

/** 4-step onboarding progress + "Step X of N". */
export function progressSteps(step, total = 4) {
  const wrap = el("div", { class: "progress", role: "group", "aria-label": `Step ${step} of ${total}` });
  const track = el("div", { class: "progress__track" });
  for (let i = 1; i <= total; i++) {
    track.append(el("span", { class: `progress__seg${i <= step ? " is-on" : ""}` }));
  }
  wrap.append(track);
  wrap.append(el("p", { class: "progress__label", text: `Step ${step} of ${total}` }));
  return wrap;
}

/** Screen title + optional subtitle (H1 for welcome, H2 for steps). */
export function screenHeader(title, sub, { h1 = false } = {}) {
  const wrap = el("div", { class: "screen-head" });
  wrap.append(el("h1", { class: h1 ? "t-h1" : "t-h2", text: title }));
  if (sub) wrap.append(el("p", { class: "t-body screen-head__sub", text: sub }));
  return wrap;
}

export function sectionLabel(text) {
  return el("h2", { class: "t-title section-label", text });
}

/** Selectable pill chip (single- or multi-select). */
export function chip(label, { selected = false, onClick, disabled = false } = {}) {
  const c = el("button", {
    class: `chip${selected ? " is-selected" : ""}`,
    role: "radio",
    "aria-checked": selected ? "true" : "false",
    disabled: disabled || false,
  });
  if (selected) c.append(icon("check", "chip__check"));
  c.append(el("span", { text: label }));
  if (onClick) c.addEventListener("click", onClick);
  return c;
}

/** Icon option card (About-you grid): icon tile, title, subtitle. */
export function optionCard({ icon: ic, title, sub, selected = false, onClick }) {
  const card = el("button", {
    class: `opt-card${selected ? " is-selected" : ""}`,
    role: "checkbox",
    "aria-checked": selected ? "true" : "false",
  });
  const top = el("div", { class: "opt-card__top" }, [
    el("span", { class: "opt-card__tile", html: icons[ic] || "" }),
  ]);
  if (selected) top.append(el("span", { class: "opt-card__badge", html: icons.check }));
  card.append(top);
  card.append(el("p", { class: "opt-card__title", text: title }));
  card.append(el("p", { class: "opt-card__sub", text: sub }));
  if (onClick) card.addEventListener("click", onClick);
  return card;
}

/** Photo vibe tile (multi-select up to a limit). */
export function vibeTile({ label, img, selected = false, disabled = false, onClick }) {
  const tile = el("button", {
    class: `vibe${selected ? " is-selected" : ""}${disabled ? " is-disabled" : ""}`,
    role: "checkbox",
    "aria-checked": selected ? "true" : "false",
    "aria-disabled": disabled ? "true" : "false",
  });
  const photo = el("span", { class: "vibe__photo" }, [
    el("img", { src: img, alt: "" }),
  ]);
  if (selected) photo.append(el("span", { class: "vibe__badge", html: icons.check }));
  tile.append(photo);
  tile.append(el("span", { class: "vibe__label", text: label }));
  if (onClick) tile.addEventListener("click", onClick);
  return tile;
}

/** City list row: pin + name + subtitle. */
export function cityRow({ name, sub, onClick }) {
  const row = el("button", { class: "city-row" }, [
    icon("mapPin", "city-row__pin"),
    el("span", { class: "city-row__text" }, [
      el("span", { class: "city-row__name", text: name }),
      el("span", { class: "city-row__sub", text: sub }),
    ]),
  ]);
  if (onClick) row.addEventListener("click", onClick);
  return row;
}

/** Info banner (subtle bg + info icon). */
export function infoBanner(text) {
  return el("div", { class: "info-banner" }, [
    icon("info", "info-banner__ico"),
    el("p", { class: "info-banner__text", text }),
  ]);
}

/** Bottom sheet over a dimmed backdrop. Returns { el, close }. */
export function openSheet({ title, titleId, body = [], onClose, closeButton = false } = {}) {
  const host = document.getElementById("app");
  const backdrop = el("div", { class: "sheet-backdrop" });
  const sheet = el("section", {
    class: "sheet",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title || "Sheet",
  });
  sheet.append(el("span", { class: "sheet__grabber", "aria-hidden": "true" }));

  if (title) {
    const head = el("div", { class: "sheet__head" }, [
      el("h2", { class: "t-h2", text: title, id: titleId || null }),
    ]);
    if (closeButton) {
      const x = el("button", { class: "icon-btn icon-btn--tonal", "aria-label": "Close", html: icons.close });
      head.append(x);
      x.addEventListener("click", () => close());
    }
    sheet.append(head);
  }
  const content = el("div", { class: "sheet__body" }, body);
  sheet.append(content);

  backdrop.append(sheet);
  host.append(backdrop);

  requestAnimationFrame(() =>
    requestAnimationFrame(() => backdrop.classList.add("is-open"))
  );

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    backdrop.classList.remove("is-open");
    document.removeEventListener("keydown", onKey, true);
    const done = () => backdrop.remove();
    backdrop.addEventListener("transitionend", done, { once: true });
    setTimeout(done, 400);
    if (onClose) onClose();
  }
  function onKey(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
    }
  }
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener("keydown", onKey, true);

  // focus first focusable for a11y
  requestAnimationFrame(() => {
    const f = sheet.querySelector("button, a, input, [tabindex]");
    if (f) f.focus();
  });

  return { el: sheet, close };
}

/** Outline / tonal icon button variants reuse .icon-btn; add a tonal modifier. */

/** Numeric stepper (− value +). */
export function stepper(value, { min = 1, max = 20, onChange } = {}) {
  let v = value;
  const out = el("output", { class: "stepper__value", text: String(v), "aria-live": "polite" });
  const minus = el("button", { class: "stepper__btn", "aria-label": "Decrease", html: icons.minus });
  const plus = el("button", { class: "stepper__btn", "aria-label": "Increase", html: icons.plus });
  const sync = () => {
    out.textContent = String(v);
    minus.disabled = v <= min;
    plus.disabled = v >= max;
  };
  minus.addEventListener("click", () => {
    if (v > min) { v--; sync(); onChange && onChange(v); }
  });
  plus.addEventListener("click", () => {
    if (v < max) { v++; sync(); onChange && onChange(v); }
  });
  sync();
  return el("div", { class: "stepper", role: "group", "aria-label": "Count" }, [minus, out, plus]);
}

/** Dropdown-style chip (label + chevron) — opens a sheet / picker. */
export function dropdownChip(label, { onClick } = {}) {
  const c = el("button", { class: "chip chip--dropdown" }, [
    el("span", { text: label }),
    icon("chevronDown", "chip__chev"),
  ]);
  if (onClick) c.addEventListener("click", onClick);
  return c;
}

/** Determinate progress bar (0–100). Returns { el, set }. */
export function progressBar(initial = 0) {
  const fill = el("span", { class: "pbar__fill" });
  const bar = el("div", {
    class: "pbar",
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": String(initial),
  }, [fill]);
  const set = (pct) => {
    const v = Math.max(0, Math.min(100, Math.round(pct)));
    fill.style.width = v + "%";
    bar.setAttribute("aria-valuenow", String(v));
  };
  requestAnimationFrame(() => set(initial));
  return { el: bar, set };
}

/** Bottom nav bar. active = tab id. */
export function bottomNav(tabs, active, onSelect) {
  const nav = el("nav", { class: "tabbar", "aria-label": "Primary" });
  tabs.forEach((t) => {
    const isActive = t.id === active;
    const btn = el("button", {
      class: `tab${isActive ? " is-active" : ""}`,
      "aria-current": isActive ? "page" : null,
    }, [
      el("span", { class: "tab__icon", html: icons[t.icon] || "" }),
      el("span", { class: "tab__label", text: t.label }),
    ]);
    btn.addEventListener("click", () => onSelect && onSelect(t));
    nav.append(btn);
  });
  return nav;
}

/** Transient toast, auto-dismiss, auto-stack. */
let toastLayer = null;
export function toast(message, { duration = 2500, icon: ic, action } = {}) {
  const host = document.getElementById("app") || document.body;
  if (!toastLayer || !toastLayer.isConnected) {
    toastLayer = el("div", { class: "toast-layer", "aria-live": "polite" });
    host.append(toastLayer);
  }
  const t = el("div", { class: "toast", role: "status" });
  if (ic) t.append(el("span", { class: "toast__ico", html: icons[ic] || "" }));
  t.append(el("span", { class: "toast__msg", text: message }));
  if (action) {
    const a = el("button", { class: "toast__action", text: action.label });
    a.addEventListener("click", () => { action.onClick && action.onClick(); remove(); });
    t.append(a);
    t.style.pointerEvents = "auto";
    duration = Math.max(duration, 4500); // give time to undo
  }
  toastLayer.append(t);
  requestAnimationFrame(() => t.classList.add("is-in"));
  const remove = () => {
    t.classList.remove("is-in");
    t.addEventListener("transitionend", () => t.remove(), { once: true });
    setTimeout(() => t.remove(), 400);
  };
  setTimeout(remove, duration);
  return remove;
}
