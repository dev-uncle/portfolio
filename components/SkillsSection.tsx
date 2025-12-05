"use client";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiElectron,
  SiPrisma,
  SiSqlite,
  SiGit,
  SiNodedotjs,
} from "react-icons/si";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GlitchText from "./GlitchText";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const tech = [
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "React", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "TailwindCSS", icon: <SiTailwindcss /> },
    { name: "Supabase", icon: <SiSupabase /> },
    { name: "Electron.js", icon: <SiElectron /> },
    { name: "Prisma ORM", icon: <SiPrisma /> },
    { name: "SQLite (Drizzle)", icon: <SiSqlite /> },
    { name: "Git", icon: <SiGit /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="relative z-20 py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          <GlitchText>Skills</GlitchText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-muted-foreground"
        >
          The skills, tools, and technologies I am really good at:
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
          {tech.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.5, y: 20 }
              }
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.05,
                ease: "easeOut",
              }}
              className="
                group
                bg-card border border-border p-6 rounded-lg 
                transition-all duration-300 shadow-sm 
                flex flex-col items-center gap-3
              "
              whileHover={{
                scale: 1.1,
                rotateX: 10,
                rotateY: -5,
                transition: { duration: 0.3 },
              }}
            >
              <div className="text-4xl">{item.icon}</div>
              <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
