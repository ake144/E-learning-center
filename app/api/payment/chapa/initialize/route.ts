import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';



const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || '';
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, email,currency, phone_number,redirect_url,payment_options,customizations, first_name, last_name, tx_ref, slug } = body;

        const payload: any = {
            amount: amount.toString(),
            currency: 'ETB',
            email,
            first_name,
            last_name,
            tx_ref,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payment/chapa/callback`,
            return_url: redirect_url || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?slug=${slug}`,
            customization: {
                title: 'Enrollment',
                description: 'Payment for course access',
            },
        };

        if (phone_number) {
            payload.phone_number = phone_number;
        }

        console.log('Chapa initialize payload:', payload);

        const response = await axios.post(CHAPA_API_URL, payload, {
            headers: {
                'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Chapa initialize response:', response.data);


        const data = response.data;

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
        console.error('Chapa error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data?.message || error.message },
            { status: 500 }
        );
    }
}
