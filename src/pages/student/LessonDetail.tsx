import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Play, FileText, File, BookOpen } from 'lucide-react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_LESSONS, DEMO_COURSES, DEMO_QUIZZES, DEMO_PROGRESS } from '../../lib/demoData';
import type { QuizQuestion } from '../../lib/types';

function MarkdownContent({ text }: { text: string }) {
  const renderLine = (line: string, i: number) => {
    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">{line.slice(2)}</h1>;
    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-gray-800 mt-5 mb-2">{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold text-gray-700 mt-4 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith('```')) return null;
    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 text-gray-700 text-sm">{line.slice(2)}</li>;
    if (/^\d+\. /.test(line)) return <li key={i} className="ml-4 text-gray-700 text-sm list-decimal">{line.replace(/^\d+\. /, '')}</li>;
    if (line === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-gray-700 text-sm leading-relaxed">{line}</p>;
  };

  // Extract code blocks separately
  const blocks: Array<{ type: 'text' | 'code'; content: string; lang?: string }> = [];
  const lines = text.split('\n');
  let inCode = false;
  let codeLang = '';
  let codeBuffer: string[] = [];
  let textBuffer: string[] = [];

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (!inCode) {
        if (textBuffer.length) { blocks.push({ type: 'text', content: textBuffer.join('\n') }); textBuffer = []; }
        inCode = true;
        codeLang = line.slice(3);
      } else {
        blocks.push({ type: 'code', content: codeBuffer.join('\n'), lang: codeLang });
        codeBuffer = [];
        inCode = false;
        codeLang = '';
      }
    } else if (inCode) {
      codeBuffer.push(line);
    } else {
      textBuffer.push(line);
    }
  }
  if (textBuffer.length) blocks.push({ type: 'text', content: textBuffer.join('\n') });

  return (
    <div className="prose-custom space-y-1">
      {blocks.map((block, bi) =>
        block.type === 'code' ? (
          <div key={bi} className="my-4 rounded-xl overflow-hidden border border-gray-200">
            {block.lang && <div className="px-4 py-1.5 bg-gray-100 border-b border-gray-200 text-xs font-mono text-gray-500">{block.lang}</div>}
            <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-xs leading-relaxed font-mono">
              <code>{block.content}</code>
            </pre>
          </div>
        ) : (
          <div key={bi}>
            {block.content.split('\n').map((line, li) => renderLine(line, li))}
          </div>
        )
      )}
    </div>
  );
}

function QuizBlock({ questions, lessonId }: { questions: QuizQuestion[]; lessonId: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.filter(q => answers[q.id] === q.correct_answer).length;
  }, [submitted, questions, answers]);

  const pct = Math.round((score / questions.length) * 100);

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 text-base">Quiz Results</h3>
        <div className={`rounded-2xl p-6 text-center ${pct >= 80 ? 'bg-emerald-50 border border-emerald-100' : pct >= 60 ? 'bg-amber-50 border border-amber-100' : 'bg-red-50 border border-red-100'}`}>
          <p className="text-4xl font-bold mb-1 text-gray-900">{score}/{questions.length}</p>
          <p className={`text-lg font-semibold ${pct >= 80 ? 'text-emerald-700' : pct >= 60 ? 'text-amber-700' : 'text-red-700'}`}>
            {pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good effort!' : '📚 Keep studying!'}
          </p>
          <p className="text-sm text-gray-500 mt-1">{pct}% correct</p>
        </div>

        <div className="space-y-3">
          {questions.map(q => {
            const correct = answers[q.id] === q.correct_answer;
            return (
              <div key={q.id} className={`rounded-xl p-4 border ${correct ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                <p className="text-sm font-medium text-gray-800 mb-2">{q.question}</p>
                <p className="text-xs text-gray-500">Your answer: <span className={correct ? 'text-emerald-700 font-medium' : 'text-red-600 font-medium'}>{q.options[answers[q.id]] || 'Not answered'}</span></p>
                {!correct && <p className="text-xs text-emerald-600 mt-1">Correct: {q.options[q.correct_answer]}</p>}
              </div>
            );
          })}
        </div>

        <Button variant="secondary" onClick={() => { setSubmitted(false); setAnswers({}); }} className="w-full">
          Retry Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 space-y-5">
      <div>
        <Badge color="indigo">Quiz</Badge>
        <h3 className="font-semibold text-gray-900 text-base mt-2">Test Your Knowledge</h3>
        <p className="text-sm text-gray-500">{questions.length} questions · Choose the best answer</p>
      </div>

      {questions.map((q, qi) => (
        <div key={q.id} className="space-y-2">
          <p className="text-sm font-medium text-gray-800">{qi + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => setAnswers(a => ({ ...a, [q.id]: oi }))}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${answers[q.id] === oi ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium' : 'border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-gray-50'}`}
              >
                <span className="text-gray-400 mr-2">{String.fromCharCode(65 + oi)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button
        onClick={() => setSubmitted(true)}
        disabled={Object.keys(answers).length < questions.length}
        className="w-full"
      >
        Submit Quiz
      </Button>
    </div>
  );
}

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(() => DEMO_PROGRESS.some(p => p.lesson_id === id));

  const lesson = useMemo(() => {
    for (const lessons of Object.values(DEMO_LESSONS)) {
      const found = lessons.find(l => l.id === id);
      if (found) return found;
    }
    return null;
  }, [id]);

  const { course, allLessons, currentIndex } = useMemo(() => {
    if (!lesson) return { course: null, allLessons: [], currentIndex: -1 };
    const c = DEMO_COURSES.find(c => c.id === lesson.course_id);
    const all = DEMO_LESSONS[lesson.course_id] || [];
    const idx = all.findIndex(l => l.id === id);
    return { course: c, allLessons: all, currentIndex: idx };
  }, [lesson, id]);

  const quiz = lesson?.has_quiz ? DEMO_QUIZZES[lesson.id] : null;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (!lesson || !course) {
    return (
      <StudentLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">Lesson not found.</p>
          <Link to="/courses" className="text-primary-600 text-sm hover:underline mt-2 inline-block">Back to courses</Link>
        </div>
      </StudentLayout>
    );
  }

  const ContentIcon = contentIcon[lesson.content_type];

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/courses" className="hover:text-gray-600">Courses</Link>
          <span>/</span>
          <Link to={`/courses/${course.id}`} className="hover:text-gray-600">{course.title}</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate">{lesson.title}</span>
        </nav>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-3 flex items-center gap-3">
          <div className="text-xs text-gray-500 flex-shrink-0">Lesson {currentIndex + 1} of {allLessons.length}</div>
          <div className="flex-1 flex gap-1">
            {allLessons.map((l, i) => (
              <div
                key={l.id}
                className={`h-1.5 flex-1 rounded-full transition-all ${DEMO_PROGRESS.some(p => p.lesson_id === l.id) ? 'bg-emerald-500' : i === currentIndex ? 'bg-primary-400' : 'bg-gray-100'}`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center">
                  <ContentIcon size={14} className="text-primary-600" />
                </div>
                <Badge color="gray">{lesson.content_type}</Badge>
                {lesson.duration_minutes && <Badge color="gray">{lesson.duration_minutes} min</Badge>}
              </div>
              <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
            </div>

            {/* Content */}
            {lesson.content_type === 'video' && lesson.content_url && (
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-soft aspect-video bg-gray-900">
                <iframe
                  src={lesson.content_url}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {lesson.content_type === 'text' && lesson.content_text && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 lg:p-8">
                <MarkdownContent text={lesson.content_text} />
              </div>
            )}

            {/* Quiz */}
            {quiz && quiz.questions && (
              <QuizBlock questions={quiz.questions} lessonId={lesson.id} />
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {prevLesson ? (
                <Button variant="outline" onClick={() => navigate(`/lessons/${prevLesson.id}`)} className="flex-1">
                  <ArrowLeft size={16} />
                  Previous
                </Button>
              ) : (
                <Button variant="outline" onClick={() => navigate(`/courses/${course.id}`)} className="flex-1">
                  <ArrowLeft size={16} />
                  Back to Course
                </Button>
              )}
              {!completed ? (
                <Button className="flex-1" onClick={() => setCompleted(true)}>
                  <Check size={16} />
                  Mark Complete
                </Button>
              ) : nextLesson ? (
                <Button className="flex-1" onClick={() => navigate(`/lessons/${nextLesson.id}`)}>
                  Next Lesson
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button variant="secondary" className="flex-1" onClick={() => navigate(`/courses/${course.id}`)}>
                  <Check size={16} />
                  Course Complete!
                </Button>
              )}
            </div>
          </div>

          {/* Lesson list sidebar */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Course Lessons</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
              {allLessons.map((l, i) => {
                const isActive = l.id === id;
                const isDone = DEMO_PROGRESS.some(p => p.lesson_id === l.id);
                const LIcon = contentIcon[l.content_type];
                return (
                  <button
                    key={l.id}
                    onClick={() => navigate(`/lessons/${l.id}`)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-50 last:border-0 ${isActive ? 'bg-primary-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-emerald-100 text-emerald-600' : isActive ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                      {isDone ? <Check size={11} /> : <LIcon size={11} />}
                    </div>
                    <p className={`text-xs leading-snug ${isActive ? 'text-primary-700 font-medium' : 'text-gray-600'}`}>
                      {i + 1}. {l.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

const contentIcon = { video: Play, text: FileText, pdf: File } as const;
