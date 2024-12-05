import { ReactNode } from "react";

type TodoListWithPropsProps = {
  title: string,
  userFilter?: ReactNode,
  statusFilter?: ReactNode,
  todoInput?: ReactNode,
  children: ReactNode
};

export const TodoListWithProps = ({
  title,
  userFilter,
  statusFilter,
  todoInput,
  children,
}: TodoListWithPropsProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          {title}
        </h1>
        {(userFilter || statusFilter) &&
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {userFilter}
              {statusFilter}
            </div>
          </div>
        }

        {todoInput &&
          <div className="flex flex-row gap-2 items-center">
            {todoInput}
          </div>
        }

        {children}
      </div>
    </div>
  );
};
