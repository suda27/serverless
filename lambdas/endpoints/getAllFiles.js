const Responses = require("../common/API_responses");
const S3 = require('../common/S3');

const bucket = process.env.imageUploadBucket;

const AWS = require("aws-sdk");

const s3Client = new AWS.S3();

exports.handler = async event => {
  console.log("event", event);

  //   if (!event.pathParameters || !event.pathParameters.fileName) {
  //     // failed without a fileName
  //     return Responses._400({ message: "Missing fileName from the Path" });
  //   }

  //   let fileName = event.pathParameters.fileName;
  const params = {
    Bucket: bucket,
    Prefix: "uploads/"
  };

  let data = await  s3Client.listObjects(params).promise();
  console.log(data)
//   return data;

//   const data = await S3.getAllFiles(bucket).catch(err => {
//     console.log("Error in the S3 get", err);
//     return null;
//   });

  if (!data) {
    // No new Data
    return Responses._400({ message: "Failed to fetch the Data by fileName" });
  }

  return Responses._200({ data });
};

