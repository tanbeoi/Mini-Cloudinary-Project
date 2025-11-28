import express from "express";
import { uploadToS3 } from "../services/uploadService.js";
import { upload } from "../config/multer.js";

//Handle file upload request and pass it to upload service

const router = express.Router();


router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileName = `${Date.now()}-${file.originalname}`;

    const url = await uploadToS3(file.buffer, fileName, file.mimetype);

    res.json({ key: fileName, url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
