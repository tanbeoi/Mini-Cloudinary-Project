import { Router } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";
import sharp from "sharp";

const router = Router();

const ALLOWED_FORMATS = ["jpg", "jpeg", "png", "webp", "avif"];

router.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { w, h, fmt, q } = req.query;

    // ---------- VALIDATION ----------

    // convert to numbers for testing (or keep as null)
    const width = w !== undefined ? Number(w) : null;
    const height = h !== undefined ? Number(h) : null;
    const quality = q !== undefined ? Number(q) : 80;

    const errors = [];

    if (width !== null) {
      if (!Number.isInteger(width) || width <= 0 || width > 4000) {
        errors.push("w must be an integer between 1 and 4000");
      }
    }

    if (height !== null) {
      if (!Number.isInteger(height) || height <= 0 || height > 4000) {
        errors.push("h must be an integer between 1 and 4000");
      }
    }

    let format = null;
    if (fmt !== undefined) {
      if (!ALLOWED_FORMATS.includes(fmt)) {
        errors.push(`fmt must be one of: ${ALLOWED_FORMATS.join(", ")}`);
      } else {
        // Map format to fmt
        // Check if fmt is "jpg" 
        // If so, map to "jpeg" for sharp
        // Otherwise, keep it the same
        format = fmt === "jpg" ? "jpeg" : fmt;
      }
    }

    if (q !== undefined) {
      if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
        errors.push("q must be an integer between 1 and 100");
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Invalid query parameters",
        details: errors,
      });
    }

    // ---------- FETCH ORIGINAL FROM S3 ----------

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    const s3Response = await s3.send(command);
    const buffer = await s3Response.Body.transformToByteArray();

    // ---------- SHARP PIPELINE ----------

    let image = sharp(buffer);

    if (width || height) {
      image = image.resize({
        width: width || null,
        height: height || null,
        fit: "inside",
      });
    }

    if (format) {
      image = image.toFormat(format, { quality });
    }

    const outputBuffer = await image.toBuffer();

    const responseFormat = format || "jpeg";
    res.set("Content-Type", `image/${responseFormat}`);
    res.send(outputBuffer);
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .json({ error: "Image not found or processing failed" });
  }
});

export default router;
