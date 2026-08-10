type Props = {
  className?: string;
  id?: string;
};

/**
 * Decorative motif echoing the interlocking square / diamond
 * shapes in the Law and Lawyers logo mark — used as a watermark,
 * not a literal redraw of the logo.
 */
export default function BrandMark({ className, id = "brandmark" }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-grad`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1d3468" />
          <stop offset="45%" stopColor="#22458a" />
          <stop offset="75%" stopColor="#2f74bd" />
          <stop offset="100%" stopColor="#4a97d6" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="14" fill={`url(#${id}-grad)`} />
      <rect
        x="22"
        y="19"
        width="56"
        height="60"
        rx="1.5"
        fill="#ffffff"
        fillOpacity="0.32"
      />
      <path d="M9 17 L39 9 L50 50 Z" fill="#ffffff" fillOpacity="0.5" />
      <path d="M50 50 L61 91 L91 83 Z" fill="#ffffff" fillOpacity="0.5" />
      <circle cx="50" cy="50" r="1.6" fill="#ffffff" />
    </svg>
  );
}
