const AWS = require("aws-sdk");

const s3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName
    };

    let data = await s3Client.getObject(params).promise();

    if (!data) {
      throw Error(
        `there was an error fetching  this file ${fileName} from the S3 bucket : ${bucket}`
      );
    }

    if (fileName.slice(fileName.length - 4, fileName.length) == "json") {
      data = data.Body.toString();
    }
    return data;
  },

  async write(data, fileName, bucket, ACL, ContentType) {
    const params = {
      Bucket: bucket,
      Body: Buffer.isBuffer(data) ? data : JSON.stringify(data),
      Key: fileName,
      ACL,
      ContentType
    };

    const newData = await s3Client.putObject(params).promise();

    if (!newData) {
      throw Error(
        `there was an error writing to this file ${fileName} into the S3 bucket : ${bucket}`
      );
    }
    return newData;
  },

  async getSignedUrl(bucket, fileName, expirySeconds) {
    return s3Client.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: fileName,
      Expires: expirySeconds
    });
  },

  async getAllFiles(bucket) {
    const params = {
      Bucket: bucket,
      Delimiter: "/",
      Prefix: "uploads/"
    };

    let data = await  s3Client.listObjects(params).promise();
    console.log(data)
    return data;
  }
};

export default S3;
