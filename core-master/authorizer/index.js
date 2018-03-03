const moment = require('moment');
const getUser = require('../lib/get-user');

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};


exports.handler = function(event, context) {
  console.log(event);
  const [id, token] = event.authorizationToken.split('/');
  getUser(id).then(user => {
    if (user.token === token
      && moment(user.tokenTimestamp).diff(moment(), 'hours') <= 6) {
      context.succeed(generatePolicy(id, 'Allow', event.methodArn));
      return;
    }

    context.fail('Unauthorized');
    return;
  });
};
