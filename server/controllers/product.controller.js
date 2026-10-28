import Product from '../models/Product.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinary, extractPublicId } from '../utils/fileUpload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial products seed fallback
const defaultProducts = [
  {
    name: 'MailPilot',
    tagline: 'Email automation for modern businesses with high deliverability.',
    category: 'Marketing',
    badge: 'Flagship',
    icon: 'Send',
    previewType: 'mail',
    description:
      'MailPilot helps businesses automate outreach, nurture leads and scale communication with powerful email marketing tools, domain reputation monitoring, and autonomous follow-ups.',
    productUrl: 'https://mailpilot.tattvatech.com',
    features: ['Instant SMTP Delivery', 'Smart Spam Protection', 'Dynamic Personalization', 'Analytics Suite'],
    metrics: {
      activeUsers: '10K+',
      deliveryRate: '98%',
      engagement: '3x',
    },
    isFeatured: true,
    isPublished: true,
    order: 1,
  },
  {
    name: 'LeadFlow CRM',
    tagline: 'Manage leads, clients and sales pipelines with intuitive ease.',
    category: 'CRM',
    badge: 'Top Rated',
    icon: 'Users',
    previewType: 'crm',
    description:
      'A high-performance pipeline manager for closing enterprise deals, tracking sales team quota velocity, and syncing revenue data in real-time.',
    productUrl: 'https://leadflow.tattvatech.com',
    features: ['Visual Kanban Pipeline', 'Automated Deal Scoring', 'Stripe & Quickbooks Sync', 'Team Activity Logs'],
    metrics: {
      activeUsers: '8.5K+',
      deliveryRate: '99.9%',
      engagement: '2.5x',
    },
    isFeatured: false,
    isPublished: true,
    order: 2,
  },
  {
    name: 'AI Agent Hub',
    tagline: 'Build, test and deploy autonomous multi-agent AI teams in minutes.',
    category: 'AI Agents',
    badge: 'New AI',
    icon: 'Bot',
    previewType: 'agent',
    description:
      'Deploy autonomous teams of LLM-powered workers that collaborate to solve complex customer queries, draft engineering specs, and execute web research.',
    productUrl: 'https://aihub.tattvatech.com',
    features: ['Multi-Agent Mesh', 'Deterministic Tool Calling', 'Long-term Memory Store', 'Audit Guardrails'],
    metrics: {
      activeUsers: '15K+',
      deliveryRate: '99%',
      engagement: '5x',
    },
    isFeatured: false,
    isPublished: true,
    order: 3,
  },
  {
    name: 'InsightBoard',
    tagline: 'Turn fragmented data silos into real-time actionable visual insights.',
    category: 'Analytics',
    badge: 'Enterprise',
    icon: 'BarChart3',
    previewType: 'analytics',
    description:
      'Unified executive intelligence dashboard uniting disparate analytics databases into sub-second visual charts, anomaly alerts, and revenue forecasts.',
    productUrl: 'https://insightboard.tattvatech.com',
    features: ['Sub-second OLAP Queries', 'Automated Anomaly Detection', 'Custom Executive Reports', 'Role-based Access'],
    metrics: {
      activeUsers: '12K+',
      deliveryRate: '100%',
      engagement: '4x',
    },
    isFeatured: false,
    isPublished: true,
    order: 4,
  },
];

// Seed initial products if collection is empty
const seedProductsIfEmpty = async () => {
  if (mongoose.connection.readyState === 1) {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(defaultProducts);
      console.log('[Database Seeded]: Initial SaaS products inserted.');
    }
  }
};

// @desc    Get published products for public /products page
// @route   GET /api/products
// @access  Public
export const getPublicProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    await seedProductsIfEmpty();

    const query = { isPublished: true };
    if (category && category !== 'All' && category !== 'All Products') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products (published & unpublished) for Admin
// @route   GET /api/products/admin/all
// @access  Private (Admin)
export const getAllProductsAdmin = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    await seedProductsIfEmpty();

    const query = {};
    if (category && category !== 'All' && category !== 'All Products') {
      query.category = category;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { tagline: regex }, { category: regex }, { badge: regex }];
    }

    const products = await Product.find(query).sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      tagline,
      category,
      description,
      badge,
      icon,
      previewType,
      productUrl,
      features,
      metrics,
      isFeatured,
      isPublished,
      order,
    } = req.body;

    if (!name || !tagline || !category) {
      return res.status(400).json({
        success: false,
        message: 'Product name, tagline, and category are required.',
      });
    }

    // Cover image path if uploaded (Cloudinary secure URL)
    let coverImage = '';
    if (req.file) {
      coverImage = req.file.path;
    } else if (req.body.coverImage) {
      coverImage = req.body.coverImage;
    }

    // Parse features array
    let parsedFeatures = [];
    if (features) {
      if (Array.isArray(features)) {
        parsedFeatures = features;
      } else {
        parsedFeatures = features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    // Parse metrics
    let parsedMetrics = { activeUsers: '10K+', deliveryRate: '98%', engagement: '3x' };
    if (metrics) {
      if (typeof metrics === 'string') {
        try {
          parsedMetrics = JSON.parse(metrics);
        } catch {
          // ignore parsing error, retain defaults
        }
      } else if (typeof metrics === 'object') {
        parsedMetrics = { ...parsedMetrics, ...metrics };
      }
    }

    const product = await Product.create({
      name: name.trim(),
      tagline: tagline.trim(),
      category: category.trim(),
      description: description ? description.trim() : '',
      badge: badge ? badge.trim() : 'Flagship',
      icon: icon ? icon.trim() : 'Send',
      previewType: previewType || (coverImage ? 'custom_image' : 'mail'),
      coverImage,
      productUrl: productUrl ? productUrl.trim() : '',
      features: parsedFeatures,
      metrics: parsedMetrics,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      isPublished: isPublished === 'true' || isPublished === true || isPublished === undefined,
      order: order ? parseInt(order, 10) : 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      tagline,
      category,
      description,
      badge,
      icon,
      previewType,
      productUrl,
      features,
      metrics,
      isFeatured,
      isPublished,
      order,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    if (name) product.name = name.trim();
    if (tagline) product.tagline = tagline.trim();
    if (category) product.category = category.trim();
    if (description !== undefined) product.description = description.trim();
    if (badge !== undefined) product.badge = badge.trim();
    if (icon !== undefined) product.icon = icon.trim();
    if (previewType !== undefined) product.previewType = previewType;
    if (productUrl !== undefined) product.productUrl = productUrl.trim();
    if (isFeatured !== undefined) {
      product.isFeatured = isFeatured === 'true' || isFeatured === true;
    }
    if (isPublished !== undefined) {
      product.isPublished = isPublished === 'true' || isPublished === true;
    }
    if (order !== undefined) {
      product.order = parseInt(order, 10) || 0;
    }

    if (features !== undefined) {
      if (Array.isArray(features)) {
        product.features = features;
      } else {
        product.features = features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    if (metrics !== undefined) {
      if (typeof metrics === 'string') {
        try {
          product.metrics = JSON.parse(metrics);
        } catch {
          // ignore
        }
      } else if (typeof metrics === 'object') {
        product.metrics = { ...product.metrics, ...metrics };
      }
    }

    if (req.file) {
      // Remove old image from Cloudinary or local uploads
      if (product.coverImage && product.coverImage.includes('cloudinary.com')) {
        const publicId = extractPublicId(product.coverImage);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.warn('[Notice]: Cloudinary destroy error:', err.message);
          }
        }
      } else if (product.coverImage && product.coverImage.startsWith('/uploads/products/')) {
        const oldPath = path.join(__dirname, '..', product.coverImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      product.coverImage = req.file.path;
      if (product.previewType === 'mail') {
        product.previewType = 'custom_image';
      }
    }

    const updated = await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle product published state
// @route   PATCH /api/products/:id/publish
// @access  Private (Admin)
export const togglePublishProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    product.isPublished = !product.isPublished;
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Product is now ${product.isPublished ? 'Published' : 'Unpublished'}.`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    if (product.coverImage && product.coverImage.includes('cloudinary.com')) {
      const publicId = extractPublicId(product.coverImage);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.warn('[Notice]: Cloudinary destroy error:', err.message);
        }
      }
    } else if (product.coverImage && product.coverImage.startsWith('/uploads/products/')) {
      const imgPath = path.join(__dirname, '..', product.coverImage);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
