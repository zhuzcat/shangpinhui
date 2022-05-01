import { reqGetDetail, addOrUpdataCart } from "@/api";
// 引入getUUID
import { getUUID } from "@/utils/getUUID";

const state = {
    detailList: {},
    uuid_token: getUUID()
}
const actions = {
    async getDetailList({ commit }, skuid) {
        // 发起请求
        let result = await reqGetDetail(skuid)

        if (result.code === 200) {
            commit('GETDETAILLIST', result.data)
        }
    },
    // 添加到购物车发请求
    async addOrUpdataCart({ commit }, { skuId, skuNum }) {
        // 获取响应的结果
        let result = await addOrUpdataCart(skuId, skuNum)

        // 判断是否加入购物车成功
        if (result.code == 200) {
            // 成功
            return 'done'
        }
        else {
            // 失败
            throw new Error('出错了')
        }
    }
}
const mutations = {
    GETDETAILLIST(state, data) {
        // 将获取到的数据存储到state中去
        state.detailList = data
    }
}
const getters = {
    // 简化在vue中的写法
    categoryView(state) {
        return state.detailList.categoryView || {}
    },
    skuInfo(state) {
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList
    }
}

export default {
    state, actions, mutations, getters
}