import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Settings, FileText, MessageSquare, Users, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { user, isAdmin, isAuthReady, login, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthReady) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to access the admin panel.</p>
          <button
            onClick={login}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-3xl font-extrabold text-red-600">Access Denied</h2>
          <p className="mt-2 text-sm text-gray-600">You do not have permission to view this page.</p>
          <button
            onClick={logout}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-gray-700">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-gray-700">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <Link to="/admin/pages" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-gray-700">
            <FileText size={20} />
            <span>Pages</span>
          </Link>
          <Link to="/admin/prompts" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-gray-700">
            <MessageSquare size={20} />
            <span>Prompts</span>
          </Link>
          <Link to="/admin/users" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-gray-700">
            <Users size={20} />
            <span>Users</span>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full p-2 rounded hover:bg-red-50 text-red-600"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
