import { useState } from 'react';
import { Search, Users, Eye, X } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { DEMO_STUDENTS, DEMO_ENROLLMENTS, DEMO_PROGRESS, DEMO_LESSONS } from '../../lib/demoData';
import type { Profile } from '../../lib/types';

function StudentModal({ student, onClose }: { student: Profile; onClose: () => void }) {
  const enrollments = DEMO_ENROLLMENTS.filter(e => e.user_id === student.id);
  const totalLessons = Object.values(DEMO_LESSONS).flat().length;
  const completedCount = DEMO_PROGRESS.filter(p => p.user_id === student.id).length;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-base">
              {student.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{student.full_name}</h2>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Enrolled', value: enrollments.length },
              { label: 'Lessons Done', value: completedCount },
              { label: 'Completion', value: totalLessons > 0 ? `${Math.round((completedCount / totalLessons) * 100)}%` : '0%' },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Account Details</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Joined</span>
                <span className="text-gray-800 font-medium">{new Date(student.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Onboarding</span>
                <span className={`font-medium ${student.onboarding_completed ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {student.onboarding_completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              {student.experience_level && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience level</span>
                  <span className="text-gray-800 font-medium capitalize">{student.experience_level}</span>
                </div>
              )}
            </div>
          </div>

          {enrollments.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Enrolled Courses</p>
              <div className="space-y-2">
                {enrollments.map(enr => (
                  <div key={enr.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${enr.course?.thumbnail_color || 'from-primary-500 to-violet-600'} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{enr.course?.title}</p>
                      <p className="text-xs text-gray-400">Enrolled {new Date(enr.enrolled_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminStudents() {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Profile | null>(null);

  const filtered = DEMO_STUDENTS.filter(s =>
    !search || s.full_name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 text-sm mt-1">{DEMO_STUDENTS.length} registered students on the platform.</p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Student</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Joined</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Courses</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Lessons</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      <Users size={32} className="mx-auto mb-2 text-gray-200" />
                      No students found
                    </td>
                  </tr>
                ) : filtered.map(student => {
                  const enrolled = DEMO_ENROLLMENTS.filter(e => e.user_id === student.id).length;
                  const completed = DEMO_PROGRESS.filter(p => p.user_id === student.id).length;
                  return (
                    <tr key={student.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs flex-shrink-0">
                            {student.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{student.full_name}</p>
                            <p className="text-xs text-gray-400">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(student.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{enrolled}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{completed}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${student.onboarding_completed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {student.onboarding_completed ? 'Active' : 'Onboarding'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          <Eye size={13} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </AdminLayout>
  );
}
