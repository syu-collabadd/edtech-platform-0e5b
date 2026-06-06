import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Profile } from '../lib/types';
import { supabase, isDemoMode } from '../lib/supabase';
import { DEMO_STUDENT, DEMO_ADMIN } from '../lib/demoData';

interface AuthContextValue {
  user: Profile | null;
  loading: boolean;
  isDemoMode: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  loginAsDemo: (role: 'student' | 'admin') => void;
  logout: () => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      const saved = sessionStorage.getItem('demoUser');
      if (saved) setUser(JSON.parse(saved));
      setLoading(false);
      return;
    }

    supabase!.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase!
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (data) setUser(data as Profile);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    if (isDemoMode) {
      const lower = email.toLowerCase();
      if (lower === 'admin@demo.com' && password === 'demo123') {
        loginAsDemo('admin');
        return {};
      }
      if (lower === 'student@demo.com' && password === 'demo123') {
        loginAsDemo('student');
        return {};
      }
      return { error: 'In demo mode, use student@demo.com / admin@demo.com with password "demo123"' };
    }

    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  };

  const register = async (email: string, password: string, fullName: string): Promise<{ error?: string }> => {
    if (isDemoMode) {
      const profile: Profile = {
        id: `demo-${Date.now()}`,
        email,
        full_name: fullName,
        role: 'student',
        onboarding_completed: false,
        created_at: new Date().toISOString(),
      };
      setUser(profile);
      sessionStorage.setItem('demoUser', JSON.stringify(profile));
      return {};
    }

    const { error } = await supabase!.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    return {};
  };

  const loginAsDemo = useCallback((role: 'student' | 'admin') => {
    const profile = role === 'admin' ? DEMO_ADMIN : DEMO_STUDENT;
    setUser(profile);
    sessionStorage.setItem('demoUser', JSON.stringify(profile));
  }, []);

  const logout = useCallback(() => {
    if (!isDemoMode) supabase!.auth.signOut();
    setUser(null);
    sessionStorage.removeItem('demoUser');
  }, []);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    if (isDemoMode) {
      sessionStorage.setItem('demoUser', JSON.stringify(updated));
      return;
    }
    await supabase!.from('profiles').update(updates).eq('id', user.id);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isDemoMode,
      isAdmin: user?.role === 'admin',
      login,
      register,
      loginAsDemo,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
