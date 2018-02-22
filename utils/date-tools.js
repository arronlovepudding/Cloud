const Moment = require('moment')

exports.dateStr = function (date) {
  return Moment(date).format('YYYY-MM-DD')
}

exports.datetimeStr = function (date) {
  return Moment(date).format('YYYY-MM-DD hh:mm:ss')
}
