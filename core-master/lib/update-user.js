const aws = require('./aws');

const updateUser = (user) => {
  return aws.dynamodb.put({
    TableName : 'Users',
    Item: user,
  }).promise().then(res => {
    return res;
  });
}

module.exports = updateUser;
