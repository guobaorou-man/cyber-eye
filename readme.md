# web 和微信小程序前端日志存储与上传库

存储基于 localStorage 和 微信小程序 storage 实现，可进行小数据量日志存储。

1. 默认存储数据量上限为 1000 条日志
2. 默认每次读取上传 50 条日志
3. 单条日志数据大小限制在 1kb 内

### web 项目

#### 安装

```bash
npm install cybereye
```

#### 使用

```javascript
import cybereye from 'cybereye'
const CE = new cybereye({ url: 'http://yourapiurl' }, window, 'web')
CE.markALog('msg', '记录一条日志')
```

### 微信小程序项目中使用

#### 安装

初始化 npm ==> 安装包 ==> 构建 npm

```bash
npm install cybereye
```

#### 使用

```javascript
import cybereye from 'cybereye'
const CE = new cybereye({ url: 'http://yourapiurl' }, wx, 'mini')
CE.markALog('msg', '记录一条日志')
```

### 参数说明

constructor(option, context, type)

1. options 为对象，必填参数。包含：

| 属性 | 类型   | 是否必填 | 说明                                |
| ---- | ------ | -------- | ----------------------------------- |
| url  | string | 是       | 上传日志的接收服务接口地址          |
| unit | number | 否       | 单次查询并上传的最大日志数，默认 50 |
| max  | number | 否       | 存储的最大日志数，默认 1000         |

2. context 为环境的操作对象，必填参数。web 环境传入 window；小程序环境传入 wx ;

3. type 为环境的类型标记，必填参数，string 类型。web 环境传入 'web'；小程序环境传出 'mini'；

### API 说明

markALog(event, content)

| 参数    | 类型   | 是否必填 | 说明                                     |
| ------- | ------ | -------- | ---------------------------------------- |
| event   | string | 是       | 记录日志的类型。可自定义，限制长度（10）<font color=#dd00000 >(尚未限制)</font> |
| content | string | 是       | 记录日志具体的内容。限制长度（500）<font color=#dd00000 >(尚未限制)</font> |

### 上报数据格式说明

```json
[
  {
    "type": "event",
    "content": "记录的日志内容",
    "dateTime": "2022-11-11 11:11:11",
    "platform": "web",
    "deviceInfo": "agent"
  }
]
```

| 属性       | 说明                                                        |
| ---------- | ----------------------------------------------------------- |
| type       | 对应 markALog 的 event，自定义日志类型。                    |
| content    | 对应 markALog 的 content，日志内容。                        |
| dateTime   | 记录日志的时间。                                            |
| platform   | 日志的平台：'web' 代表 web；'mini' 代表 微信小程序          |
| deviceInfo | web 平台为 agent 信息；微信小程序为 wx.getSystemInfo 信息； |
