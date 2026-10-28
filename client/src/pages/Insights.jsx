import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Clock,
  Calendar,
  X,
  Share2,
  BookOpen,
  Cpu,
  Layers,
  Code2,
  RefreshCw,
} from 'lucide-react';
import { fetchPublicInsights } from '../services/api';

export default function Insights({ setActivePage }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultFallback = [
    {
      id: 'ai-agents-2025',
      title: 'How AI Agents Are Transforming Businesses in 2025',
      tag: 'AI & Automation',
      date: 'Oct 10, 2025',
      readTime: '5 min read',
      author: 'Aarav Mehta, Head of AI',
      summary:
        'From single prompt completions to autonomous multi-agent task forces: how enterprise teams are orchestrating intelligent agentic workflows to multiply output 10x.',
      previewVisual: 'robot',
      content: `The paradigm of artificial intelligence has shifted dramatically. While 2023 and 2024 were dominated by single-turn prompt engineering and standard chatbots, 2025 marks the era of autonomous, persistent AI agents that execute complex multi-step workflows.

### 1. From Passive LLMs to Active Executors
Traditional LLMs were reactive text generators. Contemporary AI agents possess tool-calling capabilities, short and long-term memory, and self-reflection loops that inspect their own intermediate outputs before acting.

### 2. Multi-Agent Orchestration
Instead of relying on a monolithic model to handle everything, modern architectures deploy specialized agent roles—a planner agent, a coder agent, a reviewer agent, and an executor. This separation of concerns dramatically minimizes hallucinations and elevates reliability to enterprise SLAs.

### 3. Business Impact
Enterprises adopting agentic workflows in customer support, automated lead qualification, and software testing report upwards of a 60% reduction in cycle time and near-instant response rates.`,
    },
    {
      id: 'modern-saas-features',
      title: 'Key Features Every Modern SaaS Product Should Have',
      tag: 'SaaS',
      date: 'Oct 5, 2025',
      readTime: '4 min read',
      author: 'Priya Sharma, Product Architect',
      summary:
        'What sets top-tier SaaS apart in a crowded marketplace: multi-tenancy, granular RBAC, sub-second latency, and AI-embedded native workflows.',
      previewVisual: 'laptop',
      content: `Users in 2025 expect software to feel instantaneous, deeply personalized, and collaborative by default. If your product requires a 20-page manual to understand, adoption stalls.

### 1. Zero-Friction Onboarding
The first five minutes dictate user retention. Products that offer interactive checklists, sample sandboxes, and social or SSO logins experience 3x higher free-to-paid conversion rates.

### 2. Embedded Intelligence
AI should not feel like an afterthought bolted onto a side drawer. It should predict what the user needs next, whether that is autofilling invoice items, recommending campaign audiences, or flagging anomalies in data.

### 3. Transparent Pricing & Usage Tiers
Modern buyers demand usage transparency. Giving customers instant visibility into seats, API calls, and storage builds enduring trust.`,
    },
    {
      id: 'future-web-development',
      title: 'The Future of Web Development in the Age of AI',
      tag: 'Web Development',
      date: 'Sep 28, 2025',
      readTime: '6 min read',
      author: 'Karan Patel, Principal Engineer',
      summary:
        'How AI-assisted code generation, edge runtimes, and component systems are reshaping full-stack engineering and redefining high-velocity teams.',
      previewVisual: 'code',
      content: `Software engineering is experiencing its greatest renaissance. AI has not replaced engineers; it has supercharged them into software architects who can build and iterate at speeds previously impossible.

### 1. Edge-First Architecture
Computing is moving closer to the user. Edge servers and distributed data stores enable web applications to load assets, execute logic, and render dynamic content within 50 milliseconds globally.

### 2. Component Design Systems & Micro-frontends
Reusable, highly accessible UI component systems (like Tailwind CSS and headless UI) allow engineering teams to build modular interfaces that maintain strict brand consistency while allowing continuous updates.

### 3. Security & Code Integrity
As speed increases, automated continuous security scanning, automated linting, and strict TypeScript types guarantee that fast shipping does not compromise user privacy or security.`,
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchPublicInsights();
        if (data && data.length > 0) {
          setArticles(data);
        } else {
          setArticles(defaultFallback);
        }
      } catch (err) {
        console.warn('Could not fetch insights from backend, using defaults:', err);
        setArticles(defaultFallback);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderVisual = (type, coverImage) => {
    if (coverImage) {
      return (
        <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
          <img
            src={coverImage}
            alt="Article Visual"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      );
    }

    switch (type) {
      case 'robot':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-950 rounded-xl flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-lg shadow-blue-500/20 mb-2">
                <Cpu className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                Agentic Core 2025
              </span>
            </div>
          </div>
        );

      case 'laptop':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 rounded-xl flex items-center justify-center p-4 relative overflow-hidden">
            <div className="w-36 h-24 bg-white rounded-t-lg p-2 shadow-2xl border border-slate-300 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-blue-500 rounded w-3/4"></div>
                <div className="h-1.5 bg-slate-200 rounded w-1/2"></div>
                <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
              </div>
              <div className="h-3 bg-slate-100 rounded flex items-center px-1">
                <span className="text-[6px] text-blue-600 font-bold">SaaS Metrics Pro</span>
              </div>
            </div>
            <div className="absolute bottom-4 w-44 h-1.5 bg-slate-400 rounded-b"></div>
          </div>
        );

      case 'code':
      default:
        return (
          <div className="w-full h-44 bg-slate-950 rounded-xl p-3 border border-slate-800 flex flex-col justify-between font-mono text-left select-none">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
              <span className="text-cyan-400">App.tsx</span>
              <span>TypeScript</span>
            </div>
            <div className="space-y-1 text-[9px] text-slate-300 my-auto">
              <div><span className="text-purple-400">const</span> <span className="text-blue-300">executeAiAgent</span> = <span className="text-purple-400">async</span> () =&gt; &#123;</div>
              <div className="pl-3 text-slate-400">// Real-time autonomous orchestration</div>
              <div className="pl-3"><span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> agent.<span className="text-amber-300">solveTask</span>(input);</div>
              <div className="pl-3"><span className="text-purple-400">return</span> res.<span className="text-emerald-400">streamOutput</span>();</div>
              <div>&#125;;</div>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[9px] text-emerald-400">
              ✓ All 48 tests passed (0 err)
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Our Insights
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Latest Articles & Insights
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Stay updated with the latest trends in technology, AI, SaaS and digital growth.
            </p>
          </div>

          <button
            onClick={() => {
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all self-start lg:self-auto"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= ARTICLES GRID ================= */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art._id || art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="mb-5 rounded-xl overflow-hidden shadow-sm group-hover:scale-[1.01] transition-transform">
                  {renderVisual(art.previewVisual, art.coverImage)}
                </div>

                {/* Tag */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {art.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                  {art.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {art.summary}
                </p>
              </div>

              {/* Card Meta: Date and Read Time */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{art.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= ARTICLE READER MODAL ================= */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {selectedArticle.tag}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 mb-6 border-b border-slate-100">
              <span>By {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Enjoyed this insight? Let's connect.</span>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setActivePage('contact');
                }}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
