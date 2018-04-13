'use strict'
const PictureBucket = require('../../models').PictureBucket
const Picture = require('../../models').Picture
const QiniuTools = require('../../utils/qiniu-tools')

exports.list = async function (ctx) {
  let result = await PictureBucket.find().sort({create_at: -1})
  ctx.body = result.map(item => {
    return {
      id: item._id,
      name: item.name,
      path: item.path,
      storageName: item.storageName
    }
  })
}

exports.detail = async function (ctx) {
  let bucketId = ctx.params.bucketId
  let result = await Picture.find({bucketId}).sort({create_at: -1})
  ctx.body = result.map(item => item.apiData)
}

exports.fileAccept = async function (ctx) {
  let bucketId = ctx.params.bucketId
  let bucket = await PictureBucket.findById(bucketId) || {}
  ctx.body = {
    accept: bucket.accept,
    showImg: bucket.needHashName
  }
}

exports.token = async function (ctx) {
  let bucketId = ctx.params.bucketId
  let fileName = ctx.params.fileName
  let bucket = await PictureBucket.findById(bucketId) || {}
  let keyPath = bucket.path || ''
  let key = null
  if (!bucket.needHashName) key = `${keyPath}${fileName}`
  let uptokenCon = {
    keyPath,
    key
  }
  ctx.body = {
    token: QiniuTools.uptoken(uptokenCon),
    key
  }
}

exports.create = async function (ctx) {
  let bucketId = ctx.params.bucketId
  let params = ctx.request.body || {}
  let haveFind = await Picture.findOne({bucketId, hash: params.hash})
  if (haveFind) {
    ctx.body = {
      uploadedUrl: haveFind.absUrl
    }
    return
  }
  let picture = new Picture()
  picture.bucketId = bucketId
  picture.name = params.name
  picture.size = params.size
  picture.expand = params.expand
  picture.hash = params.hash
  picture.resUrl = params.resUrl
  let res = await picture.save()
  ctx.body = res.apiData
}

exports.bucketCreate = async function (ctx) {
  let params = ctx.request.body || {}
  let haveBucket = await PictureBucket.findOne({path: params.path})
  if (haveBucket) {
    ctx.body = {
      message: '此路径已存在'
    }
    return
  }
  let pictureBucket = new PictureBucket()
  pictureBucket.name = params.name
  pictureBucket.path = params.path
  pictureBucket.storageType = params.storageType
  await pictureBucket.save()
  ctx.status = 204
}
