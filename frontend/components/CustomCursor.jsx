import useMousePosition from "../hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out hidden md:block"
      style={{
        transform: `translate(${x - 16}px, ${y - 16}px)`,
      }}>
      <div className="w-full h-full bg-white rounded-full opacity-50 blur-sm animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-green-400/20 rounded-full blur-3xl" />
    </div>
  );
}
