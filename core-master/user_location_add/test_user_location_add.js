const f = require('./index')

f({
  authorizer: {
    principalId: 'user'
  },
  user_id: 'user',
  location: '23.457524, 56.356535',

}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})