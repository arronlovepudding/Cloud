import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: Home
    }]
  })

  return router
}
