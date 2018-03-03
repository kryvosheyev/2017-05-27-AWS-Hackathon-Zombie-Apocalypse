const uuid = require('uuid')
const moment = require('moment')

const getUser = require('../lib/get-user')
const updateUser = require('../lib/update-user')
const hash = require('../lib/utils/sha512')

module.exports = (data) => {
  return getUser(data.id)
    .then(user => {
      if (hash(data.password) === user.password) {
        user.token = uuid.v4()
        user.tokenTimestamp = moment().toISOString()
        user.status = 'online'
        return updateUser(user).then(update => user)
      }

      throw new Error('Stupid zombie hazker!!!')
    })
    .then(user => {
      return {
        token: `${user.id}/${user.token}`,
        profession: user.profession,
        contacts: user.contacts,
        id: user.id,
        location: user.location,
        name: user.name,
        avatar: user.avatar,
      }
    })
    .catch(err => {
      console.log(err)
      throw new Error('Can\'t authorize with such data.')
    })
}
