/* data.js — static dummy data for every screen. */

export const brand = {
  name: "untrail",
  tagline: "Find your weekend.",
  pitch: "Your weekend, planned in 60 seconds.",
};

/* Splash timeline (ms). Total intro ≈ 2000ms, then it settles. */
export const splashTimeline = {
  roadStart: 160,
  roadEnd: 760,
  pinStart: 840,
  pinEnd: 1220,
  wordmarkStart: 1240,
  wordmarkEnd: 1620,
  taglineStart: 1560,
  taglineEnd: 1960,
  settle: 2000,
  handoff: 2500, // when the splash auto-advances to Welcome
};

/* ---------------- Flow 2 · Onboarding ---------------- */

export const welcome = {
  heading: "Your weekend, planned in 60 seconds",
  body:
    "Answer 4 quick, tap-only steps. We find places you can actually reach this weekend — with real timings, stays and costs.",
  bullets: [
    "Real prices and timings from your city",
    "Only places that work for 2–3 days",
    "Share the plan with friends on WhatsApp",
  ],
  hero: "assets/photos/welcome-hero.jpg",
};

export const popularCities = [
  { id: "delhi", name: "Delhi NCR", sub: "Delhi, Gurugram, Noida" },
  { id: "bengaluru", name: "Bengaluru", sub: "Karnataka" },
  { id: "mumbai", name: "Mumbai", sub: "Maharashtra" },
  { id: "indore", name: "Indore", sub: "Madhya Pradesh" },
];

export const getawayOptions = [
  { id: "weekends", icon: "calendar", title: "Weekends", sub: "Fri night to Sunday" },
  { id: "college", icon: "cap", title: "College breaks", sub: "Exam & semester gaps" },
  { id: "flex", icon: "clock", title: "Flexible weekdays", sub: "Mid-week works too" },
  { id: "varies", icon: "sliders", title: "It varies", sub: "I pick dates each time" },
];

export const aboutHint =
  "We’ll plan Friday-night departures and flag long weekends, so you need 0 leaves.";

export const companyOptions = ["Solo", "Partner", "Friends", "Family"];

export const vibeOptions = [
  { id: "hills", label: "Hills & mountains", img: "assets/photos/hills.png" },
  { id: "beaches", label: "Beaches & lakes", img: "assets/photos/beaches.png" },
  { id: "cafes", label: "Cafés & food", img: "assets/photos/cafes.png" },
  { id: "heritage", label: "Heritage & forts", img: "assets/photos/heritage.png" },
  { id: "adventure", label: "Adventure & treks", img: "assets/photos/adventure.png" },
  { id: "chill", label: "Chill & stay-in", img: "assets/photos/chill.png" },
  { id: "waterfalls", label: "Waterfalls & forests", img: "assets/photos/waterfalls.png" },
  { id: "spiritual", label: "Spiritual & temples", img: "assets/photos/spiritual.png" },
];
export const VIBE_LIMIT = 3;

export const budgetOptions = ["Under ₹3k", "₹3–6k", "₹6–10k", "₹10k+"];
export const budgetHint =
  "Most people from Delhi spend ₹3–6k each on a 2-day hill trip — that covers bus, stay and food.";
export const transportOptions = ["Bus", "Train", "Own car"];
export const offbeatOptions = ["Famous spots", "A mix", "Mostly hidden gems"];

/* ---------------- Flow 3 · Profile → Home → Planning ---------------- */

export const persona = {
  overline: "YOU’RE A",
  title: "Hills & Café Explorer",
  body:
    "Calm hill towns with good cafés — famous ones and hidden gems — under ₹6k each, by bus or train from Delhi.",
  builtFrom: "Built from your 4 answers",
};

export const profilePicks = [
  { name: "Kasauli", meta: "5h · ₹3.8k", img: "assets/photos/hills.png" },
  { name: "Lansdowne", meta: "6h · ₹3.2k", img: "assets/photos/beaches.png" },
  { name: "Chakrata", meta: "7h · hidden gem", img: "assets/photos/waterfalls.png" },
];

export const answerTags = ["Hills & cafés", "Weekends", "₹3–6k each", "Bus or train", "4 friends"];

export const home = {
  location: "Delhi NCR",
  greeting: "Good evening, Aarav",
  title: "Where to this weekend?",
  composerPlaceholder: "Describe a weekend or paste a reel link",
  prefChips: ["This weekend", "4 friends", "₹3–6k each", "Hills · Cafés"],
  tryAsking: ["Check a reel", "Long weekend, 0 leaves", "Under 5h from Delhi", "Waterfalls & forests"],
  gems: [
    { id: "chakrata", name: "Chakrata", meta: "7h · ₹3,500 each", img: "assets/photos/waterfalls.png" },
    { id: "kanatal", name: "Kanatal", meta: "7h · ₹3,900 each", img: "assets/photos/adventure.png" },
    { id: "mukteshwar", name: "Mukteshwar", meta: "8h · ₹4,200 each", img: "assets/photos/beaches.png" },
  ],
  nudge: {
    title: "Long weekend in 9 days",
    sub: "Fri 31 Oct – Sun 2 Nov · 0 leaves needed",
  },
  picks: [
    { name: "Kasauli", meta: "5h · ₹3,800 · sunny", weather: "16°C sunny", img: "assets/photos/hills.png" },
    { name: "Lonavala", meta: "2h · ₹2,900 · cafés", weather: "16°C sunny", img: "assets/photos/cafes.png" },
    { name: "Lansdowne", meta: "6h · ₹3,200 · lake walks", weather: "16°C sunny", img: "assets/photos/beaches.png" },
  ],
  tabs: [
    { id: "home", label: "Home", icon: "home" },
    { id: "explore", label: "Explore", icon: "compass" },
    { id: "trips", label: "Trips", icon: "suitcase" },
    { id: "profile", label: "Profile", icon: "user" },
  ],
};

export const tripDetails = {
  title: "Trip details",
  when: ["This weekend", "Next weekend", "Pick dates"],
  group: { label: "Friends", sub: "Including you", count: 4 },
  budget: ["Under ₹3k", "₹3–6k", "₹6–10k"],
};

export const planning = {
  title: "Finding your weekend",
  subtitle: "Delhi · Fri 24 – Sun 26 Oct · 4 friends · ₹3–6k each",
  steps: [
    "46 bus & train routes checked",
    "Weather checked in 18 places",
    "Reading 2,300 traveller reviews…",
  ],
  footer: "Usually 2–3 hours of research. Here, about 20 seconds.",
};

/* ---------------- Flow 4 · Pick a weekend & decide with your group ---------------- */

export const top3 = {
  statusNote: "18 places checked · every top 3 includes a hidden gem",
  filters: ["Cheaper", "Closer", "More offbeat"],
  places: [
    {
      id: "kasauli",
      name: "Kasauli",
      img: "assets/photos/hills.png",
      badge: { tone: "brand", label: "Best match" },
      transport: { icon: "bus", text: "Bus · 5h overnight · ₹3,800 each" },
      weather: { icon: "sun", text: "16°C sunny · crowd low" },
      note: "Quiet cafés, fits ₹3–6k, back by Sun 10 pm",
    },
    {
      id: "lansdowne",
      name: "Lansdowne",
      img: "assets/photos/beaches.png",
      badge: { tone: "neutral", label: "Cheapest", icon: "rupee" },
      transport: { icon: "bus", text: "Bus · 6h overnight · ₹3,200 each" },
      weather: { icon: "cloudRain", text: "19°C, light rain Sat · crowd medium" },
      note: "Lowest cost, lake walks, fewer cafés",
    },
    {
      id: "chakrata",
      name: "Chakrata",
      img: "assets/photos/waterfalls.png",
      badge: { tone: "gem", label: "Hidden gem", icon: "sparkle" },
      transport: { icon: "car", text: "Car · 7h · ₹3,500 each" },
      weather: { icon: "sun", text: "14°C sunny · crowd very low" },
      note: "Pine forests and falls, far fewer crowds",
    },
  ],
};

const comparePlaces = {
  kasauli: { id: "kasauli", name: "Kasauli", img: "assets/photos/hills.png", badge: { tone: "brand", label: "Best match" } },
  lansdowne: { id: "lansdowne", name: "Lansdowne", img: "assets/photos/beaches.png", badge: { tone: "neutral", label: "Cheapest", icon: "rupee" } },
  chakrata: { id: "chakrata", name: "Chakrata", img: "assets/photos/waterfalls.png", badge: { tone: "gem", label: "Hidden gem", icon: "sparkle" } },
};

/* One entry per pair you can pick in Top 3 (Figma: 11 Compare + its two variants). */
export const comparePairs = {
  "kasauli|lansdowne": {
    a: comparePlaces.kasauli, b: comparePlaces.lansdowne,
    rows: [
      { label: "Cost each", a: "₹3,800", b: "₹3,200", win: "b" },
      { label: "Travel", a: "5h bus", b: "6h bus", win: "a" },
      { label: "Weather", a: "16°C sunny", b: "Light rain", win: "a" },
      { label: "Crowd", a: "Low", b: "Medium", win: null },
      { label: "Stay from", a: "₹1,400", b: "₹1,200", win: "b" },
    ],
    take: "Pick Kasauli if you want cafés and an easy bus. Pick Lansdowne if budget matters more than food.",
  },
  "kasauli|chakrata": {
    a: comparePlaces.kasauli, b: comparePlaces.chakrata,
    rows: [
      { label: "Cost each", a: "₹3,800", b: "₹3,500", win: "b" },
      { label: "Travel", a: "5h bus", b: "7h car", win: "a" },
      { label: "Weather", a: "16°C sunny", b: "14°C sunny", win: null },
      { label: "Crowd", a: "Low", b: "Very low", win: "b" },
      { label: "Stay from", a: "₹1,400", b: "₹1,100", win: "b" },
    ],
    take: "Pick Kasauli for cafés and an easier bus. Pick Chakrata for pine forests and almost no crowds.",
  },
  "lansdowne|chakrata": {
    a: comparePlaces.lansdowne, b: comparePlaces.chakrata,
    rows: [
      { label: "Cost each", a: "₹3,200", b: "₹3,500", win: "a" },
      { label: "Travel", a: "6h bus", b: "7h car", win: "a" },
      { label: "Weather", a: "Light rain", b: "14°C sunny", win: "b" },
      { label: "Crowd", a: "Medium", b: "Very low", win: "b" },
      { label: "Stay from", a: "₹1,200", b: "₹1,100", win: "b" },
    ],
    take: "Pick Lansdowne to save money and an hour of travel. Pick Chakrata for better weather and real quiet.",
  },
};
export const compare = comparePairs["kasauli|lansdowne"];

export const placeDetails = {
  id: "kasauli",
  tag: { label: "Best match", icon: "sparkle" },
  cta: "Save & share",
  name: "Kasauli, Himachal",
  distance: "290 km from Delhi NCR · about 5h 30m by road",
  slides: [
    "assets/photos/hills.png",
    "assets/photos/cafes.png",
    "assets/photos/chill.png",
    "assets/photos/kasauli-4.png",
  ],
  reasons: [
    { title: "Fits your ₹3–6k budget", sub: "₹3,800 each for bus, stay and food" },
    { title: "Quiet cafés, like your vibe", sub: "Mall Road has 6 cafés, most open by 9 am" },
    { title: "Back by Sunday 10 pm", sub: "Overnight bus both ways, 0 leaves needed" },
  ],
  review: {
    initials: "RS",
    handle: "@riya.wanders",
    quote:
      "“Mall Road is packed after 5 pm — walk Gilbert Trail in the morning instead. Bus was on time.”",
    meta: "Went 4 days ago · from Delhi · 3 friends",
  },
  route: { distance: "290 km · 5h 30m drive", via: "Delhi NCR → Kasauli via NH 44", from: "Delhi NCR", to: "Kasauli" },
  transport: [
    { icon: "bus", title: "Overnight Volvo · Kashmere Gate", sub: "10:30 pm → 4:00 am · 5h 30m", price: "₹850" },
    { icon: "train", title: "Kalka Shatabdi · New Delhi", sub: "7:40 am → 11:45 am · then 1h cab", price: "₹1,050" },
    { icon: "car", title: "Drive via NH 44", sub: "6h 10m · tolls ~₹450", price: "₹2,400" },
  ],
  stay: { name: "Pine View homestay", sub: "2 nights · 1.2 km from Mall Road", price: "₹1,400", priceSub: "/ night · fits budget", img: "assets/photos/chill.png" },
  price: "₹3,800 / person",
  priceSub: "₹15,200 for 4 · see breakdown",
};

/* Figma: 12 Place details · Lansdowne */
export const placeDetailsLansdowne = {
  id: "lansdowne",
  tag: { label: "Cheapest", icon: "rupee" },
  cta: "Save to Trips",
  name: "Lansdowne, Uttarakhand",
  distance: "250 km from Delhi NCR · about 6h by road",
  slides: [
    "assets/photos/beaches.png",
    "assets/photos/spiritual.png",
    "assets/photos/chill.png",
    "assets/photos/kasauli-4.png",
  ],
  reasons: [
    { title: "Cheapest of your 3 picks", sub: "₹3,200 each for bus, stay and food" },
    { title: "Lake walks & a quiet cantonment", sub: "Bhulla Lake and Tip-n-Top, both walkable" },
    { title: "Light rain on Saturday", sub: "Indoor café plan ready if it pours" },
  ],
  review: {
    initials: "RS",
    handle: "@riya.wanders",
    quote: "“Bhulla Lake is calm early morning. Evenings get misty — carry a light rain jacket.”",
    meta: "Went 4 days ago · from Delhi · 3 friends",
  },
  route: { distance: "250 km · 6h drive", via: "Delhi NCR → Lansdowne via Kotdwar", from: "Delhi NCR", to: "Lansdowne" },
  transport: [
    { icon: "bus", title: "Overnight Volvo · Kashmere Gate", sub: "10:30 pm → 4:00 am · 5h 30m", price: "₹850" },
    { icon: "train", title: "Garhwal Express · to Kotdwar", sub: "10:30 pm → 5:20 am · then 1h cab", price: "₹1,050" },
    { icon: "car", title: "Drive via Meerut & Kotdwar", sub: "6h · tolls ~₹350", price: "₹2,400" },
  ],
  stay: { name: "Lake View cottage", sub: "2 nights · 400 m from Bhulla Lake", price: "₹1,200", priceSub: "/ night · fits budget", img: "assets/photos/chill.png" },
  price: "₹3,200 / person",
  priceSub: "₹12,800 for 4 · see breakdown",
};

export const groupShare = {
  title: "Ask your group on WhatsApp",
  body: "We write the message for you. Friends just reply in the chat — no app or login needed.",
  preview: {
    heading: "Weekend plan · reply A or B",
    lines: [
      "A) Kasauli — ₹3,800 each · 5h bus · sunny",
      "B) Lansdowne — ₹3,200 each · 6h bus · light rain",
      "Reply by tonight, 9 pm",
    ],
    link: "untrail.app/t/k7×2",
  },
  toggles: [
    { id: "cost", label: "Show cost per person", on: true },
    { id: "replyby", label: "Add a reply-by time", on: true },
  ],
};

export const decide = {
  title: "Did your group decide?",
  body: "Tell us what you picked on WhatsApp and we’ll finish the plan.",
  options: [
    { id: "kasauli", name: "Kasauli", sub: "Riya and Kabir voted A" },
    { id: "lansdowne", name: "Lansdowne", sub: "Cheaper, Neha’s pick" },
    { id: "undecided", name: "Not decided yet", sub: "Remind the group instead" },
  ],
  hint: "Not decided? We’ll send a gentle reminder with the same link.",
};

/* ---------------- Flow 5 · The plan, swaps & your trips ---------------- */

export const weekendPlan = {
  title: "Kasauli weekend",
  dates: "Fri 24 – Sun 26 Oct · 4 friends",
  budget: "₹3,800 each · within budget",
  refine: ["More relaxed", "Add food", "Cheaper stay"],
  price: "₹3,800 / person",
  priceSub: "₹15,200 for 4 · see breakdown",
  // type: "transport" → Change, "activity" → Swap
  days: [
    {
      label: "FRI NIGHT",
      stops: [
        { id: "bus-out", type: "transport", icon: "bus", time: "10:30 pm", title: "Overnight bus", sub: "Kashmere Gate · 5h · ₹850" },
      ],
    },
    {
      label: "SATURDAY",
      stops: [
        { id: "checkin", type: "transport", icon: "bed", time: "6:00 am", title: "Check in · Pine View", sub: "2 nights · ₹1,400/night" },
        { id: "gilbert", type: "activity", icon: "walk", time: "10:00 am", title: "Gilbert Trail walk", sub: "2 hrs · free · easy" },
        { id: "lunch", type: "activity", icon: "food", time: "1:30 pm", title: "Lunch on Mall Road", sub: "≈ ₹400 per person" },
        { id: "sunset", type: "activity", icon: "sun", time: "5:30 pm", title: "Sunset at Sunset Point", sub: "1 hr · 20 min walk" },
      ],
    },
    {
      label: "SUNDAY",
      stops: [
        { id: "breakfast", type: "activity", icon: "coffee", time: "9:00 am", title: "Breakfast at a Mall Road café", sub: "≈ ₹250 per person" },
        { id: "bus-back", type: "transport", icon: "bus", time: "4:00 pm", title: "Bus back to Delhi", sub: "Reach Kashmere Gate by 10 pm · ₹850" },
      ],
    },
  ],
};

/* Swap ideas per stop. Gilbert Trail is from the Figma; others are plausible samples. */
export const swapIdeas = {
  gilbert: [
    { title: "Heritage walk & brewery visit", short: "Heritage walk & brewery", sub: "2 hrs · ₹200 each", note: "Popular with friend groups", delta: "+₹200", tone: "neutral", icon: "walk", img: "assets/photos/heritage.png", toast: "Swapped to Heritage walk" },
    { title: "Church & Mall Road walk", short: "Church & Mall Road walk", sub: "1.5 hrs · free", note: "Easy, great for photos", delta: "₹0", tone: "neutral", icon: "walk", img: "assets/photos/cafes.png", toast: "Swapped to Church & Mall Road walk" },
    { title: "Sleep in + café breakfast", short: "Sleep in + café breakfast", sub: "Relaxed morning", note: "Best after an overnight bus", delta: "−₹300", tone: "success", icon: "coffee", img: "assets/photos/chill.png", toast: "Swapped to a slow morning" },
  ],
  default: [
    { title: "Picnic at Monkey Point", short: "Picnic at Monkey Point", sub: "2 hrs · ₹100 each", note: "Quiet views — carry snacks", delta: "+₹100", tone: "neutral", icon: "sun", img: "assets/photos/hills.png", toast: "Swapped to Monkey Point picnic" },
    { title: "Café hop on Upper Mall", short: "Café hop on Upper Mall", sub: "1.5 hrs · ≈ ₹350 each", note: "Good for a slow afternoon", delta: "₹0", tone: "neutral", icon: "coffee", img: "assets/photos/cafes.png", toast: "Swapped to a café hop" },
    { title: "Rest at the homestay", short: "Rest at the homestay", sub: "Free time", note: "Recharge before the evening", delta: "−₹250", tone: "success", icon: "bed", img: "assets/photos/chill.png", toast: "Swapped to rest time" },
  ],
};

export const savedTrip = {
  title: "Your Kasauli weekend is saved",
  meta: "Fri 24 – Sun 26 Oct · 4 friends · ₹3,800 each",
  card: {
    name: "Kasauli weekend",
    sub: "In 3 days · Fri 24 – Sun 26 Oct · 4 friends",
    shared: "Shared with Weekend gang",
    leave: "Leave by 9:45 pm Fri · ISBT Kashmere Gate",
    img: "assets/photos/hills.png",
  },
  tip: "Planned in 2 min 10 s — that usually takes 10–15 tabs and an evening.",
};

export const sharePlan = {
  heading: "Our Kasauli weekend",
  lines: ["Fri 24 – Sun 26 Oct · 4 friends", "Overnight bus Fri 10:30 pm · Pine View homestay", "₹3,800 each · within budget"],
  link: "untrail.app/t/k7×2",
  options: [
    { id: "whatsapp", icon: "chat", title: "WhatsApp", sub: "Send to a chat or group", brand: true, toast: "Plan shared on WhatsApp", toastIcon: "checkCircle" },
    { id: "copy", icon: "copy", title: "Copy link", sub: "Paste it anywhere", toast: "Link copied — paste it anywhere", toastIcon: "copy" },
    { id: "more", icon: "share", title: "More apps", sub: "Telegram, Instagram, email…", toast: "Plan shared", toastIcon: "checkCircle" },
  ],
};

export const myTrips = {
  rain: { title: "Rain likely Sat afternoon", sub: "Indoor café plan is ready", cta: "Use rain plan" },
  waiting: { title: "Lansdowne vs Chakrata", sub: "Asked on WhatsApp · 1 day ago", cta: "We picked" },
  drafts: [{ title: "Rishikesh · long weekend", sub: "Plan 70% ready · resume where you left", img: "assets/photos/spiritual.png" }],
  ideasNote: "Places you've hearted or saved from reels. We'll tell you when one fits a free weekend.",
  ideas: [
    { id: "kasol", name: "Kasol, Himachal", sub: "11h from Delhi · best Mar–Jun", tag: { tone: "success", icon: "check", label: "Doable this weekend" }, img: "assets/photos/adventure.png" },
    { id: "gokarna", name: "Gokarna, Karnataka", sub: "Flight + 1h · best Oct–Mar", tag: { tone: "warning", icon: "alertTriangle", label: "Long weekend only" }, img: "assets/photos/gokarna.png" },
    { id: "chakrata", name: "Chakrata, Uttarakhand", sub: "7h from Delhi · very few crowds", tag: { tone: "gem", icon: "sparkle", label: "Hidden gem" }, img: "assets/photos/waterfalls.png" },
    { id: "landour", name: "Landour, Mussoorie", sub: "7h from Delhi · cafés & walks", tag: { tone: "success", icon: "check", label: "Doable this weekend" }, img: "assets/photos/cafes.png" },
  ],
  past: [{ title: "Neemrana Fort · Sep", sub: "Rate it & add photos — helps the next traveller", img: "assets/photos/heritage.png" }],
  empty: {
    title: "No trip ideas yet",
    body: "Tap the heart on any place, or share a reel from Instagram to untrail. It will wait here until a free weekend fits.",
    cta: "Explore places",
    link: "How to save a reel from Instagram",
  },
};

/* ---------------- Flow 6 · Explore, reels & profile ---------------- */

/* Hidden-gems feed (Explore). Chakrata is from the Figma; others are plausible samples. */
export const gems = [
  {
    id: "chakrata", name: "Chakrata, Uttarakhand", short: "Chakrata", img: "assets/photos/waterfalls.png",
    hours: 7, price: 3500, doable: true,
    travel: "7h by bus or car · ₹3,500 each", weather: "14°C sunny · very few crowds",
    take: "Pine forests and Tiger Falls — about 40 visitors a week, vs 2,000+ in Mussoorie.",
    by: "@riya.wanders · verified trip · 4 days ago",
    distance: "320 km from Delhi NCR · about 7h by road",
    vs: "Mussoorie",
    rows: [
      { label: "Visitors / week", a: "~40", b: "2,000+", win: "a" },
      { label: "Cost each", a: "₹3,500", b: "₹4,800", win: "a" },
      { label: "Travel", a: "7h", b: "6h", win: "b" },
      { label: "Roads", a: "Narrow, slow", b: "Good", win: "b" },
    ],
    route: { distance: "320 km · 7h drive", via: "Delhi NCR → Chakrata via Dehradun" },
    review: { initials: "RS", handle: "@riya.wanders", quote: "“Mall Road is packed after 5 pm — walk Gilbert Trail in the morning instead. Bus was on time.”", meta: "Went 4 days ago · from Delhi · 3 friends" },
    photos: 12, total: "₹14,000 for 4",
  },
  {
    id: "kanatal", name: "Kanatal, Uttarakhand", short: "Kanatal", img: "assets/photos/adventure.png",
    hours: 7, price: 3900, doable: true,
    travel: "7h by car · ₹3,900 each", weather: "11°C clear · quiet on weekends",
    take: "Ridge camps facing the snow peaks and the Surkanda Devi trek — without Mussoorie's traffic.",
    by: "@trailsbyneha · verified trip · 1 week ago",
    distance: "300 km from Delhi NCR · about 7h by road",
    vs: "Mussoorie",
    rows: [
      { label: "Visitors / week", a: "~150", b: "2,000+", win: "a" },
      { label: "Cost each", a: "₹3,900", b: "₹4,800", win: "a" },
      { label: "Travel", a: "7h", b: "6h", win: "b" },
      { label: "Stays", a: "Camps, cottages", b: "Hotels", win: null },
    ],
    route: { distance: "300 km · 7h drive", via: "Delhi NCR → Kanatal via Rishikesh" },
    review: { initials: "NK", handle: "@trailsbyneha", quote: "“Sunrise from the ridge camp was the best part. Carry a warm layer — it drops to 4°C at night.”", meta: "Went 1 week ago · from Gurugram · 4 friends" },
    photos: 9, total: "₹15,600 for 4",
  },
  {
    id: "mukteshwar", name: "Mukteshwar, Uttarakhand", short: "Mukteshwar", img: "assets/photos/beaches.png",
    hours: 8, price: 4200, doable: false,
    travel: "8h by bus · ₹4,200 each", weather: "12°C sunny · crowd low",
    take: "Orchards, a 350-year-old temple and Chauli ki Jali cliffs — stays under ₹1,500 a night.",
    by: "@kabir.outdoors · verified trip · 6 days ago",
    distance: "345 km from Delhi NCR · about 8h by road",
    vs: "Nainital",
    rows: [
      { label: "Visitors / week", a: "~300", b: "5,000+", win: "a" },
      { label: "Cost each", a: "₹4,200", b: "₹4,500", win: "a" },
      { label: "Travel", a: "8h", b: "7h", win: "b" },
      { label: "Stays", a: "Homestays", b: "Hotels", win: null },
    ],
    route: { distance: "345 km · 8h drive", via: "Delhi NCR → Mukteshwar via Haldwani" },
    review: { initials: "KS", handle: "@kabir.outdoors", quote: "“Book the overnight Volvo to Haldwani — the cab up the hill takes another 2.5 hours.”", meta: "Went 6 days ago · from Noida · 2 friends" },
    photos: 7, total: "₹16,800 for 4",
  },
  {
    id: "tijara", name: "Tijara Fort, Rajasthan", short: "Tijara", img: "assets/photos/heritage.png",
    hours: 3, price: 3200, doable: true,
    travel: "3h by car · ₹3,200 each", weather: "26°C sunny · crowd low",
    take: "A restored hill fort with terraced gardens — the closest quiet getaway from Delhi.",
    by: "@meera.goes · verified trip · 3 days ago",
    distance: "110 km from Delhi NCR · about 3h by road",
    vs: "Neemrana",
    rows: [
      { label: "Visitors / week", a: "~120", b: "1,500+", win: "a" },
      { label: "Cost each", a: "₹3,200", b: "₹5,500", win: "a" },
      { label: "Travel", a: "3h", b: "2.5h", win: "b" },
      { label: "Vibe", a: "Quiet, slow", b: "Busy", win: "a" },
    ],
    route: { distance: "110 km · 3h drive", via: "Delhi NCR → Tijara via NH 48" },
    review: { initials: "MG", handle: "@meera.goes", quote: "“Go for the sunset from the top terrace. Weekday rates are almost half.”", meta: "Went 3 days ago · from Delhi · 4 friends" },
    photos: 10, total: "₹12,800 for 4",
  },
];

export const feedTabs = [
  { id: "foryou", label: "For you" },
  { id: "under6", label: "Under 6h" },
  { id: "under4k", label: "Under ₹4k" },
];

export const reelCheck = {
  sampleLink: "instagram.com/reel/C8xQ2wLp3",
  found: {
    name: "Kasol, Himachal", reels: 3,
    rows: [
      { icon: "clockLine", label: "Travel", value: "7h from Delhi" },
      { icon: "rupee", label: "Cost", value: "₹3,500 each" },
      { icon: "sun", label: "Weather", value: "14°C sunny" },
      { icon: "users", label: "Crowd", value: "Very low" },
    ],
    hint: "Leave Friday 9 pm by overnight bus — you’ll be back by Sunday night.",
  },
};

export const profilePage = {
  name: "Aarav Sharma",
  initials: "AS",
  freeWeekends: { title: "Your free weekends", sub: "We’ll ping you 10 days before each one" },
  rows: [
    { id: "prefs", icon: "sliders", title: "Weekend preferences", sub: "Vibe, budget, how offbeat" },
    { id: "city", icon: "mapPin", title: "Starting city", sub: "Delhi NCR" },
    { id: "notifs", icon: "bell", title: "Notifications", sub: "Long weekends, weather changes" },
    { id: "lang", icon: "chat", title: "Language", sub: "English · हिंदी" },
    { id: "help", icon: "info", title: "Help & feedback", sub: "Tell us what to improve" },
  ],
};

/* Defaults mirror the Figma "selected" states so the wizard starts valid. */
export const onboardingDefaults = {
  startCity: null,
  getaway: "weekends",
  company: "Friends",
  vibes: ["hills", "cafes"],
  budget: "₹3–6k",
  transport: ["Bus", "Train"],
  offbeat: "A mix",
};
