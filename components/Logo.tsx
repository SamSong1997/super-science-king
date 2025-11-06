interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: { container: "h-8", text: "text-base" },
    md: { container: "h-10", text: "text-lg" },
    lg: { container: "h-16", text: "text-2xl" }
  };

  const sizeClasses = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses.container} aspect-square relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97757" />
              <stop offset="50%" stopColor="#6a9bcc" />
              <stop offset="100%" stopColor="#788c5d" />
            </linearGradient>
            <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6a9bcc" />
              <stop offset="100%" stopColor="#788c5d" />
            </linearGradient>
          </defs>

          {/* Background Circle */}
          <circle cx="50" cy="50" r="48" fill="url(#logoGradient1)" opacity="0.1" />

          {/* Book Shape - Left Page */}
          <path
            d="M 30 25 L 30 75 L 48 70 L 48 20 Z"
            fill="#d97757"
          />

          {/* Book Shape - Right Page */}
          <path
            d="M 52 20 L 52 70 L 70 75 L 70 25 Z"
            fill="#6a9bcc"
          />

          {/* Book Spine */}
          <rect x="48" y="20" width="4" height="55" fill="#788c5d" />

          {/* Atomic Symbol */}
          <circle cx="50" cy="45" r="4" fill="white" />
          <ellipse cx="50" cy="45" rx="15" ry="8" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(45 50 45)" />
          <ellipse cx="50" cy="45" rx="15" ry="8" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(-45 50 45)" />

          {/* Stars for "Super" */}
          <path d="M 25 15 L 26 17 L 28 17 L 26.5 18.5 L 27 20.5 L 25 19 L 23 20.5 L 23.5 18.5 L 22 17 L 24 17 Z" fill="#d97757" />
          <path d="M 75 15 L 76 17 L 78 17 L 76.5 18.5 L 77 20.5 L 75 19 L 73 20.5 L 73.5 18.5 L 72 17 L 74 17 Z" fill="#6a9bcc" />
        </svg>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-tight">
        <span className={`${sizeClasses.text} text-[#141413] tracking-tight font-bold`}>
          超级理科王
        </span>
        <span className="text-xs text-[#b0aea5] tracking-wide">
          SUPER SCIENCE KING
        </span>
      </div>
    </div>
  );
}
