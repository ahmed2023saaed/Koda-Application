import React, { useState, useEffect } from "react";
import { Edit2, UserPlus, X, Save } from "lucide-react";

const emptyUser = {
name: "",
email: "",
phone: "",
role: "customer",
verified: "No"
};

const UserForm = ({ selectedUser, onSave, onCancel }) => {

const [user, setUser] = useState({ ...emptyUser });

useEffect(() => {
if (selectedUser) {
setUser({ ...selectedUser });
} else {
setUser({ ...emptyUser });
}
}, [selectedUser]);

const handleChange = (e) => {
const { name, value } = e.target;

```
setUser((prev) => ({
  ...prev,
  [name]: value
}));
```

};

const handleSubmit = (e) => {
e.preventDefault();
onSave(user);
setUser({ ...emptyUser });
};

return ( <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl overflow-hidden lg:col-span-1">

```
  {/* Form Header */}
  <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">

    <h2 className="text-base font-bold text-white flex items-center gap-2">
      {selectedUser ? (
        <>
          <Edit2 size={17} className="text-cyan-400" />
          Edit User
        </>
      ) : (
        <>
          <UserPlus size={17} className="text-cyan-400" />
          Add New User
        </>
      )}
    </h2>

  </div>

  {/* Form Body */}
  <form onSubmit={handleSubmit} className="p-5 space-y-4">

    {/* Name */}
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2">
        Full Name
      </label>

      <input
        type="text"
        name="name"
        placeholder="Enter full name"
        value={user.name}
        onChange={handleChange}
        required
        className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-cyan-500 transition"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2">
        Email Address
      </label>

      <input
        type="email"
        name="email"
        placeholder="name@example.com"
        value={user.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-cyan-500 transition"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2">
        Phone Number
      </label>

      <input
        type="tel"
        name="phone"
        placeholder="Enter phone number"
        value={user.phone}
        onChange={handleChange}
        className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-cyan-500 transition"
      />
    </div>

    {/* Role */}
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2">
        User Role
      </label>

      <select
        name="role"
        value={user.role}
        onChange={handleChange}
        className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-cyan-500 cursor-pointer"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    {/* Verified */}
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2">
        Account Verification
      </label>

      <select
        name="verified"
        value={user.verified}
        onChange={handleChange}
        className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-cyan-500 cursor-pointer"
      >
        <option value="No">Not Verified</option>
        <option value="Yes">Verified</option>
      </select>
    </div>

    {/* Buttons */}
    <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">

      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2 transition"
      >
        <X size={14} />
        Cancel
      </button>

      <button
        type="submit"
        className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center gap-2 transition"
      >
        <Save size={14} />
        {selectedUser ? "Update User" : "Save User"}
      </button>

    </div>

  </form>
</div>


);
};

export default UserForm;
