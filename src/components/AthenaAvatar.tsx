import React from 'react';
type AthenaAvatarProps = {
  size?: number;
  glow?: boolean;
  className?: string;
};
/**
 * Stylized character avatar for the Athena AI assistant.
 * A geometric, modern portrait — short bob, glowing cyan eyes, soft smile —
 * inspired by Greek goddess Athena reimagined for cyber-security.
 */
export function AthenaAvatar({
  size = 40,
  glow = false,
  className = ''
}: AthenaAvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size,
        height: size
      }}>
      
      {glow &&
      <div
        className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl pointer-events-none"
        aria-hidden />

      }
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10">
        
        <defs>
          <linearGradient
            id="athena-bg"
            x1="0"
            y1="0"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse">
            
            <stop stopColor="#1e466b" />
            <stop offset="1" stopColor="#020617" />
          </linearGradient>
          <linearGradient
            id="athena-skin"
            x1="32"
            y1="22"
            x2="32"
            y2="52"
            gradientUnits="userSpaceOnUse">
            
            <stop stopColor="#cbe6ff" />
            <stop offset="1" stopColor="#7fb3e3" />
          </linearGradient>
          <linearGradient
            id="athena-hair"
            x1="32"
            y1="10"
            x2="32"
            y2="40"
            gradientUnits="userSpaceOnUse">
            
            <stop stopColor="#0a1929" />
            <stop offset="1" stopColor="#1e466b" />
          </linearGradient>
          <radialGradient
            id="athena-eye-glow"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(32 32) scale(8)">
            
            <stop stopColor="#67baf4" />
            <stop offset="1" stopColor="#1e466b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Circular background */}
        <circle cx="32" cy="32" r="32" fill="url(#athena-bg)" />
        {/* Subtle inner ring */}
        <circle
          cx="32"
          cy="32"
          r="30.5"
          stroke="#67baf4"
          strokeOpacity="0.25"
          strokeWidth="1" />
        

        {/* Hair back layer */}
        <path
          d="M14 30 C 14 18, 22 10, 32 10 C 42 10, 50 18, 50 30 L 50 44 C 50 46, 48 47, 46 47 L 18 47 C 16 47, 14 46, 14 44 Z"
          fill="url(#athena-hair)" />
        

        {/* Face */}
        <ellipse cx="32" cy="34" rx="13" ry="14" fill="url(#athena-skin)" />

        {/* Hair front bangs */}
        <path
          d="M19 24 C 22 18, 28 16, 32 16 C 36 16, 42 18, 45 24 C 42 22, 38 21, 34 23 C 31 24.5, 28 24.5, 25 23 C 22 22, 20 23, 19 24 Z"
          fill="url(#athena-hair)" />
        

        {/* Side hair sweep */}
        <path
          d="M18 26 C 17 30, 17 36, 19 42 C 19 38, 19 32, 20 28 Z"
          fill="url(#athena-hair)" />
        
        <path
          d="M46 26 C 47 30, 47 36, 45 42 C 45 38, 45 32, 44 28 Z"
          fill="url(#athena-hair)" />
        

        {/* Eyes — almond shaped with cyan glow */}
        <ellipse cx="27" cy="33" rx="2.2" ry="1.4" fill="#0a1929" />
        <ellipse cx="37" cy="33" rx="2.2" ry="1.4" fill="#0a1929" />
        {/* Eye highlights */}
        <circle cx="27.5" cy="32.6" r="0.7" fill="#67baf4" />
        <circle cx="37.5" cy="32.6" r="0.7" fill="#67baf4" />

        {/* Eyebrows */}
        <path
          d="M24 30.5 Q 27 29.5 30 30.5"
          stroke="#0a1929"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none" />
        
        <path
          d="M34 30.5 Q 37 29.5 40 30.5"
          stroke="#0a1929"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none" />
        

        {/* Soft smile */}
        <path
          d="M29 39.5 Q 32 41.5 35 39.5"
          stroke="#1e466b"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none" />
        

        {/* Subtle nose */}
        <path
          d="M32 35 L 32 37 L 32.8 37.5"
          stroke="#1e466b"
          strokeOpacity="0.4"
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none" />
        

        {/* Tech headband — Athena's signature laurel reimagined as a cyber circuit band */}
        <path
          d="M16 22 C 22 18, 28 17, 32 17 C 36 17, 42 18, 48 22"
          stroke="#67baf4"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round" />
        
        <circle cx="32" cy="17" r="1.1" fill="#67baf4" />
        <circle cx="22" cy="19.5" r="0.7" fill="#95cef9" />
        <circle cx="42" cy="19.5" r="0.7" fill="#95cef9" />
      </svg>
    </div>);

}