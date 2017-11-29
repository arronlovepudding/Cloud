'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema({
  ownerId: Schema.Types.ObjectId,
  name: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ownerId: 1})

module.exports = mongoose.model('Project', schema)