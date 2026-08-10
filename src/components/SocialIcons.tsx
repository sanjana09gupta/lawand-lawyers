type IconProps = { size?: number; className?: string };

export function LinkedInIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.9c0-1.4-.03-3.2-2-3.2-2 0-2.3 1.5-2.3 3.1V21h-4V9Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.47C16.24 4.4 15.34 4.3 14.3 4.3c-2.19 0-3.69 1.34-3.69 3.79v2.35H8.05v2.96H10.6V21h2.9Z" />
    </svg>
  );
}

export function XIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 4l7.2 8.6L4.4 20h2.3l6.1-6.6L18 20h4l-7.6-9L20.7 4h-2.3l-5.6 6.1L9 4H4Zm3.4 1.7h2l7.2 8.7 2.3 2.9h-2l-7.4-8.9-2.1-2.7Z" />
    </svg>
  );
}
