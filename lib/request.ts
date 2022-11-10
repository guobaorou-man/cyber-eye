const request = (url = '', data = {}, context: any, type: string) => {
  // web 发起请求
  const httpForWeb = (
    resolve: (value: unknown) => void,
    reject: (reason?: any) => void
  ) => {
    const type = 'POST'
    let requestObj: XMLHttpRequest
    if (context.XMLHttpRequest) {
      requestObj = new XMLHttpRequest()
    } else {
      console.error('环境不支持 XMLHttpRequest')
      reject()
      return
    }
    requestObj.open(type, url, true)
    requestObj.setRequestHeader('Content-type', 'application/json')
    requestObj.send(JSON.stringify(data))
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState == 4) {
        if (requestObj.status == 200) {
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj)
          }
          resolve(obj)
        } else {
          reject(requestObj)
        }
      }
    }
  }

  // 小程序发起请求
  const httpForMini = (
    resolve: (value: unknown) => void,
    reject: (reason?: any) => void
  ) => {
    context.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res: any) {
        resolve(res.data)
      },
      fail(err: any) {
        reject(err)
      },
    })
  }

  return new Promise((resolve, reject) => {
    if (type === 'web') {
      httpForWeb(resolve, reject)
    } else {
      httpForMini(resolve, reject)
    }
  })
}
export default request
