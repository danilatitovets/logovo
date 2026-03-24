"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type CarWheelGraphicProps = {
  className?: string;
};

/**
 * Колесо в чёрно-серой гамме (шина + диск + спицы).
 */
export function CarWheelGraphic({ className }: CarWheelGraphicProps) {
  const uid = useId().replace(/:/g, "");
  const spokes = [0, 72, 144, 216, 288] as const;

  const gid = (s: string) => `${s}-${uid}`;

  return (
    <svg
      className={cn(className)}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id={gid("tire")} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#171717" />
          <stop offset="55%" stopColor="#0f0f0f" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <radialGradient id={gid("rim")} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="55%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#27272a" />
        </radialGradient>
        <radialGradient id={gid("hub")} cx="45%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#18181b" />
        </radialGradient>
      </defs>

      <g transform="translate(100 100)">
        <circle r="96" fill={`url(#${gid("tire")})`} />
        <circle
          r="91"
          fill="none"
          stroke="#262626"
          strokeWidth="16"
          strokeDasharray="5 6"
          strokeLinecap="square"
          opacity={0.95}
        />
        <circle
          r="91"
          fill="none"
          stroke="#3f3f46"
          strokeWidth="5"
          strokeDasharray="2 8"
          strokeLinecap="round"
          opacity={0.45}
          transform="rotate(18)"
        />

        <circle r="80" fill="#111111" stroke="#27272a" strokeWidth="0.75" />
        <circle r="71" fill="none" stroke="#3f3f46" strokeWidth="1" opacity={0.6} />

        <circle r="64" fill={`url(#${gid("rim")})`} stroke="#52525b" strokeWidth="0.5" />

        <circle
          r="58"
          fill="none"
          stroke="#18181b"
          strokeWidth="9"
          strokeDasharray="1.5 5"
          strokeLinecap="round"
          opacity={0.5}
        />

        {spokes.map((deg) => (
          <path
            key={deg}
            d="M -10 -24 L 10 -24 L 13 -66 L -13 -66 Z"
            fill="#4b4b4f"
            stroke="#3f3f46"
            strokeWidth="0.4"
            transform={`rotate(${deg})`}
          />
        ))}

        <circle r="20" fill={`url(#${gid("hub")})`} stroke="#52525b" strokeWidth="0.5" />

        {[0, 72, 144, 216, 288].map((deg) => (
          <circle
            key={`lug-${deg}`}
            r="3"
            cx={0}
            cy={-26}
            fill="#27272a"
            stroke="#52525b"
            strokeWidth="0.3"
            transform={`rotate(${deg})`}
          />
        ))}

        <circle r="7" fill="#0a0a0a" stroke="#3f3f46" strokeWidth="0.45" />
      </g>
    </svg>
  );
}
