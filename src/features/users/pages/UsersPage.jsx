import React, { useState } from 'react';

export default function UsersManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmed Mohamed', email: 'ahmed@gmail.com', role: 'Admin' },
    { id: 2, name: 'Sara Ali', email: 'sara@gmail.com', role: 'Customer' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your application users and their roles.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Add New User Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New User</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Enter Name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter Email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200 text-sm shadow-sm"
              >
                Add User
              </button>
            </form>
          </div>

          {/* Users List Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700">Users List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">ID</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Name</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Role</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right space-x-3">
                        <button className="text-blue-600 hover:text-blue-800 font-medium transition mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800 font-medium transition">Delete</button>
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
