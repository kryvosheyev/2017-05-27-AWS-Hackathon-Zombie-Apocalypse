const f = require('./index');

f({ receiver: 'user',
    sender: 'Jack',
    timestamp: 124312412812
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

