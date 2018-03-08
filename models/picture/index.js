'use strict'
const mongoose = require('mongoose')
const DateTools = require('../../utils/date-tools')

const Schema = mongoose.Schema
const schema = new Schema({
  bucketId: Schema.Types.ObjectId,
  name: String,
  resUrl: String,
  hash: String,
  size: String,
  expand: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({bucketId: 1, create_at: 1})
schema.index({bucketId: 1, hash: 1})

schema.virtual('absUrl').get(function () {
  return `http://static.i200.cn/${this.resUrl}`
})

schema.virtual('thumUrl').get(function () {
  return `http://static.i200.cn/${this.resUrl}!w100`
})

schema.virtual('createTime').get(function () {
  return this.create_at ? DateTools.datetimeStr(this.create_at) : ''
})

schema.virtual('apiData').get(function () {
  return {
    name: this.name,
    expand: this.expand,
    absUrl: this.absUrl,
    resUrl: this.resUrl,
    thumUrl: this.thumUrl,
    createTime: this.createTime
  }
})

module.exports = mongoose.model('Picture', schema)