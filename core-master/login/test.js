const f = require('./index');

f({
    id: 'id1',
    password: 'new',
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
