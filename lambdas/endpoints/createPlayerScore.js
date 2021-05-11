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
  const user = JSON.parse(event.body);
  user.ID = ID

  const newUser = await Dynamo.write(user,tableName).catch( err =>{
      console.log('Error in the dynamo write',err)
      return null
  })


  if (!newUser) {
    // No user
    return Responses._400({ message: "Failed to write user by ID" });
  }

  return Responses._200({ user });
};
