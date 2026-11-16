import useDashTheme from "../hooks/useDashTheme";

const TONES = {
  emerald: { border: "border-t-emerald-500", icon: "bg-emerald-500" },
  amber: { border: "border-t-amber-500", icon: "bg-amber-500" },
  pink: { border: "border-t-pink-500", icon: "bg-pink-500" },
  cyan: { border: "border-t-cyan-500", icon: "bg-cyan-500" },
  purple: { border: "border-t-purple-500", icon: "bg-purple-500" },
  slate: { border: "border-t-slate-500", icon: "bg-slate-500" },
};

function StatCard({ label, value, hint, icon, tone = "slate" }) {
  const th = useDashTheme();
  const t = TONES[tone] ?? TONES.slate;

  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-3xl border border-t-[3px] ${th.stat} ${t.border} p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}
    >
      <div>
        <p className={`text-sm ${th.muted}`}>{label}</p>
        <h3 className={`my-2 text-3xl font-bold leading-tight ${th.title}`}>{value}</h3>
        <p className={`text-xs ${th.faint}`}>{hint}</p>
      </div>
      <div className={`grid size-14 shrink-0 place-items-center rounded-2xl text-white ${t.icon}`}>
        {icon}
      </div>
    </div>
  );
}

export default StatCard;