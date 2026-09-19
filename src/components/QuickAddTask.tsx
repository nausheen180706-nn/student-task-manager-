import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Plus, Sparkles, Calendar, Tag } from 'lucide-react';
import { Category, Priority } from '../types/task';
import { TODAY_STR } from '../data/mockTasks';

export const QuickAddTask: React.FC = () => {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Coding');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addTask({
        title: title.trim(),
        description: 'Quick student task added from dashboard input.',
        category,
        priority: 'Medium',
        dueDate: TODAY_STR,
        dueTime: '18:00',
        completed: false,
      });
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="quick-add-task-container"
      className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs"
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
        <div className="relative w-full flex-1">
          <input
            id="quick-task-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done? (e.g., LeetCode daily challenge)"
            className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200 dark:border-zinc-700/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Category mini-picker */}
          <select
            id="quick-task-category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="px-3 py-2.5 text-xs font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none cursor-pointer"
          >
            <option value="College">📚 College</option>
            <option value="Coding">💻 Coding</option>
            <option value="Assignment">🧠 Assignment</option>
            <option value="Project">🚀 Project</option>
            <option value="Exam">📝 Exam</option>
            <option value="Personal">🏠 Personal</option>
          </select>

          {/* Quick Add Button */}
          <button
            id="btn-quick-add-submit"
            type="submit"
            disabled={!title.trim() || isSubmitting}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </form>
    </div>
  );
};
