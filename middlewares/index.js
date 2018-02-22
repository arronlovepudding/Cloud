'use strict'

exports.view = require('./view')
exports.error = require('./error')

const codeMap = {
  '-1': 'fail',
  '200': 'success',
  '401': 'token expired',
  '500': 'server error',
  '10001': 'params error'
}

const utils = {
  success (data) {
    return {
      code: 200,
      success: true,
      message: codeMap['200'],
      data: data || null
    }
  },
  fail (message, code, data) {
    return {
      code: code || -1,
      success: false,
      message: message || codeMap[code || '-1'] || codeMap['-1'],
      data: data || null
    }
  }
}

exports.util = function (ctx, next) {
  ctx.util = utils
  return next()
}
