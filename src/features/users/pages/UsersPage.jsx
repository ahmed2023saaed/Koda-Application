
import React, { useState } from "react";

function UsersPage() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@gmail.com",
      role: "Admin"
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara@gmail.com",
      role: "Customer"
    }
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Customer");

  const [editId, setEditId] = useState(null);

  // Add or Update User
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {

      setUsers(users.map(user =>
        user.id === editId
          ? { ...user, name, email, role }
          : user
      ));

      setEditId(null);

    } else {

      const newUser = {
        id: Date.now(),
        name,
        email,
        role
      };

      setUsers([...users, newUser]);
    }

    setName("");
    setEmail("");
    setRole("Customer");
  };

  // Edit User
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditId(user.id);
  };

  // Delete User
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Users Management</h1>

      <h2>{editId !== null ? "Edit User" : "Add New User"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>

        <br /><br />

        <button type="submit">
          {editId !== null ? "Update User" : "Add User"}
        </button>

      </form>

      <hr />

      <h2>Users List</h2>

      <table border="1" cellPadding="10" width="100%">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map(user => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>

                <button onClick={() => handleEdit(user)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UsersPage;