import { Router } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/s3.js";

const router = Router();

// GET /sign/:key?expiresIn=60
router.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { expiresIn } = req.query;

    if (!key) {
      return res.status(400).json({ error: "Missing key parameter" });
    }

    // Parse expiry or default to 60 seconds
    let ttl = expiresIn ? Number(expiresIn) : 60;

    // Basic safety: clamp between 10 seconds and 3600 seconds (1 hour)
    if (!Number.isFinite(ttl) || ttl <= 0) {
      ttl = 60;
    }
    if (ttl > 3600) {
      ttl = 3600;
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: ttl, // seconds
    });

    return res.json({
      key,
      url: signedUrl,
      expiresIn: ttl,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Failed to generate signed URL" });
  }
});

export default router;
