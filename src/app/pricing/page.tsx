"use client";

import { useState, useEffect } from "react";
import { Check, Zap, Sparkles, Shield, ArrowRight, CheckCircle2, CreditCard, ExternalLink, Loader2, X } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [customLink, setCustomLink] = useState("");
  const [customSecret, setCustomSecret] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        setSuccess(true);
      }
      const savedLink = localStorage.getItem("stripe_payment_link");
      if (savedLink) setCustomLink(savedLink);
      const savedSecret = localStorage.getItem("stripe_secret_key");
      if (savedSecret) setCustomSecret(savedSecret);
    }
  }, []);

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentLink: customLink || undefined,
          stripeSecretKey: customSecret || undefined,
        }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.requiresConfig) {
        setModalMessage(data.message);
        setShowStripeModal(true);
      } else if (data.error) {
        alert("Stripe error: " + data.error);
      }
    } catch (err: any) {
      console.error(err);
      setShowStripeModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveModalSettings = () => {
    if (customLink) localStorage.setItem("stripe_payment_link", customLink);
    if (customSecret) localStorage.setItem("stripe_secret_key", customSecret);
    setShowStripeModal(false);
    handleStripeCheckout();
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4">
      {/* Success Notification */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Payment Successful! Your SEO Software Pro Plan is Active.</p>
              <p className="text-xs text-emerald-600">All 25-point crawlers, IndexNow automation, and GEO tracking features are unlocked.</p>
            </div>
          </div>
          <Link
            href="/"
            className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          The Semrush Alternative for High-Velocity Teams
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">
          SEO Software Pro — Just <span className="text-blue-600"></span> / Month
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Outrank competitors and dominate #1 search rankings with full technical site audits, Keyword Magic, automated IndexNow backlink submission, and Generative Engine Optimization.
        </p>
      </div>

      {/* Main Pricing Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Competitor: Semrush */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traditional Tool</div>
            <h2 className="text-xl font-bold text-slate-800 mt-1">Semrush Pro</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-800">.95</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Expensive legacy suite with strict report caps and paywalled add-ons.</p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2"><span>• 500 keywords tracked</span></li>
              <li className="flex items-center gap-2"><span>• 100,000 page crawl cap</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No automated backlink submission</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ AI Search / GEO tracking costs extra</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ Single-seat paywall</span></li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
            Overpriced Legacy Tier
          </div>
        </div>

        {/* WINNER: SEO Software (/mo) */}
        <div className="p-8 rounded-2xl bg-white border-2 border-blue-600 flex flex-col justify-between relative shadow-xl shadow-blue-500/10 scale-105 z-10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
            Most Popular & Recommended
          </div>

          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Rank #1 Suite</div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">SEO Software Pro</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-blue-600"></span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">All-in-one search intelligence suite to claim #1 positions across search & AI engines.</p>

            <ul className="mt-6 space-y-3 text-xs text-slate-700">
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Unlimited</strong> Real-Time Site Audits & Crawls</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Keyword Magic Tool</strong> with live Google Autocomplete</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Automated Backlink Submission</strong> (IndexNow + Pings)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Dual GEO Tracking</strong> (ChatGPT, Perplexity, Gemini, AI Overviews)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>1,000 Structured FAQs</strong> & 100 Programmatic Blogs</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Competitor Gap & Writing Assistant</strong> (Real-time content scoring)</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 space-y-2">
            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Stripe...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Get SEO Software for /mo</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by Stripe • 30-day money-back guarantee</span>
            </div>
          </div>
        </div>

        {/* Competitor: Ahrefs */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traditional Tool</div>
            <h2 className="text-xl font-bold text-slate-800 mt-1">Ahrefs Standard</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-800">.00</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Costly credit-metering model where each row click burns credits.</p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2"><span>• Metered 500 credits per month</span></li>
              <li className="flex items-center gap-2"><span>• Additional charges for extra usage</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No automated backlink submission</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No native IndexNow protocol dispatcher</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No automated multi-location citation builder</span></li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
            Credit-Metered Model
          </div>
        </div>
      </div>

      {/* Feature Guarantee Grid */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 shadow-sm">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Guaranteed #1 Ranking Architecture</h4>
            <p className="text-slate-500 leading-relaxed">Built with 1,000 Schema-injected FAQs, 100 strategic articles, and Core Web Vitals optimizations.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Instant Automated Backlinks</h4>
            <p className="text-slate-500 leading-relaxed">One-click IndexNow submission immediately pings Bing, Yandex, and syndicates to High-DA directories.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Generative AI Search Coverage</h4>
            <p className="text-slate-500 leading-relaxed">Ensure your software gets cited across ChatGPT Search, Perplexity AI, and Google AI Overviews.</p>
          </div>
        </div>
      </div>

      {/* Stripe Setup Modal */}
      {showStripeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Stripe Payment Connection</h3>
              </div>
              <button
                onClick={() => setShowStripeModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your Stripe payment engine is hooked up to the backend. To receive customer payments, enter your Stripe link or API key below (or set them in your Vercel Environment Variables):
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Option 1: Stripe Payment Link (Easiest — 1-click Stripe URL)
                </label>
                <input
                  type="url"
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                  placeholder="https://buy.stripe.com/..."
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
                />
                <span className="text-[10px] text-slate-400">Created directly in Stripe Dashboard &gt; More &gt; Payment Links.</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Option 2: Stripe Secret Key
                </label>
                <input
                  type="password"
                  value={customSecret}
                  onChange={(e) => setCustomSecret(e.target.value)}
                  placeholder="sk_live_... or sk_test_..."
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
                />
                <span className="text-[10px] text-slate-400">Found in your Stripe Dashboard &gt; Developers &gt; API keys.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <Link
                href="/settings"
                onClick={() => setShowStripeModal(false)}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Go to Settings
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowStripeModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModalSettings}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Save & Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
