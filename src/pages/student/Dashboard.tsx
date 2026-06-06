import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Flame, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { CourseCard } from '../../components/shared/CourseCard';
import { ProgressRing } from '../../components/shared/ProgressRing';
import { DEMO_ENROLLMENTS, DEMO_PROGRESS, DEMO_LESSONS, DEMO_COURSES } from '../../lib/demoData';
import type { Enrollment, LessonProgress } from '../../lib/types';

function StatCard({ icon: Icon, label, value, color }: { icon: typeof BookOpen; label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  // In real app, fetch from Supabase. Here we use demo data.
  const enrollments: Enrollment[] = DEMO_ENROLLMENTS;
  const completedLessons: LessonProgress[] = DEMO_PROGRESS;

  const courseProgress = useMemo(() => {
    return enrollments.map(enr => {
      const lessons = DEMO_LESSONS[enr.course_id] || [];
      const done = completedLessons.filter(p =>
        lessons.some(l => l.id === p.lesson_id)
      ).length;
      return {
        enrollment: enr,
        total: lessons.length,
        done,
        pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
      };
    });
  }, [enrollments, completedLessons]);

  const totalCompleted = completedLessons.length;
  const streak = 7; // demo value

  const recentActivity = useMemo(() => {
    return [...completedLessons]
      .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
      .slice(0, 5)
      .map(p => {
        let lesson = null;
        let course = null;
        for (const [cid, lessons] of Object.entries(DEMO_LESSONS)) {
          const found = lessons.find(l => l.id === p.lesson_id);
          if (found) {
            lesson = found;
            course = DEMO_COURSES.find(c => c.id === cid);
            break;
          }
        }
        return { progress: p, lesson, course };
      });
  }, [completedLessons]);

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.full_name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your learning.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} label="Enrolled courses" value={enrollments.length} color="bg-primary-600" />
          <StatCard icon={Trophy} label="Lessons completed" value={totalCompleted} color="bg-violet-600" />
          <StatCard icon={Flame} label="Day streak" value={`${streak} days`} color="bg-orange-500" />
          <StatCard icon={TrendingUp} label="Avg. progress" value={`${Math.round(courseProgress.reduce((s, c) => s + c.pct, 0) / (courseProgress.length || 1))}%`} color="bg-emerald-500" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course progress */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">My Courses</h2>
              <Link to="/courses" className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1">
                Browse all <ArrowRight size={14} />
              </Link>
            </div>

            {courseProgress.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                <BookOpen size={32} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No courses yet.</p>
                <Link to="/courses">
                  <span className="text-primary-600 text-sm font-medium hover:underline">Browse courses →</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {courseProgress.map(({ enrollment, done, total, pct }) => (
                  <Link key={enrollment.id} to={`/courses/${enrollment.course_id}`}>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-4 flex items-center gap-4 hover:border-primary-200 transition-colors">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${enrollment.course?.thumbnail_color || 'from-primary-500 to-violet-600'} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{enrollment.course?.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{done} / {total} lessons</p>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <ProgressRing value={pct} size={44} strokeWidth={4} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent activity */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-4 space-y-3">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No activity yet.</p>
              ) : (
                recentActivity.map(({ progress, lesson, course }) => (
                  <div key={progress.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Trophy size={14} className="text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-1">{lesson?.title || 'Lesson completed'}</p>
                      <p className="text-xs text-gray-400">{course?.title || ''}</p>
                      <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
                        <Clock size={10} />
                        {new Date(progress.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Suggested course */}
            <h2 className="text-base font-semibold text-gray-900">Suggested for You</h2>
            <CourseCard
              course={DEMO_COURSES.find(c => !enrollments.some(e => e.course_id === c.id)) || DEMO_COURSES[4]}
            />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
