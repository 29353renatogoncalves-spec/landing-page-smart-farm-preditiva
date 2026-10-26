import { Activity, Brain, Cog, Eye } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const steps = [
  {
    icon: Activity,
    phase: 'Sentir',
    title: 'Aquisição',
    text: 'O sensor de pH e o DS18B20 recolhem continuamente os parâmetros físico-químicos da água.',
    tag: 'Input',
  },
  {
    icon: Brain,
    phase: 'Decidir',
    title: 'Processamento',
    text: 'O ESP32 filtra os dados, compara-os com os valores ideais e calcula a próxima ação.',
    tag: 'Lógica',
  },
  {
    icon: Cog,
    phase: 'Atuar',
    title: 'Atuação',
    text: 'O servo motor abre o dispensador e liberta a dose exata de ração no momento certo.',
    tag: 'Output',
  },
  {
    icon: Eye,
    phase: 'Verificar',
    title: 'Feedback',
    text: 'A ESP32-CAM observa o tanque e devolve a informação ao sistema, fechando o ciclo.',
    tag: 'Loop',
  },
]

export function Architecture() {
  return (
    <section id="arquitetura" aria-labelledby="arquitetura-title" className="topo-dark relative px-4 py-32 md:px-5 md:py-48">
      <SectionHeading
        id="arquitetura-title"
        index="02"
        eyebrow="Arquitetura"
        lines={[{ text: 'Ciclo de' }, { text: 'controlo', serif: true }, { text: 'em malha fechada' }]}
        description="Cada decisão nasce de uma medição e cada ação é verificada. Quatro fases que se repetem sem intervenção humana."
      />

      <ol className="mt-20 grid gap-3 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
        {steps.map(({ icon: Icon, phase, title, text, tag }, i) => (
          <Reveal
            as="li"
            key={phase}
            delay={i * 100}
            className="glass-olive group relative flex flex-col overflow-hidden rounded-xl p-6 transition-colors duration-500 hover:border-lime/60 md:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="caption text-sage">Fase {String(i + 1).padStart(2, '0')}</span>
              <span className="caption rounded-md border border-lime/40 px-2 py-1 text-lime">{tag}</span>
            </div>
            <span
              aria-hidden="true"
              className="mt-10 font-serif text-[7rem] leading-[0.7] text-foreground/10 transition-colors duration-500 group-hover:text-lime/30"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <Icon className="mt-8 size-7 text-lime" aria-hidden="true" />
            <p className="mt-6 text-4xl font-extrabold uppercase leading-none tracking-tighter">{phase}</p>
            <p className="mt-2 font-serif text-xl text-lime">{title}</p>
            <p className="mt-4 leading-relaxed text-sage">{text}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={200}>
        <div className="mt-3 flex flex-col items-start justify-between gap-3 rounded-xl border border-foreground/15 px-6 py-5 md:flex-row md:items-center">
          <span className="caption flex items-center gap-3 text-sage">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-lime" aria-hidden="true" />
            Sensores → ESP32 → Servo → ESP32-CAM → Sensores
          </span>
          <span className="font-serif text-xl text-foreground">Repetição contínua, 24 horas por dia.</span>
        </div>
      </Reveal>
    </section>
  )
}
