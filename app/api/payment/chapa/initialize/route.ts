import { NextRequest, NextResponse } from 'next/server';

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || 'CHASECK_TEST-placeholder';
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, email, first_name, last_name, tx_ref } = body;

        const payload = {
            amount: amount.toString(),
            currency: 'ETB',
            email,
            first_name,
            last_name,
            tx_ref,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/chapa/callback`,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
            customization: {
                title: 'Course Enrollment',
                description: 'Payment for course access',
            },
        };

        const response = await fetch(CHAPA_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.status === 'success') {
            return NextResponse.json({
                checkout_url: data.data.checkout_url,
            });
        } else {
            return NextResponse.json(
                { error: data.message || 'Failed to initialize payment' },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Chapa error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
