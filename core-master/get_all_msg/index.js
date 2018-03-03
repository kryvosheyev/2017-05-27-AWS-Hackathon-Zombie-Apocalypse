const aws = require('./../lib/aws')

const getAllMsg = (data) => {

  let key = [data.authorizer.principalId, data.receiver].sort().join('-');

  const expression = {
    ':hkey': key,
  };

  const exname = {
    "#key": "compoundkey"
  }

  if (data.timestamp) {
    expression[':rkey'] = data.timestamp;
    exname['#sortkey'] = 'timestamp';
  }

  let range = data.timestamp ? 'and #sortkey > :rkey' : null;

  const params = Object.assign({}, {
    TableName: 'Messages',
    KeyConditionExpression: `#key = :hkey ${range ? range : ''}`,
    ExpressionAttributeValues: expression,
    ExpressionAttributeNames: exname,
    ScanIndexForward: false
  });

  if (data.limit) {
    params.Limit = data.limit;
  }

  return aws.dynamodb.query(params).promise().then(res => {
    return res.Items;
  });
}

module.exports = getAllMsg;
