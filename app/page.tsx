import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="relative z-20">
        <AboutSection />
        <TechStackSection />
        <EducationSection />
      </div>
    </>
  );
}
