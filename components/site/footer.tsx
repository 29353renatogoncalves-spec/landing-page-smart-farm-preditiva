import { ArrowUp } from 'lucide-react'
import { BrandMark } from './brand'
import { Reveal } from './reveal'

const details = [
  { label: 'Autor', value: 'Renato Gonçalves' },
  { label: 'Turma', value: '12º L' },
  { label: 'Escola', value: 'Escola Secundária Augusto Gomes' },
  { label: 'Curso', value: 'Técnico de Gestão e Programação de Sistemas Informáticos' },
  { label: 'Projeto', value: 'PAP · Ano letivo 2026/27' },
]

export function Footer() {
  return (
    <footer id="autor" aria-labelledby="autor-title" className="topo-dark relative overflow-hidden px-4 pt-32 md:px-5 md:pt-48">
      <Reveal>
        <p className="caption flex items-center gap-2 text-sage">
          <span className="text-lime">05</span>
          <span aria-hidden="true">/</span>
          Autor
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
        <Reveal delay={100}>
          <h2
            id="autor-title"
            className="text-[clamp(3rem,11vw,10rem)] font-extrabold uppercase leading-[0.82] tracking-tighter"
          >
            <span className="block font-serif font-normal tracking-tight text-lime">Renato</span>
            <span className="block">Gonçalves</span>
          </h2>
          <p className="mt-8 max-w-md font-serif text-2xl leading-tight text-sage">
            {'"Não importa onde começa um tanque — importa como o sistema o mantém equilibrado."'}
          </p>
        </Reveal>

        <Reveal delay={200} className="w-full lg:max-w-md">
          <dl className="glass-olive overflow-hidden rounded-xl">
            {details.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-6 border-b border-foreground/10 px-5 py-4 last:border-b-0">
                <dt className="caption shrink-0 text-sage">{item.label}</dt>
                <dd className="text-right font-bold uppercase leading-snug tracking-tight">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-24 flex flex-col gap-6 border-t border-foreground/15 py-6 md:flex-row md:items-center md:justify-between">
        <p className="caption flex items-center gap-3 text-sage">
          <BrandMark className="size-5 text-lime" />© 2026 SmartFarm Preditiva · Escola Secundária Augusto Gomes
        </p>
        <a
          href="#topo"
          className="group inline-flex h-10 items-center gap-2 self-start rounded-lg bg-lime px-4 text-xs font-extrabold uppercase text-olive md:self-auto"
        >
          Voltar ao topo
          <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>

      <p
        aria-hidden="true"
        className="-mx-4 select-none whitespace-nowrap text-center text-[clamp(3rem,17vw,19rem)] font-extrabold uppercase leading-[0.72] tracking-tighter text-lime md:-mx-5"
      >
        Smart<span className="font-serif font-normal tracking-tight">farm</span>
      </p>
    </footer>
  )
}
