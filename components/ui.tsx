import { cn } from './utils';

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'rounded-2xl border border-white/5 bg-card/60 card-surface shadow-glow',
        props.className
      )}
    />
  );
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }
) {
  const { variant = 'primary', className, ...rest } = props;
  const base = 'px-3 py-2 rounded-lg text-sm border transition';
  const styles =
    variant === 'primary'
      ? 'bg-accent/20 hover:bg-accent/30 border-accent/30'
      : variant === 'danger'
      ? 'bg-danger/20 hover:bg-danger/30 border-danger/30'
      : 'bg-white/5 hover:bg-white/10 border-white/10';
  return <button {...rest} className={cn(base, styles, className)} />;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={cn(
        'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 outline-none text-sm placeholder:text-muted focus:border-accent',
        className
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      {...rest}
      className={cn(
        'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 outline-none text-sm placeholder:text-muted focus:border-accent',
        className
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return (
    <select
      {...rest}
      className={cn(
        'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 outline-none text-sm focus:border-accent',
        className
      )}
    />
  );
}
