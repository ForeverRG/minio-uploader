import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// // axios
// import axios from 'axios'
// Vue.prototype.$http = axios

// 全局引入网络请求
import "./network/request";

// 上传文件组件
import uploader from 'vue-simple-uploader'

import './plugins/ant'
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.use(uploader)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
