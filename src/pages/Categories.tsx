import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Category } from '../types/task';
import { CATEGORY_INFO } from '../data/mockTasks';
import { TaskCard } from '../components/TaskCard';
import { TaskList } from '../components/TaskList';
import { FolderKanban, Plus, CheckCircle2, Clock, ChevronRight, Layers } from 'lucide-react';

export const Categories: React.FC = () => {
  const { tasks, categoryStats, openAddTaskModal } = useTaskContext();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const categories: Category[] = ['College', 'Coding', 'Assignment', 'Project', 'Exam', 'Personal'];

  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter((t) => t.category === selectedCategory);

  return (
    <div id="categories-page" className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <FolderKanban className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Task Categories
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Organize coursework, coding practice, projects, and personal routines.
          </p>
        </div>

        <button
          onClick={openAddTaskModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((catKey) => {
          const info = CATEGORY_INFO[catKey];
          const stats = categoryStats[catKey] || { total: 0, completed: 0, pending: 0 };
          const isSelected = selectedCategory === catKey;
          const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return (
            <div
              key={catKey}
              id={`category-card-${catKey.toLowerCase()}`}
              onClick={() => setSelectedCategory(isSelected ? 'All' : catKey)}
              className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md ${
                isSelected
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/10 dark:bg-indigo-950/20'
                  : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                      {info.emoji}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {info.label}
                      </h3>
                      <p className="text-xs text-zinc-400">{info.description}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {stats.total}
                  </span>
                </div>

                {/* Progress Mini Bar */}
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden my-3">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Counts footer */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {stats.completed} Completed
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {stats.pending} Pending
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Category Tasks Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {selectedCategory === 'All' ? 'All Category Tasks' : `${selectedCategory} Tasks`}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              {filteredTasks.length}
            </span>
          </div>

          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Show all categories
            </button>
          )}
        </div>

        <TaskList
          tasks={filteredTasks}
          emptyTitle={`No tasks in ${selectedCategory}`}
          emptyDescription="Create a task with this category to keep your coursework structured."
        />
      </div>
    </div>
  );
};
