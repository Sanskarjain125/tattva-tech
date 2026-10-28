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
  Layers,
  RefreshCw,
  Send,
  Users,
  Bot,
  BarChart3,
  Sparkles,
  Globe,
  Star,
  Check,
} from 'lucide-react';
import {
  fetchAdminProducts,
  createProduct,
  updateProduct,
  togglePublishProduct,
  deleteProduct,
} from '../../services/api';

export default function AdminProducts({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: 'Marketing',
    badge: 'Flagship',
    icon: 'Send',
    previewType: 'mail',
    description: '',
    productUrl: '',
    features: '',
    activeUsers: '10K+',
    deliveryRate: '98%',
    engagement: '3x',
    isFeatured: false,
    isPublished: true,
    order: 0,
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');

  const categories = ['All', 'Marketing', 'CRM', 'AI Agents', 'Analytics'];
  const iconOptions = [
    { label: 'Send / Email', value: 'Send', icon: Send },
    { label: 'Users / CRM', value: 'Users', icon: Users },
    { label: 'Bot / AI', value: 'Bot', icon: Bot },
    { label: 'Chart / Analytics', value: 'BarChart3', icon: BarChart3 },
    { label: 'Sparkles', value: 'Sparkles', icon: Sparkles },
    { label: 'Layers', value: 'Layers', icon: Layers },
    { label: 'Globe', value: 'Globe', icon: Globe },
  ];

  const previewTypes = [
    { value: 'mail', label: 'Email Automation UI' },
    { value: 'crm', label: 'Deals Pipeline UI' },
    { value: 'agent', label: 'Autonomous Agent UI' },
    { value: 'analytics', label: 'Analytics Chart UI' },
    { value: 'custom_image', label: 'Uploaded Custom Image' },
  ];

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminProducts(
        { category: categoryFilter, search: searchQuery },
        token
      );
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [categoryFilter, token]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      tagline: '',
      category: 'Marketing',
      badge: 'Flagship',
      icon: 'Send',
      previewType: 'mail',
      description: '',
      productUrl: '',
      features: 'High Deliverability, Real-time Analytics, 24/7 Automation',
      activeUsers: '10K+',
      deliveryRate: '98%',
      engagement: '3x',
      isFeatured: false,
      isPublished: true,
      order: products.length + 1,
    });
    setCoverImageFile(null);
    setCoverImagePreview('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      tagline: product.tagline,
      category: product.category,
      badge: product.badge || 'Flagship',
      icon: product.icon || 'Send',
      previewType: product.previewType || 'mail',
      description: product.description || '',
      productUrl: product.productUrl || '',
      features: Array.isArray(product.features) ? product.features.join(', ') : '',
      activeUsers: product.metrics?.activeUsers || '10K+',
      deliveryRate: product.metrics?.deliveryRate || '98%',
      engagement: product.metrics?.engagement || '3x',
      isFeatured: product.isFeatured || false,
      isPublished: product.isPublished,
      order: product.order || 0,
    });
    setCoverImageFile(null);
    setCoverImagePreview(product.coverImage || '');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, previewType: 'custom_image' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.tagline.trim()) {
      alert('Please provide product name and tagline.');
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('tagline', formData.tagline);
      data.append('category', formData.category);
      data.append('badge', formData.badge);
      data.append('icon', formData.icon);
      data.append('previewType', formData.previewType);
      data.append('description', formData.description);
      data.append('productUrl', formData.productUrl);
      data.append('features', formData.features);
      data.append(
        'metrics',
        JSON.stringify({
          activeUsers: formData.activeUsers,
          deliveryRate: formData.deliveryRate,
          engagement: formData.engagement,
        })
      );
      data.append('isFeatured', formData.isFeatured);
      data.append('isPublished', formData.isPublished);
      data.append('order', formData.order);

      if (coverImageFile) {
        data.append('coverImage', coverImageFile);
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, data, token);
        setNotification('Product updated successfully.');
      } else {
        await createProduct(data, token);
        setNotification('New product added to catalog.');
      }

      setIsModalOpen(false);
      loadProducts();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await togglePublishProduct(id, token);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isPublished: res.data.isPublished } : p))
      );
      setNotification(`Product publication status changed.`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setDeleteConfirmId(null);
      setNotification('Product deleted from database.');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const renderIconComponent = (iconName) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-4 h-4" />;
      case 'Bot':
        return <Bot className="w-4 h-4" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'Send':
      default:
        return <Send className="w-4 h-4" />;
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
            placeholder="Search products by name, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadProducts()}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories & Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
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

          <div className="flex items-center gap-2">
            <button
              onClick={loadProducts}
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
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span>Loading products from MongoDB...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-slate-400 space-y-1">
            <Layers className="w-10 h-10 mx-auto text-slate-300" />
            <div className="text-sm font-semibold text-slate-600">No products found</div>
            <p className="text-xs">Click "Add Product" to add your first in-house SaaS product.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Badge</th>
                  <th className="py-3 px-4">Preview Style</th>
                  <th className="py-3 px-4">Metrics</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
                          {renderIconComponent(p.icon)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{p.name}</span>
                            {p.isFeatured && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 fill-amber-500" /> Featured
                              </span>
                            )}
                          </div>
                          <div className="text-slate-500 text-[11px] line-clamp-1 max-w-xs">
                            {p.tagline}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {p.badge || 'Standard'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-600">
                      {p.coverImage ? (
                        <span className="text-emerald-600 font-semibold">Custom Image</span>
                      ) : (
                        `Mockup: ${p.previewType || 'mail'}`
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[10px] text-slate-500 font-mono">
                      <div>Users: {p.metrics?.activeUsers || '10K+'}</div>
                      <div>Delivery: {p.metrics?.deliveryRate || '98%'}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(p._id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          p.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {p.isPublished ? (
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
                        {p.productUrl && (
                          <a
                            href={p.productUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                            title="Visit URL"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p._id)}
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
              {editingProduct ? 'Update Product' : 'New SaaS Product'}
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1 mb-4">
              {editingProduct ? `Edit "${editingProduct.name}"` : 'Add Product to Catalog'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Product Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. MailPilot, LeadFlow CRM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Marketing, CRM, AI Agents, Analytics"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline (One-line Hook) *</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Email automation for modern businesses with high deliverability."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Badge & Icon & Preview Style */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Flagship / Top Rated / New AI"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Icon Style</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Card Mockup Style</label>
                  <select
                    value={formData.previewType}
                    onChange={(e) => setFormData({ ...formData, previewType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {previewTypes.map((pt) => (
                      <option key={pt.value} value={pt.value}>
                        {pt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image Upload (Optional) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Product Image / Screenshot (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 cursor-pointer bg-slate-50 text-slate-600 transition-colors">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Upload Image</span>
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

              {/* Detailed Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detailed Description (Featured Showcase)
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain how this product solves problems and helps businesses scale..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                ></textarea>
              </div>

              {/* Features & Product URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Key Features (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Auto-sequence, High deliverability, Spam shield"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product / Demo URL</label>
                  <input
                    type="url"
                    value={formData.productUrl}
                    onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                    placeholder="https://app.product.io"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Active Users</label>
                  <input
                    type="text"
                    value={formData.activeUsers}
                    onChange={(e) => setFormData({ ...formData, activeUsers: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Delivery / Uptime</label>
                  <input
                    type="text"
                    value={formData.deliveryRate}
                    onChange={(e) => setFormData({ ...formData, deliveryRate: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Growth / Velocity</label>
                  <input
                    type="text"
                    value={formData.engagement}
                    onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>

              {/* Toggles: Featured & Published */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">
                    Feature prominently on Products page showcase
                  </span>
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
                    : editingProduct
                    ? 'Save Product Changes'
                    : 'Publish Product'}
                </button>
              </div>
            </form>
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
            <h4 className="text-base font-bold text-slate-900 mb-1">Delete SaaS Product?</h4>
            <p className="text-xs text-slate-500 mb-5">
              This will permanently delete this product and its associated assets from MongoDB.
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
