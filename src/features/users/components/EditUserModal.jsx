import { useEffect } from "react";
import { X } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none " +
  "focus:ring-2 focus:ring-cyan-500 text-slate-900 placeholder-slate-400 " +
  "dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500";

const labelCls =
  "mb-2 block text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400";

export default function EditUserModal({
  open,
  form,
  setForm,
  error,
  saving,
  onSubmit,
  onClose,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Edit User
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-cyan-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-500/20 dark:text-red-300">
              {error}
            </div>
          )}

          <div>
            <label className={labelCls}>Username</label>
            <input
              required
              className={inputCls}
              value={form.name}
              onChange={set("name")}
            />
          </div>

          <div>
            <label className={labelCls}>Phone</label>
            <input
              className={inputCls}
              value={form.phone}
              onChange={set("phone")}
            />
          </div>

          <div>
            <label className={labelCls}>Avatar URL</label>
            <input
              className={inputCls}
              placeholder="https://..."
              value={form.avatar}
              onChange={set("avatar")}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-cyan-500 active:scale-95 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
