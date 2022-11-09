interface ILog {
  type?: string
  content?: string
  dateTime?: string
  deviceInfo?: string
  platform?: 'web' | 'mini'
}

interface IOption {
  url: string
  unit?: number
  max?: number
}
export type { ILog, IOption }
