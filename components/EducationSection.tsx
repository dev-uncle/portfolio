"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import GlitchText from "./GlitchText";

interface EducationItem {
  school: string;
  program: string;
  date: string;
  logo: string;
}

interface TimelineItemProps {
  item: EducationItem;
  index: number;
}

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const education: EducationItem[] = [
    {
      school: "Colegio De Montalban",
      program: "College │ BSIT",
      date: "A.Y. 2022 – 2026",
      logo: "/logo/cdm-logo.png",
    },
    {
      school: "Hyper Young Institute of Technology",
      program: "Computer Systems Servicing │ NCII",
      date: "April 2025",
      logo: "/logo/hyper.png",
    },

    {
      school: "Tamaraw Contact Solution Training Center",
      program: "Contact Center Services │ NCII",
      date: "October 2021",
      logo: "/logo/tamaraw.png",
    },

    {
      school:
        "Philippine Technological Institute of Science Arts and Trade Central, INC.",
      program: "SHS Graduate │ TVL",
      date: "A.Y. 2020 – 2022",
      logo: "/logo/philtech-logo.png",
    },
    {
      school: "Oriental Mindoro National High School",
      program: "JHS Graduate",
      date: "A.Y. 2016 – 2020",
      logo: "/logo/omnhs-logo.png",
    },
    {
      school: "Sto. Niño Elementary School",
      program: "Elementary Graduate",
      date: "A.Y. 2010 – 2016",
      logo: "/logo/snes-logo.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-24 bg-background-secondary"
      id="education"
    >
      {/* Sticky Header */}
      <div className="sticky top-16 z-10 bg-background-secondary/95 backdrop-blur-sm py-6 mb-8">
        <div className="max-w-7xl mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <GlitchText>Education</GlitchText>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            My academic background and certifications throughout the years.
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4">
        {/* Background Line */}
        <div className="absolute left-9 md:left-1/2 top-0 bottom-0 w-0.5 bg-foreground/40 md:-translate-x-1/2" />

        {/* Animated Progress Line */}
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-primary md:-translate-x-1/2 origin-top"
          style={{
            scaleY: scrollYProgress,
          }}
        />

        {/* Timeline Items */}
        <div className="space-y-4">
          {education.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [index % 2 === 0 ? -50 : 50, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity }}
      className={`
        relative flex items-center gap-3 md:gap-10
        ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* MOBILE LOGO (inline) */}
      <div className="md:hidden shrink-0 w-10 h-10 rounded-full overflow-hidden border bg-background shadow">
        <Image
          src={item.logo}
          alt={`${item.school} logo`}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div style={{ x }} className="flex-1 md:w-1/2">
        <div className="bg-card border rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-base md:text-lg font-bold">{item.school}</h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {item.program}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {item.date}
          </p>
        </div>
      </motion.div>

      {/* DESKTOP DOT LOGO (center timeline) */}
      <motion.div
        style={{ scale }}
        className="
          hidden md:flex
          absolute md:relative
          w-10 h-10 rounded-full overflow-hidden 
          bg-background border-4 border-background shadow
          left-4 md:left-0 -translate-x-1/2 md:translate-x-0
        "
      >
        <Image
          src={item.logo}
          alt={`${item.school} logo`}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="hidden md:block md:w-1/2"></div>
    </motion.div>
  );
}
