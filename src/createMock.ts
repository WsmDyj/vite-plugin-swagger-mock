import type { ViteMockOptions, MockData, Recordable } from './types'
import { pathToRegexp } from 'path-to-regexp'
import { NextHandleFunction } from 'connect'
import Swagger from './swagger'
import Mock from 'mockjs'
import chokidar from 'chokidar'
import url from 'url'
import { loggerOutput } from './utils'
import { validParam } from './swagger/validParms'
import { mockFileExists, writeMockFile, readMockFile } from './file'

export let mockData: MockData[] = []

let mockFilePath: string | boolean

export async function createMock(opt: ViteMockOptions) {
  const { exportFile, swaggerUrl } = opt

  mockFilePath = await mockFileExists(opt)

  /*
   * 1、如果设置了override 每次根据swagger重新请求
   * 2、如果有mock文件就不在请求swagger, 直接读本地
   */
  const isFetchSwagger = (swaggerUrl && !mockFilePath) || opt.override
  if (isFetchSwagger) {
    const swagger = new Swagger(opt)
    mockData = await swagger.getData()
  } else {
    mockData = await readMockFile()
  }
  /*
   * 1、如果设置了override 重新生成mock文件
   * 2、如果有mock文件不在生成
   */
  if ((exportFile && !mockFilePath) || opt.override) {
    await writeMockFile(mockData)
  }
  // 监听watch
  mockFilePath && (await watcherMockFile(opt))
}

// watcher mock file
async function watcherMockFile(opt: ViteMockOptions) {
  const { logger } = opt
  const watcher = chokidar.watch(mockFilePath as string, {
    ignoreInitial: true,
  })
  watcher.on('all', async (event, file) => {
    logger && loggerOutput(`mock file ${event}`, file)
    cleanRequireCache()
    mockData = await readMockFile()
  })
}

// clear cache
function cleanRequireCache() {
  if (!require.cache) {
    return
  }
  Object.keys(require.cache).forEach((file) => {
    if (file === mockFilePath) {
      delete require.cache[file]
    }
  })
}

// 接口拦截
export async function requestMiddleware(opt: ViteMockOptions) {
  const middlewares: NextHandleFunction = async (req, res, next) => {
    let queryParams: {
      query?: Recordable
      body?: Recordable
      pathname?: string | null
    } = {}

    if (req.url) {
      queryParams = url.parse(req.url, true)
    }

    const reqUrl = queryParams.pathname || (req.headers[':path'] as string)
    console.log(mockData)
    // 路由匹配
    const matchRequest = mockData.find((item) => {
      if (!reqUrl || !item || ['node_modules'].some((it) => reqUrl?.includes(it))) {
        return false
      }
      if (item.method && item.method.toUpperCase() !== req.method) {
        return false
      }
      return pathToRegexp(opt.apiPrefix + item.url).test(reqUrl)
    })
    
    if (matchRequest) {
      const { params } = matchRequest
      req.on('data', (chunk) => {
        // 解析 application/json
        // TODO 解析其他格式
        const bodyCon = JSON.parse(chunk)
        queryParams.body = bodyCon
      })
      req.on('end', () => {
        res.setHeader('Content-Type', 'application/json')
        const errMsg = validParam(queryParams, params)
        if (!errMsg || !opt.validParams) {
          res.end(JSON.stringify(Mock.mock(matchRequest.data)))
        } else {
          res.end(JSON.stringify({ code: opt.errorCode, msg: `${errMsg}` }))
        }
      })
      return
    }
    next()
  }
  return middlewares
}
