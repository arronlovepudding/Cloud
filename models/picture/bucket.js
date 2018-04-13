'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema({
  name: String,
  path: String,
  fileType: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.virtual('storageType').get(function () {
  const defaultType = '图库'
  return {
    'js_css': 'JS、CSS',
    'img': '图库'
  }[this.fileType] || defaultType
})

schema.index({create_at: 1})

module.exports = mongoose.model('PictureBucket', schema)