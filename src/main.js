import { createApp } from 'vue'
import App from './App.vue'
import store from '/src/store'
import router from './router'
import * as Icon from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies';
const app = createApp(App)
let el=["Box","UploadFilled",'Picture']
el.forEach((value)=>{
    app.component(value,Icon[value])
})
app.use(router)
app.use(store)
// 新增代码：注册全部组件
app.use(ElementPlus)
app.use(VueCookies)
app.mount('#app')
