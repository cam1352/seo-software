"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Zap,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Tag,
  Layers,
  Sparkles,
  Search,
  Filter
} from "lucide-react";

export default function ForEcommerceShopifyPage() {
  const [activeTab, setActiveTab] = useState<"faceted" | "schema" | "outofstock">("faceted");

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "E-Commerce & Shopify SEO Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud / Web Browser",
    "url": "https://seosoftware.io/for/ecommerce-shopify",
    "description": "Specialized e-commerce and Shopify SEO software. Audit 100,000+ product SKUs, eliminate duplicate faceted navigation traps, monitor schema rich snippets, and track product keyword rankings across 40+ countries.",
    "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does SEO Software handle large Shopify product catalogs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO Software is built on high-velocity cloud workers capable of crawling hundreds of thousands of product URLs without timeout limits. It automatically detects duplicate collection URL parameters, missing variant canonical tags, and broken image links."
        }
      },
      {
        "@type": "Question",
        "name": "Does it monitor Product Schema and Merchant Center rich results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our audit engine validates structured data for Product, AggregateRating, Offer, InStock status, and shipping details to ensure your products display star ratings and pricing directly in Google search results."
        }
      },
      {
        "@type": "Question",
        "name": "Can I push newly published products to Google and Bing instantly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our built-in IndexNow protocol dispatcher lets you submit updated or newly launched collection and product URLs to participating search engines within seconds of publishing."
        }
      }
    ]
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 sm:p-12 text-white border border-blue-900/50 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
            Specialized E-Commerce SEO Engine
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            E-Commerce & <span className="text-blue-400">Shopify</span> SEO Software
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Scale organic store revenue. Eliminate faceted navigation crawl traps across 100,000+ SKUs, validate Product Rich Snippet schema, and track commercial search terms across 40+ countries for a flat $99/mo.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Audit Your Store ($99/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/audit"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Free Store Health Check</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Shopify, WooCommerce, Magento Ready
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant IndexNow Product Sync
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Catalog Crawls ($99/mo)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Catalog Diagnostics */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Filter className="w-4 h-4" />
              Technical E-Commerce Diagnostics
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              The 3 Silent Killers of E-Commerce Organic Rankings
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("faceted")}
              className={"px-3 py-1.5 text-xs font-bold rounded-lg transition-all " + (activeTab === "faceted" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900")}
            >
              Faceted Navigation
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={"px-3 py-1.5 text-xs font-bold rounded-lg transition-all " + (activeTab === "schema" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900")}
            >
              Product Schema
            </button>
            <button
              onClick={() => setActiveTab("outofstock")}
              className={"px-3 py-1.5 text-xs font-bold rounded-lg transition-all " + (activeTab === "outofstock" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900")}
            >
              Out-of-Stock SKUs
            </button>
          </div>
        </div>

        {activeTab === "faceted" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">
                Stop Crawl Budget Waste on Query Filters
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter URLs like <code>?color=blue&amp;size=large&amp;sort=price-asc</code> create millions of duplicate pages that dilute domain authority and confuse Googlebot.
              </p>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-blue-900">How SEO Software Solves This:</div>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li>Detects duplicate parameter clusters across all collection routes.</li>
                  <li>Generates correct <code>canonical</code> tag rules automatically.</li>
                  <li>Flags internal links using non-canonical URL structures.</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs space-y-2">
              <div className="text-slate-400">// Automatic Canonical Enforcement</div>
              <div className="text-rose-400">- &lt;link rel="canonical" href=".../shoes?sort=price"&gt;</div>
              <div className="text-emerald-400">+ &lt;link rel="canonical" href="https://store.com/collections/shoes"&gt;</div>
              <div className="text-slate-500 pt-2">// Status: Crawl budget protected, equity consolidated.</div>
            </div>
          </div>
        )}

        {activeTab === "schema" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">
                Win Star Ratings &amp; In-Stock Badges on Google SERPs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Products with validated structured data generate up to a 30% higher Click-Through Rate (CTR) compared to standard text links.
              </p>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-emerald-900">What We Validate on Every SKU:</div>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li><code>Product</code> name, brand, SKU, and image URL</li>
                  <li><code>AggregateRating</code> (review count and score)</li>
                  <li><code>Offer</code> (price, currency, and availability)</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs space-y-2">
              <div className="text-slate-400">// Rich Product Schema Example</div>
              <div className="text-blue-400 font-bold">&#123; "@type": "Product",</div>
              <div className="pl-4 text-emerald-300">"name": "Performance Running Shoe",</div>
              <div className="pl-4 text-amber-300">"aggregateRating": &#123; "ratingValue": "4.9", "reviewCount": "128" &#125;,</div>
              <div className="pl-4 text-sky-300">"offers": &#123; "price": "120.00", "availability": "InStock" &#125;</div>
              <div className="text-blue-400 font-bold">&#125;</div>
            </div>
          </div>
        )}

        {activeTab === "outofstock" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">
                Preserve Page Authority on Discontinued Items
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deleting sold-out products causes 404 errors that bleed incoming backlinks and destroy organic traffic.
              </p>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-amber-900">Automated Remediation:</div>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li>Identifies 404 dead links on previously ranking product pages.</li>
                  <li>Recommends exact 301 redirects to closest parent category or replacement SKU.</li>
                  <li>Updates schema availability to <code>OutOfStock</code> without dropping indexing status.</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase">Redirect Health Matrix</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-slate-200">
                  <span className="font-medium text-slate-800">/product/classic-sneaker-2024</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">301 &rarr; /product/classic-sneaker-2026</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-slate-200">
                  <span className="font-medium text-slate-800">/product/limited-hoodie</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">In Stock Badge Updated</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 Core Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Commercial Keyword Intent</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Track search terms with high buying intent (e.g., "buy running shoes online", "best leather jackets 2026") across Google SERPs and Google Shopping grids.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Instant IndexNow Dispatch</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When you publish a seasonal drop or flash sale, dispatch new product URLs directly to Bing and participating engines in seconds instead of waiting weeks for a crawl.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Unlimited SKU Auditing</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Most legacy tools charge high overages once your catalog exceeds 10,000 pages. SEO Software audits your entire catalog for a flat $99/mo.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-slate-900 font-black text-xl">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Frequently Asked Questions
        </div>
        <div className="divide-y divide-slate-100">
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              How does SEO Software handle large Shopify product catalogs?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              SEO Software is built on high-velocity cloud workers capable of crawling hundreds of thousands of product URLs without timeout limits. It automatically detects duplicate collection URL parameters, missing variant canonical tags, and broken image links.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Does it monitor Product Schema and Merchant Center rich results?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. Our audit engine validates structured data for Product, AggregateRating, Offer, InStock status, and shipping details to ensure your products display star ratings and pricing directly in Google search results.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Can I push newly published products to Google and Bing instantly?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, our built-in IndexNow protocol dispatcher lets you submit updated or newly launched collection and product URLs to participating search engines within seconds of publishing.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Ready to Grow Your E-Commerce Store's Search Revenue?
        </h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
          Audit your full product catalog and track commercial rankings today with flat $99/mo pricing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl bg-white text-blue-700 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all"
          >
            Get E-Commerce SEO Suite ($99/mo)
          </Link>
          <Link
            href="/audit"
            className="px-8 py-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/30 transition-all"
          >
            Run Free Store Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
