import React from 'react';
import { CheckCircle2, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No tasks yet 🎉",
  description = "You're all caught up. Add a new task to get started.",
  actionText = "+ Add New Task",
  onAction,
  icon,
}) => {
  return (
    <div
      id="tasks-empty-state"
      className="p-8 sm:p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center my-4"
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
        {icon || <CheckCircle2 className="w-7 h-7" />}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-5">
        {description}
      </p>
      {onAction && (
        <button
          id="btn-empty-state-action"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </div>
  );
};
