import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  accentColor = 'blue',
  tag,
  onLearnMore,
}) {
  // Mapping color palettes for the card icon container and accents
  const colorThemes = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      tagBg: 'bg-blue-50 text-blue-700',
      hoverBorder: 'hover:border-blue-300',
      glow: 'group-hover:shadow-blue-500/10',
      arrowHover: 'text-blue-600',
    },
    cyan: {
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      tagBg: 'bg-cyan-50 text-cyan-700',
      hoverBorder: 'hover:border-cyan-300',
      glow: 'group-hover:shadow-cyan-500/10',
      arrowHover: 'text-cyan-600',
    },
    purple: {
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      tagBg: 'bg-purple-50 text-purple-700',
      hoverBorder: 'hover:border-purple-300',
      glow: 'group-hover:shadow-purple-500/10',
      arrowHover: 'text-purple-600',
    },
    violet: {
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      tagBg: 'bg-indigo-50 text-indigo-700',
      hoverBorder: 'hover:border-indigo-300',
      glow: 'group-hover:shadow-indigo-500/10',
      arrowHover: 'text-indigo-600',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      tagBg: 'bg-emerald-50 text-emerald-700',
      hoverBorder: 'hover:border-emerald-300',
      glow: 'group-hover:shadow-emerald-500/10',
      arrowHover: 'text-emerald-600',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      tagBg: 'bg-amber-50 text-amber-700',
      hoverBorder: 'hover:border-amber-300',
      glow: 'group-hover:shadow-amber-500/10',
      arrowHover: 'text-amber-600',
    },
  };

  const theme = colorThemes[accentColor] || colorThemes.blue;

  return (
    <div
      onClick={onLearnMore}
      className={`group relative bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${theme.hoverBorder} ${theme.glow} hover:-translate-y-1.5`}
    >
      <div>
        {/* Icon & optional tag */}
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${theme.iconBg}`}
          >
            {Icon && <Icon className="w-7 h-7" />}
          </div>
          {tag && (
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${theme.tagBg}`}>
              {tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Action link */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${theme.arrowHover}`}
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
