import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, storeOTP, getUserByEmail } from '@/utils/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validation
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = getUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if already verified
        if (user.isVerified) {
            return NextResponse.json(
                { error: 'Email is already verified' },
                { status: 400 }
            );
        }

        // Generate and store new OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        // In production, send email here
        console.log(`📧 Resent OTP for ${email}: ${otp}`);

        return NextResponse.json({
            success: true,
            message: 'OTP has been resent to your email',
            // Include OTP in response for demo (remove in production!)
            _demo_otp: otp,
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
