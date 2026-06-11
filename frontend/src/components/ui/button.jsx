const baseStyles =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-zinc-50 text-zinc-950 hover:bg-zinc-200 shadow-[0_1px_0_rgba(255,255,255,0.04)]",
  secondary: "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 border border-white/10",
  ghost: "bg-transparent text-zinc-300 hover:bg-white/5 hover:text-zinc-50",
};

const sizes = {
  default: "h-11 px-5 py-2.5",
  sm: "h-9 rounded-md px-3",
  lg: "h-12 rounded-md px-6",
};

export function Button({ className = "", variant = "default", size = "default", ...props }) {
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.default;

  return <button className={`${baseStyles} ${variantClasses} ${sizeClasses} ${className}`} {...props} />;
}