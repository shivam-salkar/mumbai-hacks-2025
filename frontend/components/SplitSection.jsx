import { useEffect, useState } from "react";
import { Stethoscope, User } from "lucide-react";

export default function SplitSection({ isActive, sectionRef }) {
  const [hovered, setHovered] = useState(null);

  const buildClasses = (side) => {
    const isCurrent = hovered === side;
    const isOpposite = hovered && hovered !== side;
    const baseHeight = isCurrent
      ? "h-[65%] md:h-full"
      : isOpposite
      ? "h-[35%] md:h-full"
      : "h-1/2 md:h-full";
    const baseWidth = isCurrent
      ? "md:w-[65%]"
      : isOpposite
      ? "md:w-[35%]"
      : "md:w-1/2";
    return `${baseHeight} ${baseWidth}`;
  };

  useEffect(() => {
    if (!isActive) {
      setHovered(null);
    }
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen snap-start flex flex-col md:flex-row overflow-hidden bg-black transition-opacity duration-700">
      <article
        className={`relative transition-all duration-700 ease-in-out cursor-pointer flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/10 ${buildClasses(
          "left"
        )} w-full bg-[#1a2f1a]`}
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620733723572-11c52f7c2d82?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay md:hover:scale-110 transition-transform duration-[2s]" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />

        <div className="relative z-10 text-center p-6 md:p-8 transition-all duration-500">
          <Stethoscope
            className={`mx-auto mb-4 md:mb-6 text-white w-12 h-12 md:w-16 md:h-16 transition-all duration-500 ${
              hovered === "left" ? "scale-125 text-green-400" : "scale-100"
            }`}
          />
          <h2 className="text-2xl md:text-5xl font-cinzel font-bold text-white mb-2 md:mb-4">
            Practitioner
          </h2>
          <p
            className={`text-gray-300 text-sm md:text-base max-w-sm mx-auto transition-all duration-500 ${
              hovered === "left"
                ? "opacity-100 max-h-20"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}>
            Join our network of expert healers.
          </p>
          <button
            className={`mt-4 md:mt-6 px-6 py-2 border border-white/30 rounded-full text-white text-sm md:text-base hover:bg-white hover:text-green-900 transition-all duration-500 ${
              hovered === "left"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}>
            Login Portal
          </button>
        </div>
      </article>

      <article
        className={`relative transition-all duration-700 ease-in-out cursor-pointer flex items-center justify-center overflow-hidden ${buildClasses(
          "right"
        )} w-full bg-[#2c3e2e]`}
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay md:hover:scale-110 transition-transform duration-[2s]" />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-black/60 to-transparent" />

        <div className="relative z-10 text-center p-6 md:p-8 transition-all duration-500">
          <User
            className={`mx-auto mb-4 md:mb-6 text-white w-12 h-12 md:w-16 md:h-16 transition-all duration-500 ${
              hovered === "right" ? "scale-125 text-emerald-400" : "scale-100"
            }`}
          />
          <h2 className="text-2xl md:text-5xl font-cinzel font-bold text-white mb-2 md:mb-4">
            Patient
          </h2>
          <p
            className={`text-gray-300 text-sm md:text-base max-w-sm mx-auto transition-all duration-500 ${
              hovered === "right"
                ? "opacity-100 max-h-20"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}>
            Begin your journey to wellness.
          </p>
          <button
            className={`mt-4 md:mt-6 px-6 py-2 border border-white/30 rounded-full text-white text-sm md:text-base hover:bg-white hover:text-green-900 transition-all duration-500 ${
              hovered === "right"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}>
            Book Session
          </button>
        </div>
      </article>

      <div
        className="absolute left-0 md:left-1/2 top-1/2 md:top-0 right-0 bottom-1/2 md:bottom-0 h-[1px] md:h-auto w-auto md:w-[1px] bg-white/20 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      />
    </section>
  );
}
