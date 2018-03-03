const R = require('aws-response');
const f = require('../get_all_msg/index');

exports.handler = R(f);
