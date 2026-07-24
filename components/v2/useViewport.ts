"use client";

import { useEffect, useState } from "react";

/** Dimensões do viewport com update em resize (SSR-safe). */
export function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const upd = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);
  return vp;
}
