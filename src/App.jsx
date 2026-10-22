import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import TaskFilters from "./components/TaskFilters";
import BoardColumn from "./components/BoardColumn";
import TaskModal from "./components/TaskModal";

const STATUSES = ["Todo", "In Progress", "Completed"];
const STORAGE_KEY = "taskflow-tasks";

const initialTasks = [
  {
    id: "1",
    title: "Build dashboard UI",
    description: "Create a responsive dashboard with React and Tailwind.",
    priority: "High",
    dueDate: "2026-10-24",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up login and registration screens.",
    priority: "Medium",
    dueDate: "2026-10-26",
    status: "Todo",
  },
  {
    id: "3",
    title: "Initialize project",
    description: "Create the Vite project and configure Tailwind.",
    priority: "Low",
    dueDate: "2026-10-22",
    status: "Completed",
  },
];

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) return initialTasks;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : initialTasks;
  } catch {
    return initialTasks;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), 2500);

    return () => window.clearTimeout(timer);
  }, [toast]);

  function openAddModal(status = "Todo") {
    setModalTask({ status });
    setModalOpen(true);
  }

  function openEditModal(task) {
    setModalTask(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalTask(null);
  }

  function saveTask(form) {
    if (modalTask?.id) {
      setTasks((current) =>
        current.map((task) =>
          task.id === modalTask.id ? { ...form, id: task.id } : task,
        ),
      );

      setToast("Task updated successfully");
    } else {
      setTasks((current) => [
        {
          ...form,
          id: crypto.randomUUID(),
        },
        ...current,
      ]);

      setToast("Task created successfully");
    }

    closeModal();
  }

  function deleteTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    if (!window.confirm(`Delete "${task.title}"?`)) return;

    setTasks((current) => current.filter((item) => item.id !== id));

    setToast("Task deleted successfully");
  }

  function changeStatus(id, status) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, search, priorityFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header onAddTask={() => openAddModal("Todo")} />

      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <section className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Workspace / Overview
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            My Task Board
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Plan your work. Track your progress. Get things done.
          </p>
        </section>

        <section className="mb-6">
          <StatsCards tasks={tasks} />
        </section>

        <section className="mb-5">
          <TaskFilters
            search={search}
            setSearch={setSearch}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </section>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-zinc-400">
            Showing{" "}
            <span className="font-semibold text-zinc-200">
              {filteredTasks.length}
            </span>{" "}
            of {tasks.length} tasks
          </p>

          <p className="flex items-center gap-1.5 text-xs text-zinc-500">
            <CheckCircle2 size={14} />
            {tasks.length === 0
              ? "Ready when you are"
              : `${Math.round(
                  (tasks.filter((task) => task.status === "Completed").length /
                    tasks.length) *
                    100,
                )}% completed`}
          </p>
        </div>

        <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STATUSES.map((status) => (
            <BoardColumn
              key={status}
              status={status}
              tasks={filteredTasks.filter((task) => task.status === status)}
              onEdit={openEditModal}
              onDelete={deleteTask}
              onStatusChange={changeStatus}
              onAdd={() => openAddModal(status)}
            />
          ))}
        </section>

        {filteredTasks.length === 0 && tasks.length > 0 && (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center text-sm text-zinc-400">
            No matching tasks. Try changing your search or filters.
          </div>
        )}

        {tasks.length === 0 && (
          <div className="mt-5 rounded-xl border border-dashed border-zinc-800 p-5 text-center text-sm text-zinc-400">
            Your board is empty. Click{" "}
            <strong className="text-zinc-200">Add new task</strong> to get
            started.
          </div>
        )}
      </main>

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-60 -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-2xl"
        >
          {toast}
        </div>
      )}

      {modalOpen && (
        <TaskModal
          key={modalTask?.id ?? `new-${modalTask?.status}`}
          task={modalTask?.id ? modalTask : null}
          initialStatus={modalTask?.status ?? "Todo"}
          onClose={closeModal}
          onSave={saveTask}
        />
      )}
    </div>
  );
}
