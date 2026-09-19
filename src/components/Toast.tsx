import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useTaskContext();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className={`pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-white/95 dark:bg-zinc-900/95 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-800/60'
              : toast.type === 'error'
              ? 'bg-white/95 dark:bg-zinc-900/95 text-rose-900 dark:text-rose-100 border-rose-200 dark:border-rose-800/60'
              : 'bg-white/95 dark:bg-zinc-900/95 text-sky-900 dark:text-sky-100 border-sky-200 dark:border-sky-800/60'
          }`}
        >
          <div className="shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-500" />}
          </div>
          <p className="text-sm font-medium flex-1 text-zinc-800 dark:text-zinc-200">{toast.text}</p>
        </div>
      ))}
    </div>
  );
};
