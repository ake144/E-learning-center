import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {
    signToken,
    generateOTP,
    storeOTP,
    getUserByEmail,
    createUser
} from '@/utils/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, password } = body;

        // Validation
        if (!name || !email || !phone || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Generate user ID
        const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        // Create user (unverified)
        const newUser = {
            id: userId,
            name,
            email,
            phone,
            passwordHash,
            isVerified: false,
            enrolledCourses: [],
            createdAt: new Date().toISOString(),
        };

        createUser(newUser);

        // Generate and store OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        // In production, send email here using SendGrid, Resend, etc.
        // For now, we'll log it to console (demo purposes)
        console.log(`📧 OTP for ${email}: ${otp}`);

        // Generate token (unverified state)
        const token = await signToken({
            userId,
            email,
            isVerified: false,
        });

        return NextResponse.json({
            success: true,
            message: 'Account created. Please verify your email.',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                isVerified: false,
                enrolledCourses: [],
                createdAt: newUser.createdAt,
            },
            token,
            // Include OTP in response for demo (remove in production!)
            _demo_otp: otp,
        });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
