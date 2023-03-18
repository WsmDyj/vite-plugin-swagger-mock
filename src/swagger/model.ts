//数据查找路径，针对swagger返回数据的特殊处理
export function queryData(hash: any) {
  let result = "";
  if (hash) {
    result = hash.substring(2, hash.length).split("/");
  }
  return result[2] || "";
}

//获取json数据的key
export function getJsonDataKey(responses: any): any {
  const schema = responses["200"].content["*/*"].schema;
  const mockJsonKey = schema ? schema["$ref"] : "";
  return queryData(mockJsonKey);
}
export function keyInData(id: string, arr: any) {
  let result = false;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.id == id) {
      result = true;
    }
  }
  return result;
}

function getParamSchemaData(key: string, definitionMap: any): any {
  const validResult: any = [];
  const defineKey = queryData(key);
  const props = definitionMap[defineKey].properties;
  for (const key in props) {
    const prop = props[key];
    const validItem: any = {};
    if (prop.$ref) {
      validItem.type = "object";
      validItem.desc = prop.description;
      validItem.param = getParamSchemaData(prop.$ref, definitionMap);
    } else {
      validItem.name = key;
      validItem.type = prop.type;
      validItem.desc = prop.description;
    }
    validResult.push(validItem);
  }
  return validResult;
  // definitionMap[key];
}

//解析API参数
export function getParamData(
  params: any,
  definitions: any,
  restfulId: string[]
) {
  const result: any[] = [];
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const p: any = {};
    if (param.schema) {
      p.type = "object";
      p.value = param.name;
      if (param.schema["$ref"]) {
        p.child = getParamSchemaData(param.schema["$ref"], definitions);
      } else {
        p.type = param.schema.type;
      }
      p.required = param.required;
    } else {
      p.type = param.type ? param.type : "string";
      p.value = param.name;
      p.required = param.required;
    }
    p.required = param.required;
    p.desc = param.description;
    // 去除restful的参数校验
    if (!restfulId.some((it) => it === p.value)) {
      result.push(p);
    }
  }
  return result;
}
