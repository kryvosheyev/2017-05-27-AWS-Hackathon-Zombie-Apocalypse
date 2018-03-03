const moment = require('moment');
const aws = require('./../lib/aws');
const getuser = require('./../lib/get-user.js');
const userexists = require('./../lib/user_exists.js');

const contactRequest = (data) => {
    // if receiver exists

    return userexists(data.receiver).then( res =>  {
        if (res === false) {
            console.log('ContactRequest: requested user does not exist');
            throw new Error('ContactRequest: requested user does not exist');
        } else {
        // write friend request to db
            //data.timestamp = moment().toISOString();
            return aws.dynamodb.put({
                    TableName: 'ContactRequest',
                    Item: data,
                }).promise().then(res => {
                    // push notification to receiver
                    return data;
                });
        }
    })
    // if request not already exists, we don't care because we will simply rewrite existing record
}


module.exports = contactRequest;