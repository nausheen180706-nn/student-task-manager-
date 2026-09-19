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

import { Task, TaskStats } from '../types/task';
import { INITIAL_MOCK_TASKS } from '../data/mockTasks';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:5000/api';

const STORAGE_KEY = 'taskflow_student_tasks_v1';

// Helper to normalize task object from MongoDB document
const normalizeTask = (item: any): Task => {
  return {
    id: item.id || item._id?.toString() || '',
    title: item.title,
    description: item.description || '',
    category: item.category,
    priority: item.priority,
    dueDate: item.dueDate || '',
    dueTime: item.dueTime || '12:00',
    completed: Boolean(item.completed),
    completedAt: item.completedAt ? String(item.completedAt) : undefined,
    createdAt: item.createdAt ? String(item.createdAt) : new Date().toISOString(),
  };
};

/**
 * GET /api/tasks
 * Fetches all tasks from MongoDB with optional query parameters
 */
export async function getTasks(filters?: {
  category?: string;
  priority?: string;
  completed?: boolean;
  search?: string;
}): Promise<Task[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters?.priority && filters.priority !== 'All') params.append('priority', filters.priority);
    if (filters?.completed !== undefined) params.append('completed', String(filters.completed));
    if (filters?.search?.trim()) params.append('search', filters.search.trim());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/tasks${queryString}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      const normalized = json.data.map(normalizeTask);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch {}
      return normalized;
    }
    return [];
  } catch (err) {
    console.warn('Backend unavailable, falling back to local cache/mock:', err);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MOCK_TASKS;
  }
}

/**
 * GET /api/tasks/:id
 * Fetches single task by ID from MongoDB
 */
export async function getTaskById(id: string): Promise<Task | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    return json.success && json.data ? normalizeTask(json.data) : null;
  } catch (err) {
    console.warn(`Error fetching task ${id}:`, err);
    return null;
  }
}

/**
 * POST /api/tasks
 * Creates a new task in MongoDB
 */
export async function createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to create task (HTTP ${res.status})`);
  }

  const json = await res.json();
  return normalizeTask(json.data);
}

/**
 * PUT /api/tasks/:id
 * Updates an existing task in MongoDB
 */
export async function updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to update task (HTTP ${res.status})`);
  }

  const json = await res.json();
  return normalizeTask(json.data);
}

/**
 * DELETE /api/tasks/:id
 * Deletes a task from MongoDB
 */
export async function deleteTask(id: string): Promise<{ success: boolean; id: string }> {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to delete task (HTTP ${res.status})`);
  }

  return { success: true, id };
}

/**
 * PATCH /api/tasks/:id/complete
 * Toggles or sets task completion status in MongoDB
 */
export async function completeTask(id: string, forceStatus?: boolean): Promise<Task> {
  const bodyPayload = forceStatus !== undefined ? { completed: forceStatus } : {};
  const res = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to toggle task (HTTP ${res.status})`);
  }

  const json = await res.json();
  return normalizeTask(json.data);
}

/**
 * GET /api/tasks/stats/summary
 * Fetches calculated task summary statistics from MongoDB
 */
export async function getTaskStats(): Promise<TaskStats> {
  const res = await fetch(`${API_BASE_URL}/tasks/stats/summary`);
  if (!res.ok) throw new Error('Failed to fetch task summary stats');
  const json = await res.json();
  return json.data;
}

/**
 * GET /api/tasks/stats/categories
 * Fetches category breakdown from MongoDB
 */
export async function getCategoryStats(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/tasks/stats/categories`);
  if (!res.ok) throw new Error('Failed to fetch category stats');
  const json = await res.json();
  return json.data;
}

/**
 * GET /api/tasks/stats/weekly
 * Fetches weekly productivity data from MongoDB
 */
export async function getWeeklyStats(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/tasks/stats/weekly`);
  if (!res.ok) throw new Error('Failed to fetch weekly stats');
  const json = await res.json();
  return json.data;
}

/**
 * Utility to reset tasks back to initial seed data
 */
export async function resetToDefaultMockData(): Promise<Task[]> {
  // Re-fetch all current tasks from backend
  return getTasks();
}
