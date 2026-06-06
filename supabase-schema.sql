-- LearnPath Supabase Schema
-- Run this in your Supabase SQL Editor after creating a project.

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  full_name text not null,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'admin')),
  bio text,
  interests text[],
  goals text[],
  experience_level text,
  onboarding_completed boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Users can read and update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Admins can read all profiles
create policy "Admins can view all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ============================================================
-- 2. COURSES
-- ============================================================
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  thumbnail_color text,
  category text not null,
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  instructor_name text not null,
  duration_hours integer,
  enrolled_count integer default 0,
  created_at timestamptz default now()
);

alter table public.courses enable row level security;

-- Everyone can read courses
create policy "Anyone can view courses" on public.courses
  for select using (true);

-- Only admins can create/update/delete courses
create policy "Admins can manage courses" on public.courses
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );


-- ============================================================
-- 3. LESSONS
-- ============================================================
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses on delete cascade,
  title text not null,
  content_type text not null check (content_type in ('video', 'text', 'pdf')),
  content_url text,
  content_text text,
  order_index integer not null default 0,
  duration_minutes integer,
  has_quiz boolean default false,
  created_at timestamptz default now()
);

alter table public.lessons enable row level security;

create policy "Anyone can view lessons" on public.lessons
  for select using (true);

create policy "Admins can manage lessons" on public.lessons
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );


-- ============================================================
-- 4. ENROLLMENTS
-- ============================================================
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  course_id uuid not null references public.courses on delete cascade,
  enrolled_at timestamptz default now(),
  completed_at timestamptz,
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "Users can view own enrollments" on public.enrollments
  for select using (auth.uid() = user_id);

create policy "Users can enroll" on public.enrollments
  for insert with check (auth.uid() = user_id);

create policy "Admins can view all enrollments" on public.enrollments
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Update enrolled_count on course when enrollment changes
create or replace function public.update_enrolled_count()
returns trigger language plpgsql security definer as $$
begin
  if TG_OP = 'INSERT' then
    update public.courses set enrolled_count = enrolled_count + 1 where id = new.course_id;
  elsif TG_OP = 'DELETE' then
    update public.courses set enrolled_count = enrolled_count - 1 where id = old.course_id;
  end if;
  return null;
end;
$$;

create trigger on_enrollment_change
  after insert or delete on public.enrollments
  for each row execute procedure public.update_enrolled_count();


-- ============================================================
-- 5. LESSON PROGRESS
-- ============================================================
create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  lesson_id uuid not null references public.lessons on delete cascade,
  completed_at timestamptz default now(),
  unique (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users can manage own progress" on public.lesson_progress
  for all using (auth.uid() = user_id);

create policy "Admins can view all progress" on public.lesson_progress
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );


-- ============================================================
-- 6. QUIZZES
-- ============================================================
create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons on delete cascade,
  title text not null,
  created_at timestamptz default now()
);

alter table public.quizzes enable row level security;

create policy "Anyone can view quizzes" on public.quizzes
  for select using (true);

create policy "Admins can manage quizzes" on public.quizzes
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );


-- ============================================================
-- 7. QUIZ QUESTIONS
-- ============================================================
create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes on delete cascade,
  question text not null,
  options jsonb not null,
  correct_answer integer not null,
  order_index integer not null default 0
);

alter table public.quiz_questions enable row level security;

create policy "Anyone can view quiz questions" on public.quiz_questions
  for select using (true);

create policy "Admins can manage quiz questions" on public.quiz_questions
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );


-- ============================================================
-- 8. QUIZ ATTEMPTS
-- ============================================================
create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  quiz_id uuid not null references public.quizzes on delete cascade,
  score integer not null,
  total integer not null,
  answers jsonb,
  completed_at timestamptz default now()
);

alter table public.quiz_attempts enable row level security;

create policy "Users can manage own attempts" on public.quiz_attempts
  for all using (auth.uid() = user_id);

create policy "Admins can view all attempts" on public.quiz_attempts
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );


-- ============================================================
-- MAKE FIRST USER ADMIN (optional, run after signing up)
-- ============================================================
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
