// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Vangmay";
export const SITE_DESCRIPTION =
  "Welcome to my homepage! I like to write about my experiences and also interesting things that I keep learning.";
export const TWITTER_HANDLE = "@yourtwitterhandle";
export const MY_NAME = "Vangmay";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
