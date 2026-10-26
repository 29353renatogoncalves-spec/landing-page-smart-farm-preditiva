import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  lines: { text: string; serif?: boolean }[]
  description?: string
  id?: string
  tone?: 'dark' | 'light'
}

export function SectionHeading({ index, eyebrow, lines, description, id, tone = 'dark' }: SectionHeadingProps) {
  const light = tone === 'light'
  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal>
          <p className={cn('caption mb-8 flex items-center gap-2', light ? 'text-ink-muted' : 'text-sage')}>
            <span className={light ? 'text-olive' : 'text-lime'}>{index}</span>
            <span aria-hidden="true">/</span>
            {eyebrow}
          </p>
        </Reveal>
        <h2
          id={id}
          className={cn(
            'text-[clamp(2.75rem,9vw,8.5rem)] font-extrabold uppercase leading-[0.85] tracking-tighter',
            light ? 'text-olive' : 'text-foreground',
          )}
        >
          {lines.map((line, i) => (
            <Reveal
              as="span"
              key={line.text}
              delay={80 + i * 80}
              className={cn(
                'block',
                line.serif && 'font-serif font-normal tracking-tight',
                line.serif && (light ? 'text-[#5f7a00]' : 'text-lime'),
              )}
            >
              {line.text}
            </Reveal>
          ))}
        </h2>
      </div>
      {description && (
        <Reveal delay={240} className="md:max-w-sm md:pb-3">
          <p className={cn('text-pretty font-serif text-2xl leading-[1.15]', light ? 'text-ink-muted' : 'text-sage')}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
