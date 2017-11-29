const Project = require('../../models').Project

exports.list = async function (ctx, next) {
  let result = await Project.find({})
  console.log(result)
  ctx.body = result
}