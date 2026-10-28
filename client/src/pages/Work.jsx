import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle,
  X,
  Sparkles,
  Smartphone,
  BarChart2,
  Layers,
  Bot,
  RefreshCw,
  FolderGit2,
} from 'lucide-react';
import { fetchPublicProjects } from '../services/api';

export default function Work({ setActivePage }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const filters = ['All', 'Web Apps', 'Mobile Apps', 'SaaS Products', 'AI Solutions'];

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicProjects(activeFilter);
      setProjects(data);
    } catch (err) {
      console.error('Failed to load published projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [activeFilter]);

  const renderVisualPreview = (study) => {
    // If a custom image was uploaded, display it with high fidelity
    if (study.coverImage) {
      return (
        <div className="w-full h-52 bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
          <img
            src={study.coverImage}
            alt={study.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      );
    }

    switch (study.previewType) {
      case 'crm_dark':
        return (
          <div className="w-full h-52 bg-slate-950 p-4 rounded-xl border border-slate-800 text-left flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-xs font-bold text-white font-mono">CRM Core Intelligence</span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono">
                Live Stream
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 my-2">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-400">Predicted Revenue</div>
                <div className="text-sm font-bold text-white mt-0.5">$940,250</div>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-400">Deals Won</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">84 Deals</div>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-400">AI Accuracy</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">97.8%</div>
              </div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded text-[10px] text-slate-300 flex items-center justify-between border border-slate-800/60">
              <span className="text-blue-400">🤖 Autonomous Lead scoring active</span>
              <span className="text-[9px] text-slate-500 font-mono">Just now</span>
            </div>
          </div>
        );

      case 'mobile_shop':
        return (
          <div className="w-full h-52 bg-gradient-to-b from-slate-100 to-white p-3 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
            <div className="w-40 h-48 bg-slate-900 rounded-2xl p-1.5 shadow-xl border-2 border-slate-700 flex flex-col justify-between">
              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto my-0.5"></div>
              <div className="bg-white rounded-lg flex-1 p-2 flex flex-col justify-between text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black text-slate-900">Trending</span>
                  <span className="text-[8px] text-blue-600 font-bold">Cart (3)</span>
                </div>
                <div className="space-y-1 my-1">
                  <div className="bg-slate-100 h-10 rounded p-1 flex items-center gap-1.5">
                    <div className="w-7 h-7 bg-blue-500/10 rounded flex items-center justify-center text-[8px]">👟</div>
                    <div className="text-[7px]">
                      <div className="font-bold text-slate-800">AirStride Pro</div>
                      <div className="text-slate-500">$189.00</div>
                    </div>
                  </div>
                  <div className="bg-slate-100 h-10 rounded p-1 flex items-center gap-1.5">
                    <div className="w-7 h-7 bg-cyan-500/10 rounded flex items-center justify-center text-[8px]">⌚</div>
                    <div className="text-[7px]">
                      <div className="font-bold text-slate-800">Apex Chrono</div>
                      <div className="text-slate-500">$249.00</div>
                    </div>
                  </div>
                </div>
                <button className="w-full py-1 bg-blue-600 text-white text-[7px] font-bold rounded">
                  Instant Pay →
                </button>
              </div>
            </div>
          </div>
        );

      case 'analytics_dark':
      default:
        return (
          <div className="w-full h-52 bg-slate-950 p-4 rounded-xl border border-slate-800 text-left flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-200 font-mono">Cluster Telemetry</span>
              <span className="text-[10px] text-emerald-400 font-mono">Latency: 42ms</span>
            </div>
            <div className="flex items-end justify-between h-20 px-2 my-auto gap-2">
              {[45, 75, 55, 95, 80, 100, 70, 88, 92, 60].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    style={{ height: `${val}%` }}
                    className={`w-full rounded-t ${
                      i >= 6 ? 'bg-gradient-to-t from-cyan-600 to-blue-400' : 'bg-slate-800'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono border-t border-slate-800 pt-1.5">
              <span>Throughput: 10M events/day</span>
              <span className="text-blue-400">Nodes: 16 Healthy</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER SECTION (Screen 6) ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl space-y-3 text-left">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Our Work
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Real Solutions. Real Impact.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore how we've helped businesses across industries build, launch and scale digital products.
            </p>
          </div>

          <button
            onClick={() => setActivePage('contact')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all self-start lg:self-auto"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= FILTER PILLS (Screen 6) ================= */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/90'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* ================= CASE STUDIES GRID (Screen 6) ================= */}
        {loading ? (
          <div className="py-24 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-7 h-7 animate-spin text-blue-600" />
            <span>Fetching live portfolio from backend...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 mt-10 p-8 space-y-2">
            <FolderGit2 className="w-10 h-10 mx-auto text-slate-300" />
            <h3 className="text-base font-bold text-slate-700">No published projects in this category</h3>
            <p className="text-xs">Check back soon or select another category filter.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((study) => (
              <div
                key={study._id}
                onClick={() => setSelectedCaseStudy(study)}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 text-left"
              >
                <div>
                  {/* Visual Preview Screenshot / Mockup */}
                  <div className="mb-5 rounded-xl overflow-hidden shadow-sm group-hover:scale-[1.01] transition-transform">
                    {renderVisualPreview(study)}
                  </div>

                  {/* Category Tag */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {study.category}
                    </span>
                    {(study.technologies || []).slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {study.title}
                  </h3>

                  {/* Client & Description */}
                  <p className="text-xs text-slate-500 font-medium mb-2">Client: {study.clientName}</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {study.description}
                  </p>
                </div>

                {/* Bottom footer: View Case Study */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1.5">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  {study.impactMetric && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {study.impactMetric}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ================= CASE STUDY DETAIL MODAL ================= */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn text-left">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {selectedCaseStudy.category}
              </span>
              {(selectedCaseStudy.technologies || []).map((t, idx) => (
                <span key={idx} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {t}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              {selectedCaseStudy.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Client: <b>{selectedCaseStudy.clientName}</b> • Published on Tattvaa Tech Portfolio
            </p>

            <div className="mb-6 rounded-xl overflow-hidden border border-slate-200">
              {renderVisualPreview(selectedCaseStudy)}
            </div>

            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Project Overview</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">
              {selectedCaseStudy.description}
            </p>

            {selectedCaseStudy.impactMetric && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-xs font-bold uppercase text-emerald-800">Delivered Impact</span>
                <div className="text-lg font-black text-emerald-700 mt-0.5">{selectedCaseStudy.impactMetric}</div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {selectedCaseStudy.projectUrl ? (
                <a
                  href={selectedCaseStudy.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Visit Live Project</span>
                </a>
              ) : <span></span>}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedCaseStudy(null);
                    setActivePage('contact');
                  }}
                  className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <span>Build Similar Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
