/**
 * TaskFlow - TypeScript Definitions
 * 
 * Beginner-friendly types for Tasks, Categories, Priorities, and UI state.
 * These interfaces match the future MongoDB document schema and Express API contracts!
 */

export type Priority = 'Low' | 'Medium' | 'High';

export type Category = 
  | 'College'
  | 'Coding'
  | 'Assignment'
  | 'Project'
  | 'Exam'
  | 'Personal';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  dueDate: string; // Format: YYYY-MM-DD
  dueTime: string; // Format: HH:mm (24h)
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export type TaskFilter = 'All' | 'Pending' | 'Completed' | 'Overdue';
export type TaskSortBy = 'Newest' | 'Oldest' | 'Priority' | 'Due Date';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
}

export interface TaskStats {
  total: number;
  pending: number;
  completed: number;
  dueToday: number;
  progressPercentage: number;
}
