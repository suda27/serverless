const Responses = require("../common/API_responses");
const AWS = require("aws-sdk");

const SNS = new AWS.SNS({ apiVersion: "2010-03-31" });

exports.handler = async event => {
  console.log("event", event);

  const body = JSON.parse(event.body);

  if (!body || !body.phoneNumber || !body.message) {
    return Responses._400({
      message: "missing phone number or messsage from the body"
    });
  }

  const AttributeParams = {
    attributes: {
      DefaultSMSType: "Transactional"
    }
  };

  const messageParams = {
    Message: body.message,
    PhoneNumber: body.phoneNumber
  };

  try {
    await SNS.setSMSAttributes(AttributeParams).promise();
    await SNS.publish(messageParams)
      .promise()
      .then(data => {
        console.log("Message ID ---> " + data.MessageId);
        console.log('DATAAAAAA ----> ',data)
      })
      .catch(error => {
        console.log(error);
      });

    return Responses._200({ message: "text has been sent" });
  } catch (error) {
    console.log("error", error);
    return Responses._400({ message: "text failed to send" });
  }
};
