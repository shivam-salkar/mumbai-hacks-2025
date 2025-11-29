import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Aditi Rao",
    treatment: "Post-Virechana Care",
    rating: 5,
    text: "The authentic approach at Soujanya is unmatched. My chronic migraines have significantly reduced after just one session of Virechana.",
    location: "Bangalore",
  },
  {
    id: 2,
    name: "James Wilson",
    treatment: "Stress Management",
    rating: 5,
    text: "Coming from the UK, I was skeptical about traditional medicine. Soujanya changed my life. The atmosphere alone is healing.",
    location: "London, UK",
  },
  {
    id: 3,
    name: "Priya Menon",
    treatment: "Full Panchakarma",
    rating: 5,
    text: "A sanctuary for the soul. The facilities are modern yet rooted in tradition. I feel 10 years younger.",
    location: "Kochi",
  },
  {
    id: 4,
    name: "Arjun Gupta",
    treatment: "Sports Therapy",
    rating: 4,
    text: "Excellent recovery therapies. The herbal oil massages helped recover my muscle stiffness post-marathon better than physiotherapy.",
    location: "Mumbai",
  },
];

export default function ReviewsSection({ isActive }) {
  return (
    <section className="relative w-full h-screen snap-start flex flex-col justify-center items-center bg-[#0f1610] overflow-hidden py-10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-[0.05]" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div
        className={`z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center transition-all duration-1000 delay-300 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}>
        <div className="mb-8 md:mb-12 text-center">
          <Quote className="mx-auto text-green-500/50 w-10 h-10 mb-4" />
          <h2 className="text-3xl md:text-5xl font-cinzel text-white mb-3">
            Healing Stories
          </h2>
          <p className="text-green-400/60 uppercase tracking-widest text-xs">
            Voices of Transformation
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto md:overflow-visible max-h-[60vh] md:max-h-none pb-10 md:pb-0 scrollbar-hide">
          {REVIEWS.map((review, index) => (
            <article
              key={review.id}
              className="group relative bg-white/5 border border-white/5 hover:border-green-500/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-tl-[3rem] md:rounded-br-[3rem] transition-all duration-500 hover:bg-white/10 hover:-translate-y-2"
              style={{ transitionDelay: `${index * 150}ms` }}>
              <div className="flex gap-1 text-yellow-500 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-300 font-light italic text-sm md:text-base leading-relaxed mb-6 relative z-10">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-700 flex items-center justify-center text-white font-bold font-cinzel text-lg shadow-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-cinzel text-sm">
                    {review.name}
                  </h4>
                  <p className="text-green-400/70 text-[10px] uppercase tracking-wider">
                    {review.treatment}
                  </p>
                </div>
              </div>

              <Quote className="absolute top-4 right-4 text-white/5 w-16 h-16 rotate-180 transition-all duration-500 group-hover:text-green-500/10 group-hover:scale-110" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
