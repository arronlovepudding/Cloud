import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../pages/hello-ssr'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: Hello
    }]
  })

  return router
}
