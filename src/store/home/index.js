// home组件的仓库
const state = {
    categorylist: [],
    bannerlist: [],
    floorlist: []
}
const mutations = {
    CATEGORYLIST(state, data) {
        state.categorylist = data
    },
    GETBANNERLIST(state, data) {
        state.bannerlist = data
    },
    GETFLOORLIST(state, data) {
        state.floorlist = data
    }
}
// 引入向服务器发送ajax请求的方法
import { reqCateloryList } from "@/api"
import { reqGetBannerList } from "@/api"
import { reqGetFloorList } from "@/api"

const actions = {
    async categoryList({ commit }) {
        // 由于axios返回值是一个promise值所以需要用await获取结果
        let result = await reqCateloryList()
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        // 由于axios返回值是一个promise值所以需要用await获取结果
        let result = await reqGetBannerList()
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        // 由于axios返回值是一个promise值所以需要用await获取结果
        let result = await reqGetFloorList()
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}