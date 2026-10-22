import { ClipboardList, Clock3, CheckCircle2 } from "lucide-react";

const statsConfig = [
  {
    label: "Total tasks",
    key: "total",
    icon: ClipboardList,
    color: "text-indigo-400 bg-indigo-500/10",
  },
  {
    label: "In progress",
    key: "progress",
    icon: Clock3,
    color: "text-sky-400 bg-sky-500/10",
  },
  {
    label: "Completed",
    key: "completed",
    icon: CheckCircle2,
    color: "text-emerald-400 bg-emerald-500/10",
  },
];

export default function StatsCards({ tasks }) {
  const stats = {
    total: tasks.length,
    progress: tasks.filter((task) => task.status === "In Progress").length,
    completed: tasks.filter((task) => task.status === "Completed").length,
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {statsConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"
          >
            <div className={`rounded-xl p-3 ${item.color}`}>
              <Icon size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-400">{item.label}</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {stats[item.key]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
