import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);

export interface TokenPayload {
    userId: string;
    email: string;
    isVerified: boolean;
}

export async function signToken(payload: TokenPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as TokenPayload;
    } catch {
        return null;
    }
}

// Generate 6-digit OTP
export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// In-memory OTP storage (replace with Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export function storeOTP(email: string, otp: string): void {
    // OTP expires in 10 minutes
    otpStore.set(email, {
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
    });
}

export function verifyOTP(email: string, otp: string): boolean {
    const stored = otpStore.get(email);
    if (!stored) return false;

    if (Date.now() > stored.expiresAt) {
        otpStore.delete(email);
        return false;
    }

    if (stored.otp === otp) {
        otpStore.delete(email);
        return true;
    }

    return false;
}

export function deleteOTP(email: string): void {
    otpStore.delete(email);
}

// In-memory user storage (replace with database in production)
export interface StoredUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    isVerified: boolean;
    enrolledCourses: string[];
    createdAt: string;
}

const userStore = new Map<string, StoredUser>();

export function getUserByEmail(email: string): StoredUser | undefined {
    return Array.from(userStore.values()).find(u => u.email === email);
}

export function getUserById(id: string): StoredUser | undefined {
    return userStore.get(id);
}

export function createUser(user: StoredUser): void {
    userStore.set(user.id, user);
}

export function updateUser(id: string, updates: Partial<StoredUser>): StoredUser | undefined {
    const user = userStore.get(id);
    if (user) {
        const updated = { ...user, ...updates };
        userStore.set(id, updated);
        return updated;
    }
    return undefined;
}
