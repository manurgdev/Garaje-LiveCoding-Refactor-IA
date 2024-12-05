import { TodoListScene } from "@/scenes/TodoList/TodoListScene";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      <div className="w-full p-4">
        <TodoListScene />
      </div>
    </div>
  );
}
