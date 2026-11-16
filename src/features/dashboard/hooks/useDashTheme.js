import { useTheme } from "../../../contexts/themeContext";

const DARK = {
panel: "border-slate-800 bg-slate-900",
stat: "border-slate-800 bg-slate-900 shadow-xl shadow-black/30",
row: "border-slate-800 bg-slate-950/80 hover:border-slate-700",
imgBox: "bg-slate-900",
  title: "text-slate-50",
  strong: "text-slate-100",
  muted: "text-slate-400",
  faint: "text-slate-500",
  eyebrow: "text-cyan-400",
  greenPill: "border-emerald-800 bg-emerald-950 text-emerald-400",
  cyanPill: "border-cyan-900 bg-cyan-950 text-cyan-400",
  error: "border-red-900 bg-red-950/40 text-red-300",
  status: {
    pending: "text-amber-300 border-amber-400/30 bg-amber-400/10",
    processing: "text-sky-400 border-sky-400/30 bg-sky-400/10",
    confirmed: "text-sky-300 border-sky-300/30 bg-sky-300/10",
    shipped: "text-indigo-300 border-indigo-300/30 bg-indigo-300/10",
    delivered: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    cancelled: "text-rose-400 border-rose-400/30 bg-rose-400/10",
  },
  badge: {
    confirmed: "bg-emerald-950 text-emerald-400",
    delivered: "bg-emerald-950 text-emerald-400",
    returned: "bg-yellow-950 text-yellow-400",
    pending: "bg-amber-950 text-amber-400",
    processing: "bg-sky-950 text-sky-400",
    shipped: "bg-indigo-950 text-indigo-300",
    cancelled: "bg-rose-950 text-rose-400",
  },
  badgeDefault: "bg-slate-800 text-slate-300",
};

const LIGHT = {
panel: "border-slate-200/70 bg-white shadow-sm",
stat: "border-slate-200/70 bg-white shadow-md shadow-slate-200/70",
row: "border-slate-200 bg-slate-50 hover:border-slate-300",
imgBox: "bg-slate-100",
  title: "text-slate-900",
  strong: "text-slate-800",
  muted: "text-slate-500",
  faint: "text-slate-400",
  eyebrow: "text-cyan-600",
  greenPill: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cyanPill: "border-cyan-200 bg-cyan-50 text-cyan-700",
  error: "border-red-200 bg-red-50 text-red-700",
  status: {
    pending: "text-amber-600 border-amber-300 bg-amber-50",
    processing: "text-sky-600 border-sky-300 bg-sky-50",
    confirmed: "text-cyan-700 border-cyan-300 bg-cyan-50",
    shipped: "text-indigo-600 border-indigo-300 bg-indigo-50",
    delivered: "text-emerald-600 border-emerald-300 bg-emerald-50",
    cancelled: "text-rose-600 border-rose-300 bg-rose-50",
  },
  badge: {
    confirmed: "bg-emerald-100 text-emerald-700",
    delivered: "bg-emerald-100 text-emerald-700",
    returned: "bg-yellow-100 text-yellow-700",
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-sky-100 text-sky-700",
    shipped: "bg-indigo-100 text-indigo-700",
    cancelled: "bg-rose-100 text-rose-700",
  },
  badgeDefault: "bg-slate-200 text-slate-700",
};

function useDashTheme() {
  const { isDarkMode } = useTheme();
  return isDarkMode ? DARK : LIGHT;
}

export default useDashTheme;