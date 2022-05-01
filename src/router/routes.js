/* // 引入一级路由
import Home from '@/pages/Home/'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search/'
import Detail from '@/pages/Detail/'
import AddCartSuccess from '@/pages/AddCartSuccess/'
import ShopCart from '@/pages/ShopCart/'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import myOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/GroupOrder' */
// 使用路由懒加载

export default [
    {
        path: '/home',
        redirect: '/'
    },
    {
        path: '/login',
        component: () => import('@/pages/Login')
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        },
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            },
            {
                path: 'GroupOrder',
                component: () => import('@/pages/Center/GroupOrder')
            },
            {
                // 设置路由重定向，用于一加载center组件就展示myOrder
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            // 判断是不是从购物车来的
            if (from.path == '/shopcart') {
                next()
            }
            else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            // 判断是不是从trade来的
            if (from.path == '/trade') {
                next()
            }
            else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        },
        beforeEnter: (to, from, next) => {
            console.log(from.path);
            // 判断是不是从pay来的
            if (from.path == '/pay') {
                next()
            }
            else {
                next(false)
            }
        }
    },
    {
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register')
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        }
    },
    {
        path: '/',
        component: () => import('@/pages/Home'),
        meta: {
            // 用于判断Footer是否隐藏
            showFooter: true
        }
    }
]