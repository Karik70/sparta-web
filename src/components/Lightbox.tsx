"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryPhoto {
    src: string;
    label: string;
    local: boolean;
}

interface LightboxProps {
    photos: GalleryPhoto[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

export function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
    const [[page, direction], setPage] = useState([index, 0]);

    // Update internal page when parent index changes
    useEffect(() => {
        setPage([index, index > page ? 1 : -1]);
    }, [index, page]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose, onPrev, onNext]);

    const photo = photos[index];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 touch-none"
            onClick={onClose}
        >
            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold tracking-[0.3em] uppercase z-[110]">
                {index + 1} / {photos.length}
            </div>

            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-xl font-light z-[110]"
                aria-label="Закрыть"
            >
                ✕
            </button>

            {/* Prev */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="hidden md:flex absolute left-10 w-12 h-12 rounded-full bg-white/5 hover:bg-accent/80 items-center justify-center transition-all text-white text-2xl z-[110]"
                aria-label="Предыдущее"
            >
                ‹
            </button>

            {/* Image Container */}
            <div
                className="relative w-full h-[80vh] md:h-[85vh] flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                onNext();
                            } else if (swipe > swipeConfidenceThreshold) {
                                onPrev();
                            }
                        }}
                        className="absolute w-full h-full flex items-center justify-center px-4 md:px-20"
                    >
                        {photo.local ? (
                            <Image
                                src={photo.src}
                                alt={photo.label}
                                width={1200}
                                height={800}
                                className="object-contain w-full h-full rounded-xl pointer-events-none"
                                priority
                            />
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={photo.src.replace("/s768/", "/w1440/")}
                                alt={photo.label}
                                className="object-contain w-full h-full rounded-xl pointer-events-none"
                            />
                        )}
                        <div className="absolute bottom-4 left-0 right-0 p-4 text-center">
                            <span className="text-white/70 text-sm font-bold uppercase tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
                                {photo.label}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Next */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="hidden md:flex absolute right-10 w-12 h-12 rounded-full bg-white/5 hover:bg-accent/80 items-center justify-center transition-all text-white text-2xl z-[110]"
                aria-label="Следующее"
            >
                ›
            </button>
        </div>
    );
}

