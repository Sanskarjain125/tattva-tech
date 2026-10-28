import express from 'express';
import {
  getPublicJobs,
  getAllJobsAdmin,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob,
} from '../controllers/job.controller.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route: only published jobs
router.get('/', getPublicJobs);

// Admin routes
router.get('/admin/all', protectAdmin, getAllJobsAdmin);
router.post('/', protectAdmin, createJob);
router.put('/:id', protectAdmin, updateJob);
router.patch('/:id/status', protectAdmin, updateJobStatus);
router.delete('/:id', protectAdmin, deleteJob);

export default router;
