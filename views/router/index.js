import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from 'pages/project/list'
import ProjectDetail from 'pages/project/detail'
import ProjectDetailCreate from 'pages/project/create'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: ProjectList
    }, {
      path: '/project/detail/:id',
      component: ProjectDetail
    }, {
      path: '/project/create/:id',
      component: ProjectDetailCreate
    }]
  })

  return router
}
