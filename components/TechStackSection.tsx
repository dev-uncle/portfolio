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
import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function TechStackSection() {
  const { scrollY } = useViewportScroll();

  const y = useTransform(scrollY, [0, 600], [100, 0]);
  const opacity = useTransform(scrollY, [0, 600], [0, 1]);

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
    <motion.section
      id="tech-stack"
      style={{ y, opacity }}
      className="relative z-20 h-screen py-20 bg-background-secondary"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Tech Stack</h2>
        <p className="text-muted-foreground">
          The skills, tools, and technologies I am really good at:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
          {tech.map((item, i) => (
            <motion.div
              key={i}
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
    </motion.section>
  );
}
