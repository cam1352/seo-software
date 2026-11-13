import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SEO Software ($99/mo) | Rank #1 Suite with GEO Tracking & Auto-Backlinks",
  description: "Next-generation SEO intelligence, real-time site audit, Keyword Magic tool, Generative Engine Optimization (GEO), and automated backlink submission.",
  verification: {
    google: "T2LjC5HI1d2lYCh3c4ren4V5qJTTJ60l2u0kf08JZF8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#F8FAFC] text-[#0F172A] min-h-screen flex flex-col md:flex-row antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
          <Header />
          <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-16 md:pb-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
