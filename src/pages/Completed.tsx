import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import { CheckCircle, Trash2, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Completed: React.FC = () => {
  const { tasks, clearCompletedTasks, stats } = useTaskContext();
  const navigate = useNavigate();

  const completedTasks = tasks
    .filter((t) => t.completed)
    .sort((a, b) => {
      const dateA = a.completedAt || a.createdAt;
      const dateB = b.completedAt || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

  return (
    <div id="completed-page" className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Completed Tasks
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Review your accomplishments and celebrate your hard work!
          </p>
        </div>

        {completedTasks.length > 0 && (
          <button
            id="btn-clear-completed"
            onClick={clearCompletedTasks}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold shadow-xs transition-all self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Completed Tasks</span>
          </button>
        )}
      </div>

      {/* Summary Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
              {completedTasks.length} {completedTasks.length === 1 ? 'Task' : 'Tasks'} Accomplished
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Overall completion rate is at {stats.progressPercentage}%
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/tasks')}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          Check remaining pending tasks <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tasks List */}
      {completedTasks.length === 0 ? (
        <EmptyState
          title="No completed tasks yet"
          description="Mark tasks complete from your dashboard or My Tasks page to see them here."
          actionText="Go to My Tasks"
          onAction={() => navigate('/tasks')}
        />
      ) : (
        <div className="space-y-2.5">
          {completedTasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      )}
    </div>
  );
};
