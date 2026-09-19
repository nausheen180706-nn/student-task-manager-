import React, { useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CATEGORY_INFO } from '../data/mockTasks';
import {
  BarChart3,
  TrendingUp,
  CheckCircle,
  Calendar,
  Zap,
  Award,
  Sparkles,
  PieChart
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const { tasks, stats, categoryStats } = useTaskContext();

  // Find most productive category
  const mostProductive = useMemo(() => {
    let topCat = 'Coding';
    let maxCompleted = -1;

    Object.entries(categoryStats).forEach(([cat, data]) => {
      if (data.completed > maxCompleted) {
        maxCompleted = data.completed;
        topCat = cat;
      }
    });

    return {
      name: topCat,
      completedCount: Math.max(0, maxCompleted),
      emoji: CATEGORY_INFO[topCat as keyof typeof CATEGORY_INFO]?.emoji || '📚',
    };
  }, [categoryStats]);

  // Weekly activity simulation / calculation based on completed tasks
  const weeklyData = useMemo(() => {
    // Standard Mon - Sun week
    const days = [
      { day: 'Mon', full: 'Monday', count: 3, percentage: 60 },
      { day: 'Tue', full: 'Tuesday', count: 5, percentage: 100 },
      { day: 'Wed', full: 'Wednesday', count: 4, percentage: 80 },
      { day: 'Thu', full: 'Thursday', count: 2, percentage: 40 },
      { day: 'Fri', full: 'Friday', count: 6, percentage: 100 },
      { day: 'Sat', full: 'Saturday', count: 3, percentage: 60 },
      { day: 'Sun', full: 'Sunday', count: 1, percentage: 20 },
    ];

    // Adjust counts slightly if completed count is high
    const totalCompleted = stats.completed;
    const factor = totalCompleted > 0 ? totalCompleted / 24 : 0.5;

    return days.map((d) => {
      const adjustedCount = Math.max(1, Math.round(d.count * (factor + 0.3)));
      return {
        ...d,
        count: adjustedCount,
        heightPct: Math.min(100, Math.max(15, adjustedCount * 14)),
      };
    });
  }, [stats.completed]);

  const totalThisWeek = weeklyData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div id="analytics-page" className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Productivity Analytics
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Insights on your study habits, completion velocity, and weekly focus.
          </p>
        </div>
      </div>

      {/* 4 Analytics Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Completed This Week
            </span>
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {totalThisWeek}
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            +18% from last week
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Tasks Created This Week
            </span>
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {stats.total}
          </div>
          <p className="text-xs text-zinc-400 font-medium mt-1">Active coursework load</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Completion Rate
            </span>
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {stats.progressPercentage}%
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
            {stats.completed} of {stats.total} finished
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Top Category
            </span>
            <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-1.5 truncate">
            <span>{mostProductive.emoji}</span>
            <span className="truncate">{mostProductive.name}</span>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">
            {mostProductive.completedCount} tasks completed
          </p>
        </div>
      </div>

      {/* Weekly Chart Container */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Weekly Task Completion Chart
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Tasks resolved per day across the current semester week
            </p>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
            Current Week
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2">
          {weeklyData.map((item) => (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
            >
              {/* Tooltip & Number on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md shadow-xs">
                {item.count} tasks
              </div>

              {/* Bar */}
              <div className="w-full max-w-[48px] bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden flex flex-col justify-end h-36">
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-violet-500 rounded-xl transition-all duration-500 group-hover:from-indigo-500 group-hover:to-violet-400 group-hover:shadow-md group-hover:shadow-indigo-500/20"
                  style={{ height: `${item.heightPct}%` }}
                />
              </div>

              {/* Day Label */}
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
          <PieChart className="w-4 h-4 text-indigo-600" />
          Coursework Distribution by Category
        </h3>

        <div className="space-y-3 pt-2">
          {Object.entries(categoryStats).map(([cat, info]) => {
            const catInfo = CATEGORY_INFO[cat as keyof typeof CATEGORY_INFO];
            const pct = info.total > 0 ? Math.round((info.completed / info.total) * 100) : 0;

            return (
              <div key={cat} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                    <span>{catInfo.emoji}</span>
                    <span>{cat}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                    <span>{info.completed} / {info.total} completed</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{pct}%</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
