"use client";

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { MenuIcon, UserRoundIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "Add Destinations", href: "/add-destination", active: false },
  { label: "My Bookings", href: "#", active: false },
  // { label: "Admin", href: "#", active: false },
]

function NavLink({
  link,
  className,
  onClick,
}: {
  link: (typeof navLinks)[number]
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={link.href}
      aria-current={link.active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "text-sm font-medium whitespace-nowrap transition-colors hover:text-cyan-600",
        link.active ? "text-cyan-600" : "text-foreground",
        className
      )}
    >
      {link.label}
    </Link>
  )
}

function AuthLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("items-center gap-6 text-sm font-medium", className)}>
      <li>
        <Link href="#" className="flex items-center gap-1.5 whitespace-nowrap hover:text-cyan-600">
          <UserRoundIcon className="size-4" /> Profile
        </Link>
      </li>
      <li>
        <Link href="#" className="whitespace-nowrap hover:text-cyan-600">
          Login
        </Link>
      </li>
      <li>
        <Link href="#" className="whitespace-nowrap hover:text-cyan-600">
          Sign Up
        </Link>
      </li>
    </ul>
  )
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative bg-background">
      <nav className="relative flex h-14 items-center px-5">
        {/* Centered on desktop, flows to the left on mobile */}
        <Link href="#" className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={154}
            height={31}
            priority
            style={{ width: 'auto', height: 'auto' }} // 👈 এটি যোগ করলে ওয়ার্নিং চলে যাবে
          />
        </Link>
        <ul className="ml-10 hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink link={link} />
            </li>
          ))}
        </ul>
        <AuthLinks className="ml-auto hidden lg:flex" />
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted lg:hidden"
        >
          {menuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </nav>
      {menuOpen && (
        <div className="px-5 pb-4 lg:hidden">
          <ul className="flex flex-col gap-3 py-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  link={link}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1"
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start gap-3 border-t pt-3">
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap hover:text-cyan-600"
            >
              <UserRoundIcon className="size-4" /> Profile
            </Link>
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium whitespace-nowrap hover:text-cyan-600"
            >
              Login
            </Link>
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium whitespace-nowrap hover:text-cyan-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </header>
  )
}
