import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Page not found</p>
      <p className="mt-2 text-gray-500 dark:text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
      >
        Return to Tasks
      </Link>
    </div>
  );
};

export default NotFound; 