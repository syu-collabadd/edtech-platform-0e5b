import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { CourseCard } from '../../components/shared/CourseCard';
import { DEMO_COURSES, DEMO_ENROLLMENTS, DEMO_PROGRESS, DEMO_LESSONS } from '../../lib/demoData';

const CATEGORIES = ['All', 'Programming', 'Web Dev', 'Data Science', 'Design', 'AI & ML'];
const DIFFICULTIES = ['All', 'beginner', 'intermediate', 'advanced'];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const enrolledIds = new Set(DEMO_ENROLLMENTS.map(e => e.course_id));

  const courseProgress = useMemo(() => {
    const map: Record<string, number> = {};
    DEMO_ENROLLMENTS.forEach(enr => {
      const lessons = DEMO_LESSONS[enr.course_id] || [];
      const done = DEMO_PROGRESS.filter(p => lessons.some(l => l.id === p.lesson_id)).length;
      map[enr.course_id] = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    return DEMO_COURSES.filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || c.category === category;
      const matchDiff = difficulty === 'All' || c.difficulty === difficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }, [search, category, difficulty]);

  const clearFilters = () => { setCategory('All'); setDifficulty('All'); setSearch(''); };
  const hasFilters = category !== 'All' || difficulty !== 'All' || search !== '';

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
          <p className="text-gray-500 text-sm mt-1">{DEMO_COURSES.length} courses across programming, design, data science, and more.</p>
        </div>

        {/* Search + filter bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50">
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${category === cat ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Difficulty</p>
              <div className="flex gap-2">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all capitalize ${difficulty === d ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-800">{filtered.length}</span> courses
          {hasFilters && <button onClick={clearFilters} className="ml-2 text-primary-600 hover:underline">Clear filters</button>}
        </p>

        {/* Course grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No courses match your search.</p>
            <button onClick={clearFilters} className="mt-2 text-primary-600 text-sm hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={enrolledIds.has(course.id)}
                progress={enrolledIds.has(course.id) ? courseProgress[course.id] : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
