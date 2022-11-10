import { ILog } from './interface'
class storage {
  private storageKey: string = 'ce-log'
  private singleToneLogArray: Array<ILog> = []
  private unitCount: number
  private maxCount: number
  private context: any
  private type: string

  constructor(
    unitCount: number = 50,
    maxCount: number = 1000,
    context: any,
    type: string
  ) {
    this.unitCount = unitCount
    this.maxCount = maxCount
    this.context = context
    this.type = type
    let tempCache
    if (this.type === 'web') {
      tempCache = this.context.localStorage.getItem(this.storageKey)
    } else {
      tempCache = this.context.getStorageSync(this.storageKey)
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
    if (this.type === 'web') {
      this.context.localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    } else {
      this.context.setStorageSync(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    }
  }

  delete(index: number) {
    this.singleToneLogArray = this.singleToneLogArray.slice(index)
    if (this.type === 'web') {
      this.context.localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    } else {
      this.context.setStorageSync(
        this.storageKey,
        JSON.stringify(this.singleToneLogArray)
      )
    }
  }

  query() {
    return this.singleToneLogArray.slice(0, this.unitCount)
  }
}
export default storage
