const R = require('aws-response')
const f = require('../user_location_add/index')

exports.handler = R(f)
