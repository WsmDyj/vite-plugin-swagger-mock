export interface ViteMockOptions {
  // swagger文档地址ip或者域名
  swaggerUrl?: string;
  // 后端接口前缀
  apiPrefix?: string;
  // 是否导出mock数据
  exportFile?: boolean;
  // 导出的文件路径
  docPath?: string;
  // 导出的文件名
  docFileName?: string;
  // 不需要处理的接口
  exclude?: string[];
  // 接口成功code值
  successCode?: number;
  // 接口失败code值
  errorCode?: number;
  // 数组生成随机数
  arrayRandom?: number;
  // 重启服务时是否重新生成mock文件
  override?: boolean;
  // 是否开启mock服务
  mockEnabled?: boolean;
  // mockjs配置
  mockFunc?: MockFunc;
  // 是否在控制台输出变更mock日志
  logger?: boolean;
  // 是否校验接口参数
  validParams?: boolean;
}

export interface Responses {
  code?: number;
  msg?: string;
  data: any;
  [key: string]: any;
}

export interface MockData {
  id?: string; //唯一ID
  url: string; //接口路径
  method: MethodType; //请求类型
  params: any; // 入参
  data?: Responses | string; // 出参数
  [propName: string]: any;
}

export type Recordable<T = any> = Record<string, T>;

export interface Definition {
  prevKey: string;
  definition: any; //当前数据格式
  definitionMap: any; //全部数据格式Map
}

export type MethodType = "get" | "post" | "put" | "delete" | "patch";

export interface MockFunc {
  string?: string;
  integer?: string;
  boolean?: string;
}

export type MockFunckey = keyof MockFunc;

export interface NodeModuleWithCompile extends NodeModule {
  _compile(code: string, filename: string): any;
}
