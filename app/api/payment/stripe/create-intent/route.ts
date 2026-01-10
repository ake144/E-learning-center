import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with a fallback key for build time, or ensure env vars are loaded.
// Note: This effectively disables Stripe if the key is missing at runtime.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2024-12-18.acacia' as any, // Using a recent known version or casting to any
});

export async function POST(request: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
             console.warn("Stripe Secret Key is missing");
             return NextResponse.json({ error: "Payment service unavailable" }, { status: 503 });
        }

        const { amount } = await request.json();

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error('Stripe error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
