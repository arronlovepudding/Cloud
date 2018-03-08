'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema({
  name: String,
  path: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({create_at: 1})

module.exports = mongoose.model('PictureBucket', schema)