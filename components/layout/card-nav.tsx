"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight01Icon } from "hugeicons-react";

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
}

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "expo.out",
  baseColor = "#fff",
  menuColor,
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        // Trigger reflow to get dimensions
        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1",
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[95%] max-w-225 z-99 top-[1.2rem] md:top-8 ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-15 p-0 rounded-2xl border-[3px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-15 flex items-center justify-between p-2 px-4 z-2">
          <div className="flex items-center gap-4">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-1.5`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              tabIndex={0}
              style={{ color: menuColor || "#000" }}
            >
              <div
                className={`hamburger-line w-7.5 h-0.75 bg-current transition-[transform,opacity,margin] duration-300 ease-linear origin-[50%_50%] ${
                  isHamburgerOpen ? "translate-y-[4.5px] rotate-45" : ""
                } group-hover:opacity-75`}
              />
              <div
                className={`hamburger-line w-7.5 h-0.75 bg-current transition-[transform,opacity,margin] duration-300 ease-linear origin-[50%_50%] ${
                  isHamburgerOpen ? "-translate-y-[4.5px] -rotate-45" : ""
                } group-hover:opacity-75`}
              />
            </div>

            <div className="logo-container flex items-center">
              <Link
                href="/"
                className="transition-transform hover:scale-105 active:scale-95 flex items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={logoAlt}
                  className="logo h-12 w-auto object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="text-black font-black uppercase text-[11px] px-3 py-1.5 hover:bg-black/5 transition-colors rounded-lg md:text-sm md:px-5 md:py-2"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-black text-white dark:bg-white dark:text-black font-black uppercase text-[11px] px-4 py-1.5 border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-black/90 transition-all md:text-sm md:px-6 md:py-2 md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Join
            </Link>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-15 bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-1 ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-3`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-6 rounded-2xl border-[3px] border-black/20 dark:border-white/20 min-w-0 flex-[1_1_auto] h-auto min-h-24 md:h-full md:min-h-0 md:flex-[1_1_0%] group/card overflow-hidden"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              {/* Subtle watermark logo in each card */}
              <div className="absolute top-6 right-6 opacity-[0.07] group-hover/card:opacity-15 transition-opacity pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt=""
                  className={`h-8 w-auto object-contain ${
                    item.bgColor === "#000" || item.bgColor === "black"
                      ? "invert"
                      : ""
                  }`}
                />
              </div>

              <div className="nav-card-label font-black uppercase tracking-tighter text-[24px] md:text-[32px] leading-none mb-2">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-2">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    className={`nav-card-link group/link inline-flex items-center gap-3 no-underline cursor-pointer transition-all duration-300 font-extrabold text-[15px] md:text-[16px] uppercase tracking-tighter w-fit px-3 py-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 ${
                      pathname === lnk.href
                        ? "underline decoration-4 underline-offset-4"
                        : "opacity-90"
                    }`}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={() => {
                      setIsHamburgerOpen(false);
                      tlRef.current?.reverse();
                    }}
                  >
                    <ArrowUpRight01Icon
                      size={18}
                      className="shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Mobile-only CTA Footer inside Expanded Menu */}
          <div className="mt-auto p-4 flex flex-col gap-3 md:hidden border-t-[3px] border-black/10 pt-8">
            <Link
              href="/auth/signup"
              className="w-full py-5 bg-black text-white text-center font-black uppercase tracking-tighter text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-[3px] border-black"
              onClick={() => {
                setIsHamburgerOpen(false);
                tlRef.current?.reverse();
              }}
            >
              Initialize Your Protocol
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
