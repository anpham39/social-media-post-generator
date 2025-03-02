// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  ssr: false,
  compatibilityDate: "2024-12-10",
  runtimeConfig: {
      OPENAI_API_KEY: "",
  }
});