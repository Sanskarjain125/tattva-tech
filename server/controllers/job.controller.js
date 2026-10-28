import Job from '../models/Job.js';
import mongoose from 'mongoose';

const initialJobs = [
  {
    title: 'Senior Full-Stack Engineer (MERN / Next.js)',
    department: 'Engineering',
    employmentType: 'Full-Time',
    location: 'Remote (India / Global)',
    salary: '₹22L - ₹35L / yr',
    description:
      'Architect and ship high-scale React, Node.js, and MongoDB/PostgreSQL SaaS systems with high performance and test coverage.',
    requirements: [
      'Expertise in modern React, TypeScript, Node.js and Express',
      'Demonstrated experience with MongoDB, Redis, and schema design',
      'Strong sense of UI polish and API contract reliability',
    ],
    responsibilities: [
      'Lead architecture and engineering of high-throughput web portals',
      'Collaborate with product designers to implement responsive, accessible UIs',
      'Mentor junior engineers and conduct rigorous code reviews',
    ],
    status: 'Published',
  },
  {
    title: 'AI / Machine Learning Engineer',
    department: 'AI & Research',
    employmentType: 'Full-Time',
    location: 'Remote / Bengaluru Hub',
    salary: '₹25L - ₹40L / yr',
    description:
      'Design, evaluate, and deploy autonomous LLM agents, RAG knowledge retrieval systems, and vector embedding pipelines.',
    requirements: [
      'Hands-on experience with OpenAI APIs, LangChain, or LlamaIndex',
      'Python proficiency with FastAPI and asynchronous event workers',
      'Familiarity with Pinecone, Milvus, or pgvector architectures',
    ],
    responsibilities: [
      'Build scalable RAG retrieval pipelines with real-time vector search',
      'Fine-tune open-weight models for specialized enterprise workflows',
      'Optimize latency and token costs across multi-agent systems',
    ],
    status: 'Published',
  },
  {
    title: 'Senior Product Designer (UI/UX)',
    department: 'Design',
    employmentType: 'Full-Time',
    location: 'Remote',
    salary: '₹18L - ₹28L / yr',
    description:
      'Create world-class interfaces, interactive Figma prototypes, and cohesive design tokens for our in-house products and client systems.',
    requirements: [
      'Stunning portfolio demonstrating clean SaaS and mobile app UX',
      'Mastery of Figma component architecture and auto-layout',
      'Experience conducting user interviews and usability audits',
    ],
    responsibilities: [
      'Design comprehensive Figma design systems and reusable token libraries',
      'Work side-by-side with frontend engineers to ensure pixel-perfect delivery',
      'Prototype animations and micro-interactions',
    ],
    status: 'Published',
  },
  {
    title: 'Cloud DevOps & Site Reliability Engineer',
    department: 'Infrastructure',
    employmentType: 'Full-Time',
    location: 'Remote',
    salary: '₹20L - ₹32L / yr',
    description:
      'Maintain rock-solid 99.99% uptime, automate Kubernetes clusters, configure CI/CD pipelines, and secure cloud environments.',
    requirements: [
      'Proficiency in AWS or GCP cloud orchestration and Terraform',
      'Docker containerization and automated GitHub Actions workflows',
      'Monitoring expertise with Prometheus, Grafana, and Datadog',
    ],
    responsibilities: [
      'Manage multi-region AWS cloud deployments and auto-scaling groups',
      'Design zero-downtime CI/CD deployment pipelines',
      'Implement automated backup and disaster recovery playbooks',
    ],
    status: 'Published',
  },
];

const seedJobsIfEmpty = async () => {
  if (mongoose.connection.readyState === 1) {
    const count = await Job.countDocuments();
    if (count === 0) {
      await Job.insertMany(initialJobs);
      console.log('[Database Seeded]: Initial job vacancies inserted.');
    }
  }
};

// @desc    Get published jobs for public Careers page
// @route   GET /api/jobs
// @access  Public
export const getPublicJobs = async (req, res, next) => {
  try {
    await seedJobsIfEmpty();
    const jobs = await Job.find({ status: 'Published' }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all jobs for Admin (Published, Closed, Draft)
// @route   GET /api/jobs/admin/all
// @access  Private (Admin)
export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    await seedJobsIfEmpty();

    const query = {};
    if (status && status !== 'All') {
      query.status = status;
    }
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: regex }, { department: regex }, { location: regex }];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job vacancy
// @route   POST /api/jobs
// @access  Private (Admin)
export const createJob = async (req, res, next) => {
  try {
    let {
      title,
      department,
      employmentType,
      location,
      salary,
      description,
      requirements,
      responsibilities,
      deadline,
      status,
    } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and location.',
      });
    }

    const parseArray = (input) => {
      if (Array.isArray(input)) return input;
      if (typeof input === 'string') {
        try {
          return JSON.parse(input);
        } catch {
          return input.split('\n').map((s) => s.trim()).filter(Boolean);
        }
      }
      return [];
    };

    const job = await Job.create({
      title: title.trim(),
      department: department || 'Engineering',
      employmentType: employmentType || 'Full-Time',
      location: location.trim(),
      salary: salary || 'Competitive',
      description: description.trim(),
      requirements: parseArray(requirements),
      responsibilities: parseArray(responsibilities),
      deadline: deadline ? new Date(deadline) : null,
      status: status || 'Published',
    });

    return res.status(201).json({
      success: true,
      message: 'Job vacancy created successfully.',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job vacancy
// @route   PUT /api/jobs/:id
// @access  Private (Admin)
export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    const parseArray = (input) => {
      if (Array.isArray(input)) return input;
      if (typeof input === 'string') {
        try {
          return JSON.parse(input);
        } catch {
          return input.split('\n').map((s) => s.trim()).filter(Boolean);
        }
      }
      return [];
    };

    if (updateData.requirements) updateData.requirements = parseArray(updateData.requirements);
    if (updateData.responsibilities) updateData.responsibilities = parseArray(updateData.responsibilities);

    const job = await Job.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully.',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job status (Published, Closed, Draft)
// @route   PATCH /api/jobs/:id/status
// @access  Private (Admin)
export const updateJobStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Published', 'Closed', 'Draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Published, Closed, or Draft.',
      });
    }

    const job = await Job.findByIdAndUpdate(id, { status }, { new: true });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    return res.status(200).json({
      success: true,
      message: `Job status updated to ${status}.`,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Admin)
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
