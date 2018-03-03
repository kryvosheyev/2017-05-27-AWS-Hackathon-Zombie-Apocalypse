const aws = require('./aws');

const getUser = (id) => {
  return aws.dynamodb.get({
    TableName : 'Users',
    Key: {
      id: id,
    }
  }).promise().then(res => {
    return res.Item;
  });
}

module.exports = getUser;
