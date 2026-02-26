"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "О тренере", href: "#about" },
        { name: "Программы", href: "#programs" },
        { name: "Расписание", href: "#schedule" },
        { name: "Галерея", href: "#gallery" },
        { name: "Контакты", href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "bg-transparent py-6"
                }`}
            style={isScrolled ? {
                background: "rgba(10,10,12,0.75)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
            } : undefined}
        >
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(230,25,25,0.6)]">
                        <Image
                            src="/assets/logo.jpg"
                            alt="Sparta Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-2xl font-black italic tracking-tighter group-hover:text-accent transition-colors duration-300">
                        SPARTA <span className="text-accent">TEAM</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-colors duration-200"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* CTA Button (desktop) */}
                <a
                    href="#apply-form"
                    className="hidden md:block px-5 py-2 bg-accent hover:bg-accent-muted text-white text-xs font-black rounded-full transition-all tracking-widest uppercase shadow-[0_0_0_0_rgba(230,25,25,0.0)] hover:shadow-[0_0_20px_rgba(230,25,25,0.4)] hover:scale-105"
                >
                    Записаться
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Меню"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div
                className={`overflow-hidden transition-all duration-400 md:hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <nav
                    className="flex flex-col gap-1 px-4 py-4 border-b-2 border-accent/30"
                    style={{
                        background: "rgba(8,8,10,0.97)",
                        backdropFilter: "blur(24px)",
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-widest py-3 border-b border-white/5 hover:text-accent hover:pl-2 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#apply-form"
                        className="mt-3 text-center py-3 bg-accent hover:bg-accent-muted text-white text-sm font-black rounded-full tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(230,25,25,0.3)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Записаться бесплатно
                    </a>
                </nav>
            </div>
        </header>
    );
}
