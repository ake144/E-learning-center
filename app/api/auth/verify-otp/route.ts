import { NextRequest, NextResponse } from 'next/server';
import {
    signToken,
    verifyOTP as verifyOTPCode,
    getUserByEmail,
    updateUser
} from '@/utils/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, otp } = body;

        // Validation
        if (!email || !otp) {
            return NextResponse.json(
                { error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        // Verify OTP
        const isValid = verifyOTPCode(email, otp);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

        // Get user and update verification status
        const user = getUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Update user as verified
        const updatedUser = updateUser(user.id, { isVerified: true });
        if (!updatedUser) {
            return NextResponse.json(
                { error: 'Failed to update user' },
                { status: 500 }
            );
        }

        // Generate new token with verified status
        const token = await signToken({
            userId: user.id,
            email: user.email,
            isVerified: true,
        });

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                isVerified: true,
                enrolledCourses: updatedUser.enrolledCourses,
                createdAt: updatedUser.createdAt,
            },
            token,
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
