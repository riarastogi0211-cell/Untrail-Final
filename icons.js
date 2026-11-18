/* icons.js — inline SVG assets (untrail Design System)
 * Every icon/logo in the app comes from here — no raw SVG in screens.
 */

/* Brand mark: Road (u) + Place (pin). Pin carries id="markPin" for animation.
 * viewBox 134.4 — matches the Figma "Mark" component exactly. */
export const logoMark = `
<svg class="logo-mark" viewBox="0 0 134.4 134.4" fill="none" role="img" aria-label="untrail logo mark" xmlns="http://www.w3.org/2000/svg">
  <path class="mark-road" d="M23.1 78.4V30.8C23.1 26.1608 26.8608 22.4 31.5 22.4C36.1392 22.4 39.9 26.1608 39.9 30.8V78.4C39.9 83.9696 42.1127 89.3108 46.051 93.249C49.9892 97.1873 55.3305 99.4 60.9 99.4C66.4695 99.4 71.8108 97.1873 75.749 93.249C79.6873 89.3108 81.9 83.9696 81.9 78.4V68.6C81.9 63.9608 85.6608 60.2 90.3 60.2C94.9392 60.2 98.7 63.9608 98.7 68.6V78.4C98.7 88.4252 94.7174 98.0396 87.6285 105.129C80.5396 112.217 70.9252 116.2 60.9 116.2C50.8748 116.2 41.2604 112.217 34.1715 105.129C27.0826 98.0396 23.1 88.4252 23.1 78.4Z" fill="var(--ut-color-brand-logo-front)"/>
  <path class="mark-pin" id="markPin" fill-rule="evenodd" clip-rule="evenodd" d="M90.3 68.6C90.3 68.6 69.3 51.24 69.3 36.12C69.3 30.5505 71.5125 25.209 75.4508 21.2708C79.389 17.3325 84.7305 15.12 90.3 15.12C95.8695 15.12 101.211 17.3325 105.149 21.2708C109.088 25.209 111.3 30.5505 111.3 36.12C111.3 51.24 90.3 68.6 90.3 68.6ZM82.6 35C82.6 37.0422 83.4113 39.0007 84.8553 40.4447C86.2993 41.8888 88.2578 42.7 90.3 42.7C92.3422 42.7 94.3007 41.8888 95.7447 40.4447C97.1888 39.0007 98 37.0422 98 35C98 32.9578 97.1888 30.9993 95.7447 29.5553C94.3007 28.1112 92.3422 27.3 90.3 27.3C88.2578 27.3 86.2993 28.1112 84.8553 29.5553C83.4113 30.9993 82.6 32.9578 82.6 35Z" fill="var(--ut-color-brand-logo-gem)"/>
</svg>`;

/* Wordmark: "untrail" (Plus Jakarta Sans ExtraBold, outlined) + amber i-dot.
 * Flattened vector straight from the design system — min width 64px. */
export const logoWordmark = `
<svg class="logo-wordmark" viewBox="0 0 172.98 68.2" fill="none" role="img" aria-label="untrail" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.9395 58.9942C12.3206 58.9942 10.0787 58.4387 8.21376 57.3277C6.38848 56.177 4.99968 54.5898 4.04736 52.5661C3.09504 50.5424 2.61888 48.1814 2.61888 45.4832V25.7821H11.5469V44.769C11.5469 45.999 11.785 47.0902 12.2611 48.0426C12.777 48.9552 13.4912 49.6694 14.4038 50.1853C15.3165 50.7011 16.3482 50.959 17.4989 50.959C18.6893 50.959 19.721 50.7011 20.5939 50.1853C21.5066 49.6694 22.201 48.9552 22.6771 48.0426C23.193 47.0902 23.4509 45.999 23.4509 44.769V25.7821H32.3789V58.28H24.0461V51.8518L24.5222 53.2803C23.7683 55.2246 22.5382 56.673 20.832 57.6253C19.1654 58.5379 17.2013 58.9942 14.9395 58.9942Z" fill="var(--ut-color-brand-logo-wordmark)"/>
  <path d="M37.1186 58.28V25.7821H45.4514V32.2102L44.9753 30.7818C45.7292 28.8374 46.9394 27.409 48.606 26.4963C50.3122 25.544 52.2962 25.0678 54.558 25.0678C57.0181 25.0678 59.1609 25.5837 60.9861 26.6154C62.8511 27.647 64.2994 29.0954 65.3311 30.9603C66.3628 32.7856 66.8786 34.9283 66.8786 37.3885V58.28H57.9506V39.2931C57.9506 38.0234 57.6927 36.9322 57.1769 36.0195C56.7007 35.1069 56.0063 34.3926 55.0937 33.8768C54.2207 33.361 53.189 33.103 51.9986 33.103C50.8479 33.103 49.8162 33.361 48.9036 33.8768C47.9909 34.3926 47.2767 35.1069 46.7609 36.0195C46.2847 36.9322 46.0466 38.0234 46.0466 39.2931V58.28H37.1186Z" fill="var(--ut-color-brand-logo-wordmark)"/>
  <path d="M86.6174 58.6371C82.6891 58.6371 79.6337 57.5856 77.4513 55.4826C75.3086 53.3398 74.2373 50.3638 74.2373 46.5546V33.5197H68.7614V25.7821H69.059C70.7256 25.7821 71.9953 25.3654 72.8683 24.5322C73.7809 23.6989 74.2373 22.449 74.2373 20.7824V18.4016H83.1653V25.7821H90.7838V33.5197H83.1653V45.9594C83.1653 47.0704 83.3637 48.0029 83.7605 48.7568C84.1573 49.471 84.7723 50.0067 85.6056 50.3638C86.4388 50.721 87.4705 50.8995 88.7006 50.8995C88.9784 50.8995 89.2958 50.8797 89.6529 50.84C90.0101 50.8003 90.387 50.7606 90.7838 50.721V58.28C90.1886 58.3594 89.5141 58.4387 88.7601 58.5181C88.0062 58.5974 87.292 58.6371 86.6174 58.6371Z" fill="var(--ut-color-brand-logo-wordmark)"/>
  <path d="M94.2299 58.28V25.7821H102.563V33.5792L101.968 32.4483C102.682 29.7104 103.852 27.8653 105.479 26.913C107.146 25.921 109.11 25.425 111.372 25.425H113.276V33.1626H110.479C108.296 33.1626 106.531 33.8371 105.182 35.1862C103.832 36.4957 103.158 38.3606 103.158 40.7811V58.28H94.2299Z" fill="var(--ut-color-brand-logo-wordmark)"/>
  <path d="M125.463 58.9942C123.121 58.9942 121.098 58.6173 119.392 57.8634C117.685 57.1094 116.376 56.0381 115.463 54.6493C114.551 53.2208 114.094 51.5344 114.094 49.5901C114.094 47.7648 114.511 46.1578 115.344 44.769C116.177 43.3405 117.447 42.1501 119.153 41.1978C120.899 40.2454 123.062 39.5709 125.641 39.1741L135.581 37.567V44.1142L127.248 45.6022C125.978 45.8403 125.006 46.257 124.332 46.8522C123.657 47.4077 123.32 48.2211 123.32 49.2925C123.32 50.2845 123.697 51.0582 124.451 51.6138C125.205 52.1693 126.137 52.447 127.248 52.447C128.716 52.447 130.006 52.1296 131.117 51.4947C132.228 50.8598 133.081 50.0067 133.676 48.9354C134.311 47.8243 134.629 46.6141 134.629 45.3046V36.8528C134.629 35.6227 134.133 34.591 133.141 33.7578C132.188 32.9245 130.879 32.5078 129.212 32.5078C127.625 32.5078 126.216 32.9443 124.986 33.8173C123.796 34.6902 122.923 35.841 122.368 37.2694L115.225 33.8768C115.86 32.0515 116.872 30.4842 118.261 29.1747C119.649 27.8653 121.316 26.8534 123.26 26.1392C125.205 25.425 127.328 25.0678 129.629 25.0678C132.367 25.0678 134.787 25.5638 136.89 26.5558C138.993 27.5478 140.62 28.9366 141.771 30.7222C142.961 32.4682 143.557 34.5117 143.557 36.8528V58.28H135.224V53.0422L137.248 52.6851C136.295 54.1136 135.244 55.304 134.093 56.2563C132.942 57.169 131.653 57.8435 130.224 58.28C128.796 58.7562 127.208 58.9942 125.463 58.9942Z" fill="var(--ut-color-brand-logo-wordmark)"/>
  <path d="M147.664 58.28V25.7821H156.592V58.28H147.664Z" fill="var(--ut-color-brand-logo-wordmark)"/>
  <path d="M160.716 58.28V13.2234H169.644V58.28H160.716Z" fill="var(--ut-color-brand-logo-wordmark)"/>
  <circle class="wordmark-dot" cx="152.148" cy="16.802" r="5.27" fill="var(--ut-color-brand-logo-gem)"/>
</svg>`;

/* Compact header lockup (mark + small wordmark) — the "stakeholder logo"
 * reused across later flows, Uber/Ola style. */
export const logoLockupInline = `
<span class="logo-lockup" aria-label="untrail">
  ${logoMark}
  ${logoWordmark}
</span>`;

/* ---- Status bar glyphs ---- */
export const sbCellular = `
<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/>
  <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/>
  <rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/>
  <rect x="15" y="0.5" width="3" height="11.5" rx="1" fill="currentColor"/>
</svg>`;

export const sbWifi = `
<svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M8.5 11.6L10.86 8.82C9.52 7.62 7.48 7.62 6.14 8.82L8.5 11.6Z" fill="currentColor"/>
  <path d="M8.5 4.9C10.46 4.9 12.34 5.66 13.74 7.02L15.24 5.32C13.44 3.56 11.02 2.58 8.5 2.55C5.98 2.58 3.56 3.56 1.76 5.32L3.26 7.02C4.66 5.66 6.54 4.9 8.5 4.9Z" fill="currentColor" opacity="0.9"/>
  <path d="M8.5 0.4C5.47 0.4 2.56 1.55 0.37 3.62L1.86 5.3C3.63 3.64 5.97 2.72 8.5 2.72C11.03 2.72 13.37 3.64 15.14 5.3L16.63 3.62C14.44 1.55 11.53 0.4 8.5 0.4Z" fill="currentColor" opacity="0.9"/>
</svg>`;

export const sbBattery = `
<svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" opacity="0.4"/>
  <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor"/>
  <rect x="24" y="4" width="1.8" height="5" rx="0.9" fill="currentColor" opacity="0.5"/>
</svg>`;

/* ---- UI line icons (24px, 1.75 stroke, currentColor — DS "line 1.75") ---- */
function line(paths, { fill = false } = {}) {
  return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">${paths}</svg>`;
}
const S = `stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"`;

export const icons = {
  arrowLeft: line(`<path d="M15 19l-7-7 7-7" ${S}/>`),
  check: line(`<path d="M5 12.5l4.4 4.4L19 7" ${S}/>`),
  mapPin: line(
    `<path d="M20 10.5c0 5-8 11-8 11s-8-6-8-11a8 8 0 1 1 16 0Z" ${S}/><circle cx="12" cy="10.5" r="2.6" ${S}/>`
  ),
  search: line(
    `<circle cx="11" cy="11" r="7" ${S}/><path d="M20 20l-3.6-3.6" ${S}/>`
  ),
  locate: line(
    `<circle cx="12" cy="12" r="6.5" ${S}/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3" ${S}/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>`
  ),
  calendar: line(
    `<rect x="3.5" y="5" width="17" height="15.5" rx="3" ${S}/><path d="M3.5 9.5h17M8 3v4M16 3v4" ${S}/>`
  ),
  cap: line(
    `<path d="M12 4 1.8 9 12 14l10.2-5L12 4Z" ${S}/><path d="M6 11v4.4c0 1.3 2.7 2.6 6 2.6s6-1.3 6-2.6V11" ${S}/><path d="M22.2 9v5" ${S}/>`
  ),
  clock: line(
    `<circle cx="12" cy="12" r="8.2" ${S}/><path d="M12 7.2V12l3.2 2" ${S}/>`
  ),
  sliders: line(
    `<path d="M4 8h9M17 8h3M4 16h3M11 16h9" ${S}/><circle cx="15" cy="8" r="2.2" ${S}/><circle cx="9" cy="16" r="2.2" ${S}/>`
  ),
  info: line(
    `<circle cx="12" cy="12" r="8.4" ${S}/><path d="M12 11v5.2M12 7.9h.01" ${S}/>`
  ),
  alert: line(`<circle cx="12" cy="12" r="8.4" ${S}/><path d="M12 7.8v5M12 16.2h.01" ${S}/>`),
  alertTriangle: line(`<path d="M10.3 4.4 2.9 17.2A2 2 0 0 0 4.6 20.2h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z" ${S}/><path d="M12 9.5v4M12 16.8h.01" ${S}/>`),
  checkCircle: line(`<circle cx="12" cy="12" r="8.4" ${S}/><path d="m8.3 12.3 2.5 2.5 4.9-5" ${S}/>`),
  edit: line(`<path d="M4 20h4L18.6 9.4a2.8 2.8 0 0 0-4-4L4 16v4Z" ${S}/><path d="m13.5 6.5 4 4" ${S}/>`),
  swap: line(`<path d="M7 4 4 7l3 3M4 7h13M17 20l3-3-3-3M20 17H7" ${S}/>`),
  bed: line(`<path d="M3 18.5V6M3 14h18v4.5M21 14v-2.5a3 3 0 0 0-3-3h-7V14" ${S}/><circle cx="7" cy="10.5" r="1.8" ${S}/>`),
  walk: line(`<circle cx="13" cy="4.6" r="1.7" ${S}/><path d="m9 21 2.2-6.2L14 17v4M11.2 14.8l.8-5.3-3 1.2-1.5 3M12 9.5l2.6 2.4 2.9.8" ${S}/>`),
  food: line(`<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2.2 0-3.5 2.4-3.5 6.5V13H17" ${S}/>`),
  coffee: line(`<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" ${S}/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2M12 3.5v2" ${S}/>`),
  chat: line(`<path d="M20 11.5a7.5 7.5 0 0 1-11.2 6.5L4 19.5l1.5-4.6A7.5 7.5 0 1 1 20 11.5Z" ${S}/>`),
  chevronRight: line(`<path d="m9.5 5.5 6.5 6.5-6.5 6.5" ${S}/>`),
  trash: line(`<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.9 12a1.8 1.8 0 0 0 1.8 1.5h5.6a1.8 1.8 0 0 0 1.8-1.5l.9-12M10 11v6M14 11v6" ${S}/>`),
  copy: line(`<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.2" ${S}/><path d="M15.5 8.5V6.2A2.2 2.2 0 0 0 13.3 4H6.2A2.2 2.2 0 0 0 4 6.2v7.1a2.2 2.2 0 0 0 2.2 2.2h2.3" ${S}/>`),
  settings: line(`<circle cx="12" cy="12" r="3" ${S}/><path d="M19.4 14.6a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H10a1.6 1.6 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V10a1.6 1.6 0 0 0 1.5 1H20a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" ${S}/>`),
  rupee: line(`<path d="M7 4.5h10M7 9h10M9.5 4.5c3.3 0 5.3 1.4 5.3 4.5S12.8 13.5 9.5 13.5H7l7.5 6" ${S}/>`),
  users: line(`<circle cx="9" cy="8.5" r="3.2" ${S}/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.4c1.8.6 3 2.3 3 4.6" ${S}/>`),
  chevronUp: line(`<path d="M5.5 15 12 8.5l6.5 6.5" ${S}/>`),
  image: line(`<rect x="3.5" y="4.5" width="17" height="15" rx="2.5" ${S}/><circle cx="9" cy="10" r="1.8" ${S}/><path d="m20.5 16-4.8-4.8L6 19.5" ${S}/>`),
  clockLine: line(`<circle cx="12" cy="12" r="8.4" ${S}/><path d="M12 7.5V12l3 1.8" ${S}/>`),
  replan: line(`<path d="M20 11a8 8 0 1 0-2.3 5.6M20 5v6h-6" ${S}/>`),
  heartFilled: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 20.3s-7.2-4.4-9.4-9.1A5 5 0 0 1 12 6.6 5 5 0 0 1 21.4 11.2C19.2 15.9 12 20.3 12 20.3Z" fill="currentColor"/></svg>`,
  chevronDown: line(`<path d="M5.5 8.5 12 15l6.5-6.5" ${S}/>`),
  bell: line(
    `<path d="M6 9.5a6 6 0 0 1 12 0c0 3.6 1 5 1.8 6H4.2c.8-1 1.8-2.4 1.8-6Z" ${S}/><path d="M9.5 19.5a2.5 2.5 0 0 0 5 0" ${S}/>`
  ),
  mic: line(
    `<rect x="9" y="2.5" width="6" height="11" rx="3" ${S}/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" ${S}/>`
  ),
  home: line(`<path d="M4 10.2 12 4l8 6.2M6 9v10.5h4.5V14h3v5.5H18V9" ${S}/>`),
  compass: line(
    `<circle cx="12" cy="12" r="8.4" ${S}/><path d="m15.5 8.5-2.2 4.8L8.5 15.5l2.2-4.8 4.8-2.2Z" ${S}/>`
  ),
  suitcase: line(
    `<rect x="3.5" y="7.5" width="17" height="12" rx="2.5" ${S}/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3.5 13h17" ${S}/>`
  ),
  user: line(`<circle cx="12" cy="8" r="3.6" ${S}/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" ${S}/>`),
  share: line(
    `<path d="M12 3v11M8.6 6.4 12 3l3.4 3.4" ${S}/><path d="M7.5 10.5H6a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.5a2 2 0 0 0-2-2h-1.5" ${S}/>`
  ),
  close: line(`<path d="M6 6l12 12M18 6 6 18" ${S}/>`),
  plus: line(`<path d="M12 5v14M5 12h14" ${S}/>`),
  minus: line(`<path d="M5 12h14" ${S}/>`),
  sun: line(
    `<circle cx="12" cy="12" r="4.2" ${S}/><path d="M12 2.6v2.4M12 19v2.4M2.6 12H5M19 12h2.4M5.2 5.2 6.9 6.9M17.1 17.1l1.7 1.7M18.8 5.2 17.1 6.9M6.9 17.1 5.2 18.8" ${S}/>`
  ),
  sparkles: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5Z" fill="currentColor"/><path d="M18.5 14.2l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3Z" fill="currentColor"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 2.5l2.1 6.4 6.4 2.1-6.4 2.1L12 19.5l-2.1-6.4L3.5 11l6.4-2.1L12 2.5Z" fill="currentColor"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M7.5 5.2 18 12 7.5 18.8V5.2Z" fill="currentColor"/></svg>`,
  bus: line(
    `<rect x="4" y="3.5" width="16" height="13" rx="3" ${S}/><path d="M4 11.5h16" ${S}/><path d="M7.5 16.5 6.5 20M16.5 16.5l1 3.5" ${S}/><circle cx="8.3" cy="13.9" r="0.95" fill="currentColor" stroke="none"/><circle cx="15.7" cy="13.9" r="0.95" fill="currentColor" stroke="none"/>`
  ),
  train: line(
    `<rect x="5" y="3.5" width="14" height="12.5" rx="3" ${S}/><path d="M5 11h14M12 3.5V11" ${S}/><path d="M8.5 16 6.5 20M15.5 16l2 4" ${S}/><circle cx="8.5" cy="13.4" r="0.9" fill="currentColor" stroke="none"/><circle cx="15.5" cy="13.4" r="0.9" fill="currentColor" stroke="none"/>`
  ),
  car: line(
    `<path d="M4.5 12.5 6.2 7.6a2 2 0 0 1 1.9-1.35h7.8a2 2 0 0 1 1.9 1.35l1.7 4.9" ${S}/><rect x="3" y="12.5" width="18" height="5" rx="1.8" ${S}/><circle cx="7.5" cy="18.4" r="1.6" ${S}/><circle cx="16.5" cy="18.4" r="1.6" ${S}/>`
  ),
  heart: line(
    `<path d="M12 20.3s-7.2-4.4-9.4-9.1A5 5 0 0 1 12 6.6 5 5 0 0 1 21.4 11.2C19.2 15.9 12 20.3 12 20.3Z" ${S}/>`
  ),
  external: line(
    `<path d="M14 4h6v6M20 4l-8.5 8.5" ${S}/><path d="M18 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5" ${S}/>`
  ),
  cloudRain: line(
    `<path d="M7 15a4.2 4.2 0 0 1 .3-8.4 5 5 0 0 1 9.5 1.4A3.6 3.6 0 0 1 17 15Z" ${S}/><path d="M8.5 18l-.8 2M12 18l-.8 2M15.5 18l-.8 2" ${S}/>`
  ),
  link: line(
    `<path d="M9.5 14.5 14.5 9.5M8 12 6 14a3 3 0 0 0 4.2 4.2L13 15.5M11 8.5 13.8 5.8A3 3 0 0 1 18 10l-2 2" ${S}/>`
  ),
};

