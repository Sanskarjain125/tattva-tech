import Insight from '../models/Insight.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinary, extractPublicId } from '../utils/fileUpload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial default insights & case studies
const defaultInsights = [
  {
    title: 'How AI Agents Are Transforming Businesses in 2025',
    tag: 'AI & Automation',
    author: 'Aarav Mehta, Head of AI',
    readTime: '5 min read',
    date: 'Oct 10, 2025',
    summary:
      'From single prompt completions to autonomous multi-agent task forces: how enterprise teams are orchestrating intelligent agentic workflows to multiply output 10x.',
    previewVisual: 'robot',
    content: `The paradigm of artificial intelligence has shifted dramatically. While 2023 and 2024 were dominated by single-turn prompt engineering and standard chatbots, 2025 marks the era of autonomous, persistent AI agents that execute complex multi-step workflows.

### 1. From Passive LLMs to Active Executors
Traditional LLMs were reactive text generators. Contemporary AI agents possess tool-calling capabilities, short and long-term memory, and self-reflection loops that inspect their own intermediate outputs before acting.

### 2. Multi-Agent Orchestration
Instead of relying on a monolithic model to handle everything, modern architectures deploy specialized agent roles—a planner agent, a coder agent, a reviewer agent, and an executor. This separation of concerns dramatically minimizes hallucinations and elevates reliability to enterprise SLAs.

### 3. Business Impact
Enterprises adopting agentic workflows in customer support, automated lead qualification, and software testing report upwards of a 60% reduction in cycle time and near-instant response rates.`,
    isPublished: true,
    isFeatured: true,
  },
  {
    title: 'Key Features Every Modern SaaS Product Should Have',
    tag: 'SaaS',
    author: 'Priya Sharma, Product Architect',
    readTime: '4 min read',
    date: 'Oct 5, 2025',
    summary:
      'What sets top-tier SaaS apart in a crowded marketplace: multi-tenancy, granular RBAC, sub-second latency, and AI-embedded native workflows.',
    previewVisual: 'laptop',
    content: `Users in 2025 expect software to feel instantaneous, deeply personalized, and collaborative by default. If your product requires a 20-page manual to understand, adoption stalls.

### 1. Zero-Friction Onboarding
The first five minutes dictate user retention. Products that offer interactive checklists, sample sandboxes, and social or SSO logins experience 3x higher free-to-paid conversion rates.

### 2. Embedded Intelligence
AI should not feel like an afterthought bolted onto a side drawer. It should predict what the user needs next, whether that is autofilling invoice items, recommending campaign audiences, or flagging anomalies in data.

### 3. Transparent Pricing & Usage Tiers
Modern buyers demand usage transparency. Giving customers instant visibility into seats, API calls, and storage builds enduring trust.`,
    isPublished: true,
    isFeatured: false,
  },
  {
    title: 'The Future of Web Development in the Age of AI',
    tag: 'Web Development',
    author: 'Karan Patel, Principal Engineer',
    readTime: '6 min read',
    date: 'Sep 28, 2025',
    summary:
      'How AI-assisted code generation, edge runtimes, and component systems are reshaping full-stack engineering and redefining high-velocity teams.',
    previewVisual: 'code',
    content: `Software engineering is experiencing its greatest renaissance. AI has not replaced engineers; it has supercharged them into software architects who can build and iterate at speeds previously impossible.

### 1. Edge-First Architecture
Computing is moving closer to the user. Edge servers and distributed data stores enable web applications to load assets, execute logic, and render dynamic content within 50 milliseconds globally.

### 2. Component Design Systems & Micro-frontends
Reusable, highly accessible UI component systems (like Tailwind CSS and headless UI) allow engineering teams to build modular interfaces that maintain strict brand consistency while allowing continuous updates.

### 3. Security & Code Integrity
As speed increases, automated continuous security scanning, automated linting, and strict TypeScript types guarantee that fast shipping does not compromise user privacy or security.`,
    isPublished: true,
    isFeatured: false,
  },
];

// Seed initial insights if empty
const seedInsightsIfEmpty = async () => {
  if (mongoose.connection.readyState === 1) {
    const count = await Insight.countDocuments();
    if (count === 0) {
      await Insight.insertMany(defaultInsights);
      console.log('[Database Seeded]: Initial insights and case studies inserted.');
    }
  }
};

// @desc    Get published insights for public /insights page
// @route   GET /api/insights
// @access  Public
export const getPublicInsights = async (req, res, next) => {
  try {
    const { tag } = req.query;
    await seedInsightsIfEmpty();

    const query = { isPublished: true };
    if (tag && tag !== 'All') {
      query.tag = tag;
    }

    const insights = await Insight.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: insights.length,
      data: insights,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all insights for admin
// @route   GET /api/insights/admin/all
// @access  Private (Admin)
export const getAllInsightsAdmin = async (req, res, next) => {
  try {
    const { tag, search } = req.query;
    await seedInsightsIfEmpty();

    const query = {};
    if (tag && tag !== 'All') {
      query.tag = tag;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: regex }, { tag: regex }, { author: regex }, { summary: regex }];
    }

    const insights = await Insight.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: insights.length,
      data: insights,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new insight or case study
// @route   POST /api/insights
// @access  Private (Admin)
export const createInsight = async (req, res, next) => {
  try {
    const {
      title,
      tag,
      author,
      readTime,
      date,
      summary,
      content,
      previewVisual,
      clientName,
      isPublished,
      isFeatured,
    } = req.body;

    if (!title || !tag || !summary || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, category tag, summary, and content are required.',
      });
    }

    let coverImage = '';
    if (req.file) {
      coverImage = req.file.path; // Cloudinary secure URL
    } else if (req.body.coverImage) {
      coverImage = req.body.coverImage;
    }

    const formattedDate =
      date && date.trim()
        ? date.trim()
        : new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

    const insight = await Insight.create({
      title: title.trim(),
      tag: tag.trim(),
      author: author ? author.trim() : 'Tattvaa Tech Team',
      readTime: readTime ? readTime.trim() : '5 min read',
      date: formattedDate,
      summary: summary.trim(),
      content: content.trim(),
      previewVisual: previewVisual || (coverImage ? 'custom_image' : 'robot'),
      coverImage,
      clientName: clientName ? clientName.trim() : '',
      isPublished: isPublished === 'true' || isPublished === true || isPublished === undefined,
      isFeatured: isFeatured === 'true' || isFeatured === true,
    });

    return res.status(201).json({
      success: true,
      message: 'Case study / Insight published successfully.',
      data: insight,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update insight or case study
// @route   PUT /api/insights/:id
// @access  Private (Admin)
export const updateInsight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      tag,
      author,
      readTime,
      date,
      summary,
      content,
      previewVisual,
      clientName,
      isPublished,
      isFeatured,
    } = req.body;

    const insight = await Insight.findById(id);
    if (!insight) {
      return res.status(404).json({ success: false, message: 'Insight not found.' });
    }

    if (title) insight.title = title.trim();
    if (tag) insight.tag = tag.trim();
    if (author !== undefined) insight.author = author.trim();
    if (readTime !== undefined) insight.readTime = readTime.trim();
    if (date !== undefined) insight.date = date.trim();
    if (summary !== undefined) insight.summary = summary.trim();
    if (content !== undefined) insight.content = content.trim();
    if (previewVisual !== undefined) insight.previewVisual = previewVisual;
    if (clientName !== undefined) insight.clientName = clientName.trim();
    if (isPublished !== undefined) {
      insight.isPublished = isPublished === 'true' || isPublished === true;
    }
    if (isFeatured !== undefined) {
      insight.isFeatured = isFeatured === 'true' || isFeatured === true;
    }

    if (req.file) {
      if (insight.coverImage && insight.coverImage.includes('cloudinary.com')) {
        const publicId = extractPublicId(insight.coverImage);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.warn('[Notice]: Cloudinary destroy error:', err.message);
          }
        }
      } else if (insight.coverImage && insight.coverImage.startsWith('/uploads/insights/')) {
        const oldPath = path.join(__dirname, '..', insight.coverImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      insight.coverImage = req.file.path;
      if (insight.previewVisual === 'robot') {
        insight.previewVisual = 'custom_image';
      }
    }

    const updated = await insight.save();

    return res.status(200).json({
      success: true,
      message: 'Insight updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle published state of insight
// @route   PATCH /api/insights/:id/publish
// @access  Private (Admin)
export const togglePublishInsight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const insight = await Insight.findById(id);
    if (!insight) {
      return res.status(404).json({ success: false, message: 'Insight not found.' });
    }

    insight.isPublished = !insight.isPublished;
    await insight.save();

    return res.status(200).json({
      success: true,
      message: `Insight is now ${insight.isPublished ? 'Published' : 'Draft / Unpublished'}.`,
      data: insight,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete insight
// @route   DELETE /api/insights/:id
// @access  Private (Admin)
export const deleteInsight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const insight = await Insight.findById(id);
    if (!insight) {
      return res.status(404).json({ success: false, message: 'Insight not found.' });
    }

    if (insight.coverImage && insight.coverImage.includes('cloudinary.com')) {
      const publicId = extractPublicId(insight.coverImage);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.warn('[Notice]: Cloudinary destroy error:', err.message);
        }
      }
    } else if (insight.coverImage && insight.coverImage.startsWith('/uploads/insights/')) {
      const imgPath = path.join(__dirname, '..', insight.coverImage);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Insight.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Insight / Case Study deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
