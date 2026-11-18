import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SEO Software | Cloud Rank Tracking & Technical Audit Platform",
  description: "Next-generation cloud SEO software for growing brands and agencies. Monitor keyword rankings, run real-time technical site audits, and accelerate search indexing.",
  metadataBase: new URL("https://seosoftware.io"),
  alternates: {
    canonical: "https://seosoftware.io",
  },
  verification: {
    google: "T2LjC5HI1d2lYCh3c4ren4V5qJTTJ60l2u0kf08JZF8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "SEO Software",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Cloud-based",
      "url": "https://seosoftware.io",
      "description": "Cloud SEO software platform featuring real-time site audit crawlers, daily keyword rank tracking, and IndexNow search engine protocol dispatching.",
      "offers": {
        "@type": "Offer",
        "price": "99.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31"
      }
    },
    {
      "@type": "Organization",
      "name": "SEO Software",
      "url": "https://seosoftware.io",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@seosoftware.io",
        "contactType": "customer support"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
