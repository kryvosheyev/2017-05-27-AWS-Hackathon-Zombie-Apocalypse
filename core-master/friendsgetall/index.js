const aws = require('./../lib/aws');
const getuser = require('./../lib/get-user.js');

const getLocation = () => {
    return aws.dynamodb.scan({
      TableName: 'Locations'
    }).promise().then(res => res.Items);
}

const FriendsGetAll = (data) => {
    return getuser(data.authorizer.principalId).then(user=>{
        var friends = [];
        for (var i = 0, len = user.contacts.length; i < len; i++) {
            var friend  = getuser(user.contacts[i]);
            friends.push(friend);
        }
        return Promise.all(friends).then(res => {
            return getLocation().then(l => {
                return [res, l];
            });
        });
    }).then(res => {
        const [allfriends, locations] = res;
        return allfriends
            .filter(friend => friend !== undefined)
            .map((friend, key) => {
            const l = locations.find(l => l.user_id === friend.id);
            return {
                id: friend.id,
                name: friend.name,
                status: friend.status,
                profession: friend.profession,
                avatar: friend.avatar,
                location: l ? l.location : null,
            };
        });
    })

}

module.exports = FriendsGetAll;
