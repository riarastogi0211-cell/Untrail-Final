/* store.js — localStorage adapter + pub/sub + reset.
 * Silent in-memory fallback when storage is unavailable (private mode).
 */

import { onboardingDefaults } from "./data.js";

const KEY = "untrail.state.v1";

const defaultState = {
  hasSeenSplash: false,
  onboardingComplete: false,
  onboarding: { ...onboardingDefaults },
};

let memoryFallback = false;
let memoryStore = null;

function readRaw() {
  if (memoryFallback) return memoryStore;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    memoryFallback = true;
    return memoryStore;
  }
}

function writeRaw(obj) {
  if (memoryFallback) {
    memoryStore = obj;
    return;
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch (_) {
    memoryFallback = true;
    memoryStore = obj;
  }
}

let state = { ...defaultState, ...(readRaw() || {}) };
const subscribers = new Set();

function notify() {
  subscribers.forEach((fn) => fn(state));
}

export const store = {
  get(key) {
    return key ? state[key] : state;
  },
  set(patch) {
    state = { ...state, ...patch };
    writeRaw(state);
    notify();
  },
  subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
  patchOnboarding(patch) {
    state = { ...state, onboarding: { ...state.onboarding, ...patch } };
    writeRaw(state);
    notify();
  },
  reset() {
    state = { ...defaultState, onboarding: { ...onboardingDefaults } };
    writeRaw(state);
    notify();
  },
  get usingMemoryFallback() {
    return memoryFallback;
  },
};
