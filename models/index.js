"use strict"
const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise
mongoose.connect(config.get('db'), {
  useMongoClient: true,
  poolSize: 20
}, (err) => {
  if (err) {
    console.error('connect to %s error: ', config.get('db'), err.message)
    process.exit(1)
  }
})

exports.User = require('./user')
exports.Project = require('./project')
exports.ProjectDetail = require('./project/detail')
exports.Picture = require('./picture')
exports.PictureBucket = require('./picture/bucket')
