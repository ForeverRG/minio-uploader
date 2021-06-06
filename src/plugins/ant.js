import Vue from 'vue'
import { Button, message, Layout, Menu, Icon, Avatar } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less'; //导入样式，注意导入less文件

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Avatar)

Vue.prototype.$message = message
