import { useMemo } from "react";
import { ArrowRight, Leaf, Sprout } from "lucide-react";
import useMousePosition from "../hooks/useMousePosition";
import AmbientBackground from "./AmbientBackground";

export default function HeroSection({ isActive, onBeginJourney }) {
  const { x, y } = useMousePosition();

  const transformStyle = useMemo(() => {
    if (
      typeof window === "undefined" ||
      window.innerWidth <= 768 ||
      !isActive
    ) {
      return undefined;
    }
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (x - centerX) / 150;
    const moveY = (y - centerY) / 150;
    return `perspective(1000px) rotateX(${-moveY * 0.5}deg) rotateY(${
      moveX * 0.5
    }deg)`;
  }, [x, y, isActive]);

  return (
    <section className="relative w-full h-screen snap-start flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2f1a] to-[#0f1c15]">
      <AmbientBackground />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div
        className={`relative z-10 w-[95%] md:w-[90%] h-[90%] md:h-[85%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-1000 ease-out ${
          isActive
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-10"
        }`}
        style={transformStyle ? { transform: transformStyle } : undefined}>
        <div className="text-center relative max-w-4xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400/30 blur-3xl rounded-full" />

          <p className="text-green-300 tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm font-light mb-4 uppercase">
            Ancient Wisdom, Modern Living
          </p>

          <h1 className="font-cinzel text-5xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 md:mb-8 drop-shadow-lg tracking-wide">
            SOUJANYA
          </h1>
          <p className="font-cinzel text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 md:mb-8 drop-shadow-lg tracking-wide">
            Panchakarma Therapy System
          </p>

          <p className="text-white/70 max-w-lg mx-auto text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10 px-4">
            Reconnecting your soul with nature through authentic Ayurvedic
            science and holistic healing therapies.
          </p>

          <button
            onClick={onBeginJourney}
            className="group relative px-6 md:px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
              Begin Journey{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        <Leaf className="absolute top-10 right-10 md:top-20 md:right-20 text-green-400/20 w-16 h-16 md:w-24 md:h-24 animate-float-slow opacity-50 md:opacity-100" />
        <Sprout className="absolute bottom-10 left-10 md:bottom-20 md:left-20 text-emerald-400/20 w-20 h-20 md:w-32 md:h-32 animate-float-slow opacity-50 md:opacity-100" />
      </div>
    </section>
  );
}
