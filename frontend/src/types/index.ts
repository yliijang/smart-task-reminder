export enum PriorityLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface Task {
  id: number;
  title: string;
  priority: PriorityLevel;
  reminder_time: string;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  priority: PriorityLevel;
  reminder_time: string;
}

export interface TaskUpdate {
  title?: string;
  priority?: PriorityLevel;
  reminder_time?: string;
}

export interface ThemeSettings {
  mode: 'light' | 'dark';
  primary_color: string;
  secondary_color: string;
  background: string;
}

export interface NotificationSettings {
  sound_enabled: boolean;
  notification_type: 'sound' | 'browser' | 'both';
  volume: number;
}

export interface Settings {
  theme: ThemeSettings;
  notifications: NotificationSettings;
} 