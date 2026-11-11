import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || "https://seosoftware.io";
    const body = await req.json().catch(() => ({}));
    const customPaymentLink = process.env.STRIPE_PAYMENT_LINK || body.paymentLink;

    // 1. Direct Stripe Payment Link support (Stripe 1-click payment link)
    if (customPaymentLink && (customPaymentLink.startsWith("https://buy.stripe.com") || customPaymentLink.startsWith("https://checkout.stripe.com"))) {
      return NextResponse.json({ url: customPaymentLink });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || body.stripeSecretKey;

    // 2. Stripe API Checkout Session
    if (stripeSecretKey) {
      const stripe = new Stripe(stripeSecretKey);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "SEO Software Pro Plan",
                description: "Unlimited 25-point site audits, Keyword Magic tool, automated backlink hub, and GEO visibility tracking.",
              },
              unit_amount: 9900, // .00 USD
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        success_url: `${origin}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    }

    // 3. Fallback when keys are not yet entered in Vercel environment
    return NextResponse.json({
      url: null,
      requiresConfig: true,
      message: "Stripe is connected to the backend! Enter your Stripe Secret Key (sk_live_...) or Stripe Payment Link (https://buy.stripe.com/...) in Settings or Vercel Environment Variables to collect live payments.",
    });
  } catch (err: any) {
    console.error("Stripe Checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create Stripe checkout session" },
      { status: 500 }
    );
  }
}
