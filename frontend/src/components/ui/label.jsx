export function Label({ className = "", ...props }) {
  return <label className={`text-sm font-medium leading-none text-zinc-200 ${className}`} {...props} />;
}