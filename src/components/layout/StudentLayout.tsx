import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/courses', icon: BookOpen, label: 'Courses' },
];

export function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isDemoMode } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center">
            <GraduationCap size={16} color="white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">LearnPath</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {isDemoMode && (
          <div className="mx-4 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs font-medium text-amber-700">Demo Mode</p>
            <p className="text-xs text-amber-600">Connect Supabase to go live</p>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = location.pathname === href || (href !== '/dashboard' && location.pathname.startsWith(href));
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Icon size={18} />
                {label}
                {active && <ChevronRight size={14} className="ml-auto text-primary-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name || 'Student'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-3 lg:hidden sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <GraduationCap size={14} color="white" />
            </div>
            <span className="font-bold text-gray-900">LearnPath</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
