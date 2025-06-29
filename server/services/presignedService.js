const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.getPresignedUrl = (filename) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: filename,
    Expires: 60,
    ContentType: 'image/jpeg',
  };

  return s3.getSignedUrl('putObject', params);
};