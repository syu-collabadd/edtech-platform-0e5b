import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function AdminLogin() {
  const { login, loginAsDemo, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center">
              <GraduationCap size={20} color="white" />
            </div>
            <span className="font-bold text-xl text-white">LearnPath</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 mb-4">
            <Shield size={13} className="text-primary-400" />
            <span className="text-xs text-gray-400 font-medium">Admin Access</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign in to Admin</h1>
          <p className="text-gray-500 text-sm">Manage your platform from here</p>
        </div>

        {isDemoMode && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
            <p className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <Sparkles size={15} />
              Demo Mode
            </p>
            <button
              onClick={() => { loginAsDemo('admin'); navigate('/admin/dashboard'); }}
              className="w-full text-sm bg-amber-500 text-gray-900 font-semibold py-2.5 rounded-xl hover:bg-amber-400 transition-colors"
            >
              Enter Admin Demo
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">Or use admin@demo.com / demo123</p>
          </div>
        )}

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
              Sign in to Admin
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          <Link to="/login" className="hover:text-gray-400 transition-colors">← Back to student login</Link>
        </p>
      </div>
    </div>
  );
}
