import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const parts = [
  {
    image: '/images/hw-esp32.png',
    caption: 'MCU · Cérebro do sistema',
    name: 'Microcontrolador ESP32',
    text: 'Processador dual-core com Wi-Fi e Bluetooth. Lê os sensores, executa a lógica de controlo localmente — mesmo sem Internet — e comanda os atuadores.',
    specs: [
      { k: 'CPU', v: 'Dual-core 240 MHz' },
      { k: 'Rede', v: 'Wi-Fi + BLE' },
      { k: 'Firmware', v: 'C / C++' },
    ],
    layout: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    image: '/images/hw-ph.png',
    caption: 'PH · Química da água',
    name: 'Sensor de pH',
    text: 'Sonda analógica que mede a acidez da água, com calibração por software.',
    specs: [
      { k: 'Escala', v: '0 – 14' },
      { k: 'Saída', v: 'Analógica' },
    ],
    layout: 'lg:col-span-5 lg:mt-40',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/images/hw-ds18b20.png',
    caption: 'TMP · Temperatura',
    name: 'Sensor DS18B20',
    text: 'Sensor digital à prova de água com protocolo 1-Wire, ideal para imersão contínua.',
    specs: [
      { k: 'Gama', v: '-55 a 125 °C' },
      { k: 'Precisão', v: '± 0,5 °C' },
    ],
    layout: 'lg:col-span-4',
    aspect: 'aspect-square',
  },
  {
    image: '/images/hw-servo.png',
    caption: 'ACT · Dosagem de ração',
    name: 'Servo Motor',
    text: 'Atuador controlado por PWM que roda o dispensador e liberta a dose exata.',
    specs: [
      { k: 'Controlo', v: 'PWM' },
      { k: 'Rotação', v: '0 – 180°' },
    ],
    layout: 'lg:col-span-4 lg:mt-24',
    aspect: 'aspect-square',
  },
  {
    image: '/images/hw-cam.png',
    caption: 'CAM · Visão do tanque',
    name: 'Câmara ESP32-CAM',
    text: 'Streaming em direto para verificação visual do depósito e da água.',
    specs: [
      { k: 'Sensor', v: 'OV2640 · 2 MP' },
      { k: 'Stream', v: 'Wi-Fi' },
    ],
    layout: 'lg:col-span-4 lg:mt-48',
    aspect: 'aspect-square',
  },
]

export function Hardware() {
  return (
    <section id="componentes" aria-labelledby="componentes-title" className="topo-light relative px-4 py-32 text-olive md:px-5 md:py-48">
      <SectionHeading
        id="componentes-title"
        index="03"
        eyebrow="Hardware & Tecnologias"
        tone="light"
        lines={[{ text: 'Os componentes' }, { text: 'do sistema', serif: true }]}
        description="Cinco peças de hardware acessível que, juntas, transformam um tanque comum num ecossistema inteligente."
      />

      <ul className="mt-20 grid gap-x-6 gap-y-14 md:mt-28 md:grid-cols-2 lg:grid-cols-12">
        {parts.map((part, i) => (
          <Reveal as="li" key={part.name} delay={(i % 3) * 100} className={cn('min-w-0', part.layout, i === 0 && 'md:col-span-2')}>
            <article className="group">
              <p className="caption mb-2 flex justify-between text-ink-muted">
                <span>{part.caption}</span>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </p>
              <div className={cn('relative overflow-hidden rounded-sm bg-olive', part.aspect)}>
                <Image
                  src={part.image}
                  alt={part.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale-[60%] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <dl className="glass-olive absolute inset-x-3 bottom-3 grid grid-flow-col divide-x divide-foreground/15 rounded-md text-foreground opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                  {part.specs.map((s) => (
                    <div key={s.k} className="min-w-0 px-3 py-2">
                      <dt className="caption text-sage">{s.k}</dt>
                      <dd className="mt-0.5 truncate text-sm font-bold">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <h3 className="mt-5 text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold uppercase leading-[0.9] tracking-tighter">
                {part.name}
              </h3>
              <p className="mt-3 max-w-md font-serif text-xl leading-tight text-ink-muted">{part.text}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
