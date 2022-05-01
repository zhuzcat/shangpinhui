// 三级非类axios引入
import requests from "./request";
// mock的axios引入
import mockAjax from './mockAjax'
// 首页三级分类接口
export const reqCateloryList = () => requests({ url: '/product/getBaseCategoryList', method: 'GET' })
// 轮播图的接口
export const reqGetBannerList = () => mockAjax({ url: '/banner', method: 'GET' })
// floor的接口
export const reqGetFloorList = () => mockAjax.get('/floor')
// search的接口
export const reqGetSearchList = params => requests({ url: '/list', method: 'POST', data: params })
// detail的接口
export const reqGetDetail = skuid => requests({ url: `/item/${skuid}`, method: 'GET' })
// 添加到购物车的接口
export const addOrUpdataCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
// 获取购物车数据
export const getCartList = () => requests({ url: '/cart/cartList', method: 'GET' })
// 删除购物车数据
export const deleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
// 更改购物车商品状态
export const changeCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })
// 获取验证码
export const reqGetCode = phone => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
// 发起用户注册请求
export const reqRegisterUser = data => requests({ url: `/user/passport/register`, method: 'POST', data })
// 发起用户登录请求
export const reqLoginUser = data => requests({ url: '/user/passport/login', data, method: 'POST' })
// 获取用户的信息
export const getUserInfo = () => requests({ url: 'user/passport/auth/getUserInfo', method: 'GET' })
// 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'GET' })
// 获取用户地址信息
export const reqUserAddress = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })
// 获取交易商品列表
export const reqOrderList = () => requests({ url: '/order/auth/trade', method: 'GET' })
// 提交订单
export const submitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' })
// 获取订单支付信息
export const payOrderInfo = orderId => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })
// 查询订单支付情况
export const reqPayStatus = orderId => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })
// 获取我的订单列表
export const reqMyOrder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })