'use strict'
const DateTools = require('../../utils/date-tools')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema({
  projectId: Schema.Types.ObjectId,
  path: String,
  name: String,
  content: Object,
  pvCount: {
    type: Number,
    default: 0
  },
  recentVisit: {
    type: Date,
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({projectId: 1, path: 1})
schema.index({create_at: 1})

schema.virtual('create_at_date').get(function () {
  return DateTools.dateStr(this.create_at)
})

schema.virtual('pv_datetime').get(function () {
  return this.recentVisit ? DateTools.datetimeStr(this.recentVisit) : ''
})

module.exports = mongoose.model('ProjectDetail', schema)