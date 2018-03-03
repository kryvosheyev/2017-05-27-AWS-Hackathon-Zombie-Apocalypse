const aws = require('./../lib/aws');
const getuser = require('./../lib/get-user.js');

const contactGetRequests = (data) => {
    return aws.dynamodb.scan({
            TableName : 'ContactRequest'
        }).promise().then( crequests => {
                return crequests.Items
                    .filter(crequests => crequests.receiver == data.authorizer.principalId)
                    .map((crequests, key) => {
                        return {
                            sender: crequests.sender
                        };
                    })
            });
}

module.exports = contactGetRequests;