import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  manifest: {
    name: "AWS Account Name",
    permissions: ["activeTab", "storage"],
  },
});
