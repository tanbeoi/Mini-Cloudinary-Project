import { Router } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/s3.js";
import { validate } from "../middleware/validate.js";
import { signParamsSchema, signQuerySchema } from "../validation/signSchemas.js";

const router = Router();

// GET /sign/:key?expiresIn=60
router.get(
  "/:key",
  validate(signParamsSchema, "params"),
  validate(signQuerySchema, "query"),
  async (req, res) => {
    try {
      const { key } = req.validatedParams;
      const { expiresIn: ttl } = req.validatedQuery; // normalized by schema

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      });

      const signedUrl = await getSignedUrl(s3, command, { expiresIn: ttl });

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
