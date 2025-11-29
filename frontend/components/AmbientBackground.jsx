export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      <div className="absolute top-10 left-10 w-64 md:w-96 h-64 md:h-96 bg-green-500/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-emerald-800/30 rounded-full blur-[80px] md:blur-[100px] animate-pulse delay-1000" />
    </div>
  );
}
