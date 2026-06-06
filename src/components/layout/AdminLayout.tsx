import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap, LogOut, Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Analytics' },
  { href: '/admin/students', icon: Users, label: 'Students' },
  { href: '/admin/courses', icon: BookOpen, label: 'Courses' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isDemoMode } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'A';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 flex flex-col transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-800">
          <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center">
            <GraduationCap size={16} color="white" />
          </div>
          <span className="font-bold text-white text-lg">LearnPath</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="mx-4 mt-3 px-3 py-2 bg-gray-800 rounded-xl flex items-center gap-2">
          <Shield size={14} className="text-primary-400 flex-shrink-0" />
          <p className="text-xs font-medium text-gray-300">Admin Panel</p>
          {isDemoMode && <span className="ml-auto text-xs text-amber-400">Demo</span>}
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-semibold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.full_name || 'Admin'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-3 lg:hidden sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={20} className="text-gray-600" />
          </button>
          <span className="font-bold text-gray-900">LearnPath Admin</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
