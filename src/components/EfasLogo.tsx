import React from 'react';
type EfasLogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};
export function EfasLogo({
  size = 32,
  withWordmark = true,
  className = ''
}: EfasLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0">
        
        <defs>
          <linearGradient
            id="efas-grad"
            x1="0"
            y1="0"
            x2="40"
            y2="40"
            gradientUnits="userSpaceOnUse">
            
            <stop stopColor="#67BAF4" />
            <stop offset="1" stopColor="#1E466B" />
          </linearGradient>
          <linearGradient
            id="efas-inner-grad"
            x1="20"
            y1="6"
            x2="20"
            y2="34"
            gradientUnits="userSpaceOnUse">
            
            <stop stopColor="#0A1929" />
            <stop offset="1" stopColor="#020617" />
          </linearGradient>
        </defs>
        {/* Outer hex-shield shape with rounded corners */}
        <path
          d="M20 2L36 10V22C36 30 28 36 20 38C12 36 4 30 4 22V10L20 2Z"
          fill="url(#efas-grad)" />
        
        {/* Inner dark shield */}
        <path
          d="M20 6L32 12V22C32 28 26 32.5 20 34C14 32.5 8 28 8 22V12L20 6Z"
          fill="url(#efas-inner-grad)" />
        
        {/* Modern E mark — three stacked bars */}
        <rect x="14" y="13" width="12" height="2.4" rx="1" fill="#67BAF4" />
        <rect x="14" y="18.8" width="8" height="2.4" rx="1" fill="#67BAF4" />
        <rect x="14" y="24.6" width="12" height="2.4" rx="1" fill="#67BAF4" />
        {/* Top glow accent dot */}
        <circle cx="20" cy="9" r="1.2" fill="#95CEF9" />
      </svg>
      {withWordmark &&
      <span className="font-heading font-bold text-sm tracking-tight text-white">
          EFAS
        </span>
      }
    </div>);
}
