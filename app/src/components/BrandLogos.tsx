interface LogoProps {
  size?: number
  className?: string
}

/**
 * Official Canvas LMS 8-petal circular sunburst logo
 */
export function CanvasLogo({ size = 18, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={`canvas-lms-logo ${className}`}
      aria-hidden="true"
    >
      <circle cx="16" cy="4.5" r="2.8" />
      <circle cx="24.13" cy="7.87" r="2.8" />
      <circle cx="27.5" cy="16" r="2.8" />
      <circle cx="24.13" cy="24.13" r="2.8" />
      <circle cx="16" cy="27.5" r="2.8" />
      <circle cx="7.87" cy="24.13" r="2.8" />
      <circle cx="4.5" cy="16" r="2.8" />
      <circle cx="7.87" cy="7.87" r="2.8" />
      <circle cx="16" cy="16" r="3.2" opacity="0.95" />
    </svg>
  )
}

/**
 * EdStem Live Discussion brand emblem
 */
export function EdStemLogo({ size = 18, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`edstem-brand-logo ${className}`}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" fill="rgba(0, 150, 136, 0.12)" stroke="currentColor" />
      <path d="M7 8h7M7 12h10M7 16h6" stroke="currentColor" />
      <circle cx="17.5" cy="8" r="1.5" fill="currentColor" />
    </svg>
  )
}
