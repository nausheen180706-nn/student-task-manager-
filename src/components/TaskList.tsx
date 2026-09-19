import React from 'react';
import { Task } from '../types/task';
import { TaskCard } from './TaskCard';
import { EmptyState } from './EmptyState';
import { useTaskContext } from '../context/TaskContext';
import { Loader2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  emptyTitle,
  emptyDescription,
}) => {
  const { loading, openAddTaskModal } = useTaskContext();

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="text-sm font-medium">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        onAction={openAddTaskModal}
      />
    );
  }

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
