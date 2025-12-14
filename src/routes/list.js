import express from "express";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cmd = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET,
      MaxKeys: 200, // limit to 200 items
    });

    const out = await s3.send(cmd);
    const items =
      (out.Contents ?? []) // convert to empty list if no contents
        .filter((o) => o.Key) // defensive: keep only entries that have a Key 
        .map((o) => ({
          key: o.Key,
          size: o.Size ?? 0,
          lastModified: o.LastModified ? o.LastModified.toISOString() : null,
        })) ?? [];

    // newest first sorting
    items.sort((a, b) => {
      const ta = a.lastModified ? Date.parse(a.lastModified) : 0;
      const tb = b.lastModified ? Date.parse(b.lastModified) : 0;
      return tb - ta;
    });

    res.json({ items });
  } catch (err) {
    console.error("LIST ERROR", err);
    res.status(500).json({ error: "Failed to list objects" });
  }
});

export default router;
