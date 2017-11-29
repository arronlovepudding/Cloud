"use strict"

import axios from 'axios'

function get (url, config = null) {
  return axios.get(url, config)
}

export default {
  get
}