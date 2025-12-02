import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth overflow-x-hidden"
    >
      <body className={`antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
