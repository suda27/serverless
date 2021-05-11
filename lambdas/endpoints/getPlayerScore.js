const Responses = require("../common/API_responses");
const Dynamo = require('../common/Dynamo')


const tableName = process.env.tableName;


exports.handler = async event => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // ID is mising from the path
    return Responses._400({ message: "Missing ID from the Path" });
  }

  let ID = event.pathParameters.ID;

  const user = await Dynamo.get(ID, tableName).catch(err => {
    console.log("Error in Dynamo get", err);
    return null;
  });

  if (!user) {
    // No user
    return Responses._400({ message: "No User found for this ID" });
  }

  return Responses._200({ user });
};
