import { CalendarDays, Pencil, Trash2 } from "lucide-react";

const priorityStyles = {
  Low: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  High: "border-rose-500/20 bg-rose-500/10 text-rose-400",
};

const statuses = ["Todo", "In Progress", "Completed"];

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const overdue =
    task.dueDate && task.dueDate < todayString && task.status !== "Completed";

  return (
    <article className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`min-w-0 wrap-break-word font-semibold leading-5 ${
            task.status === "Completed"
              ? "text-zinc-500 line-through"
              : "text-zinc-100"
          }`}
        >
          {task.title}
        </h3>

        <span
          className={`shrink-0 rounded-md border px-2 py-1 text-[11px] font-semibold ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-3 whitespace-pre-wrap wrap-break-word text-sm leading-5 text-zinc-400">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <p
          className={`mt-4 flex items-center gap-1.5 text-xs ${
            overdue ? "text-rose-400" : "text-zinc-500"
          }`}
        >
          <CalendarDays size={14} />
          {overdue ? "Overdue · " : "Due "}
          {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800 pt-3">
        <select
          aria-label={`Change status of ${task.title}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="min-w-0 max-w-full rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-xs text-zinc-300 outline-none focus:border-indigo-500"
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            <Pencil size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-rose-500/10 hover:text-rose-400"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
