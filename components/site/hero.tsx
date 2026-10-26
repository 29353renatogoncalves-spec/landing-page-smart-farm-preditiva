import Image from 'next/image'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

const marqueeItems = [
  'Aquicultura Autónoma',
  'Internet of Things',
  'Controlo em Malha Fechada',
  'ESP32',
  'Visão Computacional',
  'Monitorização em Tempo Real',
]

export function Hero() {
  return (
    <section id="topo" className="topo-dark relative isolate flex min-h-svh flex-col overflow-hidden">
      <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[58%]">
        <Image
          src="/images/hero-tank.png"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--olive)_0%,transparent_45%),linear-gradient(to_top,var(--olive)_0%,transparent_40%)]"
        />
      </div>

      <div className="flex flex-1 flex-col justify-end px-4 pb-10 pt-32 md:px-5 md:pb-14">
        <Reveal>
          <p className="caption mb-6 flex items-center gap-2 text-sage">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-lime" aria-hidden="true" />
            Prova de Aptidão Profissional · Sistema IoT
          </p>
        </Reveal>

        <h1 className="uppercase leading-[0.8] tracking-tighter">
          <Reveal as="span" delay={1500} className="block text-[clamp(3rem,15vw,15rem)] font-extrabold text-foreground">
            Smartfarm
          </Reveal>
          <Reveal as="span" delay={1620} className="block font-serif text-[clamp(3.25rem,16vw,16rem)] font-normal tracking-tight text-lime">
            Preditiva
          </Reveal>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal delay={1750} className="max-w-xl">
            <p className="text-pretty font-serif text-2xl leading-[1.15] text-sage md:text-3xl">
              Automação inteligente de ecossistemas aquáticos. Sensores medem a água, o ESP32{' '}
              <span className="text-foreground">decide</span> e os atuadores{' '}
              <span className="text-foreground">corrigem</span> — um tanque que se gere sozinho.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href="#projeto"
                className="group inline-flex h-12 items-center gap-3 rounded-lg bg-lime px-5 text-sm font-extrabold uppercase tracking-tight text-olive transition-transform hover:-translate-y-0.5"
              >
                Explorar o Projeto
                <ArrowDownRight className="size-4 transition-transform group-hover:rotate-[-45deg]" aria-hidden="true" />
              </a>
              <a
                href="#arquitetura"
                className="group inline-flex h-12 items-center gap-3 rounded-lg border border-foreground/40 px-5 text-sm font-extrabold uppercase tracking-tight transition-colors hover:border-lime hover:text-lime"
              >
                Como funciona
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={1850}>
            <aside aria-label="Estado do tanque" className="glass-olive w-full rounded-lg p-3 md:w-56">
              <p className="caption flex items-center justify-between text-sage">
                Estado do tanque
                <span className="flex items-center gap-1.5 text-lime">
                  <span className="animate-pulse-dot size-1.5 rounded-full bg-lime" aria-hidden="true" />
                  Live
                </span>
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-foreground/10">
                {[
                  { k: 'pH', v: '7.2' },
                  { k: 'Temp', v: '24.6°' },
                  { k: 'Ração', v: 'Auto' },
                  { k: 'Ciclo', v: '24/7' },
                ].map((item) => (
                  <div key={item.k} className="bg-olive/80 px-3 py-2.5">
                    <dt className="caption text-sage">{item.k}</dt>
                    <dd className="mt-1 text-xl font-extrabold tabular-nums">{item.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="caption mt-3 border-t border-foreground/10 pt-2 text-center text-sage">PAP · Desde 2026</p>
            </aside>
          </Reveal>
        </div>
      </div>

      <div className="relative overflow-hidden bg-lime py-3 text-olive" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-extrabold uppercase tracking-tight">
              {item}
              <span className="font-serif text-lg font-normal">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
