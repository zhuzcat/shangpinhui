import axios from 'axios'

// 引入nprogress插件
import nprogress from 'nprogress'
// 引入nprogress样式
import 'nprogress/nprogress.css'

const requests = axios.create({
    // 配置基本路径
    baseURL: '/mock',
    // 设置超时
    timeout: 5000
})

requests.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start()
    return config
})

requests.interceptors.response.use(
    (response) => {
        // 进度条结束
        nprogress.done()
        return response.data
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default requests