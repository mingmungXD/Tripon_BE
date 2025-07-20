const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * S3에 파일을 업로드하고 공개 URL을 반환합니다.
 * @param {Buffer} buffer 업로드할 파일의 데이터
 * @param {string} filename S3에 저장할 파일 이름
 * @param {string} contentType MIME 타입 (예: 'image/png')
 * @returns {string} 업로드된 파일의 public URL
 */
const uploadToS3 = async (buffer, filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: filename,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read', // URL로 접근 가능하게
  });

  await s3.send(command);

  return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${filename}`;
};

module.exports = { uploadToS3 };