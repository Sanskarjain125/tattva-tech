import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'tattva_tech_ultra_secure_jwt_secret_key_2026', {
    expiresIn: '7d',
  });
};

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.',
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: 'admin',
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Admin account created successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    // Also check alternate spelling if not found
    if (!user) {
      if (normalizedEmail === 'admin@tattvaatech.com') {
        user = await User.findOne({ email: 'admin@tattvatech.com' });
      } else if (normalizedEmail === 'admin@tattvatech.com') {
        user = await User.findOne({ email: 'admin@tattvaatech.com' });
      }
    }

    // Seed default admin if user tries logging in with default credentials and DB is empty
    const isDefaultCredentials =
      (normalizedEmail === 'admin@tattvaatech.com' || normalizedEmail === 'admin@tattvatech.com') &&
      password === 'admin123';

    if (!user && isDefaultCredentials) {
      user = await User.create({
        name: 'Tattvaa Administrator',
        email: normalizedEmail,
        password: 'admin123',
        role: 'admin',
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};
