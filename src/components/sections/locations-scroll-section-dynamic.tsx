"use client";

import dynamic from "next/dynamic";

/** Leaflet touches `window` at import time — load only on the client. */
export const LocationsScrollSection = dynamic(
  () =>
    import("./locations-scroll-section").then(
      (mod) => mod.LocationsScrollSection,
    ),
  { ssr: false },
);
