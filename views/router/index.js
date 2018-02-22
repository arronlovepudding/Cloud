import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/login/index/index'
import LoginOut from 'pages/login/out'
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
      path: '/login',
      component: Login
    }, {
      path: '/login/out',
      component: LoginOut
    }, {
      path: '/project/:projectId/detail',
      component: ProjectDetail
    }, {
      path: '/project/:projectId/create',
      component: ProjectDetailCreate,
      meta: {
        CRUD: 'create'
      }
    }, {
      path: '/project/:projectId/update/:id',
      component: ProjectDetailCreate,
      meta: {
        CRUD: 'update'
      }
    }]
  })

  return router
}
