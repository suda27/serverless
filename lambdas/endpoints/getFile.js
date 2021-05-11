const Responses = require("../common/API_responses");
const S3 = require("../common/S3");

const bucket = process.env.bucketName;

exports.handler = async event => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.fileName) {
    // failed without a fileName
    return Responses._400({ message: "Missing fileName from the Path" });
  }

  let fileName = event.pathParameters.fileName;

  const file = await S3.get(fileName, bucket).catch(err => {
    console.log("Error in the S3 get", err);
    return null;
  });

  if (!file) {
    // No new Data
    return Responses._400({ message: "Failed to fetch the Data by fileName" });
  }

  return Responses._200({ file });
};
