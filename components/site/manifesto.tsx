import { Reveal } from './reveal'

type Word = { t: string; serif?: boolean }

const lines: Word[][] = [
  [{ t: 'Medir' }, { t: 'a água,', serif: true }],
  [{ t: 'alimentar com' }],
  [{ t: 'precisão', serif: true }, { t: 'e' }],
  [{ t: 'antecipar o' }, { t: 'risco', serif: true }],
  [{ t: 'antes de ele' }],
  [{ t: 'acontecer.' }],
]

export function Manifesto() {
  return (
    <section aria-label="Missão do projeto" className="topo-dark relative px-4 py-32 md:px-5 md:py-48">
      <Reveal>
        <p className="caption mb-12 text-center text-sage">A missão da SmartFarm</p>
      </Reveal>
      <p className="mx-auto max-w-6xl text-center text-[clamp(2.5rem,8.5vw,8rem)] font-extrabold uppercase leading-[0.88] tracking-tighter text-foreground">
        {lines.map((line, i) => (
          <Reveal as="span" key={i} delay={i * 80} className="block">
            {line.map((w, j) => (
              <span key={j} className={w.serif ? 'font-serif font-normal tracking-tight text-lime' : undefined}>
                {j > 0 ? ' ' : ''}
                {w.t}
              </span>
            ))}
          </Reveal>
        ))}
      </p>
    </section>
  )
}
