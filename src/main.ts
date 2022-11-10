import './style.css'
import cybereye from '../lib/main'

// 初始化日志管理库
const CE = new cybereye({ url: 'http://127.0.0.1:3001/ApiSyncLog' })

// 调用记录日志
CE.markALog('msg', '初始化时记录一个日志')

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    前端日志管理库
    <div class="card">
      <button id="query" type="button">查询</button>
      <button id="delete" type="button">删除</button>
      <button id="upload" type="button">上传</button>
    </div>
  </div>
`

const queryDom = document.querySelector<HTMLButtonElement>('#query')
const deleteDom = document.querySelector<HTMLButtonElement>('#delete')
const uploadDom = document.querySelector<HTMLButtonElement>('#upload')
queryDom?.addEventListener('click', () => {
  CE.markALog('event', `add a event ${new Date()}`)
})
deleteDom?.addEventListener('click', () => {
  CE.markALog('event', `delete a event ${new Date()}`)
})
uploadDom?.addEventListener('click', () => {
  CE.markALog('event', `upload a event ${new Date()}`)
})
