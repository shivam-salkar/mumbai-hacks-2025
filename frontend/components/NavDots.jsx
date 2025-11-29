export default function NavDots({ activeIndex, total }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex md:flex-col gap-4 z-50">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-500 border border-white/50 ${
            activeIndex === index
              ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              : "bg-transparent scale-100"
          }`}
        />
      ))}
    </div>
  );
}
