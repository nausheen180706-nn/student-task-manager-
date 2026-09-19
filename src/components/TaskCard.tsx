import React from 'react';
import { Task } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { CATEGORY_INFO, PRIORITY_INFO, TODAY_STR, TOMORROW_STR } from '../data/mockTasks';
import {
  Check,
  Clock,
  Calendar,
  Edit3,
  Trash2,
  AlertCircle,
  Eye
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    toggleTaskComplete,
    openEditTaskModal,
    openDeleteModal,
    openDetailModal,
  } = useTaskContext();

  const category = CATEGORY_INFO[task.category] || CATEGORY_INFO.College;
  const priority = PRIORITY_INFO[task.priority] || PRIORITY_INFO.Medium;

  // Due date display formatting
  let formattedDate = task.dueDate;
  let isToday = false;
  let isOverdue = false;

  if (task.dueDate === TODAY_STR) {
    formattedDate = 'Today';
    isToday = true;
  } else if (task.dueDate === TOMORROW_STR) {
    formattedDate = 'Tomorrow';
  } else if (task.dueDate < TODAY_STR && !task.completed) {
    isOverdue = true;
    formattedDate = `Overdue (${task.dueDate})`;
  }

  // Format 24h time to 12h display
  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [h, m] = timeStr.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
    } catch {
      return timeStr;
    }
  };

  const formattedTime = formatTime(task.dueTime);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskComplete(task.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openEditTaskModal(task);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDeleteModal(task);
  };

  return (
    <div
      id={`task-item-${task.id}`}
      onClick={() => openDetailModal(task)}
      className={`group p-4 rounded-2xl bg-white dark:bg-zinc-900 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 hover:shadow-md ${
        task.completed
          ? 'border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/40 opacity-75'
          : isOverdue
          ? 'border-rose-200 dark:border-rose-900/60 hover:border-rose-300'
          : 'border-zinc-200/90 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-800'
      }`}
    >
      {/* Left side: Checkbox + Title + Description */}
      <div className="flex items-start gap-3.5 flex-1 min-w-0 w-full sm:w-auto">
        {/* Custom Animated Checkbox */}
        <button
          type="button"
          onClick={handleCheckboxClick}
          id={`task-checkbox-${task.id}`}
          aria-label={task.completed ? 'Mark task pending' : 'Mark task completed'}
          className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
              : 'border-zinc-300 dark:border-zinc-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-zinc-800'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`text-sm font-semibold transition-all ${
                task.completed
                  ? 'line-through text-zinc-400 dark:text-zinc-500'
                  : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              {task.title}
            </h4>

            {/* Badges in title line */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${category.badgeColor}`}
            >
              <span>{category.emoji}</span>
              <span>{category.label}</span>
            </span>

            <span
              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wider ${priority.color}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p
              className={`text-xs mt-1 line-clamp-1 ${
                task.completed
                  ? 'text-zinc-400 dark:text-zinc-600 line-through'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Mobile Due Badge */}
          <div className="sm:hidden flex items-center gap-2 mt-2 text-xs font-medium">
            <span
              className={`inline-flex items-center gap-1 ${
                isOverdue
                  ? 'text-rose-600 dark:text-rose-400'
                  : isToday
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <Calendar className="w-3 h-3" />
              {formattedDate} {formattedTime ? `• ${formattedTime}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Desktop Due Date + Action buttons */}
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100 dark:border-zinc-800">
        {/* Desktop Due Badge */}
        <div className="hidden sm:flex flex-col items-end shrink-0 text-right">
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              isOverdue
                ? 'text-rose-600 dark:text-rose-400'
                : isToday
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <Clock className="w-3 h-3" />
            {formattedDate}
          </span>
          {formattedTime && (
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {formattedTime}
            </span>
          )}
        </div>

        {/* Actions button group */}
        <div className="flex items-center gap-1 ml-auto sm:ml-0">
          <button
            type="button"
            id={`btn-view-task-${task.id}`}
            onClick={(e) => {
              e.stopPropagation();
              openDetailModal(task);
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            title="View Details"
            aria-label="View task details"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            id={`btn-edit-task-${task.id}`}
            onClick={handleEditClick}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            id={`btn-delete-task-${task.id}`}
            onClick={handleDeleteClick}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
