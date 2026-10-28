import express from 'express';
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from '../controllers/contact.controller.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(getContacts);

router.route('/:id')
  .patch(protectAdmin, updateContactStatus)
  .delete(protectAdmin, deleteContact);

export default router;
