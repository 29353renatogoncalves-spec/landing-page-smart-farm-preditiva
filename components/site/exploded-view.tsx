'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

/*
  Vista explodida controlada pelo scroll.
  O palco desktop usa uma unidade própria (--u = 1% da largura de um ecrã 16:9 que cabe na janela)
  para que cartões, linhas e pontos fiquem sempre alinhados entre si, qualquer que seja o tamanho da janela.
  Palco: 100u × 56.25u. Tanque: esquerda 22u, topo 12.4u, 56u × 31.25u.
*/

const STAGE_W = 100
const STAGE_H = 56.25
const TANK = { left: 22, top: 12.4, w: 56, h: 31.25 }
const CARD = { w: 17, imgH: 9.56, h: 16 }

type Part = {
  image: string
  tag: string
  name: string
  text: string
  spec: string
  /** posição do cartão no palco (u) */
  card: { x: number; y: number }
  /** onde o componente atua na foto do tanque (0–1) */
  anchor: { x: number; y: number }
}

const parts: Part[] = [
  {
    image: '/images/hw-esp32.png',
    tag: 'MCU',
    name: 'ESP32',
    text: 'O cérebro: lê os sensores, decide e comanda os atuadores, mesmo sem Internet.',
    spec: 'Dual-core 240 MHz · Wi-Fi + BLE',
    card: { x: 2, y: 2 },
    anchor: { x: 0.2, y: 0.38 },
  },
  {
    image: '/images/hw-ph.png',
    tag: 'PH',
    name: 'Sensor de pH',
    text: 'Mede a acidez da água de forma contínua, com calibração por software.',
    spec: 'Escala 0–14 · Saída analógica',
    card: { x: 2, y: 20 },
    anchor: { x: 0.36, y: 0.5 },
  },
  {
    image: '/images/hw-ds18b20.png',
    tag: 'TMP',
    name: 'Sensor DS18B20',
    text: 'Sonda de temperatura à prova de água, feita para ficar imersa.',
    spec: '-55 a 125 °C · ± 0,5 °C',
    card: { x: 2, y: 38 },
    anchor: { x: 0.55, y: 0.62 },
  },
  {
    image: '/images/hw-servo.png',
    tag: 'ACT',
    name: 'Servo motor',
    text: 'Roda o dispensador e liberta a dose exata de ração.',
    spec: 'Controlo PWM · 0–180°',
    card: { x: 81, y: 10 },
    anchor: { x: 0.62, y: 0.18 },
  },
  {
    image: '/images/hw-cam.png',
    tag: 'CAM',
    name: 'ESP32-CAM',
    text: 'Streaming em direto para veres o tanque a qualquer momento.',
    spec: 'OV2640 · 2 MP · Wi-Fi',
    card: { x: 81, y: 32 },
    anchor: { x: 0.78, y: 0.35 },
  },
]

const INTRO_END = 0.16
const FIRST = 0.18
const STEP = 0.15
const REVEAL = 0.12

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const reveal = (p: number, i: number) => easeOut(clamp((p - (FIRST + i * STEP)) / REVEAL))

function useScrollProgress(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [p, setP] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const update = () => {
      raf = 0
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const next = total > 0 ? clamp(-rect.top / total) : 0
      setP((prev) => (Math.abs(prev - next) < 0.0015 ? prev : next))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, enabled])
  return p
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

function DesktopStage({ p }: { p: number }) {
  const intro = easeOut(clamp(p / INTRO_END))
  const tankScale = 1.55 - 0.55 * intro
  const lastRevealed = parts.reduce((acc, _, i) => (p >= FIRST + i * STEP ? i : acc), -1)
  const active = lastRevealed >= 0 ? parts[lastRevealed] : null

  return (
    <div
      className="relative overflow-hidden"
      style={
        {
          '--u': 'min(1vw, 1.7778svh)',
          width: 'calc(var(--u) * 100)',
          height: 'calc(var(--u) * 56.25)',
        } as CSSProperties
      }
    >
      {/* Tanque */}
      <div
        className="absolute overflow-hidden rounded-xl border border-foreground/15 shadow-[0_0_0_1px_rgb(0_0_0/0.2)]"
        style={{
          left: `calc(var(--u) * ${TANK.left})`,
          top: `calc(var(--u) * ${TANK.top})`,
          width: `calc(var(--u) * ${TANK.w})`,
          height: `calc(var(--u) * ${TANK.h})`,
          transform: `scale(${tankScale})`,
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        <Image
          src="/images/hero-tank.png"
          alt="Tanque de aquicultura com a sonda de pH mergulhada na água"
          fill
          sizes="56vw"
          className="object-cover"
        />
      </div>

      {/* Linhas de ligação */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        className="pointer-events-none absolute inset-0 size-full"
      >
        {parts.map((part, i) => {
          const e = reveal(p, i)
          const leftSide = part.card.x < 50
          const sx = leftSide ? part.card.x + CARD.w : part.card.x
          const sy = part.card.y + CARD.imgH / 2
          const ax = TANK.left + TANK.w * part.anchor.x
          const ay = TANK.top + TANK.h * part.anchor.y
          const mx = (sx + ax) / 2
          return (
            <path
              key={part.name}
              d={`M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ay}, ${ax} ${ay}`}
              fill="none"
              stroke="var(--lime)"
              strokeWidth={0.12}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - e}
              opacity={0.9 * e}
            />
          )
        })}
      </svg>

      {/* Pontos no tanque */}
      {parts.map((part, i) => {
        const e = reveal(p, i)
        return (
          <span
            key={part.name}
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(var(--u) * ${TANK.left + TANK.w * part.anchor.x})`,
              top: `calc(var(--u) * ${TANK.top + TANK.h * part.anchor.y})`,
              opacity: e,
              transform: `translate(-50%, -50%) scale(${0.4 + 0.6 * e})`,
            }}
          >
            <span className="relative flex items-center justify-center">
              <span className="absolute size-[calc(var(--u)*2.2)] animate-ping rounded-full bg-lime/30" />
              <span className="flex size-[calc(var(--u)*1.5)] items-center justify-center rounded-full bg-lime text-[max(9px,calc(var(--u)*0.8))] font-extrabold text-olive">
                {i + 1}
              </span>
            </span>
          </span>
        )
      })}

      {/* Cartões dos componentes */}
      {parts.map((part, i) => {
        const e = reveal(p, i)
        const cx = part.card.x + CARD.w / 2
        const cy = part.card.y + CARD.h / 2
        const dx = (TANK.left + TANK.w / 2 - cx) * (1 - e)
        const dy = (TANK.top + TANK.h / 2 - cy) * (1 - e)
        return (
          <article
            key={part.name}
            className="glass-olive absolute overflow-hidden rounded-lg"
            style={{
              left: `calc(var(--u) * ${part.card.x})`,
              top: `calc(var(--u) * ${part.card.y})`,
              width: `calc(var(--u) * ${CARD.w})`,
              opacity: e,
              transform: `translate(calc(var(--u) * ${dx}), calc(var(--u) * ${dy})) scale(${0.45 + 0.55 * e})`,
              willChange: 'transform, opacity',
            }}
          >
            <div className="relative" style={{ height: `calc(var(--u) * ${CARD.imgH})` }}>
              <Image src={part.image} alt={part.name} fill sizes="20vw" className="object-cover" />
            </div>
            <div className="px-[calc(var(--u)*0.9)] py-[calc(var(--u)*0.7)]">
              <p className="flex items-center justify-between text-[max(9px,calc(var(--u)*0.7))] font-bold uppercase tracking-wide text-sage">
                <span>{part.tag}</span>
                <span className="text-lime">{String(i + 1).padStart(2, '0')}</span>
              </p>
              <p className="mt-[calc(var(--u)*0.3)] text-[max(11px,calc(var(--u)*1.2))] font-extrabold uppercase leading-none tracking-tight">
                {part.name}
              </p>
              <p className="mt-[calc(var(--u)*0.4)] text-[max(9px,calc(var(--u)*0.75))] leading-tight text-sage">
                {part.spec}
              </p>
            </div>
          </article>
        )
      })}

      {/* Legenda ativa */}
      <div
        className="absolute text-center"
        style={{
          left: `calc(var(--u) * ${TANK.left})`,
          width: `calc(var(--u) * ${TANK.w})`,
          top: `calc(var(--u) * 46.5)`,
        }}
        aria-live="polite"
      >
        {active ? (
          <div key={active.name}>
            <p className="font-serif text-[max(20px,calc(var(--u)*3))] leading-none text-lime">{active.name}</p>
            <p className="mx-auto mt-[calc(var(--u)*0.6)] max-w-[calc(var(--u)*44)] text-[max(12px,calc(var(--u)*1.25))] leading-snug text-sage">
              {active.text}
            </p>
          </div>
        ) : (
          <p
            className="caption flex items-center justify-center gap-2 text-sage"
            style={{ opacity: 1 - intro }}
          >
            Faz scroll para abrir o sistema
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden="true" />
          </p>
        )}
      </div>

      {/* Progresso */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 h-px -translate-x-1/2 bg-foreground/15"
        style={{ top: `calc(var(--u) * 54.5)`, width: `calc(var(--u) * 20)` }}
      >
        <div className="h-full origin-left bg-lime" style={{ transform: `scaleX(${p})` }} />
      </div>
    </div>
  )
}

function MobileStage({ p }: { p: number }) {
  const lastRevealed = parts.reduce((acc, _, i) => (p >= FIRST + i * STEP ? i : acc), -1)
  const part = lastRevealed >= 0 ? parts[lastRevealed] : null
  const zoom = 1.5 - 0.5 * easeOut(clamp(p / INTRO_END))

  return (
    <div className="flex h-svh w-full flex-col px-4 pb-6 pt-24">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-foreground/15">
        <div className="absolute inset-0" style={{ transform: `scale(${zoom})` }}>
          <Image
            src="/images/hero-tank.png"
            alt="Tanque de aquicultura com a sonda de pH mergulhada na água"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {parts.map((pt, i) => {
            const on = i === lastRevealed
            return (
              <span
                key={pt.name}
                aria-hidden="true"
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pt.anchor.x * 100}%`, top: `${pt.anchor.y * 100}%`, opacity: i <= lastRevealed ? 1 : 0 }}
              >
                <span className="relative flex items-center justify-center">
                  {on && <span className="absolute size-8 animate-ping rounded-full bg-lime/40" />}
                  <span
                    className={cn(
                      'flex size-5 items-center justify-center rounded-full text-[10px] font-extrabold transition-colors',
                      on ? 'bg-lime text-olive' : 'border border-lime bg-olive/70 text-lime',
                    )}
                  >
                    {i + 1}
                  </span>
                </span>
              </span>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex-1" aria-live="polite">
        {part ? (
          <article key={part.name} className="glass-olive overflow-hidden rounded-xl">
            <div className="relative aspect-[16/8] w-full">
              <Image src={part.image} alt={part.name} fill sizes="100vw" className="object-cover" />
            </div>
            <div className="p-4">
              <p className="caption flex justify-between text-sage">
                <span>{part.tag}</span>
                <span className="text-lime">
                  {String(lastRevealed + 1).padStart(2, '0')} / {String(parts.length).padStart(2, '0')}
                </span>
              </p>
              <p className="mt-2 font-serif text-3xl leading-none text-lime">{part.name}</p>
              <p className="mt-2 leading-snug text-sage">{part.text}</p>
              <p className="caption mt-3 text-foreground/70">{part.spec}</p>
            </div>
          </article>
        ) : (
          <p className="caption flex items-center justify-center gap-2 pt-10 text-sage">
            Faz scroll para abrir o sistema
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden="true" />
          </p>
        )}
      </div>
    </div>
  )
}

function StaticList() {
  return (
    <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {parts.map((part, i) => (
        <li key={part.name} className="glass-olive overflow-hidden rounded-xl">
          <div className="relative aspect-[16/9]">
            <Image src={part.image} alt={part.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          </div>
          <div className="p-4">
            <p className="caption flex justify-between text-sage">
              <span>{part.tag}</span>
              <span className="text-lime">{String(i + 1).padStart(2, '0')}</span>
            </p>
            <p className="mt-2 font-serif text-2xl text-lime">{part.name}</p>
            <p className="mt-1 text-sage">{part.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ExplodedView() {
  const track = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const p = useScrollProgress(track, !reduced)

  return (
    <section
      id="vista-explodida"
      aria-labelledby="explodida-title"
      className="topo-dark relative border-t border-foreground/10"
    >
      <div className="px-4 pt-32 md:px-5 md:pt-48">
        <SectionHeading
          id="explodida-title"
          index="03"
          eyebrow="Vista explodida"
          lines={[{ text: 'Por dentro' }, { text: 'do tanque', serif: true }]}
          description="Um tanque, cinco peças. Faz scroll e vê cada componente separar-se do sistema e ligar-se ao ponto onde atua."
        />
        {reduced && <StaticList />}
      </div>

      {!reduced && (
        <div ref={track} className="relative mt-16 h-[420svh]">
          <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
            <div className="hidden lg:block">
              <DesktopStage p={p} />
            </div>
            <div className="w-full lg:hidden">
              <MobileStage p={p} />
            </div>
          </div>
        </div>
      )}

      <div className={reduced ? 'h-32' : 'h-16 md:h-24'} />
    </section>
  )
}
