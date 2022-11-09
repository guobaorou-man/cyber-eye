import { ILog } from './interface'
class storage {
  private storageKey: string = 'ce-log'
  private singleToneLogArray: Array<ILog> = []
  private unitCount: number
  private maxCount: number
  private context: any

  constructor(unitCount: number = 50, maxCount: number = 1000, context?: any) {
    this.unitCount = unitCount
    this.maxCount = maxCount
    this.context = context
    let tempCache
    if (this.context) {
      tempCache = this.context.getStorageSync(this.storageKey)
    } else {
      tempCache = window.localStorage.getItem(this.storageKey)
    }
    if (!tempCache) {
      tempCache = []
    }
    this.singleToneLogArray =
      typeof tempCache === 'string' ? JSON.parse(tempCache) : tempCache
  }

  add(item: ILog) {
    if (this.singleToneLogArray.length >= this.maxCount) {
      console.error(`日志存储已达上限(${this.maxCount}条数据)`)
    } else {
      this.singleToneLogArray.push(item)
    }
    if (this.context) {
      this.context.setStorageSync(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    } else {
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    }
    console.log('插入', this.singleToneLogArray)
  }

  delete(index: number) {
    this.singleToneLogArray = this.singleToneLogArray.slice(index)
    if (this.context) {
      this.context.setStorageSync(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    } else {
      window.localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    }
    console.log('删除', this.singleToneLogArray)
  }

  query() {
    console.log('查询', this.singleToneLogArray.slice(0, this.unitCount))
    return this.singleToneLogArray.slice(0, this.unitCount)
  }
}
export default storage
