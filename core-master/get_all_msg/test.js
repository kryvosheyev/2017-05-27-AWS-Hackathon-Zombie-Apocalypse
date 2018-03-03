const f = require('./index');

f({
  authorizer: {
    principalId: 'user'
  },
  receiver: 'Hloya',
  timestamp: 1495935154153,
  limit: 1,
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
