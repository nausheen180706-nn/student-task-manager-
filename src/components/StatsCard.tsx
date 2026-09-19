import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  id: string;
  icon: LucideIcon;
  number: number | string;
  label: string;
  trendText: string;
  accentColor: 'indigo' | 'amber' | 'emerald' | 'rose';
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  id,
  icon: Icon,
  number,
  label,
  trendText,
  accentColor,
  onClick,
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50/80 dark:bg-indigo-950/30',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-100/80 dark:border-indigo-900/40',
      highlight: 'text-indigo-600 dark:text-indigo-400',
    },
    amber: {
      bg: 'bg-amber-50/80 dark:bg-amber-950/30',
      iconBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400',
      border: 'border-amber-100/80 dark:border-amber-900/40',
      highlight: 'text-amber-600 dark:text-amber-400',
    },
    emerald: {
      bg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100/80 dark:border-emerald-900/40',
      highlight: 'text-emerald-600 dark:text-emerald-400',
    },
    rose: {
      bg: 'bg-rose-50/80 dark:bg-rose-950/30',
      iconBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400',
      border: 'border-rose-100/80 dark:border-rose-900/40',
      highlight: 'text-rose-600 dark:text-rose-400',
    },
  };

  const scheme = colorMap[accentColor];

  return (
    <div
      id={id}
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border ${
        scheme.border
      } shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
        onClick ? 'cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl ${scheme.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {number}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium flex items-center gap-1">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${scheme.highlight.replace('text-', 'bg-')}`} />
          {trendText}
        </p>
      </div>
    </div>
  );
};
