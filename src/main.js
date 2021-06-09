import Vue from 'vue'
import App from './App.vue'
import router from './router'

// axios
import axios from 'axios'
Vue.prototype.$http = axios

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
  render: h => h(App)
}).$mount('#app')
