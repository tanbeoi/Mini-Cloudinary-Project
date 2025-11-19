import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

// Function to upload a file to S3
export const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};
