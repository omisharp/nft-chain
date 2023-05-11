'use-strict'
const config = require('config')
const moment = require('moment')

var getTimestamp = function () {
   return moment.utc().format(config.dateFormat)
}

exports.getTimestamp = getTimestamp
