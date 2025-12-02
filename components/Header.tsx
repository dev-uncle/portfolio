"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";

export default function Header() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigations = [
    { label: "About", path: "/#about" },
    { label: "Tech Stack", path: "/#tech-stack" },
    { label: "Education", path: "/#education" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on link click
  const handleMobileClick = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 transition-colors duration-300 h-16`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between h-full px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "py-1" : "py-3"
        }`}
      >
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={theme === "light" ? "/logo.png" : "/logo-white.png"}
            alt="logo"
            width={512}
            height={512}
            className="size-8"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex space-x-6">
            {navigations.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={index}
                  href={item.path}
                  className="relative group text-sm font-medium transition-colors duration-200"
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
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={`
          md:hidden 
          absolute left-0 right-0 top-16
          bg-background/90 backdrop-blur-xl 
          shadow-lg border-b border-border
          transition-all duration-300 overflow-hidden
          ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col py-4 px-6 space-y-4">
          {navigations.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={index}
                href={item.path}
                onClick={handleMobileClick}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Mode Toggle for mobile */}
          <div className="pt-2">
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
