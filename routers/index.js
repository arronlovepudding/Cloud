const router = require('koa-router')
const Project = require('../controllers/project')
exports.api = router({prefix: '/api'})
  .get('/project/list', Project.list)
