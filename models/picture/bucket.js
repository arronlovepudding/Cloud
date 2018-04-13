'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema({
  name: String,
  path: String,
  storageType: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.virtual('storageName').get(function () {
  const defaultType = '图库'
  return {
    'js_css': 'JS、CSS',
    'img': '图库'
  }[this.storageType] || defaultType
})

schema.virtual('accept').get(function () {
  const defaultVal = '.jpg, .jpeg, .png, .gif'
  return {
    'js_css': '.js, .css',
    'img': defaultVal
  }[this.storageType] || defaultVal
})

schema.virtual('needHashName').get(function () {
  return this.storageType === 'img'
})

schema.index({create_at: 1})

module.exports = mongoose.model('PictureBucket', schema)