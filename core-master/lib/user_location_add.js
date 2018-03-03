const aws = require('./aws')

const userLocationAdd = (locations) => {
  console.log('LOC = ' + locations)
  return aws.dynamodb.put({
    TableName: 'Locations',
    Item : locations,
  }).promise().then(res => {
    return res
  })
}

module.exports = userLocationAdd
