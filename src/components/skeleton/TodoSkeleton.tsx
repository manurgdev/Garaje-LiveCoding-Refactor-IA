import { FC } from 'react';

export const TodoSkeleton: FC = () => {
  return (
    <div className="animate-pulse flex flex-col sm:flex-row items-start sm:items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center flex-grow mr-4 mb-2 sm:mb-0">
        <div className="h-5 w-5 bg-gray-200 rounded mr-3" />
        <div className="flex-grow">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
        <div className="w-32 h-8 bg-gray-200 rounded-full" />
        <div className="ml-4 h-5 w-5 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export const TodoListSkeleton: FC = () => {
  return (
    <div className="space-y-3 mt-4">
      {[1, 2, 3].map((key) => (
        <TodoSkeleton key={key} />
      ))}
    </div>
  );
}; 