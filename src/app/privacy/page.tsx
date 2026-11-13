"use client";

import Link from "next/link";
import { Shield, Lock, Eye, Server, ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "November 13, 2026";
  const contactEmail = "seosoftwareio@protonmail.com";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          User Privacy & Data Protection Policy
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy <span className="text-blue-600">Policy</span>
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: <strong>{lastUpdated}</strong> • Protecting your personal data and business analytics.
        </p>
      </div>

      <div className="space-y-8 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you interact with <strong>SEO Software</strong> (seosoftware.io), we may collect the following categories of information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Account & Billing Data:</strong> Name, email address, and billing information processed securely via our payment processor, Stripe. We do not store raw credit card numbers on our servers.</li>
            <li><strong>Audit & Domain Inputs:</strong> URLs, target domains, and keyword queries entered into our audit and Keyword Magic tools.</li>
            <li><strong>Technical Usage Data:</strong> Anonymized server logs, browser type, operating system, and IP address collected for security and DDoS prevention.</li>
            <li><strong>Direct Communications:</strong> Inquiries sent to our contact forms or directly to {contactEmail}.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. How We Use Your Data</h2>
          <p>We process collected data exclusively to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Deliver, operate, and maintain technical SEO crawls, keyword scoring, and IndexNow backlink submissions.</li>
            <li>Process payments and manage recurring Pro Plan ($99/mo) subscriptions through Stripe.</li>
            <li>Respond to customer support inquiries and provide assistance.</li>
            <li>Monitor platform performance, uptime, and protect against fraudulent activity.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">3. Non-Sale of Personal Data</h2>
          <p>
            <strong>We do not sell, rent, or trade your personal information</strong> or target domain analytics to third-party data brokers, advertisers, or outside marketers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">4. Third-Party Service Providers</h2>
          <p>We partner with industry-standard, secure infrastructure providers:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Stripe:</strong> Payment processing and subscription management (PCI-DSS Level 1 certified).</li>
            <li><strong>Vercel:</strong> Global CDN edge hosting and serverless functions (SOC 2 Type II certified).</li>
            <li><strong>ProtonMail:</strong> End-to-end encrypted email communications.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">5. Data Security</h2>
          <p>
            We implement industry-standard encryption protocols (TLS 1.3 / HTTPS) for all data in transit across seosoftware.io.
          </p>
        </section>

        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            Privacy Inquiries
          </h2>
          <p>
            For privacy requests or questions regarding data protection, please contact us at:
          </p>
          <a
            href={"mailto:" + contactEmail + "?subject=Privacy%20Inquiry"}
            className="text-blue-600 font-bold hover:underline"
          >
            {contactEmail}
          </a>
        </section>
      </div>
    </div>
  );
}
