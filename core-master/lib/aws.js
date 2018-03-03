const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

const ddb = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamodb: ddb,
};
