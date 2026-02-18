
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Lock body scroll when the mobile drawer is open
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-[var(--border)] shadow-[var(--shadow-soft)]">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Logo className="shrink-0" />
            </div>

            <div className="hidden md:flex items-center gap-2">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      active
                        ? "text-[var(--brand-2)] bg-[rgba(11,58,106,0.08)]"
                        : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[rgba(15,23,42,0.06)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="ml-2 flex items-center gap-2">
                <Button href="/contact" variant="secondary" className="py-2 px-4">
                  Get Quote
                </Button>
                <Button href="/admin" className="py-2 px-4">
                  Admin
                </Button>
              </div>
            </div>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[var(--border)] bg-white/70 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <svg
                className="w-6 h-6 text-[var(--text)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile overlay + drawer */}
          <div
            className={`md:hidden fixed inset-0 z-[60] ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!open}
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/35 transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <div
              className={`absolute right-0 top-0 h-full w-[88vw] max-w-[360px] bg-white shadow-[var(--shadow-medium)] transition-transform duration-200 ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                <Logo variant="mark" />
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[var(--border)] bg-white hover:bg-[var(--surface-2)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 text-[var(--text)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-2">
                  {nav.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors ${
                          active
                            ? "text-[var(--brand-2)] bg-white border border-[var(--border)]"
                            : "text-[var(--text)] hover:bg-white"
                        }`}
                      >
                        {item.label}
                        <span className="text-[var(--muted-2)]">→</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2">
                  <Button href="/contact" variant="secondary" className="w-full py-3">
                    Get Quote
                  </Button>
                  <Button href="/admin" className="w-full py-3">
                    Admin
                  </Button>
                </div>
              </div>

              <div className="mt-auto p-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
                Premium Himalayan experiences • Local support
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
