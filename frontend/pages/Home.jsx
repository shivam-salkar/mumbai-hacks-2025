import { useEffect, useRef, useState } from "react";
import CustomCursor from "../components/CustomCursor";
import NavDots from "../components/NavDots";
import HeroSection from "../components/HeroSection";
import TherapiesSection from "../components/TherapiesSection";
import SplitSection from "../components/SplitSection";
import ReviewsSection from "../components/ReviewsSection";
import FooterSection from "../components/FooterSection";

const TOTAL_SECTIONS = 5;

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);
  const splitSectionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPosition / windowHeight);
      setActiveSection(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBeginJourney = () => {
    const container = containerRef.current;
    const target = splitSectionRef.current;
    if (!container || !target) return;
    container.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="font-sans bg-black text-white selection:bg-green-500 selection:text-white overflow-hidden">
      <CustomCursor />
      <NavDots activeIndex={activeSection} total={TOTAL_SECTIONS} />

      <main
        id="main-container"
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        <HeroSection isActive={activeSection === 0} onBeginJourney={handleBeginJourney} />
        <TherapiesSection isActive={activeSection === 1} />
        <SplitSection isActive={activeSection === 2} sectionRef={splitSectionRef} />
        <ReviewsSection isActive={activeSection === 3} />
        <FooterSection isActive={activeSection === 4} />
      </main>
    </div>
  );
}

