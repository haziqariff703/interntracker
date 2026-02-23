"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu01Icon, Cancel01Icon, Briefcase01Icon } from "hugeicons-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Applications", href: "/applications" },
  { label: "Internships", href: "/internships" },
  { label: "Companies", href: "/companies" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-2 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-black dark:bg-white p-2 rounded-lg border-2 border-black dark:border-white">
              <Briefcase01Icon
                size={20}
                className="text-white dark:text-black"
              />
            </div>
            <span className="font-black text-xl tracking-tighter text-black dark:text-white uppercase">
              InternTracker
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 font-bold text-sm uppercase tracking-tight">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-black/60 dark:hover:text-white/60 ${
                    pathname === item.href
                      ? "text-black dark:text-white underline underline-offset-4 decoration-2"
                      : "text-black/40 dark:text-white/40"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="h-6 w-[2px] bg-black dark:bg-white" />

            <div className="flex items-center gap-4">
              <Link href="/contact" className="brutal-btn text-xs uppercase">
                Contact
              </Link>
              <Link
                href="/auth/signin"
                className="brutal-btn-primary text-xs uppercase"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-black dark:border-white rounded-lg active:bg-black active:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b-2 border-black dark:border-white animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-8 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-lg font-black uppercase border-2 transition-all ${
                  pathname === item.href
                    ? "bg-black text-white border-black"
                    : "border-transparent text-black/60 dark:text-white/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth/signin"
              className="block px-4 py-4 text-center rounded-full bg-black dark:bg-white text-white dark:text-black font-black uppercase border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
