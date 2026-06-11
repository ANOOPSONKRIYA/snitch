export function Input({ className = "", ...props }) {
  return (
    <input
      className={`flex h-11 w-full rounded-md border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-50 shadow-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}