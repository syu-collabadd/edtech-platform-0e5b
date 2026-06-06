import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, Play, FileText, File, Check, Lock, ChevronRight } from 'lucide-react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressRing } from '../../components/shared/ProgressRing';
import { DEMO_COURSES, DEMO_LESSONS, DEMO_ENROLLMENTS, DEMO_PROGRESS } from '../../lib/demoData';

const contentIcon = { video: Play, text: FileText, pdf: File };

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = DEMO_COURSES.find(c => c.id === id);
  const lessons = DEMO_LESSONS[id || ''] || [];
  const [enrolled, setEnrolled] = useState(() => DEMO_ENROLLMENTS.some(e => e.course_id === id));

  const completedIds = useMemo(() =>
    new Set(DEMO_PROGRESS.filter(p => lessons.some(l => l.id === p.lesson_id)).map(p => p.lesson_id)),
    [lessons]
  );

  const progress = lessons.length ? Math.round((completedIds.size / lessons.length) * 100) : 0;

  if (!course) {
    return (
      <StudentLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">Course not found.</p>
          <Link to="/courses" className="text-primary-600 hover:underline text-sm mt-2 inline-block">Back to courses</Link>
        </div>
      </StudentLayout>
    );
  }

  const totalMinutes = lessons.reduce((s, l) => s + (l.duration_minutes || 0), 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={16} />
          Back to courses
        </Link>

        {/* Hero */}
        <div className={`rounded-3xl bg-gradient-to-br ${course.thumbnail_color || 'from-primary-500 to-violet-600'} p-8 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <BookOpen size={200} className="absolute right-8 top-1/2 -translate-y-1/2" />
          </div>
          <div className="relative max-w-2xl">
            <div className="flex gap-2 mb-4">
              <Badge color="gray">{course.category}</Badge>
              <Badge color="gray" size="md">{course.difficulty}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{course.title}</h1>
            <p className="text-white/80 text-sm leading-relaxed mb-6">{course.description}</p>
            <div className="flex flex-wrap gap-5 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><BookOpen size={14} />{lessons.length} lessons</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{hours}h {mins}m</span>
              <span className="flex items-center gap-1.5"><Users size={14} />{course.enrolled_count?.toLocaleString()} students</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lesson list */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-base font-semibold text-gray-900">Course Content</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
              {lessons.map((lesson, i) => {
                const Icon = contentIcon[lesson.content_type];
                const done = completedIds.has(lesson.id);
                const accessible = enrolled || i === 0;

                return (
                  <div key={lesson.id}>
                    {i > 0 && <div className="h-px bg-gray-50" />}
                    <button
                      onClick={() => accessible && navigate(`/lessons/${lesson.id}`)}
                      className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${accessible ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${done ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                        {done ? <Check size={15} /> : <Icon size={15} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${done ? 'text-emerald-700' : 'text-gray-800'}`}>
                          <span className="text-gray-400 mr-2 font-normal">{i + 1}.</span>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                          <span className="capitalize">{lesson.content_type}</span>
                          {lesson.duration_minutes && <span>· {lesson.duration_minutes} min</span>}
                          {lesson.has_quiz && <span className="text-primary-500">· Quiz included</span>}
                        </p>
                      </div>
                      {accessible ? (
                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                      ) : (
                        <Lock size={14} className="text-gray-300 flex-shrink-0" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enrollment card */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 space-y-5">
              {enrolled && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Your progress</p>
                    <p className="text-2xl font-bold text-primary-600">{progress}%</p>
                    <p className="text-xs text-gray-400">{completedIds.size} / {lessons.length} lessons done</p>
                  </div>
                  <ProgressRing value={progress} size={60} strokeWidth={6} />
                </div>
              )}

              {!enrolled ? (
                <>
                  <p className="text-sm text-gray-600 font-medium">Join {course.enrolled_count?.toLocaleString()} students already enrolled</p>
                  <Button className="w-full" size="lg" onClick={() => setEnrolled(true)}>
                    Enroll for Free
                  </Button>
                </>
              ) : (
                <Button className="w-full" onClick={() => {
                  const nextLesson = lessons.find(l => !completedIds.has(l.id)) || lessons[0];
                  if (nextLesson) navigate(`/lessons/${nextLesson.id}`);
                }}>
                  {completedIds.size > 0 ? 'Continue Learning' : 'Start Course'}
                  <ChevronRight size={16} />
                </Button>
              )}

              <div className="pt-4 border-t border-gray-50 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Instructor</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                    {course.instructor_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <p className="text-sm font-medium text-gray-800">{course.instructor_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
