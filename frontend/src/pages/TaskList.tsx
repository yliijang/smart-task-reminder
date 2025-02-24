import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import {
  TrashIcon,
  PencilIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../services/api';
import { Task, PriorityLevel } from '../types';

const priorityColors = {
  [PriorityLevel.HIGH]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [PriorityLevel.MEDIUM]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [PriorityLevel.LOW]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const TaskList: React.FC = () => {
  const [sortBy, setSortBy] = useState<'reminder_time' | 'priority'>('reminder_time');
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery('tasks', () => fetchTasks(sortBy));

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      toast.success('Task deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete task');
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Error loading tasks. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
          <button
            onClick={() => setSortBy('reminder_time')}
            className={`flex items-center px-3 py-1 rounded-md ${
              sortBy === 'reminder_time'
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Time
            {sortBy === 'reminder_time' && <ChevronUpIcon className="h-4 w-4 ml-1" />}
          </button>
          <button
            onClick={() => setSortBy('priority')}
            className={`flex items-center px-3 py-1 rounded-md ${
              sortBy === 'priority'
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Priority
            {sortBy === 'priority' && <ChevronDownIcon className="h-4 w-4 ml-1" />}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{task.title}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {format(new Date(task.reminder_time), 'PPp')}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to={`/task/edit/${task.id}`}
                className="p-2 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <PencilIcon className="h-5 w-5" />
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
            <Link
              to="/task/new"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Create your first task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList; 