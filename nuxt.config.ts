// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  spaLoadingTemplate: "./spa-loading-template.html",

  routeRules: {
    "/": { prerender: true },
    "/auth/**": { ssr: true },
    "/user": { ssr: true },
    "backpack/**": { ssr: false },
    "map/**": { ssr: false },
    "fishspot/**": { ssr: false },
    "record/**": { ssr: false },
    "history/**": { ssr: false },
    "profile/**": { ssr: false },
  },

  devtools: { enabled: true },
  modules: [
    "@vant/nuxt",
    "@unocss/nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],

  css: ["@unocss/reset/tailwind.css"],

  postcss: {
    plugins: {
      autoprefixer: {},

      // https://github.com/wswmsword/postcss-mobile-forever
      "postcss-mobile-forever": {
        appSelector: "#__nuxt",
        viewportWidth: 375,
        maxDisplayWidth: 600,
        // devtools excluded
        exclude: /@nuxt/,
        rootContainingBlockSelectorList: ["van-tabbar", "van-popup"],
      },
    },
  },

  app: {
    head: {
      viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
      link: [{ rel: "icon", href: "/favicon.ico", sizes: "any" }],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "description", content: "pure-log" },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#ffffff",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#222222",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  colorMode: {
    classSuffix: "",
  },
});
