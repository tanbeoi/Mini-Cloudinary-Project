import multer from "multer";

const storage = multer.memoryStorage();

// Allowed MIME types
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

// Max file size: 30MB
const MAX_SIZE = 30 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});
