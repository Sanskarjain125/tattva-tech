import express from 'express';
import {
  getPublicInsights,
  getAllInsightsAdmin,
  createInsight,
  updateInsight,
  togglePublishInsight,
  deleteInsight,
} from '../controllers/insight.controller.js';
import { protectAdmin } from '../middleware/auth.js';
import { uploadInsightImage } from '../utils/fileUpload.js';

const router = express.Router();

// Public: get published insights / case studies
router.get('/', getPublicInsights);

// Admin routes
router.get('/admin/all', protectAdmin, getAllInsightsAdmin);
router.post('/', protectAdmin, uploadInsightImage.single('coverImage'), createInsight);
router.put('/:id', protectAdmin, uploadInsightImage.single('coverImage'), updateInsight);
router.patch('/:id/publish', protectAdmin, togglePublishInsight);
router.delete('/:id', protectAdmin, deleteInsight);

export default router;
