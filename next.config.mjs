await import("./src/env.mjs")

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    domains: ["ofehkuhumrsbyulhfeme.supabase.co"],
  },

  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
}

export default config
