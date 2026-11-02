import React, { useState } from "react"; 
import { Edit2, Trash2, ShieldCheck, Users } from "lucide-react"; 
import UserForm from "/src/features/users/components/UserForm"; 

export default function UsersPage() { 
  const [users, setUsers] = useState([ 
    { id: 1, name: "mostafa_122", email: "[mostafa@gmail.com](mailto:mostafa@gmail.com)", phone: "0102345678", role: "customer", verified: "No" }, 
    { id: 2, name: "tysileba", email: "[xoquxyb@mailinator.com](mailto:xoquxyb@mailinator.com)", phone: "0114567890", role: "customer", verified: "No" }, 
    { id: 3, name: "Customer", email: "[vicyqemuzu@mailinator.com](mailto:vicyqemuzu@mailinator.com)", phone: "", role: "customer", verified: "No" }, { id: 4, name: "curuculi", email: "[veleyjzi@mailinator.com](mailto:veleyjzi@mailinator.com)", phone: "0151234567", role: "customer", verified: "No" }, 
    { id: 5, name: "ADMIN", email: "[admin@koda.com](mailto:admin@koda.com)", phone: "0120000000", role: "admin", verified: "No" }, ]); const [selectedUser, setSelectedUser] = useState(null);
     // Add / Edit User 
const handleSaveUser = (userData) => {
if (userData.id) { 
 
  setUsers((prev) => 
    prev.map((u) => 
      u.id === userData.id ? userData : u 
    ) 
  ); 
 
} else { 
 
  const newUser = { 
    ...userData, 
    id: users.length 
      ? Math.max(...users.map((u) => u.id)) + 1 
      : 1, 
  }; 
 
  setUsers((prev) => [...prev, newUser]); 
} 
 
setSelectedUser(null);
}; 

// Statistics 
const totalUsers = users.length; 
const admins = users.filter((u) => u.role === "admin").length;
 const customers = users.filter((u) => u.role === "customer").length; 
 const verified = users.filter((u) => u.verified === "Yes").length;



return (

  <div className="min-h-screen bg-[#090d16] text-slate-100 p-6">


{/* Page Title */}
<div className="mb-6 flex items-center gap-3">
  <Users size={24} className="text-cyan-400" />
  <h1 className="text-2xl font-bold text-white">
    Users Management
  </h1>
</div>

{/* Statistics */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  {[
    { label: "Total Users", value: totalUsers },
    { label: "Admins", value: admins },
    { label: "Customers", value: customers },
    { label: "Verified", value: verified },
  ].map((stat) => (
    <div
      key={stat.label}
      className="bg-[#0b0f19] p-4 rounded-xl border border-slate-900/60"
    >
      <p className="text-xs text-slate-500 uppercase">
        {stat.label}
      </p>
      <h3 className="text-2xl font-black text-white mt-2">
        {stat.value}
      </h3>
    </div>
  ))}
</div>

{/* User Form and Table */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

  <UserForm
    selectedUser={selectedUser}
    onSave={handleSaveUser}
    onCancel={() => setSelectedUser(null)}
  />

  {/* Users Table */}
  <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl overflow-hidden lg:col-span-2">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">

        <thead>
          <tr className="border-b border-slate-900/80 text-slate-500 text-xs">
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Verified</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-900/40">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-[#111827]/40">

              <td className="px-6 py-4">
                <div className="text-sm font-semibold">
                  {u.name}
                </div>
                <div className="text-xs text-slate-500">
                  {u.email}
                </div>
              </td>

              <td className="px-6 py-4">{u.role}</td>

              <td className="px-6 py-4">
                <span className={
                  u.verified === "Yes"
                    ? "text-emerald-400"
                    : "text-rose-500"
                }>
                  {u.verified === "Yes" ? "✓ Yes" : "✕ No"}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => setSelectedUser(u)}
                    className="p-2 bg-blue-600 hover:bg-blue-500 rounded-md"
                    title="Edit User"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={() =>
                      setUsers((prev) =>
                        prev.map((user) =>
                          user.id === u.id
                            ? {
                                ...user,
                                verified: user.verified === "Yes" ? "No" : "Yes",
                              }
                            : user
                        )
                      )
                    }
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-md"
                    title="Verify User"
                  >
                    <ShieldCheck size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setUsers((prev) =>
                        prev.filter((user) => user.id !== u.id)
                      );

                      if (selectedUser?.id === u.id) {
                        setSelectedUser(null);
                      }
                    }}
                    className="p-2 bg-rose-600 hover:bg-rose-500 rounded-md"
                    title="Delete User"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>

</div>


  </div>
);
}