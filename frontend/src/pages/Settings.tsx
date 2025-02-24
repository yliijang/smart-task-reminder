import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { fetchSettings, updateThemeSettings, updateNotificationSettings } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeSettings, NotificationSettings } from '../types';

const Settings: React.FC = () => {
  const { updateColors, updateGradient } = useTheme();
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    mode: 'light',
    primary_color: '#007AFF',
    secondary_color: '#5856D6',
    background: 'gradient-1',
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    sound_enabled: true,
    notification_type: 'both',
    volume: 0.7,
  });

  const { data: settings, isLoading } = useQuery('settings', fetchSettings, {
    onSuccess: (data) => {
      setThemeSettings(data.theme);
      setNotificationSettings(data.notifications);
      updateColors(data.theme.primary_color, data.theme.secondary_color);
      updateGradient(data.theme.background);
    },
  });

  const themeMutation = useMutation(updateThemeSettings, {
    onSuccess: () => {
      toast.success('Theme settings updated');
    },
    onError: () => {
      toast.error('Failed to update theme settings');
    },
  });

  const notificationMutation = useMutation(updateNotificationSettings, {
    onSuccess: () => {
      toast.success('Notification settings updated');
    },
    onError: () => {
      toast.error('Failed to update notification settings');
    },
  });

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setThemeSettings((prev) => {
      const newSettings = { ...prev, [name]: value };
      themeMutation.mutate(newSettings);
      return newSettings;
    });
  };

  const handleNotificationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    const numValue = type === 'range' ? parseFloat(value) : newValue;

    setNotificationSettings((prev) => {
      const newSettings = { ...prev, [name]: numValue };
      notificationMutation.mutate(newSettings);
      return newSettings;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Theme Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Primary Color
            </label>
            <input
              type="color"
              name="primary_color"
              value={themeSettings.primary_color}
              onChange={handleThemeChange}
              className="mt-1 block w-full h-10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Secondary Color
            </label>
            <input
              type="color"
              name="secondary_color"
              value={themeSettings.secondary_color}
              onChange={handleThemeChange}
              className="mt-1 block w-full h-10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Background Style
            </label>
            <select
              name="background"
              value={themeSettings.background}
              onChange={handleThemeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="gradient-1">Horizontal Gradient</option>
              <option value="gradient-2">Diagonal Gradient</option>
              <option value="gradient-3">Vertical Gradient</option>
              <option value="gradient-4">Radial Gradient</option>
              <option value="gradient-5">Conic Gradient</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Notification Settings
        </h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="sound_enabled"
              id="sound_enabled"
              checked={notificationSettings.sound_enabled}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              htmlFor="sound_enabled"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Enable Sound Notifications
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notification Type
            </label>
            <select
              name="notification_type"
              value={notificationSettings.notification_type}
              onChange={handleNotificationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="sound">Sound Only</option>
              <option value="browser">Browser Only</option>
              <option value="both">Both Sound and Browser</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Volume ({Math.round(notificationSettings.volume * 100)}%)
            </label>
            <input
              type="range"
              name="volume"
              min="0"
              max="1"
              step="0.1"
              value={notificationSettings.volume}
              onChange={handleNotificationChange}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 