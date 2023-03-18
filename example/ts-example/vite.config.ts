import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSwaggerMock } from "../../dist/index";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    viteSwaggerMock({
      // swaggerUrl: "https://kg-cannon.staging.kuaishou.com",
      apiPrefix: "/api/api-docs",
      exportFile: true,
      docPath: "./src/apis",
      docFileName: "mock.ts",
      successCode: 0,
      errorCode: 500,
      arrayRandom: 20,
      override: false,
      mockEnabled: true,
      logger: true,
      validParams: false,
      mockFunc: {
        integer: "@integer(1, 10)",
      },
      exclude: ["/home/warmup", "/home/health"],
    }),
  ],
});
