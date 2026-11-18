/* router.js — screen stack with enter/exit transitions.
 * Minimal for flow 1; built to extend as flows are added.
 */

export function createRouter({ mount, routes }) {
  const stack = [];

  function clear() {
    mount.querySelectorAll(".screen").forEach((s) => {
      s.dispatchEvent(new CustomEvent("screen:destroy"));
      s.remove();
    });
    // dismiss any open sheets/toasts tied to the leaving screen
    mount.querySelectorAll(".sheet-backdrop").forEach((b) => b.remove());
  }

  function applyStatusTheme(node) {
    const sb = document.getElementById("statusbar");
    if (!sb) return;
    const theme = node.dataset.sb || "light";
    sb.dataset.theme = theme;
    sb.classList.remove("is-solid");
    const phone = document.getElementById("phone");
    if (phone) phone.dataset.chrome = theme; // lets immersive screens darken the home indicator too
  }

  async function render(name, params = {}, { direction = "forward" } = {}) {
    const factory = routes[name];
    if (!factory) {
      console.warn(`[router] unknown route: ${name}`);
      return;
    }
    const node = factory(params, api);
    node.classList.add("screen");
    if (direction !== "none") {
      node.classList.add(
        direction === "back" ? "screen--enter-back" : "screen--enter"
      );
    }
    clear();
    mount.append(node);
    applyStatusTheme(node);
    // force reflow then release to trigger the transition
    void node.offsetWidth;
    node.classList.remove("screen--enter", "screen--enter-back");
    return node;
  }

  const api = {
    go(name, params, opts) {
      stack.push({ name, params });
      return render(name, params, { direction: "forward", ...opts });
    },
    replace(name, params, opts) {
      stack[stack.length - 1] = { name, params };
      return render(name, params, { direction: "none", ...opts });
    },
    back() {
      if (stack.length <= 1) return;
      stack.pop();
      const prev = stack[stack.length - 1];
      return render(prev.name, prev.params, { direction: "back" });
    },
    current() {
      return stack[stack.length - 1];
    },
  };

  return api;
}
