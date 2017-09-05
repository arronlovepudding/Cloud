import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../pages/hello'
import Hi from '../pages/hi'

Vue.use(Router)

// const getComponent = page => () => import(`pages/${page}`)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/hello',
        component: Hello
      },
      {
        path: '/hi',
        component: Hi
      }
    ]
  })

  return router
}
