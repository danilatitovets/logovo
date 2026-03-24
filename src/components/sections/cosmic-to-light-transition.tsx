export function CosmicToLightTransition() {
  return (
    <section className="relative h-36 overflow-hidden bg-black md:h-48" aria-hidden data-header-theme="dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_12%,rgba(255,255,255,0.06),transparent_60%)]" />

      <span className="hero-star-twinkle absolute left-[8%] top-[18%] h-[2px] w-[2px] rounded-full bg-white/70" style={{ animationDuration: "3.2s" }} />
      <span className="hero-star-twinkle absolute left-[22%] top-[30%] h-[2px] w-[2px] rounded-full bg-white/55" style={{ animationDuration: "4.1s" }} />
      <span className="hero-star-twinkle absolute left-[37%] top-[22%] h-[1.5px] w-[1.5px] rounded-full bg-white/60" style={{ animationDuration: "3.8s" }} />
      <span className="hero-star-twinkle absolute left-[51%] top-[16%] h-[2px] w-[2px] rounded-full bg-white/75" style={{ animationDuration: "3.5s" }} />
      <span className="hero-star-twinkle absolute left-[66%] top-[27%] h-[1.5px] w-[1.5px] rounded-full bg-white/60" style={{ animationDuration: "4.4s" }} />
      <span className="hero-star-twinkle absolute left-[81%] top-[20%] h-[2px] w-[2px] rounded-full bg-white/70" style={{ animationDuration: "3.1s" }} />
      <span className="hero-star-twinkle absolute left-[92%] top-[32%] h-[1.5px] w-[1.5px] rounded-full bg-white/55" style={{ animationDuration: "4.7s" }} />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent via-white/55 to-white md:h-32" />
    </section>
  );
}
