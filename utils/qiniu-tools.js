const config = require('config')
const qiniu = require('qiniu')
qiniu.conf.ACCESS_KEY = config.qiniu.ak
qiniu.conf.SECRET_KEY = config.qiniu.sk

const bucketName = config.qiniu.bucket

exports.uptoken = function ({keyPath, key = null}) {
  let saveKeyPolicy = key ? '$(fname)' : '$(etag)$(ext)'
  let saveKey = `${keyPath}${saveKeyPolicy}`
  let scope = bucketName + key ? `:${key}` : ''
  let policy = {
    scope,
    saveKey
  }
  let putPolicy = new qiniu.rs.PutPolicy(policy)
  return putPolicy.uploadToken()
}