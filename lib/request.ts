const request = (url = '', data = {}, async = true) => {
  return new Promise((resolve, reject) => {
    const type = 'POST'
    let requestObj: XMLHttpRequest
    if (window.XMLHttpRequest) {
      requestObj = new XMLHttpRequest()
    } else {
      console.error('环境不支持 XMLHttpRequest')
      reject()
      return
    }
    requestObj.open(type, url, async)
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
  })
}
export default request
