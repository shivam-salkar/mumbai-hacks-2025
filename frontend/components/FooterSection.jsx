export default function FooterSection({ isActive }) {
  return (
    <section className="relative w-full h-screen snap-start flex flex-col justify-center items-center bg-[#0d120e] text-center">
      <div
        className={`transition-all duration-1000 transform ${
          isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
        <h2 className="text-4xl md:text-8xl font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-green-800 to-green-950 font-bold mb-6 md:mb-8">
          SOUJANYA
        </h2>

        <div className="flex flex-wrap gap-4 md:gap-8 mb-8 md:mb-12 justify-center px-4">
          {["Instagram", "Twitter", "LinkedIn", "Email"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-gray-400 hover:text-green-400 transition-colors uppercase tracking-widest text-[10px] md:text-xs border-b border-transparent hover:border-green-400 pb-1">
              {social}
            </a>
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-6 text-gray-500 font-light text-xs md:text-sm">
          <p className="mb-4">
            123 Herb Garden Avenue, Wellness District, Kerala, India 682001
          </p>
          <p>
            © {new Date().getFullYear()} Soujanya Ayurveda. All rights reserved.
            <br />
            <span className="text-[10px] opacity-50">
              Designed with mindfulness.
            </span>
          </p>
        </div>

        <div className="mt-12 md:mt-16 animate-bounce">
          <button
            onClick={() =>
              document
                .getElementById("main-container")
                ?.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 text-green-500 hover:text-white transition-colors">
            <div className="h-8 md:h-12 w-[1px] bg-gradient-to-t from-current to-transparent" />
            <span className="text-[10px] md:text-xs tracking-widest uppercase">
              Back to Top
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
