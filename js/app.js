/* app.js — entry: status bar, route table, initial route, theme. */

import { renderStatusBar } from "./components.js";
import { createRouter } from "./router.js";
import { routes } from "./screens.js";

/* Uniformly scale the true 402×874 phone to fit the window without distortion.
 * Below 520px the frame drops (CSS), so no scaling is applied there. */
function fitPhone() {
  const fit = document.getElementById("phone-fit");
  if (!fit) return;
  const W = 402, H = 874, GAP = 32;
  if (window.innerWidth <= 520) {
    fit.style.removeProperty("--fit");
    fit.style.removeProperty("width");
    fit.style.removeProperty("height");
    return;
  }
  const scale = Math.min(1, (window.innerHeight - GAP) / H, (window.innerWidth - GAP) / W);
  fit.style.setProperty("--fit", String(scale));
  // Reserve the scaled footprint so the stage centers it with no scrollbars.
  fit.style.width = W * scale + "px";
  fit.style.height = H * scale + "px";
}

function boot() {
  const statusbar = document.getElementById("statusbar");
  const app = document.getElementById("app");
  if (statusbar) renderStatusBar(statusbar);

  fitPhone();
  window.addEventListener("resize", fitPhone, { passive: true });

  const router = createRouter({ mount: app, routes });

  // Flow 1 starts at the splash.
  router.go("splash", {}, { direction: "none" });

  // expose for console / future flows
  window.untrail = { router };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
