"use client";

import { useViewportScroll, useTransform, motion } from "framer-motion";
import { Facebook, Github, Linkedin } from "lucide-react";
import { RiTiktokLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "./ui/button";
import { Typewriter } from "react-simple-typewriter";
import CircuitBoard from "./circuit-board";

export default function HeroSection() {
  const { scrollY } = useViewportScroll();

  // 3D perspective effect
  const scale = useTransform(scrollY, [0, 600], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.7]);
  const y = useTransform(scrollY, [0, 600], [0, -150]);
  const rotateX = useTransform(scrollY, [0, 600], [0, 10]);
  const rotateY = useTransform(scrollY, [0, 600], [0, -5]);

  const socials = [
    { provider: "facebook", link: "/", icon: Facebook },
    { provider: "github", link: "/", icon: Github },
    { provider: "linkedin", link: "/", icon: Linkedin },
    { provider: "tiktok", link: "/", icon: RiTiktokLine },
  ];

  const roles = [
    "Aspiring Software Engineer",
    "Backend Developer",
    "Frontend Developer",
    "Full Stack Developer",
  ];

  return (
    <motion.section
      style={{ scale, opacity, y, rotateX, rotateY, perspective: 1000 }}
      className="sticky top-0 h-screen "
    >
      <CircuitBoard>
        <div className="flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-5xl font-extrabold text-primary">
            Jhon Brian Verastigue Arce
          </h1>

          <h2 className="text-2xl mt-2 text-foreground">
            <Typewriter
              words={roles}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>

          <p className="max-w-md text-muted-foreground mt-4">
            I am a 4th year college student with a passion for development and a
            goal of becoming a successful Software Engineer.
          </p>

          <div className="flex gap-4 mt-6">
            {socials.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.link}
                  className="text-foreground hover:text-muted-foreground transition-colors"
                  target="_blank"
                >
                  <Icon size={24} />
                </Link>
              );
            })}
          </div>

          <Button className="mt-8">View My Work</Button>
        </div>
      </CircuitBoard>
    </motion.section>
  );
}
