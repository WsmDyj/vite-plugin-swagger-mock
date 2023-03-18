/*
 * @Description: 文件操作类
 */
import type { MockData, ViteMockOptions, NodeModuleWithCompile } from "./types";
import { writeFile, access, mkdir } from "fs/promises";
import path from "path";
import module from "module";
import { build } from "esbuild";
import { loggerOutput } from "./utils";

// mock file Path
let filePath: string;

export async function mockFileExists(
  opt: ViteMockOptions
): Promise<string | boolean> {
  const { docPath, docFileName } = opt;
  let isExists: boolean | string;
  filePath = path.resolve(docPath as string, docFileName as string);
  isExists = filePath;
  await access(filePath).catch(() => (isExists = false));
  return isExists;
}

// writeFile mock file
export const writeMockFile = async (mockData: MockData[]) => {
  await mkdir(path.dirname(filePath), {
    recursive: true,
  });
  const fileContent = `export default ${JSON.stringify(mockData, null, 2)}`;
  try {
    await writeFile(filePath, fileContent, "utf8");
  } catch (error: any) {
    loggerOutput(`Write mock file is filed`, error, "error");
  }
};

// read mock file
export const readMockFile = async (): Promise<MockData[] | []> => {
  if (!filePath) {
    loggerOutput("mock file path is not found");
    return [];
  }
  const result = await build({
    entryPoints: [filePath],
    outfile: "out.js",
    write: false,
    platform: "node",
    bundle: true,
    format: "cjs",
    metafile: true,
    target: "es2015",
  });
  const { text } = result.outputFiles[0];
  return await loadConfigFromBundledFile(filePath, text);
};

// Parse file content
async function loadConfigFromBundledFile(
  fileName: string,
  bundledCode: string
) {
  const extension = path.extname(fileName);

  // @ts-expect-error
  const extensions = module.Module._extensions;
  let defaultLoader: any;
  const isJs = extension === ".js";
  if (isJs) {
    defaultLoader = extensions[extension]!;
  }
  extensions[extension] = (module: NodeModule, filename: string) => {
    if (filename === fileName) {
      (module as NodeModuleWithCompile)._compile(bundledCode, filename);
    } else {
      if (!isJs) {
        extensions[extension]!(module, filename);
      } else {
        defaultLoader(module, filename);
      }
    }
  };
  let config;
  try {
    if (isJs && require && require.cache) {
      delete require.cache[fileName];
    }
    const raw = require(fileName);
    config = raw.__esModule ? raw.default : raw;
    if (defaultLoader && isJs) {
      extensions[extension] = defaultLoader;
    }
  } catch (error: any) {
    config = [];
    loggerOutput(
      `Parse mock file is filed, 请关闭项目中package.json 的 "type": "module" \n`,
      error,
      "error"
    );
  }
  return config;
}
