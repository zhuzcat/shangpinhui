import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入store库
import store from '@/store';

// 先将原本的push和replace存起来
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve || reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

// 重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve || reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
// 获取路由信息
import routes from './routes';

const router = new VueRouter({
    routes,
    // 使每次路由跳转后,滚动条都在最上方
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 设置全局前置路由
router.beforeEach(async (to, from, next) => {
    // 先获取token和用户信息,判断是否已经登录
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 判断是否登录
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            // 如果要跳转到登录，就更换到主页
            next('/home')
        } else {
            if (name) {
                // 如果有用户信息，就直接跳转
                next()
            } else {
                // 如果没有用户信息,就要获取用户信息
                try {
                    await store.dispatch('userInfo')
                    // 如果获取成功就准许通过
                    next()
                } catch (error) {
                    // 出现错误的原因就是，token过期了需要清空登录并跳转到/login
                    await store.dispatch('userLogout')
                    // 跳转到登录界面
                    next('/login')
                }
            }
        }
    } else {
        // 获取路由要跳转的路径
        let toPath = to.path
        // 判断路由是否要跳往敏感区域
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next(`/login?redirect=${toPath}`)
        }
        else {
            next()
        }
    }
})

export default router