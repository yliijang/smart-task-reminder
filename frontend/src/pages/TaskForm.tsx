import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { createTask, updateTask, fetchTask } from '../services/api';
import { Task, PriorityLevel, TaskCreate, TaskUpdate } from '../types';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<TaskCreate>({
    title: '',
    priority: PriorityLevel.MEDIUM,
    reminder_time: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  });

  const { data: task, isLoading: isLoadingTask } = useQuery(
    ['task', id],
    () => fetchTask(Number(id)),
    {
      enabled: isEditing,
      onSuccess: (data) => {
        setFormData({
          title: data.title,
          priority: data.priority,
          reminder_time: format(new Date(data.reminder_time), "yyyy-MM-dd'T'HH:mm"),
        });
      },
    }
  );

  const createMutation = useMutation(createTask, {
    onSuccess: () => {
      toast.success('Task created successfully');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to create task');
    },
  });

  const updateMutation = useMutation(
    (data: TaskUpdate & { id: number }) => updateTask(data),
    {
      onSuccess: () => {
        toast.success('Task updated successfully');
        navigate('/');
      },
      onError: () => {
        toast.error('Failed to update task');
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && id) {
      updateMutation.mutate({ id: Number(id), ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isEditing && isLoadingTask) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {isEditing ? 'Edit Task' : 'Create New Task'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
          >
            {Object.values(PriorityLevel).map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="reminder_time"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Reminder Time
          </label>
          <input
            type="datetime-local"
            name="reminder_time"
            id="reminder_time"
            value={formData.reminder_time}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 