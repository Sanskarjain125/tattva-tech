import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Upload,
  X,
  CheckCircle,
  AlertTriangle,
  FolderGit2,
  RefreshCw,
} from 'lucide-react';
import {
  fetchAdminProjects,
  createProject,
  updateProject,
  togglePublishProject,
  deleteProject,
} from '../../services/api';

export default function AdminProjects({ token }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    category: 'Web Apps',
    description: '',
    technologies: '',
    projectUrl: '',
    impactMetric: '',
    previewType: 'crm_dark',
    isPublished: true,
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');

  const categories = ['All', 'Web Apps', 'Mobile Apps', 'SaaS Products', 'AI Solutions'];

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminProjects(
        { category: categoryFilter, search: searchQuery },
        token
      );
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [categoryFilter, token]);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      clientName: '',
      category: 'Web Apps',
      description: '',
      technologies: 'React, Node.js, Tailwind CSS',
      projectUrl: '',
      impactMetric: 'High Impact',
      previewType: 'crm_dark',
      isPublished: true,
    });
    setCoverImageFile(null);
    setCoverImagePreview('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      clientName: project.clientName,
      category: project.category,
      description: project.description,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : project.technologies,
      projectUrl: project.projectUrl || '',
      impactMetric: project.impactMetric || 'High Impact',
      previewType: project.previewType || 'crm_dark',
      isPublished: project.isPublished,
    });
    setCoverImageFile(null);
    setCoverImagePreview(project.coverImage || '');
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('clientName', formData.clientName);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('technologies', formData.technologies);
      data.append('projectUrl', formData.projectUrl);
      data.append('impactMetric', formData.impactMetric);
      data.append('previewType', formData.previewType);
      data.append('isPublished', formData.isPublished);

      if (coverImageFile) {
        data.append('coverImage', coverImageFile);
      }

      if (editingProject) {
        await updateProject(editingProject._id, data, token);
        setNotification('Project updated successfully.');
      } else {
        await createProject(data, token);
        setNotification('New project added and saved in MongoDB.');
      }

      setIsModalOpen(false);
      loadProjects();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await togglePublishProject(id, token);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isPublished: !p.isPublished } : p))
      );
      setNotification('Publication status toggled.');
      setTimeout(() => setNotification(null), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id, token);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setDeleteConfirmId(null);
      setNotification('Project removed successfully.');
      setTimeout(() => setNotification(null), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      
      {/* Toast */}
      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* ================= ACTIONS & FILTERS BAR ================= */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Completed Project</span>
        </button>

      </div>

      {/* ================= PROJECTS LIST ================= */}
      {loading ? (
        <div className="py-24 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span>Loading project portfolio from MongoDB...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 text-slate-400 space-y-2">
          <FolderGit2 className="w-10 h-10 mx-auto text-slate-300" />
          <div className="text-sm font-semibold text-slate-700">No projects found in this category</div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg mt-2 inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Preview / Banner */}
                <div className="h-40 rounded-xl bg-slate-900 border border-slate-800 mb-4 overflow-hidden relative flex items-center justify-center text-slate-500">
                  {proj.coverImage ? (
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="p-4 text-center text-xs font-mono text-slate-400">
                      <div className="text-blue-400 font-bold mb-1">{proj.previewType}</div>
                      <div>{proj.category}</div>
                    </div>
                  )}
                  {/* Published Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                        proj.isPublished
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {proj.isPublished ? '● Published' : '○ Draft'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {proj.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    {proj.impactMetric}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">{proj.title}</h3>
                <p className="text-[11px] text-slate-500 mb-2">Client: <b>{proj.clientName}</b></p>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(proj.technologies || []).slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                  {(proj.technologies || []).length > 4 && (
                    <span className="text-[10px] text-slate-400">
                      +{proj.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(proj._id)}
                  className={`text-xs font-semibold inline-flex items-center gap-1 ${
                    proj.isPublished ? 'text-amber-600 hover:text-amber-700' : 'text-emerald-600 hover:text-emerald-700'
                  }`}
                  title={proj.isPublished ? 'Unpublish from Work page' : 'Publish to Work page'}
                >
                  {proj.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{proj.isPublished ? 'Unpublish' : 'Publish'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(proj._id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= CREATE / EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-blue-600 uppercase">
              {editingProject ? 'Edit Project' : 'Add Completed Project'}
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5 mb-4">
              {editingProject ? editingProject.title : 'New Portfolio Project'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI-Powered CRM Platform"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Enterprise"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Web Apps">Web Apps</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="SaaS Products">SaaS Products</option>
                    <option value="AI Solutions">AI Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Impact Metric</label>
                  <input
                    type="text"
                    placeholder="e.g. +240% Lead Velocity"
                    value={formData.impactMetric}
                    onChange={(e) => setFormData({ ...formData, impactMetric: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Next.js, Node.js, MongoDB, Stripe"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Detailed breakdown of the challenge, engineering solution, and impact..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Live Demo / Project URL</label>
                <input
                  type="url"
                  placeholder="https://client-demo.com"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cover Image / Dashboard Preview</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors text-slate-700">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Upload Image (PNG, JPG, WebP)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {coverImagePreview && (
                    <div className="w-16 h-12 rounded-lg border border-slate-200 overflow-hidden">
                      <img src={coverImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Publication Status Switch */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishSwitch"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="publishSwitch" className="font-semibold text-slate-700 select-none">
                  Publish to public /work page immediately
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25 transition-all"
                >
                  {submitting ? 'Saving to MongoDB...' : editingProject ? 'Update Project' : 'Save Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-left">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Delete Work Project?</h4>
            <p className="text-xs text-slate-500 mb-5">
              This will remove the project from MongoDB and it will immediately disappear from the public website.
            </p>
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
