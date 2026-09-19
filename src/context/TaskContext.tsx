/**
 * ============================================================================
 * TaskContext - React State Management
 * ============================================================================
 * 
 * WEBINAR TEACHING POINT FOR CS STUDENTS:
 * Props drilling (passing data down 5 levels) is messy. React Context provides a
 * "Global Store" that any component can tap into with a single hook: `useTaskContext()`.
 * 
 * Here we centralize:
 * - The list of tasks and loading state
 * - CRUD operations calling our `api.ts` service
 * - Dynamic statistics (Total, Pending, Completed, Due Today, Progress %)
 * - Active modal states (Add, Edit, Delete Confirm, Detail)
 * - Dark / Light theme switching
 * - Global search query state
 * - User toast feedback notifications
 */

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Task, Category, TaskStats, AppNotification } from '../types/task';
import * as api from '../services/api';
import { INITIAL_NOTIFICATIONS, TODAY_STR } from '../data/mockTasks';

interface ToastInfo {
  id: number;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // Theme state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Sidebar responsive state
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (val: boolean) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // CRUD Operations
  addTask: (data: Omit<Task, 'id' | 'createdAt'>) => Promise<Task>;
  editTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => Promise<Task>;
  removeTask: (id: string) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;
  clearCompletedTasks: () => Promise<void>;
  resetDemoData: () => Promise<void>;

  // Modals
  activeModal: 'add' | 'edit' | 'delete' | 'detail' | null;
  selectedTask: Task | null;
  openAddTaskModal: () => void;
  openEditTaskModal: (task: Task) => void;
  openDeleteModal: (task: Task) => void;
  openDetailModal: (task: Task) => void;
  closeModal: () => void;

  // Toast feedback
  toasts: ToastInfo[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;

  // Computed values
  stats: TaskStats;
  categoryStats: Record<Category, { total: number; completed: number; pending: number }>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Theme setup: check localStorage or system preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('taskflow_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals
  const [activeModal, setActiveModal] = useState<'add' | 'edit' | 'delete' | 'detail' | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Toast notifications stack
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Apply dark class to document root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('taskflow_theme', theme);
  }, [theme]);

  // Initial data fetch from API service layer
  useEffect(() => {
    let isMounted = true;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await api.getTasks();
        if (isMounted) setTasks(data);
      } catch (err) {
        console.error('Failed to load tasks', err);
        showToast('Failed to load tasks from storage', 'error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTasks();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 3500);
  };

  // Notification actions
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared', 'info');
  };

  // Modal Handlers
  const openAddTaskModal = () => {
    setSelectedTask(null);
    setActiveModal('add');
  };

  const openEditTaskModal = (task: Task) => {
    setSelectedTask(task);
    setActiveModal('edit');
  };

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setActiveModal('delete');
  };

  const openDetailModal = (task: Task) => {
    setSelectedTask(task);
    setActiveModal('detail');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTask(null);
  };

  // CRUD Operations
  const addTask = async (data: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    try {
      const created = await api.createTask(data);
      setTasks((prev) => [created, ...prev]);
      showToast(`Task "${created.title}" created successfully!`, 'success');
      return created;
    } catch (e) {
      showToast('Error creating task', 'error');
      throw e;
    }
  };

  const editTask = async (id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> => {
    try {
      const updated = await api.updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      showToast('Task updated successfully!', 'success');
      return updated;
    } catch (e) {
      showToast('Error updating task', 'error');
      throw e;
    }
  };

  const removeTask = async (id: string): Promise<void> => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showToast('Task deleted', 'info');
    } catch (e) {
      showToast('Error deleting task', 'error');
      throw e;
    }
  };

  const toggleTaskComplete = async (id: string): Promise<void> => {
    try {
      const target = tasks.find((t) => t.id === id);
      const isNowCompleted = target ? !target.completed : true;
      const updated = await api.completeTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      if (isNowCompleted) {
        showToast('Task marked completed! Great work 🎉', 'success');
      } else {
        showToast('Task marked pending', 'info');
      }
    } catch (e) {
      showToast('Error toggling task status', 'error');
      throw e;
    }
  };

  const clearCompletedTasks = async (): Promise<void> => {
    const completedTasks = tasks.filter((t) => t.completed);
    if (completedTasks.length === 0) {
      showToast('No completed tasks to clear', 'info');
      return;
    }
    // Delete each completed task
    for (const t of completedTasks) {
      await api.deleteTask(t.id);
    }
    setTasks((prev) => prev.filter((t) => !t.completed));
    showToast(`Cleared ${completedTasks.length} completed tasks!`, 'info');
  };

  const resetDemoData = async (): Promise<void> => {
    const fresh = await api.resetToDefaultMockData();
    setTasks(fresh);
    setNotifications(INITIAL_NOTIFICATIONS);
    showToast('Reset to original sample data for webinar!', 'info');
  };

  // Dynamic Statistics Calculation
  const stats = useMemo<TaskStats>(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const dueToday = tasks.filter((t) => t.dueDate === TODAY_STR && !t.completed).length;
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      pending,
      completed,
      dueToday,
      progressPercentage,
    };
  }, [tasks]);

  // Category counts
  const categoryStats = useMemo(() => {
    const categories: Category[] = ['College', 'Coding', 'Assignment', 'Project', 'Exam', 'Personal'];
    const record: Record<Category, { total: number; completed: number; pending: number }> = {} as any;

    categories.forEach((cat) => {
      const catTasks = tasks.filter((t) => t.category === cat);
      const completed = catTasks.filter((t) => t.completed).length;
      record[cat] = {
        total: catTasks.length,
        completed,
        pending: catTasks.length - completed,
      };
    });

    return record;
  }, [tasks]);

  const value = {
    tasks,
    loading,
    searchTerm,
    setSearchTerm,
    theme,
    toggleTheme,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    addTask,
    editTask,
    removeTask,
    toggleTaskComplete,
    clearCompletedTasks,
    resetDemoData,
    activeModal,
    selectedTask,
    openAddTaskModal,
    openEditTaskModal,
    openDeleteModal,
    openDetailModal,
    closeModal,
    toasts,
    showToast,
    stats,
    categoryStats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
