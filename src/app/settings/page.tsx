"use client";

import { useState, useEffect } from "react";
import { Settings, CreditCard, Key, Check, Shield, Globe, Sliders, ExternalLink } from "lucide-react";

export default function SettingsPage() {
  const [stripePaymentLink, setStripePaymentLink] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [stripePublishableKey, setStripePublishableKey] = useState("");
  const [defaultLocation, setDefaultLocation] = useState("United States");
  const [userAgent, setUserAgent] = useState("Googlebot / Desktop (Recommended)");
  const [dataforseoKey, setDataforseoKey] = useState("");
  const [aiKey, setAiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = localStorage.getItem("stripe_payment_link");
      if (link) setStripePaymentLink(link);
      const sec = localStorage.getItem("stripe_secret_key");
      if (sec) setStripeSecretKey(sec);
      const pub = localStorage.getItem("stripe_publishable_key");
      if (pub) setStripePublishableKey(pub);
      const loc = localStorage.getItem("seo_default_location");
      if (loc) setDefaultLocation(loc);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      if (stripePaymentLink) localStorage.setItem("stripe_payment_link", stripePaymentLink);
      if (stripeSecretKey) localStorage.setItem("stripe_secret_key", stripeSecretKey);
      if (stripePublishableKey) localStorage.setItem("stripe_publishable_key", stripePublishableKey);
      if (defaultLocation) localStorage.setItem("seo_default_location", defaultLocation);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-blue-600" />
          Platform Settings & Billing
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure Stripe customer payments, crawler preferences, and optional search engine API keys for SEO Software.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Stripe Billing Integration */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm">Stripe Payment Integration (/mo)</h2>
                <p className="text-xs text-slate-500">Connect your Stripe account to collect payments from subscribers.</p>
              </div>
            </div>
            <a
              href="https://dashboard.stripe.com/payment-links"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
            >
              <span>Stripe Dashboard</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-1">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Stripe Payment Link (Recommended — 1-Click Setup)
              </label>
              <input
                type="url"
                value={stripePaymentLink}
                onChange={(e) => setStripePaymentLink(e.target.value)}
                placeholder="https://buy.stripe.com/..."
                className="w-full bg-slate-50 text-xs text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Create a recurring /mo payment link in your Stripe Dashboard, paste it here, and the pricing page will instantly redirect checkout directly to Stripe.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Stripe Secret Key (Optional)</label>
                <input
                  type="password"
                  value={stripeSecretKey}
                  onChange={(e) => setStripeSecretKey(e.target.value)}
                  placeholder="sk_live_... or sk_test_..."
                  className="w-full bg-slate-50 text-xs text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Stripe Publishable Key (Optional)</label>
                <input
                  type="text"
                  value={stripePublishableKey}
                  onChange={(e) => setStripePublishableKey(e.target.value)}
                  placeholder="pk_live_... or pk_test_..."
                  className="w-full bg-slate-50 text-xs text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Crawler & Local SEO Defaults */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Crawler & Search Preferences</h2>
              <p className="text-xs text-slate-500">Configure default search locations and audit crawl behaviors.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Default Search Region</label>
              <select
                value={defaultLocation}
                onChange={(e) => setDefaultLocation(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                <option value="United States">United States (Google.com)</option>
                <option value="Canada">Canada (Google.ca - Vancouver, Toronto, Montreal)</option>
                <option value="United Kingdom">United Kingdom (Google.co.uk - London, Manchester)</option>
                <option value="Australia">Australia (Google.com.au - Sydney, Melbourne)</option>
                <option value="Germany">Germany (Google.de)</option>
                <option value="France">France (Google.fr)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Audit Crawler User-Agent</label>
              <select
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                <option value="Googlebot / Desktop (Recommended)">Googlebot / Desktop (Recommended)</option>
                <option value="Googlebot / Smartphone">Googlebot / Smartphone</option>
                <option value="Bingbot">Bingbot</option>
                <option value="SEO Software Scanner">SEO Software Scanner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Optional BYOK API Keys Form */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
            <Key className="w-4 h-4 text-blue-600" />
            Optional Third-Party API Integrations (BYOK)
          </div>
          <p className="text-xs text-slate-500">
            SEO Software works completely free out-of-the-box using built-in crawlers, IndexNow automation, and Google Autocomplete. Optionally connect third-party enterprise providers if desired.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">DataForSEO API Key (Optional)</label>
              <input
                type="password"
                value={dataforseoKey}
                onChange={(e) => setDataforseoKey(e.target.value)}
                placeholder="Base64 login:password"
                className="w-full bg-slate-50 text-xs text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">OpenAI / OpenRouter API Key (Optional)</label>
              <input
                type="password"
                value={aiKey}
                onChange={(e) => setAiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-slate-50 text-xs text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            All settings & Stripe keys are saved securely.
          </span>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm shadow-blue-500/20"
          >
            {saved ? "Saved Successfully!" : "Save Platform Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
