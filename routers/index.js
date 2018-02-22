const router = require('koa-router')
const Project = require('../controllers/project')
exports.api = router({prefix: '/api'})
  .get('/project/list', Project.list)
  .get('/project/detail', Project.detail)
  .post('/project/create', Project.create)

exports.cloud = router({prefix: '/cloud'})
  .get('/:projectId/:path*',Project.content)
