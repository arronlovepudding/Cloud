'use strict'

import axios from 'axios'

function get (url, config = null) {
  return axios.get(url, config)
}

function post (url, data = null, config = null) {
  return axios.post(url, data, config)
}

export default {
  get,
  post
}
