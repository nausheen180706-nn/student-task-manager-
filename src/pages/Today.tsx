import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TODAY_STR } from '../data/mockTasks';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import {
  Sun,
  Sunset,
  Moon,
  Calendar,
  Plus,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const Today: React.FC = () => {
  const { tasks, openAddTaskModal } = useTaskContext();

  // All tasks due today
  const todayTasks = tasks.filter((t) => t.dueDate === TODAY_STR);

  // Group into Morning (< 12:00), Afternoon (12:00 - 17:00), Evening (> 17:00)
  const morningTasks = todayTasks.filter((t) => {
    if (!t.dueTime) return true;
    const hour = parseInt(t.dueTime.split(':')[0], 10);
    return hour < 12;
  });

  const afternoonTasks = todayTasks.filter((t) => {
    if (!t.dueTime) return false;
    const hour = parseInt(t.dueTime.split(':')[0], 10);
    return hour >= 12 && hour <= 17;
  });

  const eveningTasks = todayTasks.filter((t) => {
    if (!t.dueTime) return false;
    const hour = parseInt(t.dueTime.split(':')[0], 10);
    return hour > 17;
  });

  const completedCount = todayTasks.filter((t) => t.completed).length;
  const totalCount = todayTasks.length;

  return (
    <div id="today-page" className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Calendar className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Today's Schedule
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Chronological breakdown of today's academic commitments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Completed: <span className="text-emerald-600 dark:text-emerald-400">{completedCount}</span> / {totalCount}
          </div>

          <button
            onClick={openAddTaskModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Today Task</span>
          </button>
        </div>
      </div>

      {todayTasks.length === 0 ? (
        <EmptyState
          title="No tasks scheduled for today"
          description="Enjoy your day or prepare for tomorrow's classes!"
          onAction={openAddTaskModal}
        />
      ) : (
        <div className="space-y-8">
          {/* Morning Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider pb-1 border-b border-zinc-200/60 dark:border-zinc-800">
              <Sun className="w-4 h-4" />
              <span>Morning (Before 12:00 PM)</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900">
                {morningTasks.length} {morningTasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            {morningTasks.length > 0 ? (
              <div className="space-y-2.5">
                {morningTasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic py-2 pl-2">
                No morning tasks scheduled.
              </p>
            )}
          </div>

          {/* Afternoon Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider pb-1 border-b border-zinc-200/60 dark:border-zinc-800">
              <Sunset className="w-4 h-4" />
              <span>Afternoon (12:00 PM – 5:00 PM)</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900">
                {afternoonTasks.length} {afternoonTasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            {afternoonTasks.length > 0 ? (
              <div className="space-y-2.5">
                {afternoonTasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic py-2 pl-2">
                No afternoon tasks scheduled.
              </p>
            )}
          </div>

          {/* Evening Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm uppercase tracking-wider pb-1 border-b border-zinc-200/60 dark:border-zinc-800">
              <Moon className="w-4 h-4" />
              <span>Evening (After 5:00 PM)</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-900">
                {eveningTasks.length} {eveningTasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            {eveningTasks.length > 0 ? (
              <div className="space-y-2.5">
                {eveningTasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic py-2 pl-2">
                No evening tasks scheduled.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
