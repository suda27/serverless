const Responses = require('../common/API_responses')

exports.handler = async event => {
  console.log("evebt", event);

  return Responses._200({ message: "Default" });
};
