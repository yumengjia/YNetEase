import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//基础样式设置
import '@/assets/base.css'
//vant组件全局注册
import getVant from './plugins/vantComponent'
//api相关配置
import API from '@/api'
const app = createApp(App)
getVant(app)
//在prototype原型上挂载$API
app.config.globalProperties.$API = API

// const app = createApp(App)
app.use(store).use(router).mount('#app')
