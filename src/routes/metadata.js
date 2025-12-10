import { Router } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";
import sharp from "sharp";
import exifReader from "exif-reader";

const router = Router();

router.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;

    // 1. Fetch original object from S3
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    const s3Response = await s3.send(command);

    // ContentLength and ContentType available from S3 headers
    const sizeBytes =
      s3Response.ContentLength ??
      (await s3Response.Body.transformToByteArray()).length;

    const bodyBuffer =
      s3Response.Body instanceof Uint8Array
        ? s3Response.Body
        : await s3Response.Body.transformToByteArray();

    // 2. Use Sharp to inspect image metadata
    const meta = await sharp(bodyBuffer).metadata();

    // Decode EXIF data if present
    let exifData = null;
    if (meta.exif) {
    exifData = exifReader(meta.exif);
    }

    // 3. Build a clean JSON response
    const result = {
      key,
      bucket: process.env.AWS_S3_BUCKET,
      width: meta.width ?? null,
      height: meta.height ?? null,
      format: meta.format ?? null,          // "jpeg", "png", "webp"
      sizeBytes, // File size in bytes
      mimeType:
        s3Response.ContentType ||
        (meta.format ? `image/${meta.format}` : null),
      orientation: meta.orientation ?? null,
      hasAlpha: meta.hasAlpha ?? null,
      colorSpace: meta.space ?? null,
      hasExif: !!meta.exif,                 // true/false if EXIF block exists
      exif: exifData,                       // Decoded EXIF data (null if no EXIF)
    };

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Image not found or metadata extraction failed" });
  }
});

export default router;
