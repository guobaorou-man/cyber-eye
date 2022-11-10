import { ILog, IOption } from './interface'
import http from './request'
import { formatDate } from './util'
import storage from './storage'

class cybereye {
  private context: any
  private uploadURL: string
  private storageInstance: any
  private timer: any

  /**
   * @param uploadURL 上传文件地址
   * @param context 小程序上下文
   */
  constructor(option: IOption, context?: any) {
    this.context = context
    this.uploadURL = option.url
    this.storageInstance = new storage(option.unit, option.max, this.context)
    this.syncLog()
  }

  // 读取存量数据，如果存在则调用一次上传日志，否则设置一个延时任务
  private syncLog() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    const oldLogs = this.storageInstance.query()
    if (oldLogs && oldLogs.length > 0) {
      http(this.uploadURL, oldLogs)
        .then((res) => {
          // 上传成功后删除记录
          this.storageInstance.delete(oldLogs.length)
          this.timer = setTimeout(() => {
            this.syncLog()
          }, 10000)
        })
        .catch((err) => {
          console.error('日志上传请求失败', err)
          this.timer = setTimeout(() => {
            this.syncLog()
          }, 10000)
        })
    } else {
      this.timer = setTimeout(() => {
        this.syncLog()
      }, 10000)
    }
  }

  /**
   * API 记录日志·
   * @param event 日志类型
   * @param content 日志内容
   */
  markALog(event: string, content: string) {
    let newItem: ILog = {}
    newItem.type = event
    newItem.content = content
    newItem.dateTime = formatDate()
    newItem.platform = 'web'
    newItem.deviceInfo = navigator.userAgent
    this.storageInstance.add(newItem)
  }
}

export default cybereye
