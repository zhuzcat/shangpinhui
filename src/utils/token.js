/* 
    该模块用于token的持久化存储
*/
// 设置token
export function setToken(token) {
    localStorage.setItem('TOKEN', token)
}
// 获取token
export function getToken() {
    return localStorage.getItem('TOKEN')
}
// 清空token
export function removeToken() {
    localStorage.removeItem('TOKEN')
}