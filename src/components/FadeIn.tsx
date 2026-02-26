"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    id?: string;
    onClick?: () => void;
    role?: string;
}

export function FadeIn({ children, className = "", delay = 0, id, onClick, role }: FadeInProps) {
    const { ref, isVisible } = useInView();

    return (
        <div
            ref={ref}
            id={id}
            role={role}
            onClick={onClick}
            className={`fade-in ${isVisible ? "visible" : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
