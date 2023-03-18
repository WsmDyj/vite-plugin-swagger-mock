import type { Plugin, ResolvedConfig } from "vite";
import type { ViteMockOptions } from "./types";
import { createMock, requestMiddleware } from "./createMock";
import { setDefalutopt } from "./utils";

export function viteSwaggerMock(opt: ViteMockOptions): Plugin {
  opt = setDefalutopt(opt);
  let config: ResolvedConfig;
  let isDev = false;
  return {
    name: "vite:swaggerMock",
    enforce: "pre",
    configResolved: async (resolvedConfig: ResolvedConfig) => {
      config = resolvedConfig;
      isDev = config.command === "serve";
      isDev && (await createMock(opt));
    },
    configureServer: async ({ middlewares }) => {
      const { mockEnabled = isDev } = opt;
      if (!mockEnabled) {
        return;
      }
      const middleware = await requestMiddleware(opt);
      middlewares.use(middleware);
    },
  };
}

export * from "./types";
