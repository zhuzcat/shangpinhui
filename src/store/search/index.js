// search组件的仓库
// 引入search请求的api
import { reqGetSearchList } from "@/api"

const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, data) {
        state.searchList = data
    }
}
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchList(params);

        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    // 简化组件数据获取模式
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}