import React, { useState, useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskList } from '../components/TaskList';
import { TaskCard } from '../components/TaskCard';
import { TaskFilter, TaskSortBy, Category, Priority } from '../types/task';
import { TODAY_STR, TOMORROW_STR } from '../data/mockTasks';
import {
  Plus,
  Search,
  SlidersHorizontal,
  LayoutList,
  LayoutGrid,
  Filter,
  ArrowUpDown,
  X
} from 'lucide-react';

export const Tasks: React.FC = () => {
  const { tasks, openAddTaskModal, searchTerm, setSearchTerm } = useTaskContext();

  // Filter & Sorting state
  const [statusFilter, setStatusFilter] = useState<TaskFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<TaskSortBy>('Due Date');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filter counts
  const counts = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      overdue: tasks.filter((t) => t.dueDate < TODAY_STR && !t.completed).length,
    };
  }, [tasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Status filter
        if (statusFilter === 'Pending' && task.completed) return false;
        if (statusFilter === 'Completed' && !task.completed) return false;
        if (statusFilter === 'Overdue' && (task.completed || task.dueDate >= TODAY_STR)) return false;

        // Category filter
        if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;

        // Priority filter
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;

        // Search query filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description?.toLowerCase().includes(q);
          const matchCat = task.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'Newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'Oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'Priority') {
          const priorityWeights = { High: 3, Medium: 2, Low: 1 };
          return priorityWeights[b.priority] - priorityWeights[a.priority];
        }
        if (sortBy === 'Due Date') {
          const dateDiff = a.dueDate.localeCompare(b.dueDate);
          if (dateDiff !== 0) return dateDiff;
          return (a.dueTime || '').localeCompare(b.dueTime || '');
        }
        return 0;
      });
  }, [tasks, statusFilter, categoryFilter, priorityFilter, sortBy, searchTerm]);

  const clearAllFilters = () => {
    setStatusFilter('All');
    setCategoryFilter('All');
    setPriorityFilter('All');
    setSearchTerm('');
  };

  const hasActiveFilters =
    statusFilter !== 'All' ||
    categoryFilter !== 'All' ||
    priorityFilter !== 'All' ||
    searchTerm !== '';

  return (
    <div id="my-tasks-page" className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            My Tasks
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manage, filter, and organize all your college and personal deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="List View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            id="btn-add-task-tasks-page"
            onClick={openAddTaskModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs (All, Pending, Completed, Overdue) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(
          [
            { id: 'All', label: 'All Tasks', count: counts.all },
            { id: 'Pending', label: 'Pending', count: counts.pending },
            { id: 'Completed', label: 'Completed', count: counts.completed },
            { id: 'Overdue', label: 'Overdue', count: counts.overdue },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            id={`filter-tab-${tab.id.toLowerCase()}`}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              statusFilter === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="ml-auto text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-medium whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter Controls Row (Category, Priority, Sort, Search) */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        {/* In-page search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within tasks..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400 hidden sm:inline">Category:</span>
            <select
              id="filter-category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="College">📚 College</option>
              <option value="Assignment">🧠 Assignment</option>
              <option value="Project">🚀 Project</option>
              <option value="Coding">💻 Coding</option>
              <option value="Exam">📝 Exam</option>
              <option value="Personal">🏠 Personal</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-400 hidden sm:inline">Priority:</span>
            <select
              id="filter-priority-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as TaskSortBy)}
              className="px-2.5 py-1.5 text-xs font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none cursor-pointer"
            >
              <option value="Due Date">Sort: Due Date</option>
              <option value="Newest">Sort: Newest</option>
              <option value="Oldest">Sort: Oldest</option>
              <option value="Priority">Sort: Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Results Display */}
      {viewMode === 'list' ? (
        <TaskList
          tasks={filteredTasks}
          emptyTitle="No tasks found"
          emptyDescription="Try adjusting your filters, search term, or create a new task."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {filteredTasks.length === 0 && (
            <div className="col-span-full">
              <TaskList
                tasks={[]}
                emptyTitle="No tasks found"
                emptyDescription="Try adjusting your filters, search term, or create a new task."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
