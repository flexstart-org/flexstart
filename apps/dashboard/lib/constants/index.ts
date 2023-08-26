export const LOCALHOST_GEO_DATA = {
  city: "San Francisco",
  region: "CA",
  country: "US",
  latitude: "37.7695",
  longitude: "-122.385",
};

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring" } },
};

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export const SWIPE_REVEAL_ANIMATION_SETTINGS = {
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.2, bounce: 0 },
};

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const HOME_HOSTNAMES = new Set([
  // comment for better diffs
  "flexstart.org",
  "localhost",
  "localhost:3000",
]);

export const APP_HOSTNAMES = new Set([
  "app.flexstart.org",
  "app.localhost:3000",
  "preview.flexstart.org",
]);

export const RESERVED_KEYS = new Set([
  "api",
  "va",
  "static",
  "stats",
  "proxy",
  "auth",
  "pricing",
  "about",
  "metatags",
  "blog",
  "careers",
  "docs",
  "features",
  "contact",
  "terms",
  "privacy",
  "admin",
  "help",
  "new",
  "info",
  "demo",
  "mitesh",
  "flexstart",
]);
export const DEFAULT_REDIRECTS = {
  home: "https://flexstart.org",
  signin: "https://flexstart.org/login",
  login: "https://flexstart.org/login",
  register: "https://flexstart.org/register",
  signup: "https://flexstart.org/register",
  app: "https://flexstart.org",
  dashboard: "https://flexstart.org/dashboard",
  links: "https://flexstart.org/links",
  settings: "https://flexstart.org/settings",
  welcome: "https://flexstart.org/welcome",
  slack: "https://flexstart.slack.com",
  discord: "https://twitter.com/flexstart_org", // placeholder for now
};

export const FREE_PLAN_PROJECT_LIMIT = 1;
export const FAVICON_FOLDER = "/_static/favicons";
export const GOOGLE_FAVICON_URL =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";
export { default as COUNTRIES } from "./countries";
export { default as ccTLDs } from "./cctlds";

export const SECOND_LEVEL_DOMAINS = new Set([
  "com",
  "co",
  "net",
  "org",
  "edu",
  "gov",
  "in",
]);

export const SPECIAL_APEX_DOMAINS = {
  "youtu.be": "youtube.com",
};

export const DEFAULT_LINK_PROPS = {
  key: "github",
  url: "https://github.com/flexstart-org",
  domain: "flexstart.org",
  archived: false,
  expiresAt: null,
  password: null,

  title: null,
  description: null,
  image: null,
  ios: null,
  android: null,

  clicks: 0,
  userId: "",
  createdAt: new Date(),

  proxy: false,
};
