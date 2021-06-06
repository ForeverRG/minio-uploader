import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant'
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.prototype.$EventBus = new Vue()

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  render: h => h(App)
}).$mount('#app')
