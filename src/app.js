import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import uploadRouter from "./routes/upload.js";
import multer from "multer";
import imageRouter from "./routes/image.js";
import metadataRouter from "./routes/metadata.js";
import signRouter from "./routes/sign.js";
import listRouter from "./routes/list.js";
import { apiKeyAuth } from './middleware/apiKeyAuth.js'; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

// Load all variables into process.env
dotenv.config();

const app = express();

// Allow all origins (fine for local dev)
app.use(cors());

// Parse Json into Javascript objects to process 
app.use(express.json());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Load Swagger.yaml file 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(
  path.resolve(__dirname, "../swagger.yaml")
);

// Serve Swagger UI at /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use the upload router for handling file uploads
app.use("/upload", apiKeyAuth, uploadRouter);

// Image trasnformation router
app.use("/image", imageRouter);

// List objects router
app.use("/list", listRouter);

// Image metadata router
app.use("/metadata", apiKeyAuth, metadataRouter);

// Signed URL router
app.use("/sign", apiKeyAuth, signRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Project!");
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

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (err.code === "NoSuchKey") {
    return res.status(404).json({ error: "File not found in storage." });
  }

  if (err.message?.includes("Sharp")) {
    return res.status(400).json({ error: "Image processing failed." });
  }

  return res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

export default app;