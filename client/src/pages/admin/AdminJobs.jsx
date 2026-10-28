import React, { useState, useEffect } from 'react';
import {
  Plus,
  Briefcase,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  X,
  MapPin,
  Calendar,
  Clock,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  fetchAdminJobs,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob,
} from '../../services/api';

export default function AdminJobs({ token }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    employmentType: 'Full-Time',
    location: 'Remote',
    salary: 'Competitive',
    description: '',
    requirements: '',
    responsibilities: '',
    deadline: '',
    status: 'Published',
  });

  const statuses = ['All', 'Published', 'Closed', 'Draft'];

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminJobs(
        { status: statusFilter, search: searchQuery },
        token
      );
      setJobs(data);
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter, token]);

  const handleOpenAdd = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'Engineering',
      employmentType: 'Full-Time',
      location: 'Remote',
      salary: '₹18L - ₹28L / yr',
      description: '',
      requirements: '3+ years experience with modern JavaScript\nStrong architecture skills\nCollaborative mindset',
      responsibilities: 'Build scalable full-stack features\nParticipate in architecture reviews\nMaintain code quality',
      deadline: '',
      status: 'Published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      employmentType: job.employmentType,
      location: job.location,
      salary: job.salary || '',
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : '',
      deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
      status: job.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
        responsibilities: formData.responsibilities.split('\n').map((r) => r.trim()).filter(Boolean),
      };

      if (editingJob) {
        await updateJob(editingJob._id, payload, token);
        setNotification('Job vacancy updated successfully.');
      } else {
        await createJob(payload, token);
        setNotification('New job vacancy posted to MongoDB.');
      }

      setIsModalOpen(false);
      loadJobs();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJobStatus(id, newStatus, token);
      setJobs((prev) =>
        prev.map((j) => (j._id === id ? { ...j, status: newStatus } : j))
      );
      setNotification(`Job status updated to ${newStatus}.`);
      setTimeout(() => setNotification(null), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id, token);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setDeleteConfirmId(null);
      setNotification('Vacancy removed.');
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

      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>

      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-24 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span>Loading vacancies from MongoDB...</span>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 text-slate-400 space-y-2">
          <Briefcase className="w-10 h-10 mx-auto text-slate-300" />
          <div className="text-sm font-semibold text-slate-700">No vacancies matching this status</div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg mt-2 inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Post First Vacancy
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {job.department}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    {job.employmentType}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      job.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : job.status === 'Closed'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    ● {job.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span>Salary: <b>{job.salary}</b></span>
                  {job.deadline && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Status Selector & Actions */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
                >
                  <option value="Published">Published (Public)</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>

                <button
                  onClick={() => handleOpenEdit(job)}
                  className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                  title="Edit Vacancy"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(job._id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Delete Vacancy"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD / EDIT VACANCY MODAL ================= */}
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
              {editingJob ? 'Edit Vacancy' : 'Post New Job Vacancy'}
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5 mb-4">
              {editingJob ? editingJob.title : 'New Hiring Role'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full-Stack Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="Engineering"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="Remote / Bengaluru"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Salary / Stipend</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹20L - ₹32L / yr"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Overview of the mission and team..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Key Requirements (one per line)</label>
                <textarea
                  rows="3"
                  placeholder="4+ years with React and Node&#10;MongoDB performance tuning&#10;System architecture experience"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Responsibilities (one per line)</label>
                <textarea
                  rows="3"
                  placeholder="Lead technical design&#10;Mentor engineers&#10;Deliver features with 99.99% uptime"
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Published">Published (Live on Careers Page)</option>
                  <option value="Closed">Closed (Hidden from public)</option>
                  <option value="Draft">Draft</option>
                </select>
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
                  {submitting ? 'Saving to MongoDB...' : editingJob ? 'Update Vacancy' : 'Publish Vacancy'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-left">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Delete Vacancy?</h4>
            <p className="text-xs text-slate-500 mb-5">
              This will permanently delete this job role from MongoDB and remove it from the Careers page.
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
