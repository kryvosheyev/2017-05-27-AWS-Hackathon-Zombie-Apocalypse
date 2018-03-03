const f = require('./index');

f({ authorizer: {
    principalId: 'user',
    },
    receiver: 'user',
    timestamp: 124312432564
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
