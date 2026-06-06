import { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, X, Check } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { DEMO_COURSES, DEMO_LESSONS, DEMO_ENROLLMENTS } from '../../lib/demoData';
import type { Course } from '../../lib/types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

const GRADIENT_OPTIONS = [
  'from-blue-500 to-indigo-600',
  'from-orange-400 to-rose-500',
  'from-emerald-400 to-teal-600',
  'from-violet-500 to-purple-700',
  'from-yellow-400 to-amber-500',
  'from-pink-500 to-rose-600',
  'from-cyan-400 to-blue-500',
  'from-lime-400 to-green-500',
];

const difficultyColor: Record<string, 'green' | 'yellow' | 'red'> = {
  beginner: 'green',
  intermediate: 'yellow',
  advanced: 'red',
};

function CourseModal({ course, onClose, onSave }: { course: Partial<Course> | null; onClose: () => void; onSave: (c: Course) => void }) {
  const isNew = !course?.id;
  const [form, setForm] = useState<Partial<Course>>(course || {
    title: '',
    description: '',
    category: 'Programming',
    difficulty: 'beginner',
    instructor_name: '',
    thumbnail_color: GRADIENT_OPTIONS[0],
    duration_hours: 10,
    enrolled_count: 0,
  });

  const handleSave = () => {
    if (!form.title || !form.description || !form.instructor_name) return;
    onSave({
      id: form.id || `course-${Date.now()}`,
      title: form.title!,
      description: form.description!,
      category: form.category || 'Programming',
      difficulty: form.difficulty || 'beginner',
      instructor_name: form.instructor_name!,
      thumbnail_color: form.thumbnail_color,
      duration_hours: form.duration_hours,
      enrolled_count: form.enrolled_count || 0,
      total_lessons: form.total_lessons || 0,
      created_at: form.created_at || new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">{isNew ? 'Create Course' : 'Edit Course'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-4">
          <Input
            label="Course title"
            value={form.title || ''}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Introduction to Python"
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description || ''}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="Brief course description..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={form.category || 'Programming'}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {['Programming', 'Web Dev', 'Data Science', 'Design', 'AI & ML'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Difficulty</label>
              <select
                value={form.difficulty || 'beginner'}
                onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as Course['difficulty'] }))}
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <Input
            label="Instructor name"
            value={form.instructor_name || ''}
            onChange={e => setForm(f => ({ ...f, instructor_name: e.target.value }))}
            placeholder="e.g. Dr. Jane Smith"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (hours)"
              type="number"
              value={form.duration_hours || ''}
              onChange={e => setForm(f => ({ ...f, duration_hours: Number(e.target.value) }))}
              placeholder="10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Cover gradient</label>
            <div className="flex flex-wrap gap-2">
              {GRADIENT_OPTIONS.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, thumbnail_color: g }))}
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${g} border-2 transition-all ${form.thumbnail_color === g ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} className="flex-1">
            <Check size={16} />
            {isNew ? 'Create Course' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>(DEMO_COURSES);
  const [modal, setModal] = useState<{ open: boolean; course: Partial<Course> | null }>({ open: false, course: null });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleSave = (course: Course) => {
    setCourses(cs => {
      const idx = cs.findIndex(c => c.id === course.id);
      if (idx >= 0) { const next = [...cs]; next[idx] = course; return next; }
      return [...cs, { ...course, total_lessons: 0 }];
    });
    setModal({ open: false, course: null });
  };

  const handleDelete = (id: string) => {
    setCourses(cs => cs.filter(c => c.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
            <p className="text-gray-500 text-sm mt-1">{courses.length} courses on the platform.</p>
          </div>
          <Button onClick={() => setModal({ open: true, course: null })}>
            <Plus size={16} />
            New Course
          </Button>
        </div>

        <div className="space-y-3">
          {courses.map(course => {
            const lessons = DEMO_LESSONS[course.id] || [];
            const enrolled = DEMO_ENROLLMENTS.filter(e => e.course_id === course.id).length;

            return (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.thumbnail_color || 'from-primary-500 to-violet-600'} flex-shrink-0 flex items-center justify-center`}>
                  <BookOpen size={22} className="text-white opacity-80" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{course.title}</h3>
                    <Badge color={difficultyColor[course.difficulty]} size="sm">{course.difficulty}</Badge>
                    <Badge color="gray" size="sm">{course.category}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">{course.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>{lessons.length} lessons</span>
                    <span>{enrolled} enrolled</span>
                    {course.duration_hours && <span>{course.duration_hours}h</span>}
                    <span>by {course.instructor_name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setModal({ open: true, course })}
                    className="p-2 rounded-xl text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  {deleteConfirm === course.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(course.id)} className="text-xs px-2 py-1.5 bg-red-500 text-white rounded-lg">Delete</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg text-gray-500">Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(course.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal.open && (
        <CourseModal
          course={modal.course}
          onClose={() => setModal({ open: false, course: null })}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}
