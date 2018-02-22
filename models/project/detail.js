'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema({
  projectId: Schema.Types.ObjectId,
  path: String,
  name: String,
  content: Object,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({projectId: 1, path: 1})

module.exports = mongoose.model('ProjectDetail', schema)