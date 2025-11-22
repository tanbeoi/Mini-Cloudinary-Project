import { Router } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";
import sharp from "sharp";
import { validate } from "../middleware/validate.js";
import { imageTransformQuerySchema, imageTransformParamsSchema } from "../validation/imageSchemas.js";

const router = Router();

router.get(
  "/:key",
  validate(imageTransformParamsSchema, "params"),
  validate(imageTransformQuerySchema, "query"),
  async (req, res) => {
    try {
      console.log("\n=== IMAGE ROUTE HANDLER ===");
      console.log("req.params:", req.params);
      console.log("req.validatedParams:", req.validatedParams);
      console.log("req.validatedQuery:", req.validatedQuery);

      const { key } = req.validatedParams;
      const { w: width, h: height, fmt: format, q: quality } = req.validatedQuery;
      
      console.log("Destructured - width:", width, typeof width);
      console.log("Destructured - height:", height, typeof height);
      console.log("Destructured - format:", format, typeof format);
      console.log("Destructured - quality:", quality, typeof quality);

      // ---------- FETCH ORIGINAL FROM S3 ----------

      console.log("\nFetching from S3...");
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      });

      const s3Response = await s3.send(command);
      console.log("S3 fetch successful");
      const buffer = await s3Response.Body.transformToByteArray();
      console.log("Buffer created, size:", buffer.length, "bytes");

      // ---------- SHARP PIPELINE ----------

      console.log("\nCreating sharp pipeline...");
      let image = sharp(buffer);

      if (width || height) {
        console.log("Resizing - width:", width, "height:", height);
        image = image.resize({
          width: width || null,
          height: height || null,
          fit: "inside",
        });
        console.log("Resize applied");
      }

      if (format) {
        console.log("Converting format to:", format, "quality:", quality);
        image = image.toFormat(format, { quality });
        console.log("Format conversion applied");
      }

      const outputBuffer = await image.toBuffer();
      console.log("Output buffer created, size:", outputBuffer.length, "bytes");

      const responseFormat = format || "jpeg";
      console.log("Response format:", responseFormat);
      res.set("Content-Type", `image/${responseFormat}`);
      res.send(outputBuffer);
      console.log("Response sent successfully\n");
    } catch (err) {
      console.error("\n!!! ERROR in image route !!!");
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
      res
        .status(404)
        .json({ error: "Image not found or processing failed" });
    }
  }
);export default router;
