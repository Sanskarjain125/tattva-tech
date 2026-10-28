import React, { useState, useEffect } from 'react';
import {
  Send,
  Users,
  Bot,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Play,
  Check,
  TrendingUp,
  Inbox,
  Filter,
  ShieldAlert,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchPublicProducts } from '../services/api';

export default function Products({ setActivePage }) {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [demoTab, setDemoTab] = useState('analytics');
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback initial products
  const defaultFallback = [
    {
      id: 'mailpilot',
      name: 'MailPilot',
      tagline: 'Email automation for modern businesses with high deliverability.',
      category: 'Marketing',
      icon: 'Send',
      badge: 'Flagship',
      previewType: 'mail',
    },
    {
      id: 'leadflow',
      name: 'LeadFlow CRM',
      tagline: 'Manage leads, clients and sales pipelines with intuitive ease.',
      category: 'CRM',
      icon: 'Users',
      badge: 'Top Rated',
      previewType: 'crm',
    },
    {
      id: 'aihub',
      name: 'AI Agent Hub',
      tagline: 'Build, test and deploy autonomous multi-agent AI teams in minutes.',
      category: 'AI Agents',
      icon: 'Bot',
      badge: 'New AI',
      previewType: 'agent',
    },
    {
      id: 'insightboard',
      name: 'InsightBoard',
      tagline: 'Turn fragmented data silos into real-time actionable visual insights.',
      category: 'Analytics',
      icon: 'BarChart3',
      badge: 'Enterprise',
      previewType: 'analytics',
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchPublicProducts();
        if (data && data.length > 0) {
          setProductsList(data);
        } else {
          setProductsList(defaultFallback);
        }
      } catch (err) {
        console.warn('Could not fetch products from backend, using default catalog:', err);
        setProductsList(defaultFallback);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Compute dynamic categories
  const categories = [
    'All Products',
    ...Array.from(new Set(productsList.map((p) => p.category))).filter(Boolean),
  ];

  const filteredProducts =
    activeCategory === 'All Products'
      ? productsList
      : productsList.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER SECTION (Screen 3) ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Our Products
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Innovative Products for a Smarter Future
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Our in-house SaaS products are designed to solve real business problems and help teams work faster and smarter.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 flex-shrink-0">
            <span className="text-xs font-serif italic text-blue-500 font-medium tracking-wide">
              ✦ Built for Real Businesses ✦
            </span>
            <button
              onClick={() => {
                const el = document.getElementById('featured-mailpilot');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all duration-200"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= CATEGORY FILTER TABS ================= */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/90'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ================= 4 PRODUCTS GRID (Screen 3) ================= */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod._id || prod.id}
              icon={prod.icon}
              name={prod.name}
              tagline={prod.tagline}
              category={prod.category}
              badge={prod.badge}
              previewType={prod.previewType}
              coverImage={prod.coverImage}
              onSelect={() => {
                const el = document.getElementById('featured-mailpilot');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>

        {/* ================= FEATURED PRODUCT SHOWCASE: MAILPILOT (Screen 4) ================= */}
        <div id="featured-mailpilot" className="mt-28 pt-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <span>Products</span>
            <span>&gt;</span>
            <span className="text-blue-600 font-semibold">MailPilot</span>
          </div>

          <div className="bg-gradient-to-br from-white via-sky-50/30 to-blue-50/50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-blue-100 shadow-xl relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Product Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">MailPilot</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                      EMAIL AUTOMATION PLATFORM
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Smarter Email Automation for Business Growth
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  MailPilot helps businesses automate outreach, nurture leads and scale communication with powerful email marketing tools.
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActivePage('contact')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActivePage('contact')}
                    className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200/90 shadow-xs transition-colors"
                  >
                    Book a Demo
                  </button>
                </div>

                {/* Metrics Row */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">10K+</div>
                    <div className="text-xs text-slate-500 font-medium">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">98%</div>
                    <div className="text-xs text-slate-500 font-medium">Delivery Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">3x</div>
                    <div className="text-xs text-slate-500 font-medium">Better Engagement</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Realistic Laptop Mockup with Live Dashboard */}
              <div className="lg:col-span-7 flex justify-center">
                
                {/* Laptop Chassis */}
                <div className="w-full max-w-2xl bg-slate-900 p-2 sm:p-3 rounded-2xl shadow-2xl border-4 border-slate-800">
                  
                  {/* Laptop Web Cam Dot */}
                  <div className="flex justify-center mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  </div>

                  {/* Laptop Screen Content (Live Dashboard) */}
                  <div className="bg-white rounded-lg overflow-hidden border border-slate-200 text-slate-800 shadow-inner">
                    
                    {/* Top Browser Bar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span className="text-[10px] font-mono text-slate-400 ml-2">app.mailpilot.io/dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                          All systems operational
                        </span>
                      </div>
                    </div>

                    {/* App Shell: Sidebar + Content */}
                    <div className="flex flex-col sm:flex-row min-h-[300px]">
                      
                      {/* Dashboard Sidebar */}
                      <div className="w-full sm:w-44 bg-slate-50 border-r border-slate-100 p-3 flex flex-col justify-between text-xs">
                        <div className="space-y-1">
                          <div className="text-[11px] font-black text-blue-600 px-2 py-1 flex items-center gap-1.5">
                            <Send className="w-3.5 h-3.5" />
                            <span>MailPilot</span>
                          </div>
                          <div className="pt-2 space-y-1">
                            <button
                              onClick={() => setDemoTab('dashboard')}
                              className={`w-full text-left px-2 py-1.5 rounded-md font-medium text-[11px] ${
                                demoTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              Dashboard
                            </button>
                            <button
                              onClick={() => setDemoTab('campaigns')}
                              className={`w-full text-left px-2 py-1.5 rounded-md font-medium text-[11px] ${
                                demoTab === 'campaigns' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              Campaigns
                            </button>
                            <button
                              onClick={() => setDemoTab('contacts')}
                              className={`w-full text-left px-2 py-1.5 rounded-md font-medium text-[11px] ${
                                demoTab === 'contacts' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              Contacts
                            </button>
                            <button
                              onClick={() => setDemoTab('analytics')}
                              className={`w-full text-left px-2 py-1.5 rounded-md font-medium text-[11px] ${
                                demoTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              Analytics
                            </button>
                            <button
                              onClick={() => setDemoTab('templates')}
                              className={`w-full text-left px-2 py-1.5 rounded-md font-medium text-[11px] ${
                                demoTab === 'templates' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              Templates
                            </button>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500">
                          Workspace: <b>Tattvaa Global</b>
                        </div>
                      </div>

                      {/* Main Dashboard Panel */}
                      <div className="flex-1 p-4 bg-white space-y-4">
                        
                        {/* Action Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Campaign Overview</h4>
                            <p className="text-[10px] text-slate-500">Real-time telemetry and sequence health</p>
                          </div>
                          <button
                            onClick={() => alert('New Campaign Wizard opened! Connected to MailPilot API.')}
                            className="px-2.5 py-1 rounded bg-blue-600 text-white text-[10px] font-bold shadow hover:bg-blue-700 transition-colors"
                          >
                            + Create Campaign
                          </button>
                        </div>

                        {/* Top 3 KPI Cards (Matching Screen 4) */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[9px] text-slate-500 uppercase font-semibold">Total Emails</span>
                            <div className="text-sm font-black text-slate-900">12,490</div>
                            <span className="text-[9px] text-emerald-600 font-medium">+14.2%</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[9px] text-slate-500 uppercase font-semibold">Delivery Rate</span>
                            <div className="text-sm font-black text-blue-600">98.2%</div>
                            <span className="text-[9px] text-emerald-600 font-medium">Clean IP</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[9px] text-slate-500 uppercase font-semibold">Reply Rate</span>
                            <div className="text-sm font-black text-slate-900">3.4%</div>
                            <span className="text-[9px] text-emerald-600 font-medium">High Intent</span>
                          </div>
                        </div>

                        {/* Campaign Performance Bar Chart (Matching Screen 4) */}
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-700">Campaign Performance</span>
                            <span className="text-[9px] text-slate-400">Last 14 Days</span>
                          </div>

                          <div className="flex items-end justify-between h-20 gap-1.5 px-2 pt-2">
                            {[30, 45, 60, 40, 75, 55, 90, 65, 80, 95, 70, 85, 98, 100].map((h, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                                <div
                                  style={{ height: `${h}%` }}
                                  className={`w-full rounded-t transition-all duration-300 ${
                                    idx >= 10
                                      ? 'bg-blue-600 group-hover:bg-blue-700'
                                      : 'bg-blue-300 group-hover:bg-blue-400'
                                  }`}
                                ></div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-[8px] text-slate-400 mt-1 font-mono">
                            <span>Day 1</span>
                            <span>Day 7</span>
                            <span>Day 14 (Peak)</span>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
