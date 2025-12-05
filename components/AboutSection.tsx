"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";
import GlitchText from "./GlitchText";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { theme } = useTheme();

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-20 py-24 bg-background-secondary"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl text-center md:text-3xl font-bold  mb-2"
          >
            {/* About */}
            <GlitchText>About</GlitchText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-muted-foreground"
          >
            Get to know more about me
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              Hello! My name is{" "}
              <span className="font-semibold text-primary">
                Jhon Brian Arce
              </span>
              , but you can call me{" "}
              <span className="font-semibold text-primary">Uncledev</span>. I'm
              22 years old and currently in my 4th year pursuing a Bachelor of
              Science in Information Technology.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              I'm passionate about learning new technologies, especially in web
              development, and I feel most confident working with Next.js and
              React, which I use for both school and client projects. I started
              learning programming in 2022, and it has really enhanced my
              logical thinking, problem-solving skills, and ability to learn new
              tools quickly.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              One of my proudest moments was when my project got featured in a
              school exhibit as a second-year student, competing alongside
              4th-year projects. Experiences like that keep me motivated to
              improve and push my limits.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              When I'm not coding, you'll probably find me at the gym or playing
              badminton, keeping my routine balanced and maintaining a healthy
              lifestyle. My goal is to become a software engineer and continue
              building applications that make an impact.
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, x: 0 }
                : { opacity: 0, scale: 0.8, x: 30 }
            }
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden">
              <Image
                src={theme === "light" ? "/logo.png" : "/logo-white.png"}
                alt="Jhon Brian Arce - UncleDev"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
