interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  value,
  size = 80,
  strokeWidth = 7,
  color = '#5B5BD6',
  bgColor = '#E0E7FF',
  label,
  sublabel,
}: ProgressRingProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={bgColor} strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      {label && (
        <div className="text-center -mt-1">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {sublabel && <p className="text-xs text-gray-400">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
