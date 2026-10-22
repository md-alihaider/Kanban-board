import { LayoutDashboard, Plus } from "lucide-react";

export default function Header({ onAddTask }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-500 p-2.5 text-white">
            <LayoutDashboard size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              TaskFlow
            </h1>
            <p className="hidden text-xs text-zinc-500 sm:block">
              Your work, organized.
            </p>
          </div>
        </div>

        <button
          onClick={onAddTask}
          className="flex items-center gap-2 rounded-xl bg-indigo-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 sm:px-4"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add new task</span>
          <span className="sm:hidden">Add task</span>
        </button>
      </div>
    </header>
  );
}
