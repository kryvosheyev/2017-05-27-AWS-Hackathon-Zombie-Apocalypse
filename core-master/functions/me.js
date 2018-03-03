const R = require('aws-response');
const f = require('../me/index');

exports.handler = R(f);
