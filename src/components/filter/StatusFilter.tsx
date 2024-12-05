import { type FC,memo } from 'react';

type StatusFilterProps = {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const StatusFilterComponent: FC<StatusFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="task-filter" className="mb-1 text-sm font-medium text-gray-700">
        Estado
      </label>
      <select
        id="task-filter"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
      >
        <option value="">Todas</option>
        <option value="completed">Completadas</option>
        <option value="incomplete">Incompletas</option>
      </select>
    </div>
  );
};

export const StatusFilter = memo(StatusFilterComponent);