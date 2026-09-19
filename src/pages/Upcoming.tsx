import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TODAY_STR, TOMORROW_STR } from '../data/mockTasks';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';
import { Clock, CalendarDays, ArrowRight, Plus } from 'lucide-react';

export const Upcoming: React.FC = () => {
  const { tasks, openAddTaskModal } = useTaskContext();

  // Filter future tasks (due after today and not completed)
  const futureTasks = tasks.filter((t) => t.dueDate > TODAY_STR && !t.completed);

  // Group: Tomorrow vs Next Week vs Later
  const tomorrowTasks = futureTasks.filter((t) => t.dueDate === TOMORROW_STR);

  // Calculate dates within next 7 days
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const nextWeekLimit = new Date();
  nextWeekLimit.setDate(nextWeekLimit.getDate() + 7);
  const nextWeekLimitStr = nextWeekLimit.toISOString().split('T')[0];

  const nextWeekTasks = futureTasks.filter(
    (t) => t.dueDate > TOMORROW_STR && t.dueDate <= nextWeekLimitStr
  );

  const laterTasks = futureTasks.filter((t) => t.dueDate > nextWeekLimitStr);

  return (
    <div id="upcoming-page" className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <CalendarDays className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Upcoming Deadlines
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Future submissions, team meetings, and study milestones.
          </p>
        </div>

        <button
          onClick={openAddTaskModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Plan Future Task</span>
        </button>
      </div>

      {futureTasks.length === 0 ? (
        <EmptyState
          title="No upcoming tasks"
          description="You don't have any pending deadlines scheduled after today."
          onAction={openAddTaskModal}
        />
      ) : (
        <div className="space-y-8">
          {/* Tomorrow Group */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                  Tomorrow
                </h3>
                <span className="text-xs text-zinc-400">({TOMORROW_STR})</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                {tomorrowTasks.length} {tomorrowTasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            {tomorrowTasks.length > 0 ? (
              <div className="space-y-2.5">
                {tomorrowTasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic py-2 pl-2">
                No tasks due tomorrow.
              </p>
            )}
          </div>

          {/* Next Week Group */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                  Next Week
                </h3>
                <span className="text-xs text-zinc-400">Within the next 7 days</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                {nextWeekTasks.length} {nextWeekTasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            {nextWeekTasks.length > 0 ? (
              <div className="space-y-2.5">
                {nextWeekTasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic py-2 pl-2">
                No tasks due next week.
              </p>
            )}
          </div>

          {/* Later Group */}
          {laterTasks.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                    Later
                  </h3>
                  <span className="text-xs text-zinc-400">Long-term goals & exams</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {laterTasks.length} tasks
                </span>
              </div>

              <div className="space-y-2.5">
                {laterTasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
