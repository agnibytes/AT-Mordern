"use client";

import { cn } from "@/lib/utils";

export default function GridBackground({ className }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0",
        "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]",
        "bg-[size:64px_64px]",
        "[mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_70%,transparent_100%)]",
        className
      )}
    />
  );
}
