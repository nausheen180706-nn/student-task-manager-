import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal: React.FC = () => {
  const { activeModal, selectedTask, closeModal, removeTask } = useTaskContext();
  const [isDeleting, setIsDeleting] = useState(false);

  if (activeModal !== 'delete' || !selectedTask) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await removeTask(selectedTask.id);
      closeModal();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      id="delete-confirm-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeModal}
    >
      <div
        id="delete-confirm-modal"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
            Are you sure you want to delete this task?
          </h3>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2 px-2">
            "{selectedTask.title}"
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              id="btn-cancel-delete"
              type="button"
              onClick={closeModal}
              disabled={isDeleting}
              className="px-4 py-2.5 text-sm font-semibold rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>

            <button
              id="btn-confirm-delete"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-sm font-semibold shadow-md shadow-rose-600/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
