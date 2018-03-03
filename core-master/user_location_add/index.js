const getUser = require('../lib/get-user')
const updateUser = require('../lib/update-user')
const userLocationAdd = require('../lib/user_location_add')

module.exports = (data) => {
  return getUser(data.authorizer.principalId)
    .then(user => {

      if (!data.user_id) {
        data.user_id = user.id
      }
      user.location = data.location
      updateUser(user)

      return userLocationAdd(data).then(() => {
        console.log(user)
        return data
      })
    }).catch(err => {
      console.log(err)
      throw new Error('Cannot update user')
    })
}
