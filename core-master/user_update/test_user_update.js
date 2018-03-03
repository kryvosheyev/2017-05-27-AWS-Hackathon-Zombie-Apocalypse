const f = require('./index')

f({
  authorizer: {
    principalId: 'user'
  },
  location: '30.248764, 45.853034'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})