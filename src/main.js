import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 引入store
import store from './store'
// 引入router
import router from '@/router'
// 使mockServe.js执行一次
import "@/mock/mockServe.js"
// 引入swiper样式
import 'swiper/css/swiper.css'
// 局部以内element-ui
import { Button, MessageBox } from 'element-ui'

// 全局引入api
import * as API from '@/api'

// 引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination';
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册element-ui组件
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入懒加载图片
import lazy from './assets/loading.gif'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: lazy
})

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
    // 挂载api
    Vue.prototype.$API = API
  }
}).$mount('#app')
