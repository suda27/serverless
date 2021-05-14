const Responses = require('../common/API_responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName;

exports.handler = async event => {
  console.log("evebt", event);

  const {connectionId : connectionID , domainName, stage } = event.requestContext;

  const data = {
      ID: connectionID,
      date: Date.now(),
      messages : [],
      domainName,
      stage,
  }

  await Dynamo.write(data,tableName);

  return Responses._200({ message: "Connected" });
};
