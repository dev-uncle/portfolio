"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";
import GlitchText from "./GlitchText";

const projects = [
  {
    title: "ImApp",
    description:
      "Inventory management application for small businesses. This was my 2nd year project at CDM.",
    image: "/images/imapp.webp",
    tech: ["React", "Tailwind CSS", "Supabase", "Recharts"],
    live: "#",
    code: "#",
  },
  {
    title: "SpaceSync",
    description:
      "A Colegio De Montalban's Class Scheduling System. This was my 2nd year project at CDM.",
    image: "/images/spacesync.webp",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Vercel SDK"],
    live: "#",
    code: "#",
  },
  {
    title: "ReGate",
    description:
      "Enhancing Interaction and Educational Resources at Colegio de Montalban. This was my 3rd year project at CDM.",
    image: "/images/regate.webp",
    tech: ["Vue.js", "Node.js", "Socket.io", "PostgreSQL"],
    live: "#",
    code: "#",
  },
];

export default function ProjectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { theme } = useTheme();

  return (
    <section
      id="project"
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
            className="text-2xl md:text-3xl font-bold mb-2"
          >
            <GlitchText>Featured Projects</GlitchText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-muted-foreground"
          >
            A selection of my recent work building scalable web applications.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="border border-muted-foreground rounded-xl overflow-hidden flex flex-col bg-card group"
            >
              {/* Image container with no padding/margin */}
              <div className="relative w-full h-48">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              <div className="p-4 flex flex-col grow">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 my-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 border border-muted-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    className="text-sm underline"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.code}
                    target="_blank"
                    className="text-sm underline"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="inline-block px-6 py-2 border border-muted-foreground rounded hover:text-foreground hover:bg-muted  transition"
          >
            VIEW ALL PROJECTS
          </motion.a>
        </div>
      </div>
    </section>
  );
}
