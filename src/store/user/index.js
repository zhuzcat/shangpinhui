// 引入请求方法
import { reqGetCode, reqRegisterUser, reqLoginUser, getUserInfo, reqLogout } from "@/api"
// 引入持久化操作token的方法
import { getToken, removeToken, setToken } from '@/utils/token'

const state = {
    // 存放验证码
    code: '',
    // 存放登录使用的token
    token: getToken(),
    // 存放用户信息
    userInfo: {}
}
const mutations = {
    // 存入state中
    GETCODE(state, data) {
        state.code = data
    },
    LOGINUSER(state, data) {
        state.token = data
    },
    USERINFO(state, data) {
        state.userInfo = data
    },
    USERLOGOUT(state) {
        // 退出登录后清掉所有用户的数据与本地token
        state.token = '';
        state.userInfo = ''
        removeToken()
    }
}
const actions = {
    async getCode({ commit }, phone) {
        // 获取验证码
        let result = await reqGetCode(phone)

        if (result.code == 200) {
            commit('GETCODE', result.data)
        }
        else {
            throw new Error('警告警告')
        }
    },
    async registerUser({ commit }, params) {
        // 发送注册用户的请求
        let result = await reqRegisterUser(params)
        if (result.code = 200) {
            return 'ok'
        }
        else {
            throw new Error('警告警告')
        }
    },
    async loginUser({ commit }, params) {
        // 发送用户登录请求
        let result = await reqLoginUser(params)

        if (result.code == 200) {
            // 提交到mutations来存储token
            commit('LOGINUSER', result.data.token)
            // 持久化token
            setToken(result.data.token)
            return 'ok'
        }
        else {
            throw new Error('警告警告')
        }
    },
    async userInfo({ commit }) {
        // 发送请求获取用户的信息 
        let result = await getUserInfo()

        if (result.code == 200) {
            // 提交数据给mutations
            commit('USERINFO', result.data)
            // 返回成功结果
            return 'ok'
        }
        else {
            throw new Error('警告警告')
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()

        if (result.code == 200) {
            // 提交到mutations
            commit('USERLOGOUT')
            // 返回字符车，告知退出登录成功
            return 'ok'
        }
        else {
            throw new Error('警告警告')
        }
    }
}
const getters = {}

export default {
    state, mutations, actions, getters
}