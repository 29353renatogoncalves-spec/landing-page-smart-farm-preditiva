'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandMark, BrandWordmark } from './brand'

const links = [
  { href: '#projeto', label: 'O Projeto' },
  { href: '#arquitetura', label: 'Arquitetura' },
  { href: '#vista-explodida', label: 'Vista explodida' },
  { href: '#componentes', label: 'Componentes' },
  { href: '#autor', label: 'Autor' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegação principal"
        className="flex items-start justify-between gap-4 px-4 pt-4 md:px-5"
      >
        <a
          href="#topo"
          aria-label="SmartFarm — voltar ao topo"
          className="pointer-events-auto text-foreground mix-blend-difference"
        >
          <BrandWordmark />
        </a>

        <ul className="pointer-events-auto hidden items-center gap-1 rounded-lg glass-olive p-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="caption block rounded-md px-4 py-2.5 text-foreground/80 transition-colors hover:bg-lime hover:text-olive"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href="#componentes"
            className="flex h-12 items-center gap-2 rounded-lg bg-lime px-4 text-sm font-extrabold uppercase tracking-tight text-olive transition-transform hover:-translate-y-0.5"
          >
            <Cpu className="size-4" aria-hidden="true" />
            Hardware
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
            className="group relative flex size-12 items-center justify-center rounded-lg border border-foreground/40 bg-olive/40 backdrop-blur transition-colors hover:border-lime lg:hidden"
          >
            <span
              className={cn(
                'absolute h-0.5 w-5 bg-foreground transition-transform duration-300',
                open ? 'rotate-45' : '-translate-x-1 translate-y-1',
              )}
            />
            <span
              className={cn(
                'absolute h-0.5 w-5 bg-foreground transition-transform duration-300',
                open ? '-rotate-45' : 'translate-x-1 -translate-y-1',
              )}
            />
          </button>
        </div>
      </nav>

      <div
        id="menu-overlay"
        className={cn(
          'pointer-events-auto fixed inset-0 -z-10 flex flex-col justify-between bg-lime px-5 pb-8 pt-28 text-olive transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden',
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]',
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col">
          {links.map((link, i) => (
            <li key={link.href} className="border-b border-olive/15">
              <a
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 text-[clamp(2.25rem,10vw,4rem)] font-extrabold uppercase leading-none tracking-tight"
              >
                <span>
                  <span className="mr-3 align-top text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </span>
                <ArrowUpRight className="size-8 transition-transform group-hover:rotate-45" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between">
          <p className="caption max-w-[14rem]">PAP · Escola Secundária Augusto Gomes</p>
          <BrandMark className="size-10" />
        </div>
      </div>
    </header>
  )
}
