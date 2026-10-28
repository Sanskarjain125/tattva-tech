import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    tag: {
      type: String,
      required: [true, 'Tag / category is required'],
      default: 'AI & Automation',
      trim: true,
    },
    author: {
      type: String,
      default: 'Tattva Tech Research Team',
      trim: true,
    },
    readTime: {
      type: String,
      default: '5 min read',
      trim: true,
    },
    date: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Article content is required'],
    },
    previewVisual: {
      type: String,
      enum: ['robot', 'laptop', 'code', 'custom_image'],
      default: 'robot',
    },
    coverImage: {
      type: String,
      default: '',
    },
    clientName: {
      type: String,
      default: '',
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Insight = mongoose.model('Insight', insightSchema);
export default Insight;
