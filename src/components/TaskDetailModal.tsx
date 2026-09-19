import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CATEGORY_INFO, PRIORITY_INFO } from '../data/mockTasks';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  Tag,
  AlertCircle
} from 'lucide-react';

export const TaskDetailModal: React.FC = () => {
  const {
    activeModal,
    selectedTask,
    closeModal,
    openEditTaskModal,
    openDeleteModal,
    toggleTaskComplete,
  } = useTaskContext();

  if (activeModal !== 'detail' || !selectedTask) return null;

  const category = CATEGORY_INFO[selectedTask.category] || CATEGORY_INFO.College;
  const priority = PRIORITY_INFO[selectedTask.priority] || PRIORITY_INFO.Medium;

  const handleToggleComplete = async () => {
    await toggleTaskComplete(selectedTask.id);
    closeModal();
  };

  const handleEdit = () => {
    const task = selectedTask;
    closeModal();
    openEditTaskModal(task);
  };

  const handleDelete = () => {
    const task = selectedTask;
    closeModal();
    openDeleteModal(task);
  };

  // Format creation date
  const createdDate = new Date(selectedTask.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      id="task-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeModal}
    >
      <div
        id="task-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-lg border ${category.badgeColor}`}
              >
                <span>{category.emoji}</span>
                <span>{category.label}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${priority.color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                {selectedTask.priority} Priority
              </span>

              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  selectedTask.completed
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                }`}
              >
                {selectedTask.completed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-amber-500" />
                    Pending
                  </>
                )}
              </span>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
              {selectedTask.title}
            </h3>
          </div>

          <button
            id="btn-close-detail-modal"
            onClick={closeModal}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
              Description
            </h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
              {selectedTask.description || 'No additional description provided.'}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Due Date & Time
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>{selectedTask.dueDate}</span>
                <span className="text-xs text-zinc-400 ml-1">({selectedTask.dueTime})</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Date Created
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{createdDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 flex items-center justify-between gap-3">
          <button
            id="btn-detail-delete"
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-detail-edit"
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>

            <button
              id="btn-detail-toggle-complete"
              onClick={handleToggleComplete}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white shadow-sm transition-all ${
                selectedTask.completed
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {selectedTask.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
