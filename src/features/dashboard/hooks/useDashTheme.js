import { useTheme } from "../../../contexts/themeContext";

const COMMON = {
  eyebrow: "text-cyan-400",
  greenPill: "bg-emerald-500/10 text-emerald-300",
  cyanPill: "bg-cyan-500/10 text-cyan-300",
  status: {
    pending: "bg-amber-500/10 text-amber-300 border-amber-400/20",
    processing: "bg-sky-500/10 text-sky-300 border-sky-400/20",
    confirmed: "bg-sky-500/10 text-sky-300 border-sky-400/20",
    shipped: "bg-violet-500/10 text-violet-300 border-violet-400/20",
    delivered: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
    cancelled: "bg-rose-500/10 text-rose-300 border-rose-400/20",
  },
  badge: {
    confirmed: "bg-emerald-500/10 text-emerald-300",
    delivered: "bg-emerald-500/10 text-emerald-300",
    pending: "bg-amber-500/10 text-amber-300",
    processing: "bg-sky-500/10 text-sky-300",
    shipped: "bg-violet-500/10 text-violet-300",
    cancelled: "bg-rose-500/10 text-rose-300",
    returned: "bg-yellow-500/10 text-yellow-300",
  },
  badgeDefault: "bg-slate-500/10 text-slate-300",
};

const DARK = {
  ...COMMON,
  panel: "border-slate-800 bg-slate-900/90 shadow-xl",
  hero: "border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-900/5",
  stat: "border-slate-800 bg-slate-900 shadow-lg",
  row: "border-slate-800 bg-slate-950/80",
  orderRow: "border-slate-800 bg-slate-950/80 shadow-sm",
  title: "text-white",
  muted: "text-slate-300",
  statLabel: "text-slate-400",
  statHint: "text-slate-500",
  divider: "via-slate-700",
  imgBox: "bg-slate-800",
  error: "border-red-900 bg-red-950/40 text-red-300",
};

const LIGHT = {
  ...COMMON,
  panel: "border-slate-200 bg-white/90 shadow-xl",
  hero: "border-slate-200 bg-white/90 shadow-xl shadow-slate-900/5",
  stat: "border-slate-200/70 bg-white shadow-lg",
  row: "border-slate-200 bg-slate-50",
  orderRow: "border-slate-200 bg-slate-50 shadow-sm",
  title: "text-slate-900",
  muted: "text-slate-500",
  statLabel: "text-slate-500",
  statHint: "text-slate-400",
  divider: "via-slate-200",
  imgBox: "bg-slate-200",
  error: "border-red-200 bg-red-50 text-red-700",
};

function useDashTheme() {
  const { isDarkMode } = useTheme();
  return isDarkMode ? DARK : LIGHT;
}

export default useDashTheme;