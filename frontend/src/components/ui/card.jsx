export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-zinc-950/80 text-zinc-50 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`flex flex-col gap-2 px-6 pt-6 sm:px-8 sm:pt-8 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h1 className={`text-2xl font-semibold tracking-tight text-zinc-50 ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }) {
  return <p className={`text-sm leading-6 text-zinc-400 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`px-6 pb-6 pt-4 sm:px-8 sm:pb-8 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }) {
  return <div className={`px-6 pb-6 sm:px-8 ${className}`} {...props} />;
}