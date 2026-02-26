"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface CounterProps {
    end: number;
    duration?: number;
    label?: string;
    suffix?: string;
}

export function Counter({ end, duration = 2000, label, suffix = "" }: CounterProps) {
    const [count, setCount] = useState(0);
    const { ref, isVisible } = useInView();
    const hasStarted = useRef(false);

    useEffect(() => {
        if (isVisible && !hasStarted.current) {
            hasStarted.current = true;
            let start = 0;
            const increment = end / (duration / 16); // 60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isVisible, end, duration]);

    return (
        <div ref={ref} className="flex flex-col">
            <div className="text-4xl md:text-5xl font-black text-white mb-2 underline decoration-accent/30 decoration-8 underline-offset-[-2px]">
                {count}{suffix}
            </div>
            {label && (
                <div className="text-sm uppercase tracking-tighter opacity-60">
                    {label}
                </div>
            )}
        </div>
    );
}
