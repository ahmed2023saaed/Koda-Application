import { useEffect, useState } from "react";
import useDashTheme from "../hooks/useDashTheme";

const TONES = {
  emerald: "from-emerald-400 to-teal-500",
  amber: "from-amber-400 to-orange-500",
  pink: "from-pink-500 to-rose-500",
  cyan: "from-cyan-400 to-sky-500",
  violet: "from-violet-500 to-fuchsia-500",
  slate: "from-slate-400 to-slate-600",
};

function StatCard({ label, value, hint, icon, tone = "slate", index = 0 }) {
  const th = useDashTheme();
  const gradient = TONES[tone] ?? TONES.slate;
  const [show, setShow] = useState(false);

  // حركة الدخول: الكارت بيطلع من تحت واحد ورا التاني
  useEffect(() => {
    const id = setTimeout(() => setShow(true), index * 80);
    return () => clearTimeout(id);
  }, [index]);

  return (
    // الغلاف ده للدخول بس، والـ article جواه للـ hover (عشان الحركتين ميتعارضوش)
    <div
      className={`transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <article
        className={`group relative h-full overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl ${th.stat}`}
      >
        <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-br ${gradient}`} />

        <div
          className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20`}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className={`text-sm font-medium ${th.statLabel}`}>{label}</p>
            <h3 className={`mt-3 text-3xl font-bold tracking-tight ${th.title}`}>{value}</h3>
            <p className={`mt-2 text-xs font-medium ${th.statHint}`}>{hint}</p>
          </div>

          <div
            className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 hover:rotate-[10deg] hover:scale-110`}
          >
            {icon}
          </div>
        </div>

        <div className={`mt-6 h-px w-full bg-gradient-to-r from-transparent ${th.divider} to-transparent`} />
      </article>
    </div>
  );
}

export default StatCard;