# Mini Cloudinary API

A lightweight media upload and transformation API inspired by Cloudinary.  
Built with Node.js, Express, Sharp, and AWS S3/R2.

---

## 🚀 Features
- Secure image upload with API key authentication
- Powerful image transformation (resize, format conversion, quality, auto-orientation)
- Fast EXIF metadata extraction (camera, GPS, color profile)
- Instant signed URL generation for private access
- Robust validation with Zod schemas (type-safe, error details)
- RESTful API design with clear error handling
- Production-ready structure (modular routes, services, config)
- Cloud storage support (AWS S3, Cloudflare R2)
- Modern developer experience (typed validation, clear errors, easy extension)

---

## 🛠 Tech Stack
- **Node.js**  
- **Express.js**  
- **Sharp** (high-performance image processing)  
- **AWS S3 / Cloudflare R2** (cloud storage)  
- **Zod** (type-safe validation)  
- **Multer** (file upload handling)  
- **Helmet** (security headers)  
- **dotenv** (environment config)  
- **CORS** (cross-origin resource sharing)  
- **Custom API key authentication**

---

## 📁 Project Structure

```text
MINI-CLOUDINARY/
├── node_modules/ # Installed dependencies
├── src/
│   ├── config/
│   │   ├── multer.js # Multer upload config
│   │   └── s3.js # S3 client/config
│   ├── routes/
│   │   ├── upload.js # Upload endpoint
│   │   ├── image.js # Image transform endpoint
│   │   ├── metadata.js # EXIF metadata endpoint
│   │   └── sign.js # Signed URL endpoint
│   ├── services/
│   │   └── uploadService.js # S3 upload logic
│   ├── middleware/
│   │   ├── apiKeyAuth.js # API key authentication
│   │   └── validate.js # Zod validation middleware
│   ├── validation/
│   │   ├── imageSchemas.js # Zod schemas for image route
│   │   └── signSchemas.js # Zod schemas for sign route
│   ├── utils/ # Helpers (error handling, formatting)
│   ├── app.js # Express app setup (middleware + routes)
│   └── server.js # Entry point (app.listen)
├── .env # Environment variables
├── package.json # Project manifest + scripts
├── package-lock.json # Dependency lockfile
└── README.md # Project documentation
```

---

## 📦 Prerequisites

Before running this project, make sure you have:

- **Node.js v18+**  
  Download: https://nodejs.org/

- **npm (comes with Node.js)**  
  Verify installation:  
  ```bash
  node -v
  npm -v

- **AWS S3 or Cloudflare R2 bucket**  
  You will need:
  - Access key
  - Secret key
  - Bucket name
  - Region or endpoint

- **Git** (optional but recommended)  
  For version control and pushing to GitHub.

### Environment Variables

Create a `.env` file in the project root with the following configuration:

```bash
PORT=3000
S3_ACCESS_KEY=your_access_key_here
S3_SECRET_KEY=your_secret_key_here
S3_BUCKET=your_bucket_name
S3_REGION=your_region_or_endpoint
API_KEY_SECRET=your_api_key_secret
```

---

## ▶️ Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd Mini-Cloudinary
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

If you haven't already, create a `.env` file in the project root with your S3/R2 credentials:

```bash
PORT=3000
S3_ACCESS_KEY=your_access_key_here
S3_SECRET_KEY=your_secret_key_here
S3_BUCKET=your_bucket_name
S3_REGION=your_region_or_endpoint
API_KEY_SECRET=your_api_key_secret
```

### 4. Run the development server
```bash
npm run dev
```

Your API will be available at `http://localhost:3000`

