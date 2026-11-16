import { UserPlus, X } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none " +
  "focus:ring-2 focus:ring-cyan-500 text-slate-900 placeholder-slate-400 " +
  "dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500";

const labelCls =
  "mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300";

export default function UserFormPanel({
  open,
  editing,
  form,
  setForm,
  error,
  saving,
  onSubmit,
  onClose,
  onClear,
}) {
  if (!open) return null;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-md">
            <UserPlus size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {editing ? "Edit User" : "Create New User"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {editing
                ? "Update the details below"
                : "Fill in the details below to add a new user"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        {error && (
          <div className="mx-6 mb-4 rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-500/20 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 border-t border-slate-200 p-6 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelCls}>
              Username <span className="text-red-500">*</span>
            </label>
            <input
              required
              className={inputCls}
              placeholder="e.g. john_doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              className={inputCls}
              placeholder="e.g. john@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>
              Password {!editing && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              required={!editing}
              className={inputCls}
              placeholder={editing ? "New password (optional)" : "••••••••"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Phone</label>
            <input
              className={inputCls}
              placeholder="e.g. +1 234 567 890"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="mx-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 py-5 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="text-red-500">*</span> Required fields
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClear}
              className="rounded-2xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-cyan-600 active:scale-95 disabled:opacity-60"
            >
              <UserPlus size={16} />
              {saving ? "Saving..." : editing ? "Save" : "Create User"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
