import { Droplets, Fish, Gauge, RefreshCcw, ShieldCheck, Timer } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const problems = [
  {
    icon: Timer,
    title: 'Malha aberta',
    text: 'Os sistemas atuais usam temporizadores cegos ou verificações manuais — alimentam a horas fixas, sem olhar para a água.',
  },
  {
    icon: Fish,
    title: 'Excesso de ração',
    text: 'Sem considerar a temperatura, sobra ração que entra em decomposição e liberta amónia no tanque.',
  },
  {
    icon: Droplets,
    title: 'Variação de pH',
    text: 'A amónia altera o pH, provoca stress e doenças e, no limite, a mortalidade dos peixes.',
  },
]

const solutions = [
  {
    icon: Gauge,
    title: 'Leitura contínua',
    text: 'Os sensores de pH e DS18B20 medem a água em tempo real e enviam os dados para o ESP32.',
  },
  {
    icon: RefreshCcw,
    title: 'Malha fechada',
    text: 'Os dados biológicos condicionam diretamente o alimentador e os relés, antes de o ecossistema ser afetado.',
  },
  {
    icon: ShieldCheck,
    title: 'Dose preditiva',
    text: 'A dose é recalculada segundo o metabolismo térmico dos peixes e o servo liberta apenas o necessário.',
  },
]

const metrics = [
  { label: 'Ração', value: '−50%', text: 'Dose reduzida fora da gama térmica ideal.' },
  { label: 'Alerta', value: '<5s', text: 'Notificação após deteção de um valor crítico.' },
  { label: 'Offline', value: '24/7', text: 'Proteção a correr localmente no ESP32.' },
  { label: 'Custo', value: '~65€', text: 'Estimativa total de hardware do protótipo.' },
]

type Item = { icon: React.ComponentType<{ className?: string }>; title: string; text: string }

function ItemList({ items, tone }: { items: Item[]; tone: 'light' | 'dark' }) {
  return (
    <ul className="flex flex-col">
      {items.map(({ icon: Icon, title, text }, i) => (
        <li
          key={title}
          className={
            tone === 'light'
              ? 'flex gap-5 border-t border-olive/12 py-6'
              : 'flex gap-5 border-t border-foreground/12 py-6'
          }
        >
          <span className="flex w-8 shrink-0 flex-col items-center gap-3 pt-0.5">
            <span className="caption opacity-60">{String(i + 1).padStart(2, '0')}</span>
            <Icon className={tone === 'light' ? 'size-5 text-ink-muted' : 'size-5 text-lime'} aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-extrabold uppercase tracking-tight">{title}</p>
            <p className={tone === 'light' ? 'mt-1.5 leading-relaxed text-ink-muted' : 'mt-1.5 leading-relaxed text-sage'}>
              {text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ProblemSolution() {
  return (
    <section id="projeto" aria-labelledby="projeto-title" className="topo-light relative px-4 py-32 text-olive md:px-5 md:py-48">
      <SectionHeading
        id="projeto-title"
        index="01"
        eyebrow="O Projeto"
        tone="light"
        lines={[{ text: 'O problema' }, { text: 'vs. a solução', serif: true }]}
        description="Na aquacultura, pequenos erros tornam-se grandes perdas. A SmartFarm substitui a intuição pela medição e a reação pela antecipação."
      />

      <div className="mt-20 grid gap-3 md:mt-28 lg:grid-cols-2">
        <Reveal className="h-full">
          <article className="glass-cream flex h-full flex-col rounded-xl p-6 md:p-10">
            <p className="caption flex items-center justify-between text-ink-muted">
              <span>Antes · Malha aberta</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full border border-current" aria-hidden="true" />
                Sem controlo
              </span>
            </p>
            <h3 className="mt-10 text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.88] tracking-tighter">
              O tanque
              <span className="block font-serif font-normal tracking-tight text-ink-muted">às cegas</span>
            </h3>
            <div className="mt-10">
              <ItemList items={problems} tone="light" />
            </div>
          </article>
        </Reveal>

        <Reveal delay={140} className="h-full">
          <article className="topo-dark flex h-full flex-col overflow-hidden rounded-xl p-6 text-foreground md:p-10">
            <p className="caption flex items-center justify-between text-sage">
              <span>Depois · Malha fechada</span>
              <span className="flex items-center gap-1.5 text-lime">
                <span className="animate-pulse-dot size-1.5 rounded-full bg-lime" aria-hidden="true" />
                Sistema ativo
              </span>
            </p>
            <h3 className="mt-10 text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.88] tracking-tighter">
              Controlo
              <span className="block font-serif font-normal tracking-tight text-lime">autónomo</span>
            </h3>
            <div className="mt-10">
              <ItemList items={solutions} tone="dark" />
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="group rounded-xl bg-lime p-6 text-olive transition-transform duration-500 hover:-translate-y-1 md:p-8"
            >
              <dt className="caption">{m.label}</dt>
              <dd className="mt-10 text-6xl font-extrabold tabular-nums tracking-tighter md:text-7xl">{m.value}</dd>
              <dd className="mt-3 font-serif text-xl leading-tight">{m.text}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
