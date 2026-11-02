
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
    <form onSubmit={handleSubmit}>

      <h2>{selectedUser ? "Edit User" : "Add New User"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={user.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={user.phone}
        onChange={handleChange}
      />

      <select
        name="role"
        value={user.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Customer">Customer</option>
      </select>

      <button type="submit">
        {selectedUser ? "Update User" : "Add User"}
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>

    </form>
  );
};

export default UserForm;