import { BrandMark } from './brand'

export function Loader() {
  return (
    <div
      aria-hidden="true"
      className="loader pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-lime text-olive"
    >
      <div className="loader-mark flex flex-1 items-center">
        <BrandMark className="size-14" />
      </div>
      <p className="loader-mark caption pb-8">Load SmartFarm</p>
    </div>
  )
}
