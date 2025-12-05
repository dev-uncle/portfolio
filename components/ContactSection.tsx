"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GlitchText from "./GlitchText";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // <-- animate every time it becomes visible
    amount: 0.2, // <-- trigger when 20% visible
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        {/* LEFT SIDE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <div className="flex flex-col leading-tight">
              <GlitchText>Let’s Build</GlitchText>
              <GlitchText>Something Incredible</GlitchText>
            </div>
          </h2>

          <p className="text-muted-foreground max-w-lg mb-10">
            Have a project in mind or just want to chat about the latest tech?
            Drop me a line. I'm always open to discussing new ideas and
            opportunities.
          </p>

          {/* INFO BOXES */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, label: "Email", value: "jhonbrian@uncle-dev.com" },
              {
                icon: MapPin,
                label: "Location",
                value: "San Isidro, Rodriguez Rizal",
              },
              { icon: Phone, label: "Phone", value: "+6399-5177-9675" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-4 p-5 rounded-lg border bg-background-secondary shadow-sm"
              >
                <item.icon className="w-5 h-5" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE — FORM */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-xl border bg-card shadow-lg"
        >
          <h3 className="text-xl font-bold mb-8">Send a Message</h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm mb-2 font-medium">Your Name *</label>
              <input
                type="text"
                className="bg-input border px-4 py-3 rounded-lg focus:ring-2 outline-none"
                placeholder="Juan Dela Cruz"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-2 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                className="bg-input border px-4 py-3 rounded-lg focus:ring-2 outline-none"
                placeholder="juan01@gmail.com"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm mb-2 font-medium">Subject</label>
              <input
                type="text"
                className="bg-input border px-4 py-3 rounded-lg focus:ring-2 outline-none"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm mb-2 font-medium">Message *</label>
              <textarea
                className="bg-input border px-4 py-3 rounded-lg h-32 resize-none focus:ring-2 outline-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="md:col-span-2 flex justify-start">
              <Button className="px-6 py-3 text-sm font-medium flex items-center gap-2">
                Send Message
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
