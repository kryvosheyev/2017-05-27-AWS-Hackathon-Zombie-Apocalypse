const R = require('aws-response');
const f = require('../friendsgetall/index');

exports.handler = R(f);
