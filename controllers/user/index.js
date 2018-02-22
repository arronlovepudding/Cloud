'use strict'

const config = require('config')
const jwt = require('jsonwebtoken')
const jwtSecret = config.get('jwt.secret')
const jwtExpire = config.get('jwt.expire')
const User = require('../../models').User

exports.login = async function (ctx, next) {
  let params = ctx.request.body || {}
  let user = await User.findOne({name: params.name})
  if (!user) {
    ctx.body = ctx.util.fail('用户不存在')
    return
  }
  if (params.password !== user.password) {
    ctx.body = ctx.util.fail('用户名或密码错误')
    return
  }
  let token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: jwtExpire})
  ctx.body = {
    token
  }
}
