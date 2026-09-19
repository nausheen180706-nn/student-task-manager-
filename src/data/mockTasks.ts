import { Task, Category, AppNotification } from '../types/task';

/**
 * Category Metadata
 * Provides friendly emojis, badges, and accent colors for CS student categories.
 */
export const CATEGORY_INFO: Record<Category, { emoji: string; label: string; bgLight: string; textLight: string; badgeColor: string; description: string }> = {
  College: {
    emoji: '📚',
    label: 'College',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    textLight: 'text-blue-700 dark:text-blue-300',
    badgeColor: 'border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30',
    description: 'Lectures, labs, and department notices'
  },
  Coding: {
    emoji: '💻',
    label: 'Coding',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    textLight: 'text-emerald-700 dark:text-emerald-300',
    badgeColor: 'border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30',
    description: 'Algorithms, LeetCode, and web development'
  },
  Assignment: {
    emoji: '🧠',
    label: 'Assignment',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40',
    textLight: 'text-purple-700 dark:text-purple-300',
    badgeColor: 'border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30',
    description: 'Homework, lab records, and problem sets'
  },
  Project: {
    emoji: '🚀',
    label: 'Project',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    textLight: 'text-amber-700 dark:text-amber-300',
    badgeColor: 'border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30',
    description: 'Hackathons, capstone, and team collaborations'
  },
  Exam: {
    emoji: '📝',
    label: 'Exam',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    textLight: 'text-rose-700 dark:text-rose-300',
    badgeColor: 'border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30',
    description: 'Midterms, quizzes, and viva preparation'
  },
  Personal: {
    emoji: '🏠',
    label: 'Personal',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    textLight: 'text-teal-700 dark:text-teal-300',
    badgeColor: 'border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30',
    description: 'Health, clubs, and personal goals'
  }
};

/**
 * Priority styling helper
 */
export const PRIORITY_INFO = {
  High: {
    color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/50',
    dot: 'bg-red-500',
    order: 3
  },
  Medium: {
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50',
    dot: 'bg-amber-500',
    order: 2
  },
  Low: {
    color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/50',
    dot: 'bg-sky-500',
    order: 1
  }
};

/**
 * Dynamic today date based on runtime date or standard 2026-09-19
 */
export const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const TODAY_STR = getTodayDateString();

// Tomorrow helper
export const getTomorrowDateString = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const TOMORROW_STR = getTomorrowDateString();

/**
 * 12 Realistic Student Computer Science Tasks
 */
export const INITIAL_MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Operating Systems Quiz Revision',
    description: 'Review CPU scheduling algorithms (Round Robin, FCFS) and semaphore synchronization concepts.',
    category: 'Exam',
    priority: 'High',
    dueDate: TODAY_STR,
    dueTime: '10:30',
    completed: true,
    completedAt: '2026-09-19T10:15:00.000Z',
    createdAt: '2026-09-18T09:00:00.000Z'
  },
  {
    id: '2',
    title: 'Complete Deep Learning Assignment',
    description: 'Finish Recurrent Neural Networks (RNN) and LSTM implementation questions in PyTorch notebook.',
    category: 'Assignment',
    priority: 'High',
    dueDate: TODAY_STR,
    dueTime: '17:00',
    completed: false,
    createdAt: '2026-09-17T14:30:00.000Z'
  },
  {
    id: '3',
    title: 'Practice JavaScript & DOM Manipulation',
    description: 'Solve 5 exercises on array map/filter/reduce and build a mini interactive accordion widget.',
    category: 'Coding',
    priority: 'Medium',
    dueDate: TODAY_STR,
    dueTime: '19:00',
    completed: false,
    createdAt: '2026-09-18T11:00:00.000Z'
  },
  {
    id: '4',
    title: 'Prepare webinar presentation slides',
    description: 'Polish slides for CS101 full-stack demonstration on React components and REST API architecture.',
    category: 'Project',
    priority: 'High',
    dueDate: TODAY_STR,
    dueTime: '21:00',
    completed: false,
    createdAt: '2026-09-18T16:00:00.000Z'
  },
  {
    id: '5',
    title: 'Complete DBMS SQL Assignment',
    description: 'Write complex SQL queries involving LEFT JOINs, GROUP BY, and subqueries on student database.',
    category: 'College',
    priority: 'High',
    dueDate: TOMORROW_STR,
    dueTime: '14:00',
    completed: false,
    createdAt: '2026-09-17T18:00:00.000Z'
  },
  {
    id: '6',
    title: 'Capstone Team Sync Meeting',
    description: 'Meet on Google Meet with frontend & backend sub-teams to define API JSON contracts.',
    category: 'Project',
    priority: 'Medium',
    dueDate: TOMORROW_STR,
    dueTime: '16:00',
    completed: false,
    createdAt: '2026-09-18T12:00:00.000Z'
  },
  {
    id: '7',
    title: 'LeetCode Daily: Valid Parentheses & Min Stack',
    description: 'Implement Stack data structure and solve classic stack interview questions.',
    category: 'Coding',
    priority: 'Low',
    dueDate: '2026-09-21',
    dueTime: '20:00',
    completed: false,
    createdAt: '2026-09-19T08:00:00.000Z'
  },
  {
    id: '8',
    title: 'Submit Mini Project Proposal Draft',
    description: 'Submit PDF proposal with architectural system diagram to Professor Chen.',
    category: 'Assignment',
    priority: 'High',
    dueDate: '2026-09-23',
    dueTime: '23:59',
    completed: false,
    createdAt: '2026-09-16T10:00:00.000Z'
  },
  {
    id: '9',
    title: 'Read Computer Networks: TCP vs UDP RFC',
    description: 'Summarize 3 key differences between 3-way TCP handshake and connectionless UDP transmission.',
    category: 'College',
    priority: 'Medium',
    dueDate: TODAY_STR,
    dueTime: '11:45',
    completed: true,
    completedAt: '2026-09-19T11:40:00.000Z',
    createdAt: '2026-09-18T08:00:00.000Z'
  },
  {
    id: '10',
    title: 'Configure React Router in Portfolio App',
    description: 'Set up browser routing for /projects, /skills, and /contact pages with smooth page transitions.',
    category: 'Personal',
    priority: 'Low',
    dueDate: '2026-09-22',
    dueTime: '18:00',
    completed: false,
    createdAt: '2026-09-17T15:00:00.000Z'
  },
  {
    id: '11',
    title: 'Morning Campus Run & Hydration Habit',
    description: '3km cardio jog around university athletic track and refill 2L water bottle.',
    category: 'Personal',
    priority: 'Low',
    dueDate: TODAY_STR,
    dueTime: '07:30',
    completed: true,
    completedAt: '2026-09-19T07:20:00.000Z',
    createdAt: '2026-09-19T06:30:00.000Z'
  },
  {
    id: '12',
    title: 'Data Structures Mock Viva Practice',
    description: 'Review binary search tree traversals (Inorder, Preorder, Postorder) and AVL balance factors.',
    category: 'Exam',
    priority: 'High',
    dueDate: '2026-09-24',
    dueTime: '11:00',
    completed: false,
    createdAt: '2026-09-16T17:00:00.000Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Assignment Due Today',
    message: 'Deep Learning Assignment is due at 5:00 PM today.',
    time: '20 mins ago',
    type: 'warning',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Task Completed Successfully',
    message: 'Great job! You finished "Operating Systems Quiz Revision".',
    time: '1 hour ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Upcoming Deadline',
    message: '2 tasks are due tomorrow, including DBMS Assignment.',
    time: '3 hours ago',
    type: 'info',
    read: true
  }
];
