const config = require('config')
const qiniu = require('qiniu')
qiniu.conf.ACCESS_KEY = config.qiniu.ak
qiniu.conf.SECRET_KEY = config.qiniu.sk

const bucketName = 'i200-static'

exports.uptoken = function (keyPath) {
  var putPolicy = new qiniu.rs.PutPolicy({scope: bucketName, saveKey: `${keyPath}$(etag)$(ext)`})
  return putPolicy.uploadToken()
}