import Contact from '../models/Contact.js';
import Project from '../models/Project.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Product from '../models/Product.js';
import Insight from '../models/Insight.js';

// @desc    Get dashboard metrics, summary stats and recent activities
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      publishedProjects,
      totalProjects,
      activeJobs,
      totalApplications,
      newApplications,
      totalProducts,
      publishedProducts,
      totalInsights,
      publishedInsights,
      recentEnquiries,
      recentApplications,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'New' }),
      Project.countDocuments({ isPublished: true }),
      Project.countDocuments(),
      Job.countDocuments({ status: 'Published' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'New' }),
      Product.countDocuments(),
      Product.countDocuments({ isPublished: true }),
      Insight.countDocuments(),
      Insight.countDocuments({ isPublished: true }),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Application.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalEnquiries,
          newEnquiries,
          publishedProjects,
          totalProjects,
          activeJobs,
          totalApplications,
          newApplications,
          totalProducts,
          publishedProducts,
          totalInsights,
          publishedInsights,
        },
        recentEnquiries,
        recentApplications,
      },
    });
  } catch (error) {
    next(error);
  }
};
