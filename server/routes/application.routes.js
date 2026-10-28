import express from 'express';
import {
  submitApplication,
  getApplicationsAdmin,
  updateApplicationStatus,
  deleteApplication,
  downloadResume,
} from '../controllers/application.controller.js';
import { protectAdmin } from '../middleware/auth.js';
import { uploadResume } from '../utils/fileUpload.js';

const router = express.Router();

// Public: Apply for a job with resume
router.post('/', uploadResume.single('resume'), submitApplication);

// Admin routes
router.get('/admin/all', protectAdmin, getApplicationsAdmin);
router.get('/:id/resume', protectAdmin, downloadResume);
router.patch('/:id/status', protectAdmin, updateApplicationStatus);
router.delete('/:id', protectAdmin, deleteApplication);

export default router;
