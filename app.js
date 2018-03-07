const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('config')
const middleware = require('./middlewares')
const routers = require('./routers')
const cors = require('koa2-cors')

const koaJWT = require('koa-jwt')
const jwtSecret = config.get('jwt.secret')

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/dist'))
app.use(require('koa-static')(__dirname + '/public'))
app.use(middleware.util)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// JWT check
app.use(koaJWT({secret: jwtSecret}).unless((ctx) => {
  if (/^\/api/.test(ctx.path)) {
    return ['/api/login'].includes(ctx.path)
  }
  return true
}))

// routers
app.use(routers.api.routes(), routers.api.allowedMethods())
app.use(routers.cloud.routes(), routers.cloud.allowedMethods())
app.use(middleware.view(app))

module.exports = app
