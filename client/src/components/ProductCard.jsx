import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Send,
  Users,
  Bot,
  BarChart3,
  Layers,
  Globe,
  Package,
} from 'lucide-react';

const iconMap = {
  Send,
  Users,
  Bot,
  BarChart3,
  Sparkles,
  Layers,
  Globe,
  Package,
};

export default function ProductCard({
  icon,
  name,
  tagline,
  category,
  badge,
  previewType = 'mail',
  coverImage,
  onSelect,
}) {
  const IconComponent = typeof icon === 'string' ? iconMap[icon] || Send : icon || Send;

  // Render high-fidelity mini mockups matching the screenshot or custom image
  const renderMiniMockup = () => {
    if (coverImage) {
      return (
        <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      );
    }

    switch (previewType) {
      case 'mail':
        return (
          <div className="w-full h-44 bg-slate-900 rounded-xl p-3 border border-slate-800 shadow-inner overflow-hidden flex flex-col justify-between text-left select-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-[10px] text-slate-400 ml-2 font-mono">MailPilot App</span>
              </div>
              <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono">98.2% Active</span>
            </div>
            <div className="space-y-1.5 my-auto">
              <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-white">Q3 Enterprise Outreach</div>
                  <div className="text-[9px] text-slate-400">12,490 Delivered • 68% Open Rate</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              </div>
              <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/30 flex items-center justify-between opacity-80">
                <div>
                  <div className="text-[11px] font-semibold text-slate-300">Product Tour Follow-up</div>
                  <div className="text-[9px] text-slate-500">Automated sequence • 4 steps</div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">+24%</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-[9px] text-slate-500 border-t border-slate-800/60 font-mono">
              <span>Delivery: Instant</span>
              <span className="text-blue-400">Spam Score: 0.1</span>
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="w-full h-44 bg-slate-50 rounded-xl p-3 border border-slate-200/90 shadow-inner overflow-hidden flex flex-col justify-between text-left select-none">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
              <span className="text-[11px] font-bold text-slate-700">Deals Pipeline</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">$148,500</span>
            </div>
            <div className="grid grid-cols-2 gap-2 my-1">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-[9px] font-semibold text-blue-600 uppercase">Qualified (6)</span>
                <div className="text-[10px] font-bold text-slate-800 mt-1">Stripe Sync</div>
                <div className="text-[9px] text-slate-500">$24,000 / yr</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-[9px] font-semibold text-emerald-600 uppercase">Closing (3)</span>
                <div className="text-[10px] font-bold text-slate-800 mt-1">Apex AI Pro</div>
                <div className="text-[9px] text-slate-500">$52,000 / yr</div>
              </div>
            </div>
            <div className="bg-blue-50/60 p-1.5 rounded text-[9px] text-blue-700 font-medium flex items-center justify-between">
              <span>Next action: Schedule contract call</span>
              <span className="text-[10px]">Today</span>
            </div>
          </div>
        );

      case 'agent':
        return (
          <div className="w-full h-44 bg-slate-950 rounded-xl p-3 border border-purple-900/40 shadow-inner overflow-hidden flex flex-col justify-between text-left select-none">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-purple-300">Autonomous Core</span>
              </div>
              <span className="text-[9px] text-purple-400 font-mono">v3.2 active</span>
            </div>
            <div className="space-y-1.5 my-auto">
              <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800/40 font-mono text-[9px] text-purple-200">
                <div className="text-purple-400">$ prompt.execute(workflow="CustomerSupport")</div>
                <div className="text-emerald-400">✓ Resolved 142 tickets in 3 mins</div>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 font-mono">Memory: 4.8MB</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300 font-mono">Latency: 82ms</span>
              </div>
            </div>
            <div className="text-[9px] text-slate-500 font-mono border-t border-purple-900/30 pt-1 flex justify-between">
              <span>Orchestrator: Online</span>
              <span className="text-purple-400">Zero-Human Loop</span>
            </div>
          </div>
        );

      case 'analytics':
      default:
        return (
          <div className="w-full h-44 bg-slate-900 rounded-xl p-3 border border-slate-800 shadow-inner overflow-hidden flex flex-col justify-between text-left select-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-[10px] font-bold text-slate-300">Revenue Analytics</span>
              <span className="text-[9px] text-cyan-400 font-mono">+38.4% YoY</span>
            </div>
            <div className="flex items-end justify-between h-16 px-2 my-auto gap-1.5">
              {[35, 55, 45, 75, 60, 95, 80, 100].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-t transition-all ${
                      i >= 5 ? 'bg-gradient-to-t from-cyan-600 to-blue-400' : 'bg-slate-700'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono border-t border-slate-800 pt-1">
              <span>MRR: $94,200</span>
              <span className="text-emerald-400">Churn: 0.8%</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      onClick={onSelect}
      className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
    >
      <div>
        {/* Top Header with Icon and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {name}
              </h3>
              <span className="text-xs text-slate-500 font-medium">{category}</span>
            </div>
          </div>
          {badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {badge}
            </span>
          )}
        </div>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
          {tagline}
        </p>

        {/* Interactive UI Mockup */}
        <div className="mb-4 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
          {renderMiniMockup()}
        </div>
      </div>

      {/* Learn more CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
        <span className="text-[11px] text-slate-400 font-medium">Explore Demo</span>
      </div>
    </div>
  );
}
