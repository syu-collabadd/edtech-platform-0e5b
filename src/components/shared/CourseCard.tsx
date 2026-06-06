import { Clock, Users, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course } from '../../lib/types';
import { Badge } from '../ui/Badge';

interface CourseCardProps {
  course: Course;
  progress?: number;
  isEnrolled?: boolean;
  href?: string;
}

const difficultyColor = {
  beginner: 'green' as const,
  intermediate: 'yellow' as const,
  advanced: 'red' as const,
};

const categoryColor: Record<string, 'indigo' | 'violet' | 'blue' | 'orange' | 'green' | 'gray'> = {
  'Programming': 'indigo',
  'Web Dev': 'blue',
  'Data Science': 'green',
  'Design': 'violet',
  'AI & ML': 'orange',
};

export function CourseCard({ course, progress, isEnrolled, href }: CourseCardProps) {
  const to = href || `/courses/${course.id}`;

  return (
    <Link to={to} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-0.5">
        <div className={`h-40 bg-gradient-to-br ${course.thumbnail_color || 'from-primary-500 to-violet-600'} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <BookOpen size={64} color="white" />
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge color={categoryColor[course.category] || 'gray'}>{course.category}</Badge>
            <Badge color={difficultyColor[course.difficulty]}>{course.difficulty}</Badge>
          </div>
          {isEnrolled && (
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium text-white">
              Enrolled
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{course.description}</p>

          <p className="text-xs text-gray-500 mb-3">by <span className="font-medium text-gray-700">{course.instructor_name}</span></p>

          {progress !== undefined && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span className="font-medium text-primary-600">{progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-gray-400 pt-3 border-t border-gray-50">
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              {course.total_lessons} lessons
            </span>
            {course.duration_hours && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {course.duration_hours}h
              </span>
            )}
            {course.enrolled_count && (
              <span className="flex items-center gap-1">
                <Users size={12} />
                {course.enrolled_count.toLocaleString()}
              </span>
            )}
            <ChevronRight size={14} className="ml-auto text-gray-300 group-hover:text-primary-400 transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
