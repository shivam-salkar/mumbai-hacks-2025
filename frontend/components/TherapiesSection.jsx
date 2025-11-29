import {
  Activity,
  ArrowRight,
  Clock,
  Droplets,
  Flame,
  Sprout,
  Wind,
} from "lucide-react";

const THERAPIES = [
  {
    title: "Vamana",
    subtitle: "Therapeutic Emesis",
    icon: Droplets,
    duration: "45-60 mins",
    focus: "Kapha Disorders",
    desc: "Controlled vomiting to expel toxins from the upper respiratory and gastric tracts.",
  },
  {
    title: "Virechana",
    subtitle: "Medical Purgation",
    icon: Flame,
    duration: "60-90 mins",
    focus: "Pitta Disorders",
    desc: "Therapeutic purgation to eliminate excessive heat and toxins from the liver.",
  },
  {
    title: "Nasya",
    subtitle: "Nasal Administration",
    icon: Wind,
    duration: "30-45 mins",
    focus: "ENT Care",
    desc: "Instillation of herbal oils through nasal passages to clear head and neck channels.",
  },
  {
    title: "Basti",
    subtitle: "Herbal Enema",
    icon: Sprout,
    duration: "40-60 mins",
    focus: "Vata Disorders",
    desc: "Medicated enema to balance the primary dosha and disperse deep-rooted toxins.",
  },
];

export default function TherapiesSection({ isActive }) {
  return (
    <section className="relative w-full h-screen snap-start flex flex-col justify-center items-center bg-[#141e16] overflow-hidden py-4 md:py-8">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0b] via-transparent to-[#0a0f0b] opacity-80" />

      <div
        className={`z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center transition-all duration-1000 delay-300 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}>
        <div className="mb-6 md:mb-10 text-center flex-shrink-0">
          <p className="text-green-400 uppercase tracking-widest text-[10px] md:text-xs mb-2">
            Ayurvedic Purification
          </p>
          <h2 className="text-3xl md:text-5xl font-cinzel text-white mb-5">
            Panchakarma Therapies
          </h2>
          <div className="h-[1px] w-24 md:w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto" />
        </div>

        <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory pb-8 md:pb-0 px-2 md:px-0 scrollbar-hide">
          {THERAPIES.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="snap-center flex-shrink-0 w-[85vw] md:w-auto h-[45vh] md:h-auto md:min-h-[350px] group relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 hover:border-green-500/40 rounded-2xl p-6 mt-4 transition-all duration-500 md:hover:-translate-y-2 hover:bg-white/[0.07] overflow-hidden">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-400/10 transition-all duration-500" />

                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-green-400 group-hover:text-white group-hover:bg-green-600/80 transition-all duration-300 shadow-lg shadow-black/20">
                    <Icon />
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-gray-400 font-mono tracking-tighter">
                      EST. TIME
                    </span>
                    <div className="flex items-center justify-end gap-1 text-xs text-green-300 font-medium">
                      <Clock size={12} /> {item.duration}
                    </div>
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-cinzel tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-green-400/80 uppercase tracking-wider mb-3 md:mb-4 font-semibold">
                    {item.subtitle}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors line-clamp-4 md:line-clamp-none">
                    {item.desc}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-green-300 transition-colors">
                      <Activity size={14} />
                      <span className="font-medium">{item.focus}</span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
