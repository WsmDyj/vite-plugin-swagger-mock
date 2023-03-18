/*
 * @Description: 工具函数
 */
import type { ViteMockOptions } from "./types";
import axios from "axios";
import chalk from "chalk";
import consola from "consola";

export function setDefalutopt(opt: ViteMockOptions) {
  return deepMerge(
    {
      arrayRandom: 20,
      mockFunc: {
        string: "@csentence()",
        integer: "@integer(1, 100)",
        boolean: "@boolean()",
      },
      exclude: [],
      logger: false,
      override: false,
      docPath: "./src/apis",
      docFileName: "mock.ts",
      errorCode: 500,
      successCode: 0,
      validParams: true,
    },
    opt
  );
}

function cloneDeep(target: any) {
  if (typeof target === "object") {
    const cloneTarget: any = Array.isArray(target) ? [] : {};
    const keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
      cloneTarget[keys[i]] = cloneDeep(target[keys[i]]);
    }
    return cloneTarget;
  }
  return target;
}

export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = cloneDeep(src);
  for (key in target) {
    res[key] = isObject(res[key])
      ? deepMerge(res[key], target[key])
      : (res[key] = target[key]);
  }
  return res;
}

export const fetchData = async (opts: { url: string }) => {
  return await new Promise((resolve, reject) => {
    axios({
      url: opts.url,
    })
      .then((data: any) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export function loggerOutput(
  title: string,
  msg?: string,
  type: "info" | "error" = "info"
) {
  const tag =
    type === "info"
      ? chalk.cyan.bold(`[vite:swagger-mock]`)
      : chalk.red.bold(`[vite:swagger-mock]`);
  const color = type === "info" ? "green" : "red";
  return consola[type](
    `${chalk.dim(new Date().toLocaleTimeString())} ${tag} ${chalk[color](
      title
    )} ${chalk.dim(msg)}`
  );
}

export function getBraceContent(str: string) {
  const arr = str.match(/{(.*?)}/g) || [];
  return arr?.map((it) => it.replace("{", "").replace("}", ""));
}
