export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'student' | 'admin';
  bio?: string;
  interests?: string[];
  goals?: string[];
  experience_level?: string;
  onboarding_completed?: boolean;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_color?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor_name: string;
  instructor_avatar?: string;
  total_lessons?: number;
  enrolled_count?: number;
  duration_hours?: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content_type: 'video' | 'text' | 'pdf';
  content_url?: string;
  content_text?: string;
  order_index: number;
  duration_minutes?: number;
  has_quiz?: boolean;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  order_index: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total: number;
  answers?: number[];
  completed_at: string;
}
