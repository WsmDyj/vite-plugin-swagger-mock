import type {
  ViteMockOptions,
  MockData,
  MethodType,
  Definition,
  Recordable,
} from "../types";
import { fetchData, loggerOutput, getBraceContent } from "../utils";
import { getJsonDataKey, getParamData, keyInData, queryData } from "./model";
export default class Swagger {
  config: ViteMockOptions;
  constructor(opt: ViteMockOptions) {
    this.config = opt;
  }
  async getData(): Promise<MockData[]> {
    const data = await this.getDataFormSwagger();
    if (data) {
      const result = (await this.convertData(data)) as MockData[];
      return result;
    }
    return [];
  }
  async getDataFormSwagger() {
    try {
      const { swaggerUrl, apiPrefix } = this.config;
      const url = `${swaggerUrl}${apiPrefix}`;
      const swaggerData = await fetchData({ url });
      return swaggerData;
    } catch (error: any) {
      loggerOutput("fetch swagger is faild", error, "error");
    }
  }
  async convertData(data: any) {
    if (!data.paths || data.paths.length < 0) return [];
    return await new Promise((resolve) => {
      const allDealDataPromises: any[] = [];
      const apis = data.paths;
      const definitions = data.components.schemas;
      const result: any[] = [];
      for (const prop in apis) {
        const item = apis[prop];
        let dataModelFlag = "";
        for (const type in item) {
          // 兼容restful接口
          const restfulId = getBraceContent(prop);
          const url = prop.replace("{", ":").replace("}", "");
          if (this.config.exclude?.some((it) => it === url)) {
            continue;
          }
          const d: MockData = {
            url,
            method: type as MethodType,
            desc: item[type].summary,
            params: [],
          };
          // 解析出参
          dataModelFlag = getJsonDataKey(item[type].responses);
          if (dataModelFlag) {
            const promise = this.dealData({
              prevKey: dataModelFlag,
              definition: definitions[dataModelFlag],
              definitionMap: definitions,
            })
              .then((data: any) => {
                if (data.data) {
                  // 设置code
                  data.data.code = this.config.successCode || 0;
                  d.data = data.data;
                  if (!keyInData(item[type].operationId, result)) {
                    result.push(d);
                  }
                }
              })
              .catch((error: any) => {
                loggerOutput("convert swagger data is faild", error, "error");
              });
            allDealDataPromises.push(promise);
          } else {
            d.data = this.config.mockFunc?.string;
            if (!keyInData(item[type].operationId, result)) {
              result.push(d);
            }
          }
          // 解析入参
          if (item[type].parameters) {
            d.params.push(
              ...getParamData(item[type].parameters, definitions, restfulId)
            );
          }
          if (item[type].requestBody) {
            const { content, description, ...body } = item[type].requestBody;
            const requestBody = [
              { ...content["application/json"], ...body, name: description },
            ];
            d.params.push(...getParamData(requestBody, definitions, restfulId));
          }
        }
      }
      Promise.all(allDealDataPromises).then(() => {
        resolve(result);
      });
    });
  }

  async dealData(def: Definition) {
    let result: any = {};
    const definition = def.definition;
    const type = definition && definition.type ? definition.type : "";
    if (type) {
      if (type == "string") {
        result = this.config.mockFunc?.string;
      }
      if (type == "integer") {
        result = this.config.mockFunc?.integer;
      }
      if (type == "boolean") {
        result = this.config.mockFunc?.boolean;
      }
      if (type == "object") {
        if (definition.properties) {
          result = definition.properties;
          for (const key in result) {
            if (
              result[key].type &&
              result[key].type == "array" &&
              result[key]["$ref"] &&
              queryData(result[key]["$ref"]) == def.prevKey
            ) {
              result[key] = {};
            } else {
              this.dealData({
                prevKey: key,
                definition: result[key],
                definitionMap: def.definitionMap,
              }).then((data) => {
                // 设置数组
                if (result[key]?.type == "array") {
                  result[`${key}|1-${this.config.arrayRandom}`] = [data.data];
                  delete result[key];
                } else {
                  result[key] = data.data;
                }
              });
            }
          }
        } else {
          result = {};
        }
      }
      if (type == "array") {
        const items = def.definition.items;
        if (items.type) {
          result =
            items.type === "string"
              ? this.config.mockFunc?.string
              : this.config.mockFunc?.integer;
        } else {
          const objKey: string = queryData(items["$ref"]);
          //防止递归数据造成死循环
          if (objKey != def.prevKey) {
            this.dealData({
              prevKey: objKey,
              definition: def.definitionMap[objKey],
              definitionMap: def.definitionMap,
            }).then((data) => {
              result = Object.assign(result as Recordable, data.data);
            });
          } else {
            result = {};
          }
        }
      }
    } else {
      const goObject =
        def.definition && def.definition["$ref"] ? def.definition["$ref"] : "";
      if (goObject) {
        const objKey = queryData(goObject);
        this.dealData({
          prevKey: objKey,
          definition: def.definitionMap[objKey],
          definitionMap: def.definitionMap,
        }).then((data) => {
          result = Object.assign(result as Recordable, data.data);
        });
      } else {
        result = this.config.mockFunc?.string;
      }
    }
    return {
      data: result,
    };
  }
}
