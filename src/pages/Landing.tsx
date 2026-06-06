import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Trophy, Users, Play, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DEMO_COURSES } from '../lib/demoData';

const features = [
  { icon: BookOpen, title: 'Expert-led courses', desc: 'Learn from industry professionals with real-world experience.' },
  { icon: Trophy, title: 'Track your progress', desc: 'Visual progress rings and completion tracking for every course.' },
  { icon: Play, title: 'Video + text content', desc: 'Multi-format lessons: video, rich text, PDF documents, and quizzes.' },
  { icon: Users, title: 'Vibrant community', desc: 'Join thousands of learners on the same journey as you.' },
];

const testimonials = [
  { name: 'Maya T.', role: 'Junior Developer', text: 'LearnPath helped me land my first dev job in 6 months. The structured curriculum made the difference.', rating: 5 },
  { name: 'Carlos R.', role: 'Data Analyst', text: 'The Data Science track was exactly what I needed to make the switch from finance. Incredibly practical.', rating: 5 },
  { name: 'Zoe K.', role: 'UX Designer', text: 'I tried 4 other platforms before this one. The UI/UX course here is the best on the internet, no contest.', rating: 5 },
];

const gradientColors: Record<string, 'indigo' | 'violet' | 'blue' | 'orange' | 'green' | 'gray'> = {
  'Programming': 'indigo',
  'Web Dev': 'blue',
  'Data Science': 'green',
  'Design': 'violet',
  'AI & ML': 'orange',
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center">
              <GraduationCap size={16} color="white" />
            </div>
            <span className="font-bold text-gray-900">LearnPath</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary-50/60 via-white to-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge color="indigo" size="md">
            ✨ 6,000+ learners already enrolled
          </Badge>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mt-6 mb-6 leading-[1.1] tracking-tight">
            Learn. Build.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-violet-600">
              Grow.
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            An online learning platform for developers and designers who want to level up — with structured courses, progress tracking, and quizzes that actually teach you things.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Start learning for free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Try the demo
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
            {['No credit card required', 'Cancel anytime', '30-day money-back'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '6,400+', label: 'Students enrolled' },
            { value: '6', label: 'Expert-led courses' },
            { value: '45+', label: 'Hours of content' },
            { value: '94%', label: 'Completion rate' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to learn effectively</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Built for learners who take their growth seriously.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 hover:bg-primary-50 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white shadow-soft flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <Icon size={18} className="text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Courses</h2>
              <p className="text-gray-500">Handcrafted curriculum, real-world skills.</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-1 text-sm text-primary-600 font-medium hover:underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEMO_COURSES.slice(0, 6).map(course => (
              <Link key={course.id} to="/login" className="group block">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5">
                  <div className={`h-36 bg-gradient-to-br ${course.thumbnail_color} relative flex items-center justify-center`}>
                    <BookOpen size={40} className="text-white opacity-20" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 text-white`}>{course.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">{course.title}</p>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{course.total_lessons} lessons · {course.duration_hours}h</span>
                      <Badge color={gradientColors[course.category] || 'gray'} size="sm">{course.difficulty}</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by learners</h2>
            <p className="text-gray-500">Don't just take our word for it.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, text, rating }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary-600 to-violet-700 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-primary-100 mb-8 leading-relaxed">Join thousands of learners who are building real skills with LearnPath. It's completely free to get started.</p>
          <Link to="/register">
            <button className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Create free account →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary-600 flex items-center justify-center">
              <GraduationCap size={12} color="white" />
            </div>
            <span className="font-semibold text-gray-700 text-sm">LearnPath</span>
          </div>
          <p className="text-xs text-gray-400">© 2024 LearnPath. Built with ❤️ for learners everywhere.</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link to="/login" className="hover:text-gray-600">Sign in</Link>
            <Link to="/register" className="hover:text-gray-600">Register</Link>
            <Link to="/admin/login" className="hover:text-gray-600">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
