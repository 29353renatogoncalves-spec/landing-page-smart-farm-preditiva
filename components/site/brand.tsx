import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn('size-8', className)}>
      <path d="M8 34c6-4 10-4 16 0s10 4 16 0" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M8 24c6-4 10-4 16 0s10 4 16 0" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M24 6v10" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  )
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex flex-col leading-[0.82]', className)}>
      <span className="font-serif text-[1.65rem] uppercase tracking-tight">Smart</span>
      <span className="text-[1.4rem] font-extrabold uppercase tracking-tight">Farm</span>
    </span>
  )
}
