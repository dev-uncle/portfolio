"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const navigations = [
    { label: "Home", path: "/#home" },
    { label: "Tech Stack", path: "/#tech-stack" },
    { label: "Projects", path: "/projects" },
    { label: "About", path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md bg-background/70 border-b transition-colors duration-300 h-16`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between h-full px-6 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Link href={"/"}>
          <h3 className="font-semibold text-lg text-foreground">UNCLEDEV</h3>
        </Link>

        <nav className="flex space-x-6">
          {navigations.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={index}
                href={item.path}
                className="relative group text-[14px] font-medium transition-colors duration-200"
              >
                <span
                  className={`${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {item.label.toUpperCase()}
                </span>

                <span
                  className={`absolute left-0 -bottom-1 w-full h-0.5 bg-foreground transform transition-transform duration-300 origin-left ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
