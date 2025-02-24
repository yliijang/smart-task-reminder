import axios from 'axios';
import { Task, TaskCreate, TaskUpdate } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTasks = async (sortBy: string = 'reminder_time'): Promise<Task[]> => {
  const { data } = await api.get(`/tasks?sort_by=${sortBy}`);
  return data;
};

export const fetchTask = async (id: number): Promise<Task> => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

export const createTask = async (task: TaskCreate): Promise<Task> => {
  const { data } = await api.post('/tasks', task);
  return data;
};

export const updateTask = async ({ id, ...task }: TaskUpdate & { id: number }): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// Settings API
export const fetchSettings = async () => {
  const { data } = await api.get('/settings');
  return data;
};

export const updateThemeSettings = async (settings: any) => {
  const { data } = await api.put('/settings/theme', settings);
  return data;
};

export const updateNotificationSettings = async (settings: any) => {
  const { data } = await api.put('/settings/notifications', settings);
  return data;
}; 