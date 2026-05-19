import React from 'react';
import { AlertTriangle } from 'lucide-react';
export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';
interface SeverityBadgeProps {
  level: SeverityLevel;
  className?: string;
}
export function SeverityBadge({ level, className = '' }: SeverityBadgeProps) {
  const config = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    High: 'bg-orange-50 text-orange-700 border-orange-200',
    Critical: 'bg-red-50 text-red-700 border-red-200'
  };
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config[level]} ${className}`}>
      
      <AlertTriangle className="w-3.5 h-3.5" />
      {level} Severity
    </div>);

}