"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * При смене маршрута убиваем все ScrollTrigger до того, как React закончит сносить DOM —
 * иначе GSAP может вызвать removeChild на уже отвязанных узлах (Next.js App Router).
 */
export function ScrollTriggerRouteCleanup() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        st.kill();
      });
    };
  }, [pathname]);

  return null;
}
