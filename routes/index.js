const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  const m = require('../models')

  const UserModel = m.User
  let us = UserModel.findOne({name: 'Lee1'}, (err, result) => {
    console.log(result)
  })
  ctx.body = '123'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
