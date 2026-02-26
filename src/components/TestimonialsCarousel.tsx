"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
    {
        text: "«Мы очень рады, что выбрали именно Спарту. Руслан Мырзабаевич находит подход к каждому ребенку. Сын стал дисциплинированнее, сильнее и, самое главное, он с нетерпением ждет каждой тренировки!»",
        author: "Семья Касеновых",
        role: "Родители ученика",
    },
    {
        text: "«Отличная школа! Тренировки проходят интенсивно, но интересно. Ребенок заметно окреп физически и стал более уверенным в себе. Рекомендую всем!»",
        author: "Алия Ибраева",
        role: "Мама воспитанника",
    },
    {
        text: "«Занимаемся уже второй год. Очень нравится атмосфера в клубе. Тренер — настоящий профессионал своего дела, умеет мотивировать детей на результат.»",
        author: "Максат Омаров",
        role: "Папа юного чемпиона",
    },
];

export function TestimonialsCarousel() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
    const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <div className="flex flex-col items-center">
            <div className="relative min-h-[300px] flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="text-center"
                    >
                        <div className="mb-8 inline-flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="text-accent text-xl">★</span>
                            ))}
                        </div>
                        <blockquote className="text-xl md:text-2xl font-bold leading-relaxed mb-10 italic text-white/90 max-w-4xl mx-auto">
                            {TESTIMONIALS[index].text}
                        </blockquote>
                        <cite className="not-italic">
                            <div className="text-accent font-black tracking-widest uppercase mb-1">
                                {TESTIMONIALS[index].author}
                            </div>
                            <div className="text-foreground/40 text-xs uppercase tracking-tighter">
                                {TESTIMONIALS[index].role}
                            </div>
                        </cite>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-4 mt-12">
                <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group"
                >
                    <span className="text-white group-hover:scale-125 transition-transform">←</span>
                </button>
                <div className="flex items-center gap-2">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-accent w-6' : 'bg-white/20'}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group"
                >
                    <span className="text-white group-hover:scale-125 transition-transform">→</span>
                </button>
            </div>
        </div>
    );
}
