import React from 'react';
interface SectionHeadingProps {
  title: string;
  description?: string;
  kicker?: string;
  className?: string;
}
export function SectionHeading({
  title,
  description,
  kicker,
  className = ''
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {kicker &&
      <div className="text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-2">
          {kicker}
        </div>
      }
      <h2 className="text-3xl font-heading font-bold text-white mb-3 tracking-tight">
        {title}
      </h2>
      {description &&
      <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      }
    </div>);

}