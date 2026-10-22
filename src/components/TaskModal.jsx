import { useState } from "react";
import { X } from "lucide-react";

const STATUSES = ["Todo", "In Progress", "Completed"];
const PRIORITIES = ["Low", "Medium", "High"];

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30";

export default function TaskModal({
  task,
  initialStatus = "Todo",
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => ({
    title: task?.title ?? "",
    description: task?.description ?? "",
    priority: task?.priority ?? "Medium",
    dueDate: task?.dueDate ?? "",
    status: task?.status ?? initialStatus,
  }));

  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function submit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={submit}
        className="my-auto w-full max-w-lg space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {task ? "Edit task" : "Create a task"}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Add details to organize your work.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium text-zinc-300">
            Task title *
            <input
              autoFocus
              required
              maxLength={100}
              value={form.title}
              onChange={(e) => {
                update("title", e.target.value);
                setError("");
              }}
              placeholder="e.g. Build the landing page"
              className={inputClass}
            />
          </label>

          <label className="block space-y-1.5 text-sm font-medium text-zinc-300">
            Description
            <textarea
              rows={3}
              maxLength={500}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="What needs to be done?"
              className={`${inputClass} resize-y`}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm font-medium text-zinc-300">
              Priority
              <select
                value={form.priority}
                onChange={(e) => update("priority", e.target.value)}
                className={inputClass}
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-1.5 text-sm font-medium text-zinc-300">
              Due date
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <label className="block space-y-1.5 text-sm font-medium text-zinc-300">
            Status
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className={inputClass}
            >
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <p role="alert" className="text-sm text-rose-400">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            {task ? "Save changes" : "Create task"}
          </button>
        </div>
      </form>
    </div>
  );
}
