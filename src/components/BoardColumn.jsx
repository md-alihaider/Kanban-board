import { Circle, Clock3, CheckCircle2, Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const columnConfig = {
  Todo: {
    icon: Circle,
    dot: "bg-zinc-400",
    iconColor: "text-zinc-400",
    subtitle: "Ready to start",
  },
  "In Progress": {
    icon: Clock3,
    dot: "bg-sky-400",
    iconColor: "text-sky-400",
    subtitle: "Work in progress",
  },
  Completed: {
    icon: CheckCircle2,
    dot: "bg-emerald-400",
    iconColor: "text-emerald-400",
    subtitle: "Successfully finished",
  },
};

export default function BoardColumn({
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  onAdd,
}) {
  const config = columnConfig[status];
  const Icon = config.icon;

  return (
    <section className="min-w-0 rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-3 sm:p-4">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="flex flex-wrap items-center gap-2 font-semibold text-zinc-100">
            <span className={`h-2 w-2 rounded-full ${config.dot}`} />
            {status}
            <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-xs text-zinc-400">
              {tasks.length}
            </span>
          </h2>

          <p className="mt-1 text-xs text-zinc-500">{config.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add task to ${status}`}
          className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
        >
          <Plus size={17} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 px-3 py-6 text-center">
            <div className="rounded-xl bg-zinc-900 p-3">
              <Icon size={22} className={config.iconColor} />
            </div>

            <p className="mt-3 text-sm font-medium text-zinc-300">
              No tasks yet
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Your tasks will appear here.
            </p>

            <button
              type="button"
              onClick={onAdd}
              className="mt-3 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              + Add task
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
