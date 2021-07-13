const Responses = require("../common/API_responses");
const S3 = require('../common/S3')


const bucket = process.env.bucketName;


exports.handler = async event => {
  console.log("event", event);
  console.log("Entring the function");
  console.log("Adding line 1");

  if (!event.pathParameters || !event.pathParameters.fileName) {
    // failed without a fileName
    return Responses._400({ message: "Missing fileName from the Path" });
  }

  let fileName = event.pathParameters.fileName;

  const data = JSON.parse(event.body);
  

  const newData = await S3.write(data, fileName, bucket).catch( err =>{
      console.log('Error in the S3 write',err)
      return null
  })


  if (!newData) {
    // No new Data
    return Responses._400({ message: "Failed to write Data by fileName" });
  }

  return Responses._200({ newData });
};
