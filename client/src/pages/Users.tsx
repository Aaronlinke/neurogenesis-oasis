import { useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2025-11-08 08:45:00' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', lastLogin: '2025-11-08 07:30:00' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastLogin: '2025-11-07 18:20:00' },
    { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', lastLogin: '2025-11-05 14:10:00' },
    { id: 5, name: 'Alice Brown', email: 'alice@example.com', role: 'admin', status: 'active', lastLogin: '2025-11-08 09:00:00' },
  ]);

  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
  };

  const UserRow = ({ user }: any) => (
    <tr
      style={{
        backgroundColor: selectedUser === user.id ? 'rgba(10, 126, 164, 0.1)' : 'transparent',
        borderBottom: '1px solid #2a2a3e',
      }}
      onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
      className="cursor-pointer hover:bg-opacity-50"
    >
      <td className="px-6 py-4">
        <div style={{ color: '#e8e8e8' }}>{user.name}</div>
        <div className="text-sm mt-1" style={{ color: '#a8a8a8' }}>
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4">
        <select
          value={user.role}
          onChange={(e) => {
            e.stopPropagation();
            handleRoleChange(user.id, e.target.value);
          }}
          className="px-3 py-1 rounded text-sm border"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
            color: '#0a7ea4',
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <span
          className="px-3 py-1 rounded text-xs font-medium"
          style={{
            backgroundColor: user.status === 'active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(168, 168, 168, 0.1)',
            color: user.status === 'active' ? '#2ecc71' : '#a8a8a8',
          }}
        >
          {user.status.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 text-sm" style={{ color: '#a8a8a8' }}>
        {user.lastLogin}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active');
          }}
          className="px-3 py-1 rounded text-sm font-medium transition-all border"
          style={{
            backgroundColor: 'transparent',
            borderColor: user.status === 'active' ? '#d32f2f' : '#2ecc71',
            color: user.status === 'active' ? '#d32f2f' : '#2ecc71',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = user.status === 'active' ? 'rgba(211, 47, 47, 0.1)' : 'rgba(46, 204, 113, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {user.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-light" style={{ color: '#e8e8e8' }}>
              User Management
            </h1>
            <p className="text-sm mt-2" style={{ color: '#a8a8a8' }}>
              Manage system users and their roles
            </p>
          </div>
          <button
            onClick={() => setShowAddUser(!showAddUser)}
            className="px-6 py-2 rounded font-medium transition-all border"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#0a7ea4',
              color: '#0a7ea4',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Add User
          </button>
        </div>

        {/* Add User Form */}
        {showAddUser && (
          <div
            className="rounded-lg p-6 border mb-8"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#e8e8e8' }}>
              Add New User
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-2 rounded border"
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.6)',
                  borderColor: '#2a2a3e',
                  color: '#e8e8e8',
                }}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-2 rounded border"
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.6)',
                  borderColor: '#2a2a3e',
                  color: '#e8e8e8',
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded font-medium transition-all border"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#0a7ea4',
                  color: '#0a7ea4',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Create User
              </button>
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 rounded font-medium transition-all border"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#2a2a3e',
                  color: '#a8a8a8',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a3e' }}>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    User
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Role
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { label: 'Total Users', value: users.length, color: '#0a7ea4' },
            { label: 'Active Users', value: users.filter(u => u.status === 'active').length, color: '#2ecc71' },
            { label: 'Admins', value: users.filter(u => u.role === 'admin').length, color: '#0a7ea4' },
            { label: 'Inactive', value: users.filter(u => u.status === 'inactive').length, color: '#a8a8a8' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: 'rgba(26, 26, 46, 0.6)',
                borderColor: '#2a2a3e',
              }}
            >
              <div className="text-sm" style={{ color: '#a8a8a8' }}>
                {stat.label}
              </div>
              <div className="text-3xl font-light mt-3" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
