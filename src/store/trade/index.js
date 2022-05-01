// 引入api接口
import { reqUserAddress, reqOrderList } from '@/api'

const state = {
    userAddress: [],
    orderList: []
}
const actions = {
    async getUserAddress({ commit }) {
        // 获取用户的地址
        let result = await reqUserAddress()

        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    async getOrderList({ commit }) {
        // 获取订单列表
        let result = await reqOrderList()

        if (result.code == 200) {
            commit('GETORDERLIST', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, data) {
        state.userAddress = data
    },
    GETORDERLIST(state, data) {
        state.orderList = data
    }
}
const getters = {}

export default {
    state, actions, mutations, getters
}