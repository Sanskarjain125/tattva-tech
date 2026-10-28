import Contact from '../models/Contact.js';
import mongoose from 'mongoose';
import { sendEnquiryNotificationToCompanyHead } from '../utils/emailService.js';

// In-memory fallback
const inMemoryContacts = [];

// @desc    Submit a new contact enquiry (Public Form)
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and message.',
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    let savedContact = null;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      savedContact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company ? company.trim() : '',
        message: message.trim(),
        status: 'New',
      });
    } else {
      savedContact = {
        _id: 'mem_' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company ? company.trim() : '',
        message: message.trim(),
        status: 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryContacts.unshift(savedContact);
    }

    // Dispatch email notification to company head in the background (fire-and-forget safely)
    sendEnquiryNotificationToCompanyHead({
      name: savedContact.name,
      email: savedContact.email,
      company: savedContact.company,
      message: savedContact.message,
      submissionDate: savedContact.createdAt,
    }).catch((err) => {
      console.warn('[Notice]: Background email task encountered error:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
      data: savedContact,
      source: isDbConnected ? 'mongodb' : 'memory_fallback',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    next(error);
  }
};

// @desc    Get all enquiries with search and filter
// @route   GET /api/contact
// @access  Public / Admin
export const getContacts = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const query = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [{ name: regex }, { email: regex }, { company: regex }, { message: regex }];
      }

      const contacts = await Contact.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
        source: 'mongodb',
      });
    } else {
      let filtered = [...inMemoryContacts];
      if (status && status !== 'All') {
        filtered = filtered.filter((c) => c.status === status);
      }
      if (search && search.trim()) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(s) ||
            c.email.toLowerCase().includes(s) ||
            (c.company && c.company.toLowerCase().includes(s)) ||
            c.message.toLowerCase().includes(s)
        );
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered,
        source: 'memory_fallback',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status and notes
// @route   PATCH /api/contact/:id
// @access  Private (Admin)
export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['New', 'Contacted', 'In Discussion', 'Converted', 'Closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected && mongoose.isValidObjectId(id)) {
      const updateData = {};
      if (status) updateData.status = status;
      if (notes !== undefined) updateData.notes = notes;

      const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Enquiry not found.' });
      }
      return res.status(200).json({ success: true, message: 'Status updated successfully.', data: contact });
    }

    const contact = inMemoryContacts.find((c) => c._id === id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    if (status) contact.status = status;
    if (notes !== undefined) contact.notes = notes;
    contact.updatedAt = new Date().toISOString();

    return res.status(200).json({ success: true, message: 'Status updated successfully.', data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete single enquiry
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected && mongoose.isValidObjectId(id)) {
      const deleted = await Contact.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Enquiry not found.' });
      }
      return res.status(200).json({ success: true, message: 'Enquiry deleted successfully.' });
    }

    const index = inMemoryContacts.findIndex((c) => c._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    inMemoryContacts.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
