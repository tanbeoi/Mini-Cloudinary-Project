# Mini Cloudinary API

[![Live Deployment](https://img.shields.io/website?down_color=red&down_message=down&up_color=brightgreen&up_message=live&url=https%3A%2F%2Fmini-cloudinary-project.onrender.com)](https://mini-cloudinary-project.onrender.com/docs)

A lightweight media upload and transformation API inspired by Cloudinary.  
Built with Node.js, Express, Sharp, and AWS S3/R2.

---

## 🚀 Live Deployment

**Base URL:**  
https://mini-cloudinary-project.onrender.com/docs 

This is the publicly deployed version of the Mini Cloudinary Image Service running on Render. The instance may experience 20–40s cold starts due to the free tier.

---

### Demo video

Watch a short demo of the admin console in action (unlisted):

[Watch demo (YouTube — unlisted)](https://youtu.be/1PZnwWnfjp8)

<p><a href="https://youtu.be/1PZnwWnfjp8"><img src="https://img.youtube.com/vi/1PZnwWnfjp8/maxresdefault.jpg" alt="Admin console demo" width="900" /></a></p>

The video demonstrates uploading, previewing, viewing metadata, and generating signed URLs using the local admin page.

---

## 🚀 Features
- Secure image upload with API key authentication
- Image transformation: resize, format conversion, quality control, and auto-orientation (via Sharp)
- EXIF metadata extraction 
- Signed URL generation for time-limited private access
- Robust request validation with Zod and consistent error responses
- Simple, modular REST API structure (routes, middleware, services)
- Local admin console for quick testing: `admin/admin.html` (upload, preview, metadata, signed URLs)
- API documentation (Swagger/OpenAPI) + Postman collection for easy testing
- Cloud-ready storage support (AWS S3 and Cloudflare R2 compatible)
- Security and tooling: CORS, Helmet, and dotenv for safe config

---

## 🛠 Tech Stack
- **Node.js (ES modules)**
- **Express.js**
- **Sharp** — image transforms and optimizations
- **AWS S3 / Cloudflare R2** — cloud object storage
- **Zod** — schema validation and type-safety
- **Multer** — multipart/form-data upload handling
- **Helmet** — security headers
- **dotenv** — environment configuration
- **CORS** — cross-origin resource control
- **Swagger (OpenAPI) + swagger-ui-express** — interactive API docs from `swagger.yaml`
- **Postman** — included collection for testing (`postman/Mini-Cloudinary.postman_collection.json`)
- **npx serve** (recommended for serving `admin/` locally) and **Render** for public deployment

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
├── postman/
│   └── Mini-Cloudinary.postman_collection.json
├── package-lock.json # Dependency lockfile
└── README.md # Project documentation
```

---

## **Admin Console**
<img width="820" height="800" alt="image" src="https://github.com/user-attachments/assets/26ce8be1-8a33-4f14-8b29-bb23bc40bca3" />
<img width="769" height="822" alt="image" src="https://github.com/user-attachments/assets/bcfdfc0d-3926-4a75-928d-073bdc1fa1cc" />

- **File:** `admin/admin.html`  
- **Purpose:** Quick local admin UI to upload images, preview transformed images via the `/image` route, view EXIF metadata, and generate signed URLs. It's intended for local testing only and stores session data in memory (page session).

How to use locally:

- Start your API locally (example):
```bash
cp .env.example .env
npm install
npm run dev   # run your Express server (listens on PORT in .env, default 3000)
```
 - Serve the static admin page and open it in your browser (recommended):
   ```bash
   # Serve the admin folder with the 'serve' package and open:
   npx serve admin -l 8000
   # then open in browser: http://localhost:8000/admin.html
   ```

Initial setup in the UI:

- The `Base URL` input defaults to `http://localhost:3000` for local testing — leave this if your API is running locally.  
- Enter your admin `API Key` (the same secret used by `apiKeyAuth`) into the `API Key` field — required for protected endpoints (`/upload`, `/metadata`, `/sign`).
- Use the Upload section to POST images to `/upload`, then preview them via the Preview section using the returned image key.

Security note:

- This admin page is for local development and debugging only. **Do not deploy `admin/admin.html` publicly** or commit production API keys into the file. Treat the API key as a secret.

---

## 🧪 Postman Collection

A Postman collection is included to help you test all API routes easily.

Import the file located at: `postman/Mini-Cloudinary.postman_collection.json`

Set the Postman `baseUrl` variable to `https://mini-cloudinary-project.onrender.com` to target the live deployment, or use `http://localhost:3000` for local testing.

The collection includes:

- **Upload Image** – `POST /upload`  
- **Get Image (Transform)** – `GET /image/:key`  
- **Get Image Metadata** – `GET /metadata/:key`  
- **Get Signed URL** – `GET /sign/:key`  

Before running protected routes, update the `apiKey` variable in Postman.

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

Create a `.env` file in the project root by copying the provided example and filling in your credentials:

```bash
cp .env.example .env
# then open `.env` and replace the empty values
```

The `.env.example` contains the expected variables:

```bash
PORT=3000
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=
API_KEY_SECRET=
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

If you haven't already, copy the example and create a `.env` file in the project root:

```bash
cp .env.example .env
# then edit `.env` and fill in the values
```

### 4. Run the development server
```bash
npm run dev
```

Your local API will be available at `http://localhost:3000`. A public deployment is available at `https://mini-cloudinary-project.onrender.com/docs`.



