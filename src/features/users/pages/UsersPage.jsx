import { useEffect, useMemo, useState } from "react";
import UserFormPanel from "../components/UserFormPanel";
import {
  Search,
  UserPlus,
  Users,
  ShieldCheck,
  UserCheck,
  Pencil,
  Trash2,
  X,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUsers,
  changeRole,
} from "../api/users.api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "customer",
};

const getId = (u) => (u.id !== undefined ? u.id : u._id);

const isVerified = (v) =>
  v === true || ["yes", "true", "verified"].includes(String(v).toLowerCase());

const errMsg = (err, fallback) =>
  (err && err.response && err.response.data && err.response.data.message) ||
  fallback;

// البوكسات: نفس ألوان الكود الأصلي
const box =
  "rounded-3xl  border border-slate-200 bg-white shadow-lg " +
  "dark:border-slate-800 dark:bg-slate-900";

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none " +
  "focus:ring-2 focus:ring-cyan-500 text-slate-900 placeholder-slate-400 " +
  "dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchUsers();
      const d = res.data;
      const list = Array.isArray(d) ? d : d.users || d.data || [];
      setUsers(
        list.map((u) => ({
          ...u,
          name: u.name || u.username || "",
          avatar: u.avatar || u.image || u.profileImage || "",
        }))
      );
    } catch (e) {
      setError(errMsg(e, "Failed to load users"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const stats = useMemo(
    () => ({
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      customers: users.filter((u) => u.role === "customer").length,
      verified: users.filter((u) => isVerified(u.verified)).length,
    }),
    [users]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.name, u.email, u.phone, u.role]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q))
    );
  }, [users, search]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (u) => {
    setEditingId(getId(u));
    setForm({
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || "",
      password: "",
      role: u.role || "customer",
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const payload = {
      username: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      role: form.role,
    };
    if (!payload.phone) delete payload.phone;
    if (!payload.password) delete payload.password;

    setSaving(true);
    try {
      let id = editingId;
      let oldRole = "customer";

      if (editingId) {
        const old = users.find((x) => getId(x) === editingId);
        if (old && old.role) oldRole = old.role;
        await updateUser(editingId, payload);
      } else {
        const res = await addUser(payload);
        const d = res.data || {};
        const created = d.user || d.data || d;
        id = created.id !== undefined ? created.id : created._id;
      }

      if (id && form.role !== oldRole) {
        try {
          await changeRole({ userId: id, role: form.role });
        } catch (roleErr) {
          setActionError(errMsg(roleErr, "Failed to change role"));
        }
      }

      setModalOpen(false);
      await loadUsers();
    } catch (err) {
      setFormError(errMsg(err, "Something went wrong, please try again"));
    } finally {
      setSaving(false);
    }
  };
  const handleToggleRole = async (u) => {
    setActionError("");
    const newRole = u.role === "admin" ? "customer" : "admin";
    try {
      await changeRole({ userId: getId(u), role: newRole });
    } catch (err) {
      setActionError(errMsg(err, "Failed to change role"));
    }
    await loadUsers();
  };

  const handleDelete = async (u) => {
    if (!window.confirm("Delete " + (u.name || u.email) + "?")) return;
    setActionError("");
    try {
      await deleteUsers(getId(u));
      setUsers((prev) => prev.filter((x) => getId(x) !== getId(u)));
    } catch (err) {
      setActionError(errMsg(err, "Failed to delete user"));
    }
  };

  const cards = [
    { label: "Total Users", value: stats.total, icon: Users },
    { label: "Admins", value: stats.admins, icon: ShieldCheck },
    { label: "Customers", value: stats.customers, icon: Users },
    { label: "Verified", value: stats.verified, icon: UserCheck },
  ];

  return (
    <div className="min-h-full space-y-6 bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className={box + " p-6"}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">
              User Management
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Manage Users
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className={inputCls + " pl-12"}
              />
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-cyan-600 active:scale-95"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>
      <UserFormPanel
            open={modalOpen}
            editing={!!editingId}
            form={form}
            setForm={setForm}
            error={formError}
            saving={saving}
            onSubmit={handleSubmit}
            onClose={() => setModalOpen(false)}
            onClear={() => setForm(emptyForm)}
          />

      {/* رسالة خطأ للأزرار */}
      {actionError && (
        <div className="flex items-center justify-between rounded-2xl bg-red-100 px-4 py-3 text-red-700 dark:bg-red-500/20 dark:text-red-300">
          <span>{actionError}</span>
          <button onClick={() => setActionError("")}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className={box + " flex items-center justify-between p-5"}
            >
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {c.label}
                </p>
                <p className="mt-1 text-3xl font-bold">{c.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-md">
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className={box + " overflow-hidden"}>
        {loading ? (
          <p className="p-8 text-center text-slate-500 dark:text-slate-400">
            Loading...
          </p>
        ) : error ? (
          <p className="p-8 text-center text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center text-slate-500 dark:text-slate-400">
            No users found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Verified</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={getId(u)}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt=""
                            className="h-11 w-11 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/15 font-bold uppercase text-cyan-600 dark:text-cyan-300">
                            {u.name ? u.name[0] : "?"}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{u.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          "rounded-full px-3 py-1 text-xs font-semibold " +
                          (u.role === "admin"
                            ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                            : "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300")
                        }
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {isVerified(u.verified) ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 size={18} /> Yes
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-500">
                          <XCircle size={18} /> No
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          title="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-md transition hover:bg-cyan-600 active:scale-95"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleRole(u)}
                          title={
                            u.role === "admin" ? "Make customer" : "Make admin"
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md transition hover:bg-emerald-600 active:scale-95"
                        >
                          <ShieldCheck size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          title="Delete"
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-white shadow-md transition hover:bg-red-600 active:scale-95"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: إضافة / تعديل */}
    </div>
  );
}
