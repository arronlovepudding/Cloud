import Vue from 'vue'
import Router from 'vue-router'
import Layouts from 'pages/layouts'
import Login from 'pages/login/index/index'
import LoginOut from 'pages/login/out'
import ProjectList from 'pages/project/list'
import ProjectDetail from 'pages/project/detail'
import ProjectDetailCreate from 'pages/project/create'

import PictureBucket from 'pages/pictures/bucket'
import PictureBucketMaintain from 'pages/pictures/bucket/create'
import PictureList from 'pages/pictures/list'

import Scaffold from 'pages/scaffold'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [{
      path: '/login',
      component: Login
    }, {
      path: '/login/out',
      component: LoginOut
    }, {
      path: '/',
      component: Layouts,
      children: [{
        path: '/',
        component: ProjectList
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
      }, {
        path: '/picture',
        component: PictureBucket
      }, {
        path: '/picture/bucket/create',
        component: PictureBucketMaintain
      }, {
        path: '/picture/:bucketId',
        component: PictureList
      }, {
        path: '/scaffold',
        component: Scaffold
      }]
    }]
  })

  return router
}
