import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

const searchFields = [
  { label: "Location", placeholder: "Address, City, Or Zip", type: "text" },
  { label: "Date/Duration", placeholder: "Anytime / 3 Days", type: "text" },
  { label: "Budget", placeholder: "$2-$25000", type: "text" },
  { label: "People", placeholder: "2-10", type: "text" },
]

function SearchBar() {
  return (
    <form
      action="#"
      className="grid grid-cols-1 gap-px bg-white/20 sm:grid-cols-2 md:grid-cols-5"
    >
      {searchFields.map((field) => (
        <div key={field.label} className="bg-white/75 px-6 py-4 backdrop-blur-sm">
          <label
            htmlFor={`banner-search-${field.label}`}
            className="text-[13px] font-semibold text-gray-800"
          >
            {field.label}
          </label>
          <input
            id={`banner-search-${field.label}`}
            name={field.label.toLowerCase()}
            type={field.type}
            placeholder={field.placeholder}
            className="mt-1 w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-cyan-600 px-6 py-4 text-sm font-semibold uppercase text-white hover:bg-cyan-700"
      >
        Search
      </button>
    </form>
  )
}

export function Banner() {
  return (
    <section className="relative flex min-h-[680px] flex-1 flex-col overflow-hidden">
      <Image
        src="/image/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="font-heading text-5xl leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/90">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#"
              className="flex h-12 items-center gap-2 bg-cyan-600 px-7 text-sm font-semibold uppercase tracking-wide text-white hover:bg-cyan-700"
            >
              Explore Now <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="#"
              className="flex h-12 items-center bg-slate-200/90 px-7 text-sm font-semibold uppercase tracking-wide text-slate-800 hover:bg-slate-200"
            >
              View Destination
            </Link>
          </div>
        </div>
        <SearchBar />
      </div>
    </section>
  )
}
