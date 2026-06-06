import { Users, BookOpen, TrendingUp, Award, BarChart2, Activity } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { DEMO_COURSES, DEMO_STUDENTS, DEMO_ENROLLMENTS, DEMO_LESSONS, DEMO_PROGRESS } from '../../lib/demoData';

function StatCard({ icon: Icon, label, value, change, color }: { icon: typeof Users; label: string; value: string | number; change?: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {change && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{change}</span>}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

const completionData = DEMO_COURSES.map(course => {
  const lessons = DEMO_LESSONS[course.id] || [];
  const enrolled = DEMO_ENROLLMENTS.filter(e => e.course_id === course.id).length;
  const completedLessons = DEMO_PROGRESS.filter(p => lessons.some(l => l.id === p.lesson_id)).length;
  const totalPossible = enrolled * lessons.length;
  const rate = totalPossible > 0 ? Math.round((completedLessons / totalPossible) * 100) : 0;
  return { course, enrolled, rate };
}).sort((a, b) => b.enrolled - a.enrolled);

const activityByDay = [
  { day: 'Mon', sessions: 42 },
  { day: 'Tue', sessions: 58 },
  { day: 'Wed', sessions: 71 },
  { day: 'Thu', sessions: 65 },
  { day: 'Fri', sessions: 83 },
  { day: 'Sat', sessions: 39 },
  { day: 'Sun', sessions: 28 },
];
const maxSessions = Math.max(...activityByDay.map(d => d.sessions));

export default function AdminDashboard() {
  const totalEnrollments = DEMO_ENROLLMENTS.length;
  const completedStudents = DEMO_STUDENTS.filter(s => s.onboarding_completed).length;
  const avgCompletion = Math.round(completionData.reduce((s, c) => s + c.rate, 0) / completionData.length);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview and student engagement metrics.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total students" value={DEMO_STUDENTS.length} change="+12% this week" color="bg-primary-600" />
          <StatCard icon={BookOpen} label="Total courses" value={DEMO_COURSES.length} color="bg-violet-600" />
          <StatCard icon={TrendingUp} label="Total enrollments" value={totalEnrollments} change="+8% this week" color="bg-emerald-500" />
          <StatCard icon={Award} label="Avg. completion rate" value={`${avgCompletion}%`} color="bg-orange-500" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={18} className="text-primary-600" />
              <h2 className="font-semibold text-gray-900">Weekly Active Sessions</h2>
            </div>
            <div className="flex items-end gap-2 h-32">
              {activityByDay.map(({ day, sessions }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary-100 rounded-t-lg hover:bg-primary-200 transition-colors relative group"
                    style={{ height: `${(sessions / maxSessions) * 100}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-0.5 rounded hidden group-hover:block whitespace-nowrap">
                      {sessions}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course completion rates */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 size={18} className="text-violet-600" />
              <h2 className="font-semibold text-gray-900">Course Completion Rates</h2>
            </div>
            <div className="space-y-3">
              {completionData.map(({ course, enrolled, rate }) => (
                <div key={course.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 truncate pr-4 font-medium" style={{ maxWidth: '60%' }}>{course.title}</span>
                    <span className="text-gray-400 flex-shrink-0">{enrolled} enrolled · <span className="text-primary-600 font-medium">{rate}%</span></span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500"
                      style={{ width: `${rate}%`, transition: 'width 0.6s ease' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent students */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Students</h2>
            <a href="/admin/students" className="text-sm text-primary-600 hover:underline">View all →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Enrolled Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_STUDENTS.slice(0, 5).map(student => {
                  const enrolled = DEMO_ENROLLMENTS.filter(e => e.user_id === student.id).length;
                  return (
                    <tr key={student.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs flex-shrink-0">
                            {student.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{student.full_name}</p>
                            <p className="text-xs text-gray-400">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(student.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">{enrolled}</td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${student.onboarding_completed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {student.onboarding_completed ? 'Active' : 'Onboarding'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
