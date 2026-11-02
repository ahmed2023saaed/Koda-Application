import React, { useState, useEffect } from "react";

const UserForm = ({ selectedUser, onSave, onCancel }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({ name: "", email: "", phone: "", role: "" }); // إعادة تعيين الحقول عند الإضافة
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-md border border-slate-800 lg:col-span-1">
      <h2 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">
        {selectedUser ? "Edit User Account" : "Add New User"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#0f172a] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#0f172a] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#0f172a] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Account Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-[#0f172a] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm cursor-pointer"
          >
            <option value="" className="text-slate-500">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        <div className="flex space-x-2 pt-2 justify-end">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium rounded-lg transition"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 text-sm bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition shadow-md"
          >
            {selectedUser ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
