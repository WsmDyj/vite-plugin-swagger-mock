export default [
  {
    url: "/usecase",
    method: "get",
    desc: "获取用例列表",
    params: [
      {
        type: "object",
        value: "useCaseQueryParam",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "项目id",
          },
          {
            name: "projectModuleId",
            type: "integer",
            desc: "模块id",
          },
          {
            name: "caseNameKeyWord",
            type: "string",
            desc: "用例名称",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
      "data|1-20": [
        {
          id: "@integer(1, 10)",
          createTime: "@integer(1, 10)",
          createdBy: "@csentence()",
          updateTime: "@integer(1, 10)",
          updatedBy: "@csentence()",
          projectId: "@integer(1, 10)",
          serialNumber: "@integer(1, 10)",
          caseName: "@csentence()",
          projectModuleId: "@integer(1, 10)",
          projectModuleName: "@csentence()",
          description: "@csentence()",
          executeCommand: "@csentence()",
          executionTimes: "@integer(1, 10)",
          operator: "@csentence()",
          operatorTime: "@integer(1, 10)",
        },
      ],
    },
  },
  {
    url: "/usecase",
    method: "post",
    desc: "创建用例",
    params: [
      {
        type: "object",
        value: "用例对象",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "所属项目id",
          },
          {
            name: "caseName",
            type: "string",
            desc: "用例名称",
          },
          {
            name: "projectModuleId",
            type: "integer",
            desc: "用例模块id",
          },
          {
            name: "description",
            type: "string",
            desc: "用例描述",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/usecase/:id",
    method: "get",
    desc: "获取用例详情",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {
        id: "@integer(1, 10)",
        createTime: "@integer(1, 10)",
        createdBy: "@csentence()",
        updateTime: "@integer(1, 10)",
        updatedBy: "@csentence()",
        projectId: "@integer(1, 10)",
        serialNumber: "@integer(1, 10)",
        caseName: "@csentence()",
        projectModuleId: "@integer(1, 10)",
        projectModuleName: "@csentence()",
        description: "@csentence()",
        executeCommand: "@csentence()",
        executionTimes: "@integer(1, 10)",
        operator: "@csentence()",
        operatorTime: "@integer(1, 10)",
      },
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/usecase/:id",
    method: "post",
    desc: "修改用例",
    params: [
      {
        type: "object",
        value: "用例对象",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "所属项目id",
          },
          {
            name: "caseName",
            type: "string",
            desc: "用例名称",
          },
          {
            name: "projectModuleId",
            type: "integer",
            desc: "用例模块id",
          },
          {
            name: "description",
            type: "string",
            desc: "用例描述",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/usecase/:id",
    method: "delete",
    desc: "删除用例",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task",
    method: "get",
    desc: "获取任务列表",
    params: [
      {
        type: "integer",
        value: "projectId",
        required: true,
        desc: "项目id",
      },
      {
        type: "string",
        value: "taskName",
        required: false,
        desc: "任务名称",
      },
      {
        type: "string",
        value: "useCaseName",
        required: false,
        desc: "用例名称",
      },
      {
        type: "integer",
        value: "runningStatus",
        required: false,
        desc: "任务状态",
      },
      {
        type: "integer",
        value: "pageSize",
        required: false,
        desc: "分页大小",
      },
      {
        type: "integer",
        value: "pageNo",
        required: false,
        desc: "页码",
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {
        total: "@integer(1, 10)",
        cursor: "@csentence()",
        "list|1-20": [
          {
            id: "@integer(1, 10)",
            createTime: "@integer(1, 10)",
            createdBy: "@csentence()",
            updateTime: "@integer(1, 10)",
            updatedBy: "@csentence()",
            projectId: "@integer(1, 10)",
            serialNumber: "@integer(1, 10)",
            taskName: "@csentence()",
            startTime: "@integer(1, 10)",
            endTime: "@integer(1, 10)",
            runningStatus: "@integer(1, 10)",
            runningTime: "@integer(1, 10)",
            increaseTime: "@integer(1, 10)",
            concurrency: "@integer(1, 10)",
            perCpuCore: "@integer(1, 10)",
            perMemorySize: "@integer(1, 10)",
            description: "@csentence()",
            executedBy: "@csentence()",
            version: "@integer(1, 10)",
            otherParams: {
              ignored: "@csentence()",
            },
            taskCommand: {
              id: "@integer(1, 10)",
              createTime: "@integer(1, 10)",
              createdBy: "@csentence()",
              updateTime: "@integer(1, 10)",
              updatedBy: "@csentence()",
              projectId: "@integer(1, 10)",
              useCaseId: "@integer(1, 10)",
              projectModuleId: "@integer(1, 10)",
              taskId: "@integer(1, 10)",
              useCaseName: "@csentence()",
              executeCommand: "@csentence()",
              executeWeight: "@integer(1, 10)",
            },
          },
        ],
      },
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task",
    method: "post",
    desc: "创建任务",
    params: [
      {
        type: "object",
        value: "任务对象",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "所属项目id",
          },
          {
            name: "taskName",
            type: "string",
            desc: "任务名称",
          },
          {
            name: "runningTime",
            type: "integer",
            desc: "任务运行时长-单位毫秒，最大999小时59分59秒",
          },
          {
            name: "increaseTime",
            type: "integer",
            desc: "压力爬坡时间-单位毫秒，最大999小时59分59秒",
          },
          {
            name: "concurrency",
            type: "integer",
            desc: "进程数",
          },
          {
            name: "perCpuCore",
            type: "integer",
            desc: "单进程核数，单位个",
          },
          {
            name: "perMemorySize",
            type: "integer",
            desc: "单进程内存大小，单位MB",
          },
          {
            name: "description",
            type: "string",
            desc: "任务描述",
          },
          {
            type: "object",
            param: [],
          },
          {
            type: "object",
            param: [
              {
                name: "useCaseId",
                type: "integer",
                desc: "用例id",
              },
              {
                name: "executeCommand",
                type: "string",
                desc: "执行指令",
              },
              {
                name: "executeWeight",
                type: "integer",
                desc: "执行权重",
              },
            ],
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: "@integer(1, 10)",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/:taskId/copy",
    method: "post",
    desc: "复制任务",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: "@integer(1, 10)",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/:taskId/copy/execution",
    method: "post",
    desc: "复制任务并执行",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: "@integer(1, 10)",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/:id",
    method: "get",
    desc: "获取任务详情",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {
        taskVo: {
          id: "@integer(1, 10)",
          createTime: "@integer(1, 10)",
          createdBy: "@csentence()",
          updateTime: "@integer(1, 10)",
          updatedBy: "@csentence()",
          projectId: "@integer(1, 10)",
          serialNumber: "@integer(1, 10)",
          taskName: "@csentence()",
          startTime: "@integer(1, 10)",
          endTime: "@integer(1, 10)",
          runningStatus: "@integer(1, 10)",
          runningTime: "@integer(1, 10)",
          increaseTime: "@integer(1, 10)",
          concurrency: "@integer(1, 10)",
          perCpuCore: "@integer(1, 10)",
          perMemorySize: "@integer(1, 10)",
          description: "@csentence()",
          executedBy: "@csentence()",
          version: "@integer(1, 10)",
          otherParams: {
            ignored: "@csentence()",
          },
          taskCommand: {
            id: "@integer(1, 10)",
            createTime: "@integer(1, 10)",
            createdBy: "@csentence()",
            updateTime: "@integer(1, 10)",
            updatedBy: "@csentence()",
            projectId: "@integer(1, 10)",
            useCaseId: "@integer(1, 10)",
            projectModuleId: "@integer(1, 10)",
            taskId: "@integer(1, 10)",
            useCaseName: "@csentence()",
            executeCommand: "@csentence()",
            executeWeight: "@integer(1, 10)",
          },
        },
        useCaseVo: {
          id: "@integer(1, 10)",
          createTime: "@integer(1, 10)",
          createdBy: "@csentence()",
          updateTime: "@integer(1, 10)",
          updatedBy: "@csentence()",
          projectId: "@integer(1, 10)",
          serialNumber: "@integer(1, 10)",
          caseName: "@csentence()",
          projectModuleId: "@integer(1, 10)",
          projectModuleName: "@csentence()",
          description: "@csentence()",
          executeCommand: "@csentence()",
          executionTimes: "@integer(1, 10)",
          operator: "@csentence()",
          operatorTime: "@integer(1, 10)",
        },
      },
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/:id",
    method: "post",
    desc: "修改任务",
    params: [
      {
        type: "object",
        value: "任务对象",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "所属项目id",
          },
          {
            name: "taskName",
            type: "string",
            desc: "任务名称",
          },
          {
            name: "runningTime",
            type: "integer",
            desc: "任务运行时长-单位毫秒，最大999小时59分59秒",
          },
          {
            name: "increaseTime",
            type: "integer",
            desc: "压力爬坡时间-单位毫秒，最大999小时59分59秒",
          },
          {
            name: "concurrency",
            type: "integer",
            desc: "进程数",
          },
          {
            name: "perCpuCore",
            type: "integer",
            desc: "单进程核数，单位个",
          },
          {
            name: "perMemorySize",
            type: "integer",
            desc: "单进程内存大小，单位MB",
          },
          {
            name: "description",
            type: "string",
            desc: "任务描述",
          },
          {
            type: "object",
            param: [],
          },
          {
            type: "object",
            param: [
              {
                name: "useCaseId",
                type: "integer",
                desc: "用例id",
              },
              {
                name: "executeCommand",
                type: "string",
                desc: "执行指令",
              },
              {
                name: "executeWeight",
                type: "integer",
                desc: "执行权重",
              },
            ],
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/:id/start",
    method: "post",
    desc: "启动任务",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/:id/abort",
    method: "post",
    desc: "中止任务",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/execution",
    method: "post",
    desc: "创建任务并执行",
    params: [
      {
        type: "object",
        value: "任务对象",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "所属项目id",
          },
          {
            name: "taskName",
            type: "string",
            desc: "任务名称",
          },
          {
            name: "runningTime",
            type: "integer",
            desc: "任务运行时长-单位毫秒，最大999小时59分59秒",
          },
          {
            name: "increaseTime",
            type: "integer",
            desc: "压力爬坡时间-单位毫秒，最大999小时59分59秒",
          },
          {
            name: "concurrency",
            type: "integer",
            desc: "进程数",
          },
          {
            name: "perCpuCore",
            type: "integer",
            desc: "单进程核数，单位个",
          },
          {
            name: "perMemorySize",
            type: "integer",
            desc: "单进程内存大小，单位MB",
          },
          {
            name: "description",
            type: "string",
            desc: "任务描述",
          },
          {
            type: "object",
            param: [],
          },
          {
            type: "object",
            param: [
              {
                name: "useCaseId",
                type: "integer",
                desc: "用例id",
              },
              {
                name: "executeCommand",
                type: "string",
                desc: "执行指令",
              },
              {
                name: "executeWeight",
                type: "integer",
                desc: "执行权重",
              },
            ],
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: "@integer(1, 10)",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/project",
    method: "get",
    desc: "获取当前用户相关的项目列表",
    params: [
      {
        type: "object",
        value: "projectQueryParam",
        child: [
          {
            name: "roleList",
            type: "array",
            desc: "角色列表，为空查询出当前人员相关的所有游戏",
          },
          {
            name: "releaseRegion",
            type: "integer",
            desc: "发行区域",
          },
          {
            name: "nameOrCodeKeyWord",
            type: "string",
            desc: "项目名称或代号关键字",
          },
          {
            name: "orderById",
            type: "boolean",
            desc: "根据id排序 true-正序，false-倒序，null-不限制",
          },
          {
            name: "orderByName",
            type: "boolean",
            desc: "根据游戏名称排序，true-正序，false-倒序，null-不限制",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
      "data|1-20": [
        {
          id: "@integer(1, 10)",
          createTime: "@integer(1, 10)",
          createdBy: "@csentence()",
          updateTime: "@integer(1, 10)",
          updatedBy: "@csentence()",
          projectName: "@csentence()",
          projectCode: "@csentence()",
          releaseRegion: "@integer(1, 10)",
          buildStatus: "@integer(1, 10)",
          mainScriptId: "@integer(1, 10)",
          mainScriptName: "@csentence()",
          description: "@csentence()",
        },
      ],
    },
  },
  {
    url: "/project",
    method: "post",
    desc: "创建项目",
    params: [
      {
        type: "object",
        value: "项目对象",
        child: [
          {
            name: "projectName",
            type: "string",
            desc: "项目名称",
          },
          {
            name: "projectCode",
            type: "string",
            desc: "项目代号",
          },
          {
            name: "releaseRegion",
            type: "integer",
            desc: "发行区域",
          },
          {
            name: "description",
            type: "string",
            desc: "描述",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/project/:projectId",
    method: "get",
    desc: "获取项目详情",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {
        id: "@integer(1, 10)",
        createTime: "@integer(1, 10)",
        createdBy: "@csentence()",
        updateTime: "@integer(1, 10)",
        updatedBy: "@csentence()",
        projectName: "@csentence()",
        projectCode: "@csentence()",
        releaseRegion: "@integer(1, 10)",
        buildStatus: "@integer(1, 10)",
        mainScriptId: "@integer(1, 10)",
        mainScriptName: "@csentence()",
        description: "@csentence()",
      },
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/project/:projectId",
    method: "post",
    desc: "修改项目",
    params: [
      {
        type: "object",
        value: "项目对象",
        child: [
          {
            name: "projectName",
            type: "string",
            desc: "项目名称",
          },
          {
            name: "projectCode",
            type: "string",
            desc: "项目代号",
          },
          {
            name: "releaseRegion",
            type: "integer",
            desc: "发行区域",
          },
          {
            name: "description",
            type: "string",
            desc: "描述",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/project/:projectId",
    method: "delete",
    desc: "删除项目",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/project/:projectId/config",
    method: "get",
    desc: "查询项目配置",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {
        projectId: "@integer(1, 10)",
        fileKey: "@csentence()",
        fileUrl: "@csentence()",
        fileName: "@csentence()",
        "envParams|1-20": [
          {
            id: "@integer(1, 10)",
            createTime: "@integer(1, 10)",
            createdBy: "@csentence()",
            updateTime: "@integer(1, 10)",
            updatedBy: "@csentence()",
            projectId: "@integer(1, 10)",
            paramKey: "@csentence()",
            paramValue: "@csentence()",
          },
        ],
      },
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/project/:projectId/config",
    method: "post",
    desc: "保存项目配置",
    params: [
      {
        type: "object",
        value: "配置对象",
        child: [
          {
            name: "fileKey",
            type: "string",
          },
          {
            name: "fileUrl",
            type: "string",
          },
          {
            name: "fileName",
            type: "string",
          },
          {
            name: "envParams",
            type: "array",
            desc: "环境变量信息",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/project/insertProductUser",
    method: "post",
    desc: "新增项目成员-目前前端无需调用",
    params: [
      {
        type: "object",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "项目id",
          },
          {
            name: "username",
            type: "string",
            desc: "用户名",
          },
          {
            name: "role",
            type: "integer",
            desc: "用户角色，暂只有0-管理员\n {@link ProjectUserRoleEnum ProjectUserRoleEnum}",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/module",
    method: "get",
    desc: "获取模块列表",
    params: [
      {
        type: "integer",
        value: "projectId",
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
      "data|1-20": [
        {
          id: "@integer(1, 10)",
          createTime: "@integer(1, 10)",
          createdBy: "@csentence()",
          updateTime: "@integer(1, 10)",
          updatedBy: "@csentence()",
          projectId: "@integer(1, 10)",
          moduleName: "@csentence()",
        },
      ],
    },
  },
  {
    url: "/module",
    method: "post",
    desc: "创建模块",
    params: [
      {
        type: "object",
        value: "模块对象",
        child: [
          {
            name: "projectId",
            type: "integer",
            desc: "用例名称",
          },
          {
            name: "moduleName",
            type: "string",
            desc: "模块名称",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: "@integer(1, 10)",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/file/upload",
    method: "post",
    params: [
      {
        type: "object",
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {
        fileId: "@integer(1, 10)",
        fileSize: "@integer(1, 10)",
        fileName: "@csentence()",
        fileKey: "@csentence()",
        fileUrl: "@csentence()",
      },
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/agent/report/data",
    method: "post",
    params: [
      {
        type: "object",
        child: [
          {
            name: "taskId",
            type: "integer",
            desc: "任务id",
          },
          {
            name: "instanceId",
            type: "integer",
            desc: "任务实例id",
          },
          {
            name: "seriesDataList",
            type: "array",
            desc: "时间曲线数据",
          },
          {
            name: "overviewDataList",
            type: "array",
            desc: "概览数据",
          },
          {
            name: "reportTime",
            type: "integer",
            desc: "上报时间",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/agent/heartbeat",
    method: "post",
    desc: "心跳包上报",
    params: [
      {
        type: "object",
        child: [
          {
            name: "hostname",
            type: "string",
            desc: "机器名称",
          },
          {
            name: "ip",
            type: "string",
            desc: "机器ip",
          },
          {
            name: "serverPort",
            type: "integer",
            desc: "服务端口号",
          },
          {
            name: "reportTime",
            type: "integer",
            desc: "上报时间戳",
          },
        ],
        required: true,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/task/:id/perf/overview",
    method: "get",
    desc: "获取任务性能数据概览报表",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
      "data|1-20": [
        {
          eventName: "@csentence()",
          count: "@integer(1, 10)",
          avgRt: {},
          maxRt: "@integer(1, 10)",
          minRt: "@integer(1, 10)",
          p50Rt: {},
          p90Rt: {},
          p99Rt: {},
        },
      ],
    },
  },
  {
    url: "/project/startPipeline/:projectId",
    method: "get",
    desc: "前端不要直接调用，启动一个pipeline",
    params: [
      {
        type: "integer",
        value: "scriptId",
        required: false,
      },
    ],
    data: {
      code: 0,
      msg: "@csentence()",
      data: {},
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
  {
    url: "/env",
    method: "get",
    params: [],
    data: {
      code: 0,
      msg: "@csentence()",
      data: "@csentence()",
      serverTimestamp: "@integer(1, 10)",
      success: "@boolean()",
    },
  },
];
