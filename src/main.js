import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入axios
import Axios from "axios";
//配置异步将要访问的路径
Axios.defaults.baseURL="http://127.0.0.1:8088"

//将baseURL绑定到全局
Vue.prototype.$axios=Axios

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
