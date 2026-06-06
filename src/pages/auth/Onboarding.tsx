import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';

const GOALS = ['Career change into tech', 'Upgrade my current skills', 'Build a side project', 'Explore a new subject', 'Get a certification', 'Pure curiosity'];
const INTERESTS = ['Programming', 'Web Development', 'Data Science', 'Design', 'AI & Machine Learning', 'Mobile Apps', 'Cloud & DevOps', 'Cybersecurity'];
const LEVELS = [
  { value: 'beginner', label: 'Beginner', desc: 'Little to no experience' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Some experience, want to level up' },
  { value: 'advanced', label: 'Advanced', desc: 'Experienced, looking for depth' },
];

function MultiSelect({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${active ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'}`}
          >
            {active && <Check size={12} className="inline mr-1" />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function Onboarding() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [level, setLevel] = useState('');
  const [saving, setSaving] = useState(false);

  const steps = [
    {
      title: 'What are your learning goals?',
      subtitle: 'Choose everything that applies — we\'ll personalize your experience.',
      content: <MultiSelect options={GOALS} selected={goals} onChange={setGoals} />,
      valid: goals.length > 0,
    },
    {
      title: 'What topics interest you?',
      subtitle: 'We\'ll highlight relevant courses and resources.',
      content: <MultiSelect options={INTERESTS} selected={interests} onChange={setInterests} />,
      valid: interests.length > 0,
    },
    {
      title: 'What\'s your experience level?',
      subtitle: 'This helps us recommend the right difficulty.',
      content: (
        <div className="space-y-3">
          {LEVELS.map(l => (
            <button
              key={l.value}
              type="button"
              onClick={() => setLevel(l.value)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${level === l.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${level === l.value ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                {level === l.value && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{l.label}</p>
                <p className="text-xs text-gray-500">{l.desc}</p>
              </div>
            </button>
          ))}
        </div>
      ),
      valid: level !== '',
    },
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = async () => {
    if (!currentStep.valid) return;
    if (isLast) {
      setSaving(true);
      await updateProfile({ goals, interests, experience_level: level, onboarding_completed: true });
      setSaving(false);
      navigate('/dashboard');
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center">
              <GraduationCap size={20} color="white" />
            </div>
            <span className="font-bold text-xl text-gray-900">LearnPath</span>
          </div>
          <p className="text-gray-500 text-sm">Hi {user?.full_name?.split(' ')[0] || 'there'}! Let's personalize your experience.</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary-600' : 'bg-gray-200'}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
          <p className="text-sm text-gray-500 mb-6">{currentStep.subtitle}</p>

          {currentStep.content}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(s => s - 1)} className="px-6">
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!currentStep.valid}
              loading={saving}
              size="lg"
              className="flex-1"
            >
              {isLast ? 'Start Learning' : 'Continue'}
              {!isLast && <ChevronRight size={16} />}
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Step {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
