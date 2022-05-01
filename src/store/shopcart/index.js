// 获取购物车数据
import { getCartList } from '@/api'
// 删除购物车数据
import { deleteCartById } from '@/api';
// 修改购物车商品状态
import { changeCheckedById } from '@/api';

const actions = {
    async reqCartList({ commit }) {
        // 向服务器发送请求，获取购物车数据
        let result = await getCartList()
        if (result.code == 200) {
            // 存入
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCart({ commit }, skuId) {
        // 发送请求，删除数据
        let result = await deleteCartById(skuId)

        // 判断是否成功
        if (result.code == 200) {
            return 'ok'
        }
        else {
            throw new Error('警告警告')
        }
    },
    async changeIsChecked({ commit }, { skuId, isChecked }) {
        // 发送请求，修改商品状态
        let result = await changeCheckedById(skuId, isChecked)

        if (result.code == 200) {
            return 'ok'
        }
        else {
            throw new Error('警告警告')
        }
    },
    // 删除选中的购物车商品
    async deleteCartChecked({ dispatch, getters }) {
        // 先获取目前购物测商品列表
        let cartList = getters.cartInfo.cartInfoList
        // 遍历商品列表找到被选中的商品然后发送删除请求，然后将返回的promise存入数组中
        let PromiseAll = []
        cartList.forEach(item => {
            // 找到被选中的商品然后将其删除
            if (item.isChecked == 1) {
                let promise = dispatch('deleteCart', item.skuId)
                // 将这些promise对象存储到一起
                PromiseAll.push(promise)
            }
        })
        // 返回一个Promise，这个Promise只有在所有的子promise是成功的时候才会成功
        return Promise.all(PromiseAll)
    },
    // 全选按钮修改状态
    updateAllCart({ dispatch, getters }, isChecked) {
        // 先获取目前购物测商品列表
        let cartList = getters.cartInfo.cartInfoList
        // 创建一个数组存储所有的返回的promise值
        let PromiseAll = []
        cartList.forEach(item => {
            // 发送请求修改所有的商品的状态
            let promise = dispatch('changeIsChecked', { skuId: item.skuId, isChecked })
            // 将返回的promise对象存在数组中
            PromiseAll.push(promise)
        })
        // 返回一个promise对象
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    // 将购物车数据存入state中
    GETCARTLIST(state, data) {
        state.cartList = data
    }
}
const state = {
    cartList: []
}
const getters = {
    // 返回的数据结构很复杂,所以简化一下
    cartInfo(state) {
        return state.cartList[0] || {}
    }
}

export default {
    actions, mutations, state, getters
}