import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import HeroSection from "@/components/HeroSection";
import ProjectSection from "@/components/ProjectSection";
import ServiceSection from "@/components/ServiceSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="relative z-20 overflow-hidden">
        <AboutSection />
        <SkillsSection />
        <ProjectSection />
        <ServiceSection />
        <EducationSection />
        <ContactSection />
      </div>
    </>
  );
}
