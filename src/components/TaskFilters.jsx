import { ListFilter, Search, X } from "lucide-react";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Todo", "In Progress", "Completed"];

const selectClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-200 outline-none transition focus:border-indigo-500";

export default function TaskFilters({
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) {
  const hasFilters =
    search || priorityFilter !== "All" || statusFilter !== "All";

  function clearFilters() {
    setSearch("");
    setPriorityFilter("All");
    setStatusFilter("All");
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 sm:flex-row sm:items-center sm:p-4">
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks by title..."
          aria-label="Search tasks by title"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="relative">
          <ListFilter
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <select
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={`${selectClass} pl-9`}
          >
            <option value="All">All priorities</option>
            {priorities.map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
        </label>

        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
        >
          <option value="All">All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <X size={15} />
          Clear
        </button>
      )}
    </div>
  );
}
