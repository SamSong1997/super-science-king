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
      {/* Logo Icon - 使用新的图片 */}
      <div className={`${sizeClasses.container} aspect-square relative`}>
        <img 
          src="/images/logo-main.png" 
          alt="超级理科王" 
          className="w-full h-full object-contain"
        />
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
