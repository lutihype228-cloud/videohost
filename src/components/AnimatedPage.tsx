"use client";

import React, { useEffect, useState } from "react";

export default function AnimatedPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // honor reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(true);
      return;
    }
    const t = window.setTimeout(() => setMounted(true), 18);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${className ?? ""} ${mounted ? "fade-in-up" : "opacity-0"}`}>
      {children}
    </div>
  );
}
