import React from 'react';
import { CheckCircle2, AlertCircle, Users } from 'lucide-react';
export type VerificationStatus =
'Officially Verified' |
'Under Review' |
'Community Reported';
interface VerifiedBadgeProps {
  status: VerificationStatus;
  className?: string;
}
export function VerifiedBadge({ status, className = '' }: VerifiedBadgeProps) {
  const config = {
    'Officially Verified': {
      icon: CheckCircle2,
      colors: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    'Under Review': {
      icon: AlertCircle,
      colors: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    'Community Reported': {
      icon: Users,
      colors: 'bg-blue-50 text-blue-700 border-blue-200'
    }
  };
  const { icon: Icon, colors } = config[status];
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors} ${className}`}>
      
      <Icon className="w-3.5 h-3.5" />
      {status}
    </div>);

}