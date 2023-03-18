/*
 * @Description: 参数校验
 */
export function validParam(queryParams: any, data: any) {
  const params = getParamByType(queryParams);
  let result = "";
  const errorRequired = validRequired(params, data);
  const errorType = validType(params, data);
  if (errorRequired.length > 0) {
    result += `【${errorRequired.join("、")}】必填`;
  }
  if (errorType.length > 0) {
    result += `【${errorType.join("、")}】传入类型错误`;
  }
  return result;
}

function getParamByType(ctx: any) {
  let params = {};
  if (ctx.params) {
    params = Object.assign(params, ctx.params);
  }
  if (ctx?.query) {
    params = Object.assign(params, ctx.query);
  }
  if (ctx?.body) {
    params = Object.assign(params, ctx.body);
  }
  return params;
}

//校验必填
function validRequired(inParams: any, data: any) {
  const error: string[] = [];
  if (!data && data.length) return error;
  for (let idx = 0; idx < data.length; idx++) {
    const item = data[idx];
    if (item.type !== "object") {
      if (item.required && !inParams[item.value]) {
        //检查传参中是不是存在必填项
        error.push(item.value);
      }
    } else {
      item.child.forEach((it: any) => {
        if (!inParams[it.name] && item.required) {
          //检查传参中是不是存在必填项
          error.push(it.name);
        }
      });
    }
  }
  return error;
}

//校验入参格式
function validType(inParams: any, data: any) {
  const error: string[] = [];
  if (!data && data.length) return error;
  for (const prop in inParams) {
    const param = getParamByName(prop, data);
    if (!param) return error;
    if (typeof inParams[prop] != param.type) {
      if (!(param.type == "integer" && !isNaN(parseInt(inParams[prop])))) {
        error.push(param.name);
      }
    }
  }
  return error;
}

//获取对应参数的值
function getParamByName(key: string, params: any) {
  let result: any = null;
  for (let idx = 0; idx < params.length; idx++) {
    const item = params[idx];
    if (item.type !== "object") {
      if (key === item.value) {
        result = item;
      }
    } else {
      item.child.forEach((it: any) => {
        if (key === it.name) {
          result = it;
        }
      });
    }
  }
  return result;
}
