import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  RotateCcw,
  Server,
  Database,
  Code2,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, resetDemoData, tasks } = useTaskContext();

  return (
    <div id="settings-page" className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <SettingsIcon className="w-5 h-5" />
        </span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Settings & Architecture
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Student preferences and CS101 full-stack connection blueprint.
          </p>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          Student Profile
        </h2>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
            SU
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Student User
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
              Department of AI & Data Science
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Roll No: CS2026-084 • Semester 2 • Academic Year 2026
            </p>
          </div>
        </div>
      </div>

      {/* Appearance & Theme */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              Theme Preference
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Choose between daylight and late-night coding dark mode.
            </p>
          </div>

          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                theme === 'light'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Light
            </button>
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-zinc-700 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Webinar Live Demo Reset Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-indigo-600" />
              Webinar Demonstration State
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Reset all tasks and mock notifications back to the initial 12 student CS tasks.
            </p>
          </div>

          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs transition-all self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Tasks</span>
          </button>
        </div>
      </div>

      {/* Educational Full-Stack Architecture Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-zinc-950 text-white shadow-xl space-y-5 border border-indigo-800/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <Layers className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-white">
              Full-Stack Learning Blueprint (For Students)
            </h3>
            <p className="text-xs text-indigo-200">
              How this React frontend connects to your Express + MongoDB backend
            </p>
          </div>
        </div>

        {/* 3 Step Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Box 1 */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              1. React Frontend
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Components call methods in <code className="text-indigo-200 bg-white/10 px-1 py-0.5 rounded">src/services/api.ts</code>. The UI has zero knowledge of SQL or MongoDB.
            </p>
          </div>

          {/* Box 2 */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Server className="w-4 h-4" />
              2. Node.js + Express
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Express router handles REST endpoints:
              <br /><code className="text-emerald-300">GET /api/tasks</code>
              <br /><code className="text-amber-300">POST /api/tasks</code>
              <br /><code className="text-rose-300">DELETE /api/tasks/:id</code>
            </p>
          </div>

          {/* Box 3 */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4" />
              3. MongoDB (Mongoose)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Task documents stored as JSON-like documents with <code className="text-indigo-200 bg-white/10 px-1 py-0.5 rounded">title, priority, category, dueDate, completed</code>.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-xs text-indigo-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            To connect to a live backend, simply update <code className="font-mono bg-black/20 px-1 py-0.5 rounded">src/services/api.ts</code> to use <code className="font-mono text-emerald-300">fetch()</code> without rewriting any UI component!
          </span>
        </div>
      </div>
    </div>
  );
};
