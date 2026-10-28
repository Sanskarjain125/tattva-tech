import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded from server directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config(); // fallback to current working directory

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export cloudinary instance so controllers can call destroy()
export { cloudinary };

// ─── Helper: extract Cloudinary public_id from a secure URL ─────────────────
// For images: https://res.cloudinary.com/<cloud>/image/upload/v123/folder/abc.jpg -> folder/abc
// For raw files: https://res.cloudinary.com/<cloud>/raw/upload/v123/folder/doc.pdf -> folder/doc.pdf
export const extractPublicId = (url) => {
  try {
    const parts = url.split('/');
    const uploadIdx = parts.indexOf('upload');
    if (uploadIdx === -1) return null;
    const isRaw = parts.includes('raw');
    let start = uploadIdx + 1;
    if (parts[start] && /^v\d+$/.test(parts[start])) start += 1;
    const pathWithExt = parts.slice(start).join('/');
    return isRaw ? pathWithExt : pathWithExt.replace(/\.[^/.]+$/, '');
  } catch {
    return null;
  }
};

// ─── Cloudinary storage — Project cover images ───────────────────────────────
const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tattvaa-tech/projects',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// ─── Cloudinary storage — Product cover images ───────────────────────────────
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tattvaa-tech/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// ─── Cloudinary storage — Insight / case-study cover images ─────────────────
const insightStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tattvaa-tech/insights',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// ─── Cloudinary storage — Candidate resumes (PDF / DOC / DOCX) ───────────────
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    return {
      folder: 'tattvaa-tech/resumes',
      resource_type: 'raw',
      public_id: `resume-${uniqueSuffix}-${sanitizedOriginal}`,
    };
  },
});

// ─── File filters ─────────────────────────────────────────────────────────────
const imageFileFilter = (req, file, cb) => {
  const allowedExts = /\.(jpeg|jpg|png|webp|gif)$/i;
  if (allowedExts.test(file.originalname)) return cb(null, true);
  cb(new Error('Only image files (jpeg, jpg, png, webp, gif) are allowed!'));
};

const resumeFileFilter = (req, file, cb) => {
  const allowedExts = /\.(pdf|doc|docx)$/i;
  if (allowedExts.test(file.originalname)) return cb(null, true);
  cb(new Error('Only document files (PDF, DOC, DOCX) are allowed for resumes!'));
};

// ─── Exported multer instances ────────────────────────────────────────────────
export const uploadProjectImage = multer({
  storage: projectStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: imageFileFilter,
});

export const uploadProductImage = multer({
  storage: productStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: imageFileFilter,
});

export const uploadInsightImage = multer({
  storage: insightStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: imageFileFilter,
});

export const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
  fileFilter: resumeFileFilter,
});
