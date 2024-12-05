import { ReactNode } from "react";

export const TodoList = ({ children, title }: { children: ReactNode, title: string }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};
