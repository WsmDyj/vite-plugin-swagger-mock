# vite-plugin-swagger-mock

vite 的数据模拟插件，是基于 vite.js 开发的。 并同时支持 swagger、参数校验等功能，通过 mockjs 模拟线上真实接口。

### 安装 (yarn or npm)

```bash
yarn add @ksg/vite-plugin-swagger-mock -D
# or
npm i @ksg/vite-plugin-swagger-mock -D
```

## 使用

- vite.config.ts 配置

```ts
import { viteSwaggerMock } from "@ksg/vite-plugin-swagger-mock";
export default () => {
  return {
    plugins: [
      viteSwaggerMock({
        swaggerUrl: "https://kg-cannon.staging.kuaishou.com",
        apiPrefix: "/api/api-docs",
      }),
    ],
  };
};
```

- viteSwaggerMock 配置

```ts
{
  // swagger 文档地址
  swaggerUrl?: string
  // 后端接口前缀
  apiPrefix?: string
  // 是否导出 mock 数据
  exportFile?: boolean
  // 导出的文件路径
  docPath?: string
  // 导出的文件名
  docFileName?: string
  // 不需要处理的接口
  exclude?: string[]
  // 接口成功 code 值
  successCode?: number
  // 接口失败 code 值
  errorCode?: number
  // 随机生成数组的条数
  arrayRandom?: number
  // 重启服务时是否重新生成 mock 文件
  override?: boolean
  // 是否开启 mock 服务
  mockEnabled?: boolean
  // mockjs 自定义配置
  mockFunc?: MockFunc
  // 是否在控制台输出变更 mock 日志
  logger?: boolean
  // 是否校验接口参数
  validParams?: boolean
}
```

### mockFunc

用户可以自定义生成 mock 规则，其中包含 string、integer、boolean 类型
**default**

```javascript
mockFunc: {
  string: "@csentence()",
  integer: "@integer(1, 100)",
  boolean: "@boolean()",
},

```

## 注意事项

- 在使用本地 mock 文件模拟接口需关闭系统 package.json 文件中的 type:module，否则无法读取到 mock file 文件中导出内容
- mock 需勿开启请求接口的域名，否则无法监听到本地接口，通过这特性可以在业务中自定义实现单个接口的 mock 开关
