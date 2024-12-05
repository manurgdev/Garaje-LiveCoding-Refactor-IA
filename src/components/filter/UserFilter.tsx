import { FC, memo } from 'react';

type UserFilterProps = {
  users: string[];
  selectedUser: string;
  onUserChange: (user: string) => void;
}

const UserFilterComponent: FC<UserFilterProps> = ({
  users,
  selectedUser,
  onUserChange,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="user-filter" className="mb-1 text-sm font-medium text-gray-700">
        Usuario
      </label>
      <select
        id="user-filter"
        value={selectedUser}
        onChange={(e) => onUserChange(e.target.value)}
        className="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
      >
        <option value="">Todos</option>
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  );
};

export const UserFilter = memo(UserFilterComponent);