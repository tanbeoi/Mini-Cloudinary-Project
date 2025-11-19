import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config(); // make sure env is loaded BEFORE we read from process.env

console.log("[S3 CONFIG] Region:", process.env.AWS_REGION);
console.log("[S3 CONFIG] Access key prefix:", process.env.AWS_ACCESS_KEY_ID?.slice(0, 4));
console.log("[S3 CONFIG] Secret key length:", process.env.AWS_SECRET_ACCESS_KEY?.length);
console.log("[S3 CONFIG] Bucket:", process.env.AWS_S3_BUCKET);

//Configure a S3 client using environment variables for credentials and region
//This can be used by the whole application to interact with AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
