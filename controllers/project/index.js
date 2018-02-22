const Project = require('../../models').Project
const ProjectDetail = require('../../models').ProjectDetail

exports.list = async function (ctx, next) {
  let result = await Project.find({})
  console.log(result)
  ctx.body = result.map(item => {
    return {
      id: item._id,
      name: item.name
    }
  })
}

exports.detail = async function (ctx, next) {
  let projectId = ctx.query.projectId
  let result = await ProjectDetail.find({projectId})
  console.log(result)
  ctx.body = result.map(item => {
    return {
      id: item._id,
      name: item.name,
      path: item.path,
      address: `/cloud/${item.projectId}/${item.path}`
    }
  })
}

exports.create = async function (ctx, next) {
  let params = ctx.request.body || {}
  let instance = new ProjectDetail()
  instance.projectId = params.projectId
  instance.name = params.name
  instance.path = params.path.replace(/^\//, '')
  instance.content = params.content
  await instance.save()
  ctx.status = 204
}
