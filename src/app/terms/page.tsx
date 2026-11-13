"use client";

import Link from "next/link";
import { ShieldAlert, FileText, CheckCircle2, AlertTriangle, Scale, Lock, ArrowLeft, Mail } from "lucide-react";

export default function TermsPage() {
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          Legal Agreement & Terms of Service
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms & <span className="text-blue-600">Conditions</span>
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: <strong>{lastUpdated}</strong> • Effective immediately upon accessing or subscribing to SEO Software.
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed space-y-2 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Key Legal Protections & Plain English Summary</span>
        </div>
        <p>
          By accessing or subscribing to <strong>SEO Software</strong> (seosoftware.io), you acknowledge and agree that SEO Software provides analytical, diagnostic, educational, and workflow automation tools. We make no representations, warranties, or guarantees regarding specific search engine rankings, search traffic increases, lead generation, or monetary revenue. All services are provided strictly on an &quot;as-is&quot; and &quot;as-available&quot; basis, with aggregate liability capped at the amount paid by you in the preceding twelve (12) months.
        </p>
      </div>

      {/* Legal Sections */}
      <div className="space-y-8 text-xs text-slate-600 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">1</span>
            Acceptance of Terms
          </h2>
          <p>
            These Terms and Conditions (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Subscriber&quot;, &quot;you&quot;, or &quot;your&quot;) and the operators and owners of <strong>SEO Software</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), governing your access to and use of <strong>seosoftware.io</strong> (including all subdomains, APIs, tools, crawlers, and features).
          </p>
          <p>
            By accessing our website, creating an account, running an audit, or purchasing a subscription, you explicitly affirm that you are at least 18 years of age, possess the legal capacity to enter into binding agreements, and have read, understood, and agreed to be bound by all provisions of this Agreement. If you do not agree with any part of these Terms, you are strictly prohibited from using our services and must exit immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">2</span>
            No Search Engine Ranking or Traffic Guarantees (Disclaimer of Results)
          </h2>
          <p>
            <strong>2.1 Dynamic Third-Party Algorithms:</strong> Search engine optimization (&quot;SEO&quot;) and Generative Engine Optimization (&quot;GEO&quot;) are dependent upon proprietary, dynamic, and confidential algorithms operated by independent third parties, including but not limited to Google LLC, Microsoft Bing, Yandex, Yahoo, OpenAI (ChatGPT), Perplexity AI, and Anthropic. These third parties update and modify their ranking criteria, indexing behavior, and citation filters frequently and without public notice.
          </p>
          <p>
            <strong>2.2 Diagnostic & Analytical Nature:</strong> SEO Software provides crawl analyses, technical health audits, keyword metrics, IndexNow submission pings, and competitor reports for diagnostic and informational purposes only. We make <strong>NO GUARANTEE, WARRANTY, OR REPRESENTATION</strong>, express or implied, that using our software will result in:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Attaining rank #1, first-page placement, or any specific position on Google, Bing, or any search platform.</li>
            <li>Guaranteed citation or source placement in ChatGPT, Perplexity, or AI Overviews.</li>
            <li>Increases in organic search impressions, click-through rates, visitors, leads, sales, or revenue.</li>
            <li>Immunity from search engine manual penalties, algorithmic de-indexing, or ranking drops.</li>
          </ul>
          <p>
            You agree that all marketing, technical, or optimization actions taken based on reports generated by SEO Software are executed at your sole risk and discretion.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">3</span>
            Subscriptions, Billing, Cancellation & Refunds
          </h2>
          <p>
            <strong>3.1 Pro Plan Billing:</strong> The SEO Software Pro Plan is offered at <strong>$99.00 USD per month</strong> (or applicable promotional rate). Subscriptions are billed automatically on a recurring monthly cycle in advance through our third-party payment processor (Stripe).
          </p>
          <p>
            <strong>3.2 Automatic Renewal:</strong> Your subscription will automatically renew at the conclusion of each billing period unless and until you cancel before the next renewal date.
          </p>
          <p>
            <strong>3.3 Cancellation:</strong> You may cancel your subscription at any time through the customer billing portal in your Settings or by sending an email notice to <strong>{contactEmail}</strong>. Upon cancellation, you will retain access to paid features through the end of your currently paid billing period, and no further recurring charges will be initiated.
          </p>
          <p>
            <strong>3.4 Refund Policy:</strong> Because automated crawler resources, server compute, and search data are provisioned immediately upon sign-up, subscription payments are non-refundable once processed, except as required by applicable consumer law or within an express promotional money-back guarantee window explicitly stated at checkout.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">4</span>
            Acceptable Use, Crawling & User Authorization
          </h2>
          <p>
            <strong>4.1 Permitted Domains:</strong> When using our Technical Site Audit, Real-Time Crawler, or Backlink Hub, you warrant and represent that you own the target domain or have explicit, documented authorization from the domain owner to perform technical scanning and indexing submissions.
          </p>
          <p>
            <strong>4.2 Prohibited Activities:</strong> You agree NOT to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Use the software to conduct Denial-of-Service (DoS) attacks, flood servers with malicious requests, or breach rate limits.</li>
            <li>Scan, crawl, or inject links into illegal, harassing, defamatory, or abusive web properties.</li>
            <li>Reverse-engineer, decompile, disassemble, or copy proprietary source code, algorithms, or programmatic datasets from SEO Software.</li>
            <li>Resell, sublicense, or rent platform credentials to unauthorized third parties without prior written consent.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">5</span>
            Comprehensive Limitation of Liability (Damage Cap)
          </h2>
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 uppercase font-mono text-[11px] text-slate-700 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL SEO SOFTWARE, ITS FOUNDERS, OWNERS, DIRECTORS, EMPLOYEES, AFFILIATES, AGENTS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES WHATSOEVER, INCLUDING WITHOUT LIMITATION:
            (I) LOSS OF REVENUE, PROFITS, BUSINESS CONTRACTS, OR SALES;
            (II) LOSS OF SEARCH ENGINE RANKINGS, CITATIONS, OR ORGANIC TRAFFIC;
            (III) LOSS OF DATA, GOODWILL, OR BUSINESS REPUTATION;
            (IV) COSTS OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
            OR (V) ANY COMPUTER MALFUNCTION, SYSTEM DOWNTIME, OR DATA TRANSMISSION ERROR.
          </div>
          <p>
            <strong>LIABILITY MAXIMUM CAP:</strong> In no event shall our total aggregate liability arising out of or related to these Terms, the software, or any associated service exceed the total amount actually paid by you to SEO Software for the specific service giving rise to the claim during the <strong>twelve (12) month period</strong> immediately preceding the event giving rise to liability, or <strong>$100.00 USD</strong>, whichever amount is greater.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">6</span>
            Disclaimer of Warranties (&quot;As-Is&quot; Basis)
          </h2>
          <p>
            THE SERVICE, ALL CONTENT, SITE AUDITS, KEYWORD ESTIMATES, INDEXING SIGNALS, AND PROGRAMMATIC FAQS ARE PROVIDED ON AN <strong>&quot;AS IS&quot;</strong> AND <strong>&quot;AS AVAILABLE&quot;</strong> BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL CODE.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">7</span>
            Indemnification (Hold Harmless)
          </h2>
          <p>
            You agree to defend, indemnify, and hold harmless SEO Software, its owners, operators, affiliates, contractors, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including reasonable attorneys&apos; fees and court costs) resulting from or arising out of:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Your use of, or inability to use, the service;</li>
            <li>Your violation of any term or condition of this Agreement;</li>
            <li>Your violation of any third-party right, including intellectual property, privacy, or website usage policies (e.g. crawling third-party web domains);</li>
            <li>Any claim that your website, content, or backlink submissions caused harm or damages to a third party.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">8</span>
            Governing Law & Dispute Resolution
          </h2>
          <p>
            This Agreement shall be governed by, construed, and enforced in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law principles. Any legal suit, action, or proceeding arising out of or related to these Terms or the service shall be resolved through confidential, binding individual arbitration, and you expressly waive any right to participate in a class-action lawsuit or class-wide arbitration.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">9</span>
            Modifications to Terms
          </h2>
          <p>
            We reserve the exclusive right, at our sole discretion, to modify, update, or replace these Terms at any time. When updates are published, the revised &quot;Last Updated&quot; date at the top of this document will be amended. Continued use of SEO Software following the posting of any revisions constitutes full and unconditional acceptance of the amended Terms.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            Contact & Legal Inquiries
          </h2>
          <p>
            If you have questions, feedback, or legal inquiries concerning these Terms & Conditions, please contact us directly:
          </p>
          <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={"mailto:" + contactEmail + "?subject=Legal%20Terms%20Inquiry"}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
            >
              Email Legal Team: {contactEmail}
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
            >
              Visit Contact Support Page
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
