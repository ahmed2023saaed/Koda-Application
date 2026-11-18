import useDashTheme from "../hooks/useDashTheme";

const TONES = {
  emerald: { border: "border-t-emerald-500", icon: "from-emerald-400 to-teal-500" },
  amber: { border: "border-t-amber-500", icon: "from-amber-400 to-orange-500" },
  pink: { border: "border-t-pink-500", icon: "from-pink-500 to-rose-500" },
  cyan: { border: "border-t-cyan-500", icon: "from-cyan-400 to-sky-500" },
  purple: { border: "border-t-purple-500", icon: "from-purple-500 to-fuchsia-500" },
  slate: { border: "border-t-slate-500", icon: "from-slate-400 to-slate-600" },
};

function StatCard({ label, value, hint, icon, tone = "slate" }) {
  const th = useDashTheme();
  const t = TONES[tone] ?? TONES.slate;

  return (
    <div
      className={`flex flex-col rounded-3xl border border-t-[3px] ${th.stat} ${t.border} p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-sm ${th.muted}`}>{label}</p>
          <h3 className={`my-2 text-3xl font-bold leading-tight ${th.title}`}>{value}</h3>
          <p className={`text-xs ${th.faint}`}>{hint}</p>
        </div>
        <div
          className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${t.icon}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />
    </div>
  );
}

export default StatCard;