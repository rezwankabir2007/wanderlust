import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

export function Cta() {
  return (
    <section className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <Image
        src="/image/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative">
        <h2 className="font-heading text-4xl text-white sm:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/90 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#"
          className="mt-8 inline-flex h-12 items-center gap-2 bg-white px-8 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-white/90"
        >
          Book Your Trip Today <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  )
}
