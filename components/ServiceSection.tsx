"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GlitchText from "./GlitchText";
import {
  Code,
  Server,
  MessageSquare,
  Layout,
  Smartphone,
  Rocket,
} from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "Building responsive, fast, and SEO-friendly websites using modern frameworks like Next.js and React.",
    icon: Code,
  },
  {
    title: "Backend Solutions",
    description:
      "Robust API design and database management using Supabase, PostgreSQL, and Node.js.",
    icon: Server,
  },
  {
    title: "Consultation",
    description:
      "Professional advice on tech stacks, code reviews, and project architecture planning.",
    icon: MessageSquare,
  },
  {
    title: "UI/UX Implementation",
    description:
      "Translating design mockups into pixel-perfect, interactive code with smooth animations.",
    icon: Layout,
  },
];

export default function ServiceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-20 py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold mb-4 font-sans"
          >
            <GlitchText>Services</GlitchText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Your ideas deserve to be more than just thoughts. I help transform
            them into reality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="
                group relative
                bg-card border border-border p-6 rounded-xl
                hover:border-primary/50 transition-colors duration-300
                flex flex-col items-start h-full
                overflow-hidden
              "
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-12 h-12 bg-background-secondary rounded-lg flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300 border border-border group-hover:border-primary/30">
                <service.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-2 font-sans group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
