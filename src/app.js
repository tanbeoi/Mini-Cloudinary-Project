import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import uploadRouter from "./routes/upload.js";
import multer from "multer";
import imageRouter from "./routes/image.js";
import metadataRouter from "./routes/metadata.js";
import signRouter from "./routes/sign.js";

// Load all variables into process.env
dotenv.config();

const app = express();

// Allow all origins (fine for local dev)
app.use(cors());

// Parse Json into Javascript objects to process 
app.use(express.json());

app.use(helmet());

// Use the upload router for handling file uploads
app.use("/api", uploadRouter);

// Image trasnformation router
app.use("/image", imageRouter);

// Image metadata router
app.use("/metadata", metadataRouter);

// Signed URL router
app.use("/sign", signRouter);

app.get("/", (req, res) => {
  res.send("Test");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Catches Multer errors and returns error responses to user
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large. Max 5MB allowed." });
    }
    return res.status(400).json({ error: err.message });
  } else if (err.message === "Invalid file type") {
    return res.status(400).json({ error: "Invalid file type. Only JPG, PNG, WEBP allowed." });
  }
  next(err);
});

export default app;