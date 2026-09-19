/**
 * ============================================================================
 * TaskFlow API Service Layer
 * ============================================================================
 * 
 * WEBINAR TEACHING POINT FOR CS STUDENTS:
 * In a professional software architecture, we NEVER let UI components
 * directly query databases or hardcode HTTP endpoints inside buttons.
 * Instead, we create a dedicated "Service Layer" (this file!).
 * 
 * CURRENT PHASE (Frontend Demonstration):
 * - Uses in-memory state initialized with realistic mock student data.
 * - Saves changes to browser `localStorage` so edits persist across page reloads.
 * - Returns Promises to simulate asynchronous network latency (async/await).
 * 
 * FUTURE FULL-STACK ARCHITECTURE:
 * When connecting this frontend to your Node.js + Express + MongoDB backend:
 * 1. Set `USE_REAL_BACKEND = true` or specify `API_BASE_URL = 'http://localhost:5000/api'`.
 * 2. Replace the local storage logic with standard `fetch()` or `axios` calls:
 *    - getTasks()       --> fetch(`${API_BASE_URL}/tasks`)
 *    - getTaskById(id)  --> fetch(`${API_BASE_URL}/tasks/${id}`)
 *    - createTask(task) --> fetch(`${API_BASE_URL}/tasks`, { method: 'POST', body: JSON.stringify(task) })
 *    - updateTask(id,t) --> fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'PUT', body: JSON.stringify(t) })
 *    - deleteTask(id)   --> fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'DELETE' })
 *    - completeTask(id) --> fetch(`${API_BASE_URL}/tasks/${id}/complete`, { method: 'PATCH' })
 * 
 * Notice that YOUR REACT COMPONENTS WON'T NEED ANY CODE CHANGES!
 * That is the beauty of a clean separation of concerns.
 */

import { Task } from '../types/task';
import { INITIAL_MOCK_TASKS } from '../data/mockTasks';

const STORAGE_KEY = 'taskflow_student_tasks_v1';

// Helper to simulate realistic micro-delay for loading states in webinar
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// Load current tasks from localStorage, or initialize with mock data
const loadStoredTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read from localStorage, using initial mock data', e);
  }
  return INITIAL_MOCK_TASKS;
};

// Persist tasks to localStorage
const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
};

// Active state cache
let tasksMemoryStore: Task[] = loadStoredTasks();

/**
 * GET /api/tasks
 * Fetches all tasks
 */
export async function getTasks(): Promise<Task[]> {
  await delay(120);
  return [...tasksMemoryStore];
}

/**
 * GET /api/tasks/:id
 * Fetches single task by ID
 */
export async function getTaskById(id: string): Promise<Task | null> {
  await delay(80);
  const found = tasksMemoryStore.find((t) => t.id === id);
  return found ? { ...found } : null;
}

/**
 * POST /api/tasks
 * Creates a new task
 */
export async function createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  await delay(150);
  const newTask: Task = {
    ...taskData,
    id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
  };

  tasksMemoryStore = [newTask, ...tasksMemoryStore];
  saveTasksToStorage(tasksMemoryStore);
  return newTask;
}

/**
 * PUT /api/tasks/:id
 * Updates an existing task
 */
export async function updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
  await delay(120);
  const index = tasksMemoryStore.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Task with id ${id} not found`);
  }

  const updated: Task = {
    ...tasksMemoryStore[index],
    ...updates,
  };

  tasksMemoryStore[index] = updated;
  saveTasksToStorage(tasksMemoryStore);
  return updated;
}

/**
 * DELETE /api/tasks/:id
 * Deletes a task
 */
export async function deleteTask(id: string): Promise<{ success: boolean; id: string }> {
  await delay(120);
  const filtered = tasksMemoryStore.filter((t) => t.id !== id);
  tasksMemoryStore = filtered;
  saveTasksToStorage(tasksMemoryStore);
  return { success: true, id };
}

/**
 * PATCH /api/tasks/:id/complete
 * Toggles or sets task completion status
 */
export async function completeTask(id: string, forceStatus?: boolean): Promise<Task> {
  await delay(100);
  const index = tasksMemoryStore.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Task with id ${id} not found`);
  }

  const current = tasksMemoryStore[index];
  const newCompleted = forceStatus !== undefined ? forceStatus : !current.completed;

  const updated: Task = {
    ...current,
    completed: newCompleted,
    completedAt: newCompleted ? new Date().toISOString() : undefined,
  };

  tasksMemoryStore[index] = updated;
  saveTasksToStorage(tasksMemoryStore);
  return updated;
}

/**
 * Utility to reset tasks back to initial seed data (great for webinar live demos)
 */
export async function resetToDefaultMockData(): Promise<Task[]> {
  tasksMemoryStore = [...INITIAL_MOCK_TASKS];
  saveTasksToStorage(tasksMemoryStore);
  return tasksMemoryStore;
}
