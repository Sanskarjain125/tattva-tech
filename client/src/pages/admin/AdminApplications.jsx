import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  FileText,
  Trash2,
  Eye,
  CheckCircle,
  X,
  Phone,
  Mail,
  Globe,
  Download,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import {
  fetchAdminApplications,
  updateApplicationStatus,
  deleteApplication,
  downloadResume,
} from '../../services/api';

export default function AdminApplications({ token }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const statuses = [
    'All',
    'New',
    'Reviewing',
    'Shortlisted',
    'Interview Scheduled',
    'Hired',
    'Rejected',
  ];

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminApplications(
        { status: statusFilter, search: searchQuery },
        token
      );
      setApplications(data);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [statusFilter, token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplicationStatus(id, { status: newStatus }, token);
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
      );
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
      setNotification(`Application status updated to "${newStatus}"`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id, token);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      if (selectedApp && selectedApp._id === id) setSelectedApp(null);
      setDeleteConfirmId(null);
      setNotification('Application record deleted.');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDownload = async (appId) => {
    try {
      setDownloadingId(appId);
      await downloadResume(appId, token);
    } catch (err) {
      setNotification(`Download failed: ${err.message}`);
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Reviewing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Shortlisted':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Interview Scheduled':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hired':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
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

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search candidate, role, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadApplications()}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
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
          <button
            onClick={loadApplications}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span>Loading applicants from MongoDB...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-20 text-center text-slate-400 space-y-1">
            <Users className="w-10 h-10 mx-auto text-slate-300" />
            <div className="text-sm font-semibold text-slate-600">No candidate applications found</div>
            <p className="text-xs">Applications submitted via the Careers page will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Role Applied</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Resume / CV</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{app.applicantName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-blue-600">
                      {app.jobTitle}
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="text-slate-700">{app.email}</div>
                      <div className="text-slate-400 font-mono text-[10px]">{app.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleDownload(app._id)}
                        disabled={downloadingId === app._id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Download Resume"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{downloadingId === app._id ? 'Downloading...' : 'Resume'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(app._id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= DETAIL MODAL ================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scaleUp">
            
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              Candidate Dossier
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1 mb-1">
              {selectedApp.applicantName}
            </h3>
            <p className="text-xs text-blue-600 font-semibold mb-4">
              Applying for: {selectedApp.jobTitle}
            </p>

            <div className="space-y-2.5 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs mb-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email:</span>
                <a href={`mailto:${selectedApp.email}`} className="font-bold text-blue-600 hover:underline">
                  {selectedApp.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-mono text-slate-800">{selectedApp.phone}</span>
              </div>
              {selectedApp.portfolioUrl && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Portfolio / LinkedIn:</span>
                  <a
                    href={selectedApp.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Link</span>
                    <Globe className="w-3 h-3" />
                  </a>
                </div>
              )}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span className="text-slate-500">Status:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusChange(selectedApp._id, e.target.value)}
                  className={`text-xs font-bold px-2 py-1 rounded-lg border ${getStatusBadge(selectedApp.status)}`}
                >
                  <option value="New">New</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {selectedApp.coverLetter && (
              <div className="space-y-1 mb-6">
                <span className="text-xs font-bold text-slate-700">Cover Letter / Candidate Note:</span>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => handleDownload(selectedApp._id)}
                disabled={downloadingId === selectedApp._id}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingId === selectedApp._id ? 'Downloading...' : 'Download Resume'}</span>
              </button>

              <a
                href={`mailto:${selectedApp.email}?subject=Interview Invitation from Tattvaa Tech regarding ${selectedApp.jobTitle}`}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Candidate</span>
              </a>
            </div>

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
            <h4 className="text-base font-bold text-slate-900 mb-1">Delete Candidate Record?</h4>
            <p className="text-xs text-slate-500 mb-5">
              This will permanently delete this application record from MongoDB.
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
