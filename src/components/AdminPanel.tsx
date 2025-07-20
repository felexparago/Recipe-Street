import React, { useState, useEffect } from 'react';
import { Users, Download, Upload, Trash2, Eye, EyeOff } from 'lucide-react';
import { userDatabase, User } from '../utils/userDatabase';

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    loadUsers();
    loadStats();
  }, [activeTab]);

  const loadUsers = () => {
    let allUsers: User[];
    switch (activeTab) {
      case 'pending':
        allUsers = userDatabase.getPendingApprovals();
        break;
      case 'approved':
        allUsers = userDatabase.getApprovedUsers();
        break;
      default:
        allUsers = userDatabase.getAllUsers();
    }
    setUsers(allUsers);
  };

  const loadStats = () => {
    const userStats = userDatabase.getUserStats();
    setStats(userStats);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      userDatabase.deleteUser(userId);
      loadUsers();
      loadStats();
    }
  };

  const handleApproveUser = (userId: string) => {
    if (window.confirm('Approve this user for premium access?')) {
      userDatabase.updateApprovalStatus(userId, true);
      loadUsers();
      loadStats();
    }
  };

  const handleRejectUser = (userId: string) => {
    if (window.confirm('Reject this user\'s premium access?')) {
      userDatabase.updateApprovalStatus(userId, false);
      loadUsers();
      loadStats();
    }
  };

  const handleApproveCourse = (userId: string) => {
    if (window.confirm('Approve this user for course access?')) {
      const users = userDatabase.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        users[userIndex].isCourseApproved = true;
        users[userIndex].courseApprovedAt = new Date().toISOString();
        localStorage.setItem('recipe_street_users', JSON.stringify(users));
        loadUsers();
        loadStats();
      }
    }
  };
  const handleRejectCourse = (userId: string) => {
    if (window.confirm('Reject this user\'s course access?')) {
      const users = userDatabase.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        users[userIndex].isCourseApproved = false;
        users[userIndex].courseApprovedAt = undefined;
        localStorage.setItem('recipe_street_users', JSON.stringify(users));
        loadUsers();
        loadStats();
      }
    }
  };

  const handleExportUsers = () => {
    const data = userDatabase.exportUsers();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipe-street-users-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        if (userDatabase.importUsers(data)) {
          loadUsers();
          loadStats();
          alert('Users imported successfully!');
        } else {
          alert('Failed to import users. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="h-8 w-8 text-amber-600 mr-3" />
              User Database Admin
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={handleExportUsers}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportUsers}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                {showPasswords ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showPasswords ? 'Hide' : 'Show'} Passwords
              </button>
            </div>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900">Subscribed</h3>
                <p className="text-3xl font-bold text-green-600">{stats.subscribedUsers}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900">Recent (30 days)</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.recentUsers}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-900">Subscription Rate</h3>
                <p className="text-3xl font-bold text-amber-600">{stats.subscriptionRate}%</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'all'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All Users ({userDatabase.getAllUsers().length})
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'pending'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pending Approval ({userDatabase.getPendingApprovals().length})
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'approved'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Approved Users ({userDatabase.getApprovedUsers().length})
                </button>
              </nav>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">ID: {user.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {showPasswords ? user.password : '••••••••'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isSubscribed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isSubscribed ? 'Subscribed' : 'Free'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isApproved
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isCourseApproved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isCourseApproved ? 'Course Approved' : 'No Course'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-700">
                      {user.cardInfo ? (
                        <div>
                          <div><b>Last4:</b> {user.cardInfo.last4}</div>
                          <div><b>Expiry:</b> {user.cardInfo.expiryDate}</div>
                          <div><b>Name:</b> {user.cardInfo.cardholderName}</div>
                          <div><b>Address:</b> {user.cardInfo.billingAddress}</div>
                          <div><b>City:</b> {user.cardInfo.city}</div>
                          <div><b>Postal:</b> {user.cardInfo.postalCode}</div>
                          <div><b>Country:</b> {user.cardInfo.country}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {!user.isApproved && (
                          <button
                            onClick={() => handleApproveUser(user.id)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <span className="text-xs">✓ Approve</span>
                          </button>
                        )}
                        {user.isApproved && (
                          <button
                            onClick={() => handleRejectUser(user.id)}
                            className="text-orange-600 hover:text-orange-900 flex items-center"
                          >
                            <span className="text-xs">✗ Reject</span>
                          </button>
                        )}
                        {!user.isCourseApproved && (
                          <button
                            onClick={() => handleApproveCourse(user.id)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <span className="text-xs">✓ Approve Course</span>
                          </button>
                        )}
                        {user.isCourseApproved && (
                          <button
                            onClick={() => handleRejectCourse(user.id)}
                            className="text-orange-600 hover:text-orange-900 flex items-center"
                          >
                            <span className="text-xs">✗ Reject Course</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          <span className="text-xs">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No users found matching your search.' : 'No users in the database.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 