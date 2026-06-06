import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function Login() {
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
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center shadow-soft">
              <GraduationCap size={20} color="white" />
            </div>
            <span className="font-bold text-xl text-gray-900">LearnPath</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm">Continue your learning journey</p>
        </div>

        {isDemoMode && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <Sparkles size={15} />
              Demo Mode — Try it instantly
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { loginAsDemo('student'); navigate('/dashboard'); }}
                className="flex-1 text-sm bg-white border border-amber-200 text-amber-800 font-medium py-2 rounded-xl hover:bg-amber-50 transition-colors"
              >
                Student Demo
              </button>
              <button
                onClick={() => { loginAsDemo('admin'); navigate('/admin/dashboard'); }}
                className="flex-1 text-sm bg-amber-600 text-white font-medium py-2 rounded-xl hover:bg-amber-700 transition-colors"
              >
                Admin Demo
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              required
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
              Sign in
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-medium hover:underline">
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Admin?{' '}
          <Link to="/admin/login" className="text-gray-500 hover:text-gray-700 underline">
            Go to Admin Panel
          </Link>
        </p>
      </div>
    </div>
  );
}
