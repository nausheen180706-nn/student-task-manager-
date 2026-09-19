import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { StatsCard } from '../components/StatsCard';
import { ProgressCard } from '../components/ProgressCard';
import { QuickAddTask } from '../components/QuickAddTask';
import { TaskList } from '../components/TaskList';
import { TODAY_STR } from '../data/mockTasks';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  Calendar,
  Plus,
  ArrowRight,
  ListTodo,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { tasks, stats, openAddTaskModal, searchTerm } = useTaskContext();
  const navigate = useNavigate();

  // Filter tasks for today
  const todayTasks = tasks.filter((t) => t.dueDate === TODAY_STR);

  // If there's a global search active, filter today's tasks
  const displayTasks = searchTerm
    ? todayTasks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : todayTasks;

  return (
    <div id="dashboard-page" className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Banner & Greetings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            Good morning, Student 👋
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            Stay organized, stay productive. Ready to tackle your CS coursework?
          </p>
        </div>

        <button
          id="btn-add-task-header"
          onClick={openAddTaskModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Task</span>
        </button>
      </div>

      {/* Task Statistics Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          id="stat-card-total"
          icon={CheckSquare}
          number={stats.total}
          label="Total Tasks"
          trendText="All your tasks"
          accentColor="indigo"
          onClick={() => navigate('/tasks')}
        />

        <StatsCard
          id="stat-card-pending"
          icon={Clock}
          number={stats.pending}
          label="Pending"
          trendText="Need attention"
          accentColor="amber"
          onClick={() => navigate('/tasks')}
        />

        <StatsCard
          id="stat-card-completed"
          icon={CheckCircle2}
          number={stats.completed}
          label="Completed"
          trendText="Great progress!"
          accentColor="emerald"
          onClick={() => navigate('/completed')}
        />

        <StatsCard
          id="stat-card-due-today"
          icon={Calendar}
          number={stats.dueToday}
          label="Due Today"
          trendText="Complete today"
          accentColor="rose"
          onClick={() => navigate('/today')}
        />
      </div>

      {/* Today's Progress Card + Quick Add Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1">
          <ProgressCard />
        </div>

        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Quick Task Add
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Instantly jot down a lecture reminder or coding challenge.
            </p>
          </div>
          <QuickAddTask />
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Today's Tasks
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                {todayTasks.length}
              </span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Items scheduled for completion by end of today
            </p>
          </div>

          <button
            onClick={() => navigate('/tasks')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            View all tasks <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={displayTasks}
          emptyTitle="No tasks due today 🎉"
          emptyDescription="You're all clear for today! Check out your upcoming deadlines or add a new goal."
        />
      </div>
    </div>
  );
};
