import React, { useState } from "react";
import UserForm from "/src/features/users/components/UserForm";

export default function App() {
  // قائمة المستخدمين الافتراضية
  const [users, setUsers] = useState([
    { id: 1, name: "mostafa_122", email: "mostafa@gmail.com", phone: "0123456789", role: "Customer" },
    { id: 2, name: "tysileba", email: "xoquxyb@mailinator.com", phone: "9876543210", role: "Admin" },
  ]);

  // حالة لتخزين المستخدم المراد تعديله (إذا كان null يعني أننا في وضع "الإضافة")
  const [selectedUser, setSelectedUser] = useState(null);

  // دالة الحفظ (تتعامل مع الإضافة والتعديل معاً)
  const handleSaveUser = (userData) => {
    if (userData.id) {
      // وضع التعديل (Edit Mode)
      setUsers(users.map((u) => (u.id === userData.id ? userData : u)));
    } else {
      // وضع الإضافة (Add Mode)
      const newUser = {
        ...userData,
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1, // توليد ID تلقائي
      };
      setUsers([...users, newUser]);
    }
    setSelectedUser(null); // تفريغ الفورم وإعادته لوضع الإضافة بعد الحفظ
  };

  // دالة حذف مستخدم
  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-white">Koda Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Manage application users, phone directories, and roles.</p>
        </div>

        {/* تقسيم الشاشة: الفورم على اليسار/اليمين والجدول بجانبه */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* عرض الفورم وتمرير الـ Props له */}
          <UserForm 
            selectedUser={selectedUser} 
            onSave={handleSaveUser} 
            onCancel={() => setSelectedUser(null)} 
          />

          {/* جدول عرض المستخدمين */}
          <div className="bg-[#1e293b] rounded-xl shadow-md border border-slate-800 overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Users List</h2>
              {selectedUser && (
                <button 
                  onClick={() => setSelectedUser(null)} 
                  className="text-xs bg-sky-500/10 text-sky-400 px-2 py-1 rounded border border-sky-500/20"
                >
                  Switch to Add New User
                </button>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">User Details</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#1e293b]/50 transition">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-200">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{u.phone || "—"}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          u.role === "Admin" 
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right space-x-2">
                        {/* عند الضغط هنا يتم تمرير بيانات هذا المستخدم للفورم ليدخل في وضع التعديل */}
                        <button 
                          onClick={() => setSelectedUser(u)}
                          className="text-sky-400 hover:text-sky-300 font-medium transition mr-3 text-xs uppercase"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-rose-400 hover:text-rose-300 font-medium transition text-xs uppercase"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
