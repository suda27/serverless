const Responses = require("../common/API_responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async event => {
  console.log("evebt", event);

  const { connectionId: connectionID } = event.requestContext;

  await Dynamo.delete(connectionID, tableName);

  return Responses._200({ message: "Disconnected" });
};
