import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  FolderGit2,
  Briefcase,
  Users,
  Layers,
  BookOpen,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle,
  RefreshCw,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { fetchDashboardStats } from '../../services/api';

export default function AdminDashboard({ token, setActiveTab }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchDashboardStats(token);
      setStats(res);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-sm font-medium">Aggregating live data from MongoDB...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm flex items-center justify-between">
        <span>{error}</span>
        <button onClick={loadData} className="px-4 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold">
          Retry
        </button>
      </div>
    );
  }

  const { summary, recentEnquiries, recentApplications } = stats;

  const statCards = [
    {
      title: 'Total Client Enquiries',
      value: summary.totalEnquiries ?? 0,
      subValue: `${summary.newEnquiries ?? 0} New pending`,
      icon: MessageSquare,
      color: 'blue',
      tab: 'contacts',
    },
    {
      title: 'SaaS Products',
      value: summary.publishedProducts ?? 0,
      subValue: `${summary.totalProducts ?? 0} In-house catalog`,
      icon: Layers,
      color: 'purple',
      tab: 'products',
    },
    {
      title: 'Work & Projects',
      value: summary.publishedProjects ?? 0,
      subValue: `${summary.totalProjects ?? 0} Total portfolio`,
      icon: FolderGit2,
      color: 'indigo',
      tab: 'projects',
    },
    {
      title: 'Insights & Case Studies',
      value: summary.publishedInsights ?? 0,
      subValue: `${summary.totalInsights ?? 0} Articles published`,
      icon: BookOpen,
      color: 'amber',
      tab: 'insights',
    },
    {
      title: 'Active Job Vacancies',
      value: summary.activeJobs ?? 0,
      subValue: 'Live on Careers page',
      icon: Briefcase,
      color: 'emerald',
      tab: 'jobs',
    },
    {
      title: 'Total Job Applications',
      value: summary.totalApplications ?? 0,
      subValue: `${summary.newApplications ?? 0} New candidate profiles`,
      icon: Users,
      color: 'cyan',
      tab: 'applications',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In Discussion':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Converted':
      case 'Hired':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shortlisted':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Closed':
      case 'Rejected':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      
      {/* ================= TOP METRICS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              onClick={() => setActiveTab(card.tab)}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</span>
                <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">{card.value}</div>
              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                <span>{card.subValue}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= QUICK SHORTCUTS ================= */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="text-base font-bold">Quick Administrative Actions</h3>
          <p className="text-xs text-blue-200">Manage catalog products, publish insights, or manage projects</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('products')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-blue-900 text-xs font-bold shadow hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold shadow transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish Insight</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold shadow transition-colors border border-blue-600/40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Job</span>
          </button>
        </div>
      </div>

      {/* ================= 2-COLUMN ACTIVITY TABLES ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Client Enquiries */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Recent Client Enquiries</h3>
            </div>
            <button
              onClick={() => setActiveTab('contacts')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View All ({summary.totalEnquiries})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No enquiries received yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentEnquiries.map((enq) => (
                <div key={enq._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">{enq.name}</span>
                      {enq.company && (
                        <span className="text-[10px] text-slate-400 font-medium">({enq.company})</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate max-w-sm">{enq.message}</p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(enq.status)}`}>
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Candidate Applications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-900">Recent Job Applications</h3>
            </div>
            <button
              onClick={() => setActiveTab('applications')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View All ({summary.totalApplications})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {recentApplications.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No candidate applications submitted yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentApplications.map((app) => (
                <div key={app._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{app.applicantName}</div>
                    <div className="text-[11px] text-blue-600 font-medium">{app.jobTitle}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {app.email} • {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
