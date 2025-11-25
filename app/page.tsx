import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <TechStackSection />
    </main>
  );
}
