const aws = require('./aws')

const getMsg = (compoundkey) => {
  return aws.dynamodb.get({
    TableName: 'Messages',
    Key: {
      compoundkey: compoundkey
    }
  }).promise().then(res => {
    return res.Item
  })
}

module.exports = getUser
