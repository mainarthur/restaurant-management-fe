import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";

export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color ": "#323cf0",
          "border-color-base": "#848484",
        },
        javascriptEnabled: true,
      },
    },
  },
});
