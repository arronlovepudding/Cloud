import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from 'pages/project/list'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: ProjectList
    }]
  })

  return router
}
