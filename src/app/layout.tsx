import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "SEO Software ($99/mo) | Rank #1 Suite with GEO Tracking & Auto-Backlinks",
  description: "Next-generation SEO intelligence, real-time site audit, Keyword Magic tool, Generative Engine Optimization (GEO), and automated backlink submission.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0E14] text-[#F3F4F6] min-h-screen flex flex-col md:flex-row antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
