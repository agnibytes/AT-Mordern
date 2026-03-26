"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function Spotlight({ className, fill = "rgba(168, 85, 247, 0.15)" }) {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!spotlightRef.current) return;
      const { clientX, clientY } = e;
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, ${fill}, transparent 80%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [fill]);

  return (
    <div
      ref={spotlightRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-10 transition-opacity duration-300",
        className
      )}
    />
  );
}
