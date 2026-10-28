import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Web Apps', 'Mobile Apps', 'SaaS Products', 'AI Solutions'],
      default: 'Web Apps',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    technologies: {
      type: [String],
      default: [],
    },
    projectUrl: {
      type: String,
      trim: true,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    previewType: {
      type: String,
      enum: ['crm_dark', 'mobile_shop', 'analytics_dark', 'custom_image'],
      default: 'custom_image',
    },
    impactMetric: {
      type: String,
      default: 'High Impact',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
