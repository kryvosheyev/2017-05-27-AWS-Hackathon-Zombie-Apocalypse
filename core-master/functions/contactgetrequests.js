const R = require('aws-response');
const f = require('../contactGetRequests/index');

exports.handler = R(f);
