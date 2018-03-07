import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '../app.vue'
import {createRouter} from '../router'
import ApiTools from '../utils/api-tools'

Vue.use(ElementUI)

export function createApp () {
  const router = createRouter()
  ApiTools.createAPI(router)
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return {app, router}
}
