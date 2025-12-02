import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Uncledev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-auto-hidden">
      <body className={`antialiased`}>
        <main className="relative">
          <Header />

          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
