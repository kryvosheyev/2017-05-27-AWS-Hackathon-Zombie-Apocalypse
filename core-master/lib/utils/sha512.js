const crypto = require('crypto');
const KEY = 'mysuperseretpass123';

const hash = (text) => {
  const hash = crypto.createHmac('sha512', KEY)
  hash.update(text);
  const value = hash.digest('hex')
  return value;
};

module.exports = hash;
