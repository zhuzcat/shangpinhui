import axios from 'axios'

// 引入nprogress插件
import nprogress from 'nprogress'
// 引入nprogress样式
import 'nprogress/nprogress.css'
// 在当前页面中引入store
import store from '@/store'

const requests = axios.create({
    // 配置基本路径
    baseURL: '/api',
    // 设置超时
    timeout: 5000
})

requests.interceptors.request.use((config) => {
    // 设置请求头
    if (store.state.detail.uuid_token) {
        // 如果又游客的token信息，就将游客的id通过请求头发送到服务端
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.user.token) {
        // 如果用户登录成功，且有token，则每次发出请求的时候就要将token带到请求头上
        config.headers.token = store.state.user.token
    }
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