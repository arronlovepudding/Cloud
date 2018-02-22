const Project = require('../../models').Project
const ProjectDetail = require('../../models').ProjectDetail

exports.list = async function (ctx, next) {
  let result = await Project.find({})
  ctx.body = result.map(item => {
    return {
      id: item._id,
      name: item.name
    }
  })
}

exports.detail = async function (ctx, next) {
  let projectId = ctx.params.projectId
  let result = await ProjectDetail.find({projectId}).sort({create_at: -1})
  ctx.body = result.map(item => {
    return {
      id: item._id,
      name: item.name,
      path: item.path,
      address: `/cloud/${item.projectId}/${item.path}`,
      pvCount: item.pvCount,
      create_at: item.create_at_date
    }
  })
}

exports.create = async function (ctx, next) {
  let params = ctx.request.body || {}
  let instance = new ProjectDetail()
  instance.projectId = ctx.params.projectId
  instance.name = params.name
  instance.path = params.path.replace(/^\//, '')
  instance.content = params.content
  await instance.save()
  ctx.status = 204
}

exports.show = async function (ctx, next) {
  let _id = ctx.params.itemId
  let result = await ProjectDetail.findOne({_id})
  ctx.body = result
}

exports.update = async function (ctx, next) {
  let _id = ctx.params.itemId
  let params = ctx.request.body || {}
  await ProjectDetail.update({
    _id
  }, {
    $set: {
      name: params.name,
      content: params.content
    }
  })
  ctx.status = 204
}

exports.content = async function (ctx, next) {
  let projectId = ctx.params.projectId
  let path = ctx.params.path
  let result = await ProjectDetail.findOne({projectId, path}) || {}
  await ProjectDetail.update({
    _id: result._id
  }, {
    $inc: {
      pvCount: 1
    }
  })
  ctx.body = result.content
}
