import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  BookOpen,
  Calendar,
  Clock,
  Upload,
  X,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Share2,
  Star,
  FileText,
} from 'lucide-react';
import {
  fetchAdminInsights,
  createInsight,
  updateInsight,
  togglePublishInsight,
  deleteInsight,
} from '../../services/api';

export default function AdminInsights({ token }) {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagFilter, setTagFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [editingInsight, setEditingInsight] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    tag: 'AI & Automation',
    author: 'Tattvaa Tech Research Team',
    readTime: '5 min read',
    date: '',
    summary: '',
    content: '',
    previewVisual: 'robot',
    clientName: '',
    isFeatured: false,
    isPublished: true,
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');

  const tags = ['All', 'AI & Automation', 'SaaS', 'Web Development', 'Case Study', 'Cloud'];

  const visualOptions = [
    { value: 'robot', label: 'Agentic Core Visual (Robot)' },
    { value: 'laptop', label: 'SaaS Metrics Laptop Visual' },
    { value: 'code', label: 'TypeScript Code Visual' },
    { value: 'custom_image', label: 'Uploaded Custom Cover Image' },
  ];

  const loadInsights = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminInsights({ tag: tagFilter, search: searchQuery }, token);
      setInsights(data);
    } catch (err) {
      console.error('Failed to load insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [tagFilter, token]);

  const handleOpenAdd = () => {
    setEditingInsight(null);
    setFormData({
      title: '',
      tag: 'AI & Automation',
      author: 'Aarav Mehta, Head of AI',
      readTime: '5 min read',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      summary: '',
      content: `### 1. Executive Summary\nDescribe the challenge and technological context.\n\n### 2. Strategy & Implementation\nDetail how Tattvaa Tech built and orchestrated the solution.\n\n### 3. Business Results & Impact\nKey performance indicators and operational gains achieved.`,
      previewVisual: 'robot',
      clientName: '',
      isFeatured: false,
      isPublished: true,
    });
    setCoverImageFile(null);
    setCoverImagePreview('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingInsight(item);
    setFormData({
      title: item.title,
      tag: item.tag,
      author: item.author || 'Tattvaa Tech Team',
      readTime: item.readTime || '5 min read',
      date: item.date || '',
      summary: item.summary,
      content: item.content,
      previewVisual: item.previewVisual || 'robot',
      clientName: item.clientName || '',
      isFeatured: item.isFeatured || false,
      isPublished: item.isPublished,
    });
    setCoverImageFile(null);
    setCoverImagePreview(item.coverImage || '');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, previewVisual: 'custom_image' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim() || !formData.content.trim()) {
      alert('Please fill out the title, summary, and article content.');
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('tag', formData.tag);
      data.append('author', formData.author);
      data.append('readTime', formData.readTime);
      data.append('date', formData.date);
      data.append('summary', formData.summary);
      data.append('content', formData.content);
      data.append('previewVisual', formData.previewVisual);
      data.append('clientName', formData.clientName);
      data.append('isFeatured', formData.isFeatured);
      data.append('isPublished', formData.isPublished);

      if (coverImageFile) {
        data.append('coverImage', coverImageFile);
      }

      if (editingInsight) {
        await updateInsight(editingInsight._id, data, token);
        setNotification('Insight / Case Study updated.');
      } else {
        await createInsight(data, token);
        setNotification('New Case Study / Insight published.');
      }

      setIsModalOpen(false);
      loadInsights();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await togglePublishInsight(id, token);
      setInsights((prev) =>
        prev.map((i) => (i._id === id ? { ...i, isPublished: res.data.isPublished } : i))
      );
      setNotification(`Publication status toggled.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInsight(id, token);
      setInsights((prev) => prev.filter((i) => i._id !== id));
      setDeleteConfirmId(null);
      setNotification('Case study / Insight deleted.');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search articles, authors, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadInsights()}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTagFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tagFilter === t
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadInsights}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-slate-200"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Case Study / Insight</span>
            </button>
          </div>
        </div>
      </div>

      {/* Insights Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span>Loading articles & case studies from MongoDB...</span>
          </div>
        ) : insights.length === 0 ? (
          <div className="py-20 text-center text-slate-400 space-y-1">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
            <div className="text-sm font-semibold text-slate-600">No articles or case studies found</div>
            <p className="text-xs">Click "Add Case Study / Insight" to publish your first content piece.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Title & Excerpt</th>
                  <th className="py-3 px-4">Tag / Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Date & Read Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {insights.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-bold text-slate-900 line-clamp-1 flex items-center gap-1.5">
                        <span>{item.title}</span>
                        {item.isFeatured && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-500" /> Featured
                          </span>
                        )}
                      </div>
                      <div className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                        {item.summary}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {item.tag}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {item.author}
                    </td>

                    <td className="py-3.5 px-4 text-[11px] text-slate-500">
                      <div>{item.date}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.readTime}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(item._id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          item.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {item.isPublished ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewItem(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                          title="Preview Article"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item._id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                          title="Delete"
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

      {/* ================= ADD / EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              {editingInsight ? 'Update Article' : 'New Case Study / Insight'}
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1 mb-4">
              {editingInsight ? `Edit "${editingInsight.title}"` : 'Publish Insight to Website'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. How AI Agents Are Transforming Enterprise Workflows in 2025"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
              </div>

              {/* Tag & Author & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tag / Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="AI & Automation / SaaS / Case Study"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Priya Sharma, Product Architect"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Publication Date & Visual Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. Oct 24, 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Visual Card Style</label>
                  <select
                    value={formData.previewVisual}
                    onChange={(e) => setFormData({ ...formData, previewVisual: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {visualOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image Upload (Optional) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Custom Cover Image (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 cursor-pointer bg-slate-50 text-slate-600 transition-colors">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Upload Article Graphic</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {coverImagePreview && (
                    <div className="relative">
                      <img
                        src={coverImagePreview}
                        alt="Preview"
                        className="w-16 h-12 object-cover rounded-lg border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImageFile(null);
                          setCoverImagePreview('');
                        }}
                        className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Card Summary / Excerpt (shown on grid) *
                </label>
                <textarea
                  rows="2"
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="A concise, compelling 2-line summary for cards on the Insights page..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                ></textarea>
              </div>

              {/* Full Content */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Article / Case Study Story *
                </label>
                <textarea
                  rows="8"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full markdown/text content. Supports ### headings, bullet points, and paragraphs..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                ></textarea>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Mark as Featured Article</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Live / Published</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/25 transition-all disabled:opacity-50"
                >
                  {submitting
                    ? 'Saving...'
                    : editingInsight
                    ? 'Save Changes'
                    : 'Publish Insight'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Reader Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {previewItem.tag}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3 leading-tight">
              {previewItem.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 mb-6 border-b border-slate-100">
              <span>By {previewItem.author}</span>
              <span>•</span>
              <span>{previewItem.date}</span>
              <span>•</span>
              <span>{previewItem.readTime}</span>
            </div>

            <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
              {previewItem.content}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-left">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Delete Insight / Case Study?</h4>
            <p className="text-xs text-slate-500 mb-5">
              This will permanently delete this article record and any uploaded assets from MongoDB.
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
