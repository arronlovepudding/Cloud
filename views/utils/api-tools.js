'use strict'

import axios from 'axios'
import Cookies from 'universal-cookie'
import conf from 'config'
import {Message} from 'element-ui'

let _axios
let _router

function get (url, config = null) {
  return _axios.get(url, config)
}

function post (url, data = null, config = null) {
  return _axios.post(url, data, config)
}

function put (url, data = null, config = null) {
  return _axios.put(url, data, config)
}

export default {
  createAPI (router) {
    _router = router
    _axios = axios.create()
    _axios.interceptors.request.use((config) => {
      let token = new Cookies().get(`${conf.storageNamespace}token`)
      config.headers.Authorization = `Bearer ${token}`
      return config
    }, (error) => {
      return Promise.reject(error)
    })
    _axios.interceptors.response.use((response) => {
      const body = response.data
      if (body.success === false) {
        Message.error(body.message)
      }
      return response
    }, (error) => {
      const res = error.response
      if (res) {
        if (res.status === 401 && /authentication/i.test(res.data.error)) {
          _router.push('/login')
        }
      }
      return Promise.reject(error)
    })
  },
  get,
  post,
  put
}
