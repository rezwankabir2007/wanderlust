
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon, UserRoundIcon, XIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
];

type User = {
  image?: string | null;
  name?: string | null;
  email?: string | null;
};

function NavLink({
  link,
  className,
  onClick,
}: {
  link: (typeof navLinks)[number];
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const isActive =
    link.href === "/"
      ? pathname === "/"
      : pathname.startsWith(link.href);

  return (
    <Link
      href={link.href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "text-sm font-medium whitespace-nowrap transition-colors hover:text-cyan-600",
        isActive ? "text-cyan-600" : "text-foreground",
        className
      )}
    >
      {link.label}
    </Link>
  );
}

function UserAvatar({ user }: { user: User }) {
  const fallback =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <Avatar>
      <AvatarImage
        src={user.image || undefined}
        alt={user.name || "User"}
        referrerPolicy="no-referrer"
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

function AuthLinks({
  className,
  user,
  onSignout,
}: {
  className?: string;
  user?: User;
  onSignout: () => Promise<void>;
}) {
  const [signingOut, setSigningOut] = useState(false);

  const handleSignout = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await onSignout();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <ul className={cn("items-center gap-6 text-sm font-medium", className)}>
      {user ? (
        <>
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-1.5 whitespace-nowrap hover:text-cyan-600"
            >
              <UserRoundIcon className="size-4" />
              Profile
            </Link>
          </li>

          <li>
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open account menu"
                    className="flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
                  >
                    <UserAvatar user={user} />
                  </button>
                }
              />

              <PopoverContent align="end" className="w-64">
                <PopoverHeader>
                  <PopoverTitle>
                    {user.name || "User"}
                  </PopoverTitle>

                  <PopoverDescription>
                    {user.email}
                  </PopoverDescription>
                </PopoverHeader>

                <div className="mt-3">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleSignout}
                    disabled={signingOut}
                  >
                    {signingOut ? "Signing out..." : "Sign out"}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              href="/login"
              className="whitespace-nowrap hover:text-cyan-600"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              href="/signup"
              className="whitespace-nowrap hover:text-cyan-600"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export function Navbar() {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }

    setMenuOpen(false);
    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="relative bg-background">
      <nav className="relative flex h-14 items-center px-5">
        <Link
          href="/"
          aria-label="Wanderlast Home"
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={154}
            height={31}
            className="h-auto w-[154px]"
          />
        </Link>

        <ul className="ml-10 hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink link={link} />
            </li>
          ))}
        </ul>

        <AuthLinks
          className="ml-auto hidden lg:flex"
          user={user}
          onSignout={handleSignout}
        />

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted lg:hidden"
        >
          {menuOpen ? (
            <XIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="px-5 pb-4 lg:hidden">
          <ul className="flex flex-col gap-3 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  link={link}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1"
                />
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-start gap-4 border-t pt-3">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-1.5 text-sm font-medium hover:text-cyan-600"
                >
                  <UserRoundIcon className="size-4" />
                  Profile
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleSignout}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium hover:text-cyan-600"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium hover:text-cyan-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </header>
  );
}
