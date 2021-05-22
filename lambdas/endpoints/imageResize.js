import Responses from "../common/API_responses";
import S3 from "../common/S3";
import jimp from 'jimp';
const AWS = require("aws-sdk");

exports.handler = async function(event, context, callback) {
  console.log('Event - String', JSON.stringify(event));
  console.log('Event as such ', (event));
  console.log('Context - As String', JSON.stringify(context));
  console.log('Context as such:', context);
  console.log('Callback:',callback);

  const { Records } = event;

  try {
   const promArray =  Records.map(record => {
      const bucket = record.s3.bucket.name;
      const file = record.s3.object.key;
      const width = 300;
      const height = 300;
      return resizeImage({ bucket, file, width, height });
    });

    await Promise.all(promArray);

    return Responses._200();
  } catch (error) {
    console.log("Error in try catch", error);
    return Responses._400();
  }
};


const resizeImage = async ({ bucket, file, width, height }) =>{
    const imageBuffer = await S3.get(file,bucket)
    const jimpImage = await jimp.read(imageBuffer.Body)
    const mime = jimpImage.getMIME();

    const resizedImageBuffer = await jimpImage.scaleToFit(width,height).getBufferAsync(mime);

    const shortFileName = file.split('/')[1];
    const newFileName = `resized/${width}x${height}/${shortFileName}`;

    await S3.write(resizedImageBuffer,newFileName,bucket,'public-read',mime);

    return newFileName;


}