import Vue from 'vue'
import { Button, message, Layout,Menu,Icon } from 'ant-design-vue';
// import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style';

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)

Vue.prototype.$message = message
