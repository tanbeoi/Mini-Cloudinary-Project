# Mini Cloudinary API

A lightweight media upload and transformation API inspired by Cloudinary.  
Built with Node.js, Express, Sharp, and AWS S3/R2.

---

## 🚀 Features
- Image upload
- Image transformation (resize, format conversion, quality)
- EXIF metadata extraction
- Signed URL generation
- RESTful API design
- Production-ready structure (routes, services, config)

---

## 🛠 Tech Stack
- **Node.js**  
- **Express.js**  
- **Sharp** (image processing)  
- **AWS S3 / Cloudflare R2**  
- **dotenv**, **helmet**, **cors**  

---

## 📁 Project Structure
MINI-CLOUDINARY/
├── node_modules/                # Installed dependencies
├── src/
│   ├── config/                  # Environment + S3 config 
│   ├── routes/                  # Route handlers (upload, image, metadata)
│   ├── services/                # Core logic (S3, Sharp, etc.)
│   ├── utils/                   # Helpers (validation, errors)
│   ├── app.js                   # Express app setup (middleware + routes)
│   └── server.js                # Entry point (app.listen)
├── .env                         # Environment variables 
├── package.json                 # Project manifest + scripts
├── package-lock.json            # Dependency lockfile
└── README.md                   

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

