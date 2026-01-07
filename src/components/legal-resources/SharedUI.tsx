import React from 'react';

const BRAND = {
  gradient: 'linear-gradient(90deg, #7B2FF7 0%, #F107A3 100%)',
  accent: '#6B21A8',
};

export const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

export const Badge = ({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'good' | 'warn' | 'brand' }) => {
  const map = {
    neutral: 'bg-slate-100 text-slate-700',
    good: 'bg-emerald-50 text-emerald-700',
    warn: 'bg-amber-50 text-amber-700',
    brand: 'text-white',
  };
  const base = 'px-2 py-1 rounded-full text-xs font-medium';
  return (
    <span
      className={`${base} ${tone === 'brand' ? '' : map[tone]}`}
      style={tone === 'brand' ? { background: BRAND.gradient } : {}}
    >
      {children}
    </span>
  );
};

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded-md ${className}`}></div>
);

interface PillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const Pill = ({ active, onClick, children }: PillProps) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm border transition ${active ? 'text-white' : 'text-slate-700'}`}
    style={
      active
        ? { background: BRAND.accent, borderColor: 'transparent', boxShadow: '0 6px 18px rgba(107,33,168,.25)' }
        : { background: 'white', borderColor: '#e2e8f0' }
    }
  >
    {children}
  </button>
);

export { BRAND };
