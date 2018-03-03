const R = require('aws-response');
const f = require('../login/index');

exports.handler = R(f);
