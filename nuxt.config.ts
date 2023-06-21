// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Kompletecare",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: ["nuxt-icon", "@nuxtjs/google-fonts", "@nuxtjs/apollo"],
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@/assets/css/style.css",
    "vue-toast-notification/dist/theme-default.css",
  ],
  googleFonts: {
    families: {
      Roboto: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
  script: [
    {
      src: [
        "bootstrap/dist/js/bootstrap.bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      ],
    },
  ],
  plugins: [{ src: "~/plugins/toast", mode: "client" }],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://testdrive.kompletecare.com/graphql",
      },
    },
  },
});
