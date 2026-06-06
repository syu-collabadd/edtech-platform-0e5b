import React from 'react';

type Color = 'indigo' | 'violet' | 'green' | 'yellow' | 'red' | 'gray' | 'blue' | 'orange';

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  size?: 'sm' | 'md';
}

const colors: Record<Color, string> = {
  indigo: 'bg-primary-50 text-primary-700',
  violet: 'bg-violet-50 text-violet-700',
  green: 'bg-emerald-50 text-emerald-700',
  yellow: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
  blue: 'bg-blue-50 text-blue-700',
  orange: 'bg-orange-50 text-orange-700',
};

export function Badge({ children, color = 'indigo', size = 'md' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colors[color]} ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-xs'}`}>
      {children}
    </span>
  );
}
