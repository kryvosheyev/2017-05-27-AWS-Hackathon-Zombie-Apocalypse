const R = require('aws-response')
const f = require('../user_update/index')

exports.handler = R(f)
