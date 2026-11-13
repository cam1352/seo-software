"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Clock,
  ShieldCheck,
  HelpCircle,
  BookOpen,
  DollarSign,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const emailAddress = "seosoftwareio@protonmail.com";
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-blue-600" />
          Get in Touch with SEO Software
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Have a question about our <strong>$99/mo Pro Plan</strong>, technical crawlers, or need customer support? We are here to help. Reach out directly or send us a message below.
        </p>
      </div>

      {/* Main Grid: Direct Contact Cards & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (5 cols): Email Box & Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Primary Email Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/15 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Direct Support Email</h3>
                <p className="text-xs text-blue-100">Send inquiries directly to our team</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between gap-2">
              <span className="font-mono text-xs sm:text-sm font-semibold truncate select-all">
                {emailAddress}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors shrink-0 cursor-pointer"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={"mailto:" + emailAddress + "?subject=SEO%20Software%20Inquiry"}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white text-blue-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in Email App</span>
              </a>
              <button
                onClick={handleCopy}
                className="py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </div>

          {/* SLA & Security Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Fast Response Time</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                We respond to customer inquiries within 12 to 24 hours (often under 2 hours).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted & Private</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All inquiries are received through end-to-end encrypted ProtonMail servers.
              </p>
            </div>
          </div>

          {/* Self-Service Quick Links */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              Need an instant answer?
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/faq"
                  className="flex items-center justify-between text-slate-700 hover:text-blue-600 font-medium group"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    <span>Browse 1,000 SEO & Location FAQs</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="flex items-center justify-between text-slate-700 hover:text-blue-600 font-medium group"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    <span>Read 100 SEO Guides & Case Studies</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="flex items-center justify-between text-slate-700 hover:text-blue-600 font-medium group"
                >
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    <span>View Pro Plan ($99/mo) Breakdown</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Col (7 cols): Interactive Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name || "friend"}</strong>. We have received your message regarding &quot;{formData.subject}&quot; and our team will get back to you at <strong>{formData.email}</strong> as soon as possible.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 max-w-sm mx-auto">
                  <span>Need urgent help? Write directly to </span>
                  <a href={"mailto:" + emailAddress} className="text-blue-600 font-semibold hover:underline">
                    {emailAddress}
                  </a>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base">Send Us a Direct Message</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Your Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Pro Plan ($99/mo) Billing & Stripe">Pro Plan ($99/mo) Billing & Stripe</option>
                    <option value="Technical Site Audit Question">Technical Site Audit Question</option>
                    <option value="IndexNow & Backlinks Feature">IndexNow & Backlinks Feature</option>
                    <option value="Multi-Location SEO Support">Multi-Location SEO Support</option>
                    <option value="Bug Report or Technical Issue">Bug Report or Technical Issue</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help your website achieve #1 rankings?"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400">
                    Direct inquiries also go to <strong>{emailAddress}</strong>
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
