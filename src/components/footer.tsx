import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"]
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"]

const socials = [
  {
    label: "F",
    href: "https://www.facebook.com/photo/?fbid=504395449046559&set=a.134729652679809",
  d: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.005 10.125 11.854v-8.385H7.078v-3.469h3.047V9.429c0-3.02 1.792-4.688 4.533-4.688 1.312 0 2.686.236 2.686.236v2.953h-1.513c-1.491 0-1.956.931-1.956 1.887v2.256h3.328l-.532 3.469h-2.796v8.385C19.612 23.078 24 18.092 24 12.073Z",  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-razoan-kabir2007/",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rezwa_n_08/",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
]

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-heading text-sm uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div>
          <p className="font-heading text-6xl font-bold tracking-tight sm:text-7xl">
            Wanderlast
          </p>
          <p className="mt-3 text-sm text-white/70">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <FooterColumn title="Newsletter">
            <p className="mt-3 text-xs text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form action="#" className="mt-4 flex">
              <input
                type="email"
                required
                aria-label="Email"
                placeholder="Enter email"
                className="h-10 w-full min-w-0 border border-neutral-700 bg-neutral-900 px-3 text-sm outline-none placeholder:text-neutral-500 focus:border-neutral-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-11 shrink-0 items-center justify-center border border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700"
              >
                <ArrowUpRightIcon className="size-4" />
              </button>
            </form>
          </FooterColumn>
          <FooterColumn title="Quick Links">
            <ul className="mt-5 space-y-3 font-heading text-[15px]">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/85 transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
          <FooterColumn title="Support">
            <ul className="mt-5 space-y-3 font-heading text-[15px]">
              {supportLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/85 transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
          <FooterColumn title="Contact Us">
            <ul className="mt-5 space-y-6 font-heading text-[15px]">
              <li>
                <a
                  href="tel:7869011622"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  01788996192
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  rezwan9932@gmail.com
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
          <p className="text-xs text-white/60">
            &copy; 2026 Wanderlast. All rights reserved.Created by Rezwan.
          </p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/80 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d={social.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
