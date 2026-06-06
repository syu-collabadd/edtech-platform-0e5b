import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);
    const result = await register(email, password, fullName);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/onboarding');
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500 text-sm">Start learning for free today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              type="text"
              placeholder="Jane Smith"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              icon={<User size={16} />}
              required
            />
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
              placeholder="Min. 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              hint="At least 6 characters"
              required
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
              Create account
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400 mb-3">What you'll get:</p>
            <div className="grid grid-cols-2 gap-2">
              {['Access all courses', 'Track your progress', 'Take quizzes', 'Earn certificates'].map(f => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
