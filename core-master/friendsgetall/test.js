const f = require('./index');

f({ authorizer: {
    principalId: 'user',
    }
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
