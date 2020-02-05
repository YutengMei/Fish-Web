require("dotenv").config(); // Loading dotenv to have access to env variables
const AWS = require("aws-sdk"); // Requiring AWS SDK.

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId: "AKIAUCIJN2SM5QACVBGN", // stored in the .env file
  secretAccessKey: "0Ow2flTgSDsHkTkAy1Ty+9pkHLrJxqmZQSPylE57", // stored in the .env file
  region: "us-east-2" // This refers to your bucket configuration.
});

// Creating a S3 instance
const s3 = new AWS.S3({
  signatureVersion: "v4"
});

// Retrieving the bucket name from env variable
const Bucket = process.env.BUCKET_NAME;

// In order to create pre-signed GET adn PUT URLs we use the AWS SDK s3.getSignedUrl method.
// getSignedUrl(operation, params, callback) ⇒ String
// For more information check the AWS documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

// GET URL Generator
function generateGetUrl(Key) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket,
      Key,
      Expires: 120 // 2 minutes
    };
    // Note operation in this case is getObject
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        // If there is no errors we will send back the pre-signed GET URL
        resolve(url);
      }
    });
  });
}

// PUT URL Generator
function generatePutUrl(Key, ContentType) {
  console.log("----------generateputURL cllaed------------");
  return new Promise((resolve, reject) => {
    // Note Bucket is retrieved from the env variable above.
    const params = { Bucket, Key, ContentType };
    console.log("Bucket:", Bucket);
    console.log("Key:", Key);
    console.log("ContentType", ContentType);
    // Note operation in this case is putObject
    s3.getSignedUrl("putObject", params, function(err, url) {
      if (err) {
        console.log("FKING ERROR");
        reject(err);
      }
      // If there is no errors we can send back the pre-signed PUT URL
      console.log("NO ERROR");
      resolve(url);
    });
  });
}

// Finally, we export the methods so we can use it in our main application.
module.exports = { generateGetUrl, generatePutUrl };
