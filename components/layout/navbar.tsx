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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Briefcase01Icon size={20} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              InternTracker
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-6 w-px bg-border" />
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-in slide-in-from-top-4">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
