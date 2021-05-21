const Responses = require("../common/API_responses");
import * as fileType from "file-type";
import { v4 as uuid } from "uuid";
import s3 from "../common/S3";

const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];

exports.handler = async event => {
  try {
    const body = JSON.parse(event.body);

    if (!body || !body.image || !body.mime) {
      return Responses._400({ message: "Incorrect body request" });
    }
    if (!allowedMimes.includes(body.mime)) {
      return Responses._400({ message: "Mime is not allowed" });
    }

    let imageData = body.image;

    if (body.image.substr(0, 7) === "base64,") {
      imageData = body.image.substr(7, body.image.length);
    }

    const buffer = Buffer.from(imageData, "base64");

    const fileInfo = await fileType.fromBuffer(buffer);

    const detectedExt = fileInfo.ext;
    const detectedMime = fileInfo.mime;

    if (detectedMime !== body.mime) {
      return Responses._400({ message: "Mime types don't match" });
    }

    const name = uuid();
    const key = `${name}.${detectedExt}`;

    console.log(`writing image to bucket called ${key}`);

    await s3.write(buffer, key, process.env.imageUploadBucket, null, body.mime);

    const url = await s3.getSignedUrl(process.env.imageUploadBucket, key, 60);

    return Responses._200({ imageURL: url });
  } catch (error) {
    console.log(error);

    return Responses._400({
      message: error.message || "failed to upload image susa"
    });
  }
};
