"use client";

import { useTransform, motion, useScroll } from "framer-motion";
import { Facebook, Github, Linkedin } from "lucide-react";
import { RiTiktokLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "./ui/button";
import { Typewriter } from "react-simple-typewriter";
import Particles from "./particles";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const router = useRouter();
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100 && lastScrollY >= 100) {
        setShouldAnimate(false);
        setTimeout(() => setShouldAnimate(true), 50);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 3D perspective effect
  const scale = useTransform(scrollY, [0, 600], [1, 0.85]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.75]);
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const rotateX = useTransform(scrollY, [0, 600], [0, 8]);
  const rotateY = useTransform(scrollY, [0, 600], [0, -4]);

  const socials = [
    {
      provider: "facebook",
      link: "https://www.facebook.com/verastigue18",
      icon: Facebook,
    },
    { provider: "github", link: "https://github.com/dev-uncle", icon: Github },
    {
      provider: "linkedin",
      link: "https://www.linkedin.com/in/uncle-dev/",
      icon: Linkedin,
    },
    {
      provider: "tiktok",
      link: "https://www.tiktok.com/@uncledevs",
      icon: RiTiktokLine,
    },
  ];

  const roles = [
    "Aspiring Software Engineer",
    "Backend Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Vibe Coder",
  ];

  return (
    <motion.section
      ref={ref}
      style={{ scale, opacity, y, rotateX, rotateY, perspective: 1000 }}
      className="
        sticky top-0 
        h-[90vh] sm:h-screen 
        w-full flex items-center justify-center 
        z-0 px-4
      "
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#2b2b2d", "#2b2b2d"]}
          particleCount={300} // reduce for mobile
          particleSpread={8}
          speed={0.1}
          particleBaseSize={50}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Foreground Content */}
      <div
        ref={contentRef}
        className="
          flex flex-col items-center justify-center 
          text-center relative z-10 max-w-full
        "
      >
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            font-extrabold text-primary 
            text-3xl sm:text-4xl md:text-5xl
          "
        >
          Jhon Brian Verastigue Arce
        </motion.h1>

        {/* Typewriter Role */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl mt-2 text-foreground"
        >
          <Typewriter
            words={roles}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="
            text-sm sm:text-base 
            max-w-xs sm:max-w-sm md:max-w-md 
            text-muted-foreground mt-4
          "
        >
          I am a 4th year college student with a passion for development and a
          goal of becoming a successful Software Engineer.
        </motion.p>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            shouldAnimate
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex gap-3 sm:gap-4 mt-6"
        >
          {socials.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Link
                  href={item.link}
                  className="
                    text-foreground hover:text-muted-foreground 
                    transition-colors
                  "
                  target="_blank"
                >
                  <Icon size={22} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View Work Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        >
          <Button
            className="mt-8 px-6 py-2 text-sm sm:text-base"
            onClick={() => router.push("/projects")}
          >
            View My Work
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
