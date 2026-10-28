import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Smartphone,
  Globe,
  TrendingUp,
  Cpu,
  CheckCircle,
  ExternalLink,
  Code2,
  Users,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function Home({ setActivePage }) {
  const stats = [
    { value: '50+', label: 'Projects Delivered', desc: 'Across 12 countries' },
    { value: '30+', label: 'Happy Clients', desc: 'From startups to enterprise' },
    { value: '5+', label: 'Products in Development', desc: 'High-growth SaaS tools' },
    { value: '100%', label: 'Client Satisfaction', desc: 'Transparent & on-time' },
  ];

  const partners = [
    { name: 'AWS', icon: 'aws', label: 'Amazon Web Services' },
    { name: 'Google Cloud', icon: 'gcp', label: 'Google Cloud Platform' },
    { name: 'OpenAI', icon: 'openai', label: 'OpenAI API Partner' },
    { name: 'Meta', icon: 'meta', label: 'Meta Developer' },
    { name: 'Microsoft', icon: 'msft', label: 'Microsoft for Startups' },
    { name: 'Vercel', icon: 'vercel', label: 'Vercel Cloud' },
  ];

  return (
    <div className="pt-24 pb-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-blue-100/50 via-sky-50/30 to-transparent -z-10 pointer-events-none blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8 pb-16">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                Technology Partner for a Smarter Tomorrow
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              We Turn Ambitious Ideas Into{' '}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Digital Products
              </span>{' '}
              That Matter.
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Tattvaa Tech builds modern software, AI solutions and SaaS products that help businesses grow, automate and scale.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('contact')}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setActivePage('products')}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200/90 shadow-sm hover:shadow transition-all duration-200"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust points micro badge */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Modern Tech Stack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Rapid Prototyping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Dedicated Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: Sculpted 3D 'T' & Floating Glass Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Glowing Backdrop Circle */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-blue-400/20 via-cyan-300/30 to-blue-600/10 blur-2xl animate-pulse-subtle pointer-events-none"></div>

            {/* Central 3D Ribbon 'T' Graphic Container */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              
              {/* Official 3D T Ribbon Logo Image */}
              <img
                src="/t-logo.png"
                alt="Tattvaa Tech Logo"
                className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-[0_25px_40px_rgba(37,99,235,0.38)] animate-float-slow select-none transition-transform hover:scale-105 duration-500"
              />

              {/* Floating Card 1: AI & Automation (Top-Right) */}
              <div className="absolute -top-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-blue-100 shadow-xl shadow-blue-500/10 flex items-center gap-2.5 animate-float-medium select-none">
                <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">AI & Automation</div>
                  <div className="text-[10px] text-blue-600 font-medium">Smarter Workflows</div>
                </div>
              </div>

              {/* Floating Card 2: SaaS Products (Middle-Left) */}
              <div className="absolute top-28 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-500/10 flex items-center gap-2.5 animate-float-slow select-none">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">SaaS Products</div>
                  <div className="text-[10px] text-emerald-600 font-medium">Ready to Scale</div>
                </div>
              </div>

              {/* Floating Card 3: Web & Mobile Apps (Bottom-Left) */}
              <div className="absolute -bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cyan-100 shadow-xl shadow-cyan-500/10 flex items-center gap-2.5 animate-float-medium select-none">
                <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-sm">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Web & Mobile Apps</div>
                  <div className="text-[10px] text-cyan-600 font-medium">Built for Growth</div>
                </div>
              </div>

              {/* Floating Card 4: Strategy Flowchart (Bottom-Right) */}
              <div className="absolute bottom-6 -right-2 sm:-right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/90 shadow-md text-left select-none text-[9px]">
                <span className="font-bold text-slate-700">Ideas</span>
                <span className="text-blue-500 mx-1">➔</span>
                <span className="font-medium text-slate-600">Strategy</span>
                <span className="text-blue-500 mx-1">➔</span>
                <span className="font-medium text-slate-600">Dev</span>
                <span className="text-blue-500 mx-1">➔</span>
                <span className="font-bold text-emerald-600">Growth</span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= STATS SECTION ================= */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {stats.map((stat, i) => (
              <div key={i} className={`pt-4 sm:pt-0 ${i !== 0 ? 'sm:pl-6' : ''} text-center sm:text-left`}>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-900">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TRUSTED PARTNERS / ECOSYSTEM ================= */}
        <div className="mt-14 pt-8 pb-4 text-center">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-8">
            Built with Enterprise-Grade Platforms & Leading Technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            
            {/* AWS */}
            <div className="flex items-center gap-2 font-bold text-slate-800 text-lg hover:text-amber-600 transition-colors">
              <span className="text-2xl font-black">aws</span>
            </div>

            {/* Google Cloud */}
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-base hover:text-blue-600 transition-colors">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span>Google Cloud</span>
            </div>

            {/* OpenAI */}
            <div className="flex items-center gap-2 font-bold text-slate-800 text-base hover:text-emerald-700 transition-colors">
              <Cpu className="w-5 h-5 text-emerald-600" />
              <span>OpenAI</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 font-black text-slate-800 text-lg hover:text-blue-500 transition-colors">
              <span>∞ Meta</span>
            </div>

            {/* Microsoft */}
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-base hover:text-sky-600 transition-colors">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <span className="bg-red-500"></span>
                <span className="bg-green-500"></span>
                <span className="bg-blue-500"></span>
                <span className="bg-amber-500"></span>
              </div>
              <span>Microsoft</span>
            </div>

            {/* Vercel */}
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base hover:text-black transition-colors">
              <span className="text-sm">▲</span>
              <span>Vercel</span>
            </div>
          </div>
        </div>

        {/* ================= QUICK HIGHLIGHTS TEASER ================= */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div
            onClick={() => setActivePage('services')}
            className="group bg-gradient-to-br from-white to-blue-50/50 p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-5">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              End-to-End Engineering
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Full-cycle architecture, full stack web apps, iOS/Android mobile apps, and enterprise DevOps.
            </p>
            <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1">
              Explore Services <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div
            onClick={() => setActivePage('products')}
            className="group bg-gradient-to-br from-white to-cyan-50/50 p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-100/80 text-cyan-600 flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
              Intelligent SaaS Tools
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Proprietary SaaS products like MailPilot, LeadFlow CRM, and AI Agent Hub built for real team growth.
            </p>
            <span className="text-xs font-bold text-cyan-600 inline-flex items-center gap-1">
              View SaaS Products <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div
            onClick={() => setActivePage('about')}
            className="group bg-gradient-to-br from-white to-indigo-50/50 p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
              Long-Term Partnership
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              We act as an extension of your product team with transparent workflows, continuous support and innovation.
            </p>
            <span className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1">
              About Tattvaa Tech <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

        </div>

        {/* ================= CALLOUT BANNER ================= */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
              Ready to create real impact?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have an Ambitious Project in Mind? Let's Build It Together.
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Get in touch with our engineering and product leaders for a free strategy session.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActivePage('contact')}
                className="px-6 py-3 rounded-full bg-white text-blue-700 font-bold text-sm shadow hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
