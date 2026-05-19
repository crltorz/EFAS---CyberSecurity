import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
interface CitationCardProps {
  source: string;
  date: string;
  url?: string;
  className?: string;
}
export function CitationCard({
  source,
  date,
  url,
  className = ''
}: CitationCardProps) {
  const content =
  <>
      <ShieldCheck className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
      <span className="font-medium text-slate-700 truncate">{source}</span>
      <span className="text-slate-400 shrink-0">•</span>
      <span className="text-slate-500 shrink-0">Verified: {date}</span>
      {url &&
    <ExternalLink className="w-3 h-3 text-slate-400 ml-1 shrink-0 group-hover:text-cyan-700 transition-colors" />
    }
    </>;

  const baseClasses = `inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-full ${className}`;
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} hover:bg-slate-100 hover:border-slate-300 transition-colors group`}>
        
        {content}
      </a>);

  }
  return <div className={baseClasses}>{content}</div>;
}