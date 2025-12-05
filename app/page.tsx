import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="relative z-20 overflow-hidden">
        <AboutSection />
        <TechStackSection />
        <EducationSection />
        <ContactSection />
      </div>
    </>
  );
}
