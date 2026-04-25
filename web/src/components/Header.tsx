"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, User } from "lucide-react";

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const navLinks = [
        { label: "Retreat", href: "/retreat" },
        { label: "Enrollment", href: "/enrollment" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "Inventory", href: "/inventory" },
    ];

    return (
        <>
            <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-[#0a0612]/95 backdrop-blur-xl">
                <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-lg font-bold tracking-[0.3em] text-[#8b5cf6] uppercase hover:text-[#a78bfa] transition-colors flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        ALIRA
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map(l => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 hover:text-white transition-colors duration-200"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6">
                        <Link
                            href="/login"
                            className="px-5 py-2 bg-[#8b5cf6] text-white text-[11px] font-bold tracking-[0.18em] uppercase rounded-full hover:bg-white transition-all duration-200 btn-primary"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setOpen(true)}
                            className="text-white/60 hover:text-white transition-colors p-1"
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile drawer */}
            {open && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[75vw] max-w-[300px] bg-[#0a0612] border-l border-white/[0.08] flex flex-col p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-8 sm:mb-10">
                            <span className="text-base font-bold tracking-[0.3em] text-[#8b5cf6] uppercase flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                ALIRA
                            </span>
                            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors" aria-label="Close menu">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-1">
                            {navLinks.map(l => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="py-4 sm:py-4 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 hover:text-white border-b border-white/[0.06] transition-colors"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto space-y-3">
                            <Link
                                href="/login"
                                onClick={() => setOpen(false)}
                                className="block w-full text-center py-4 bg-[#8b5cf6] text-white text-[11px] font-bold tracking-[0.18em] uppercase rounded-full hover:bg-white transition-colors btn-primary"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
