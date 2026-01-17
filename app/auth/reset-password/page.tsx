"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, BookOpen } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const { resetPassword, isLoading } = useAuthStore()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    // Password strength calculation
    const getPasswordStrength = (pass: string) => {
        let strength = 0
        if (pass.length >= 8) strength++
        if (/[A-Z]/.test(pass)) strength++
        if (/[a-z]/.test(pass)) strength++
        if (/\d/.test(pass)) strength++
        if (/[^A-Za-z0-9]/.test(pass)) strength++
        return strength
    }
    
    const passwordStrength = getPasswordStrength(password)
    const strengthColors = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-400", "bg-green-600"]
    const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!token) {
            setError("Invalid or missing reset token.")
            return
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            await resetPassword(token, password)
            setSuccess(true)
            toast.success("Password reset successfully")
            setTimeout(() => router.push('/auth/login'), 2000)
        } catch (err: any) {
            setError(err.message || "Failed to reset password")
            toast.error(err.message || "Failed to reset password")
        }
    }

    if (success) {
        return (
            <div className="w-full max-w-md space-y-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">Password Reset Complete</h3>
                    <p className="text-gray-500">
                        Your password has been successfully updated. You can now login with your new password.
                    </p>
                </div>
                <Button
                    onClick={() => router.push('/auth/login')}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                >
                    Proceed to Login
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Set new password</h1>
                <p className="text-gray-500">
                    Create a new, strong password that you haven't used before.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-900 font-medium">New Password</Label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError("")
                            }}
                            className="pl-10 pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {password && (
                        <div className="space-y-2 pt-1 transition-all">
                            <div className="flex gap-1.5 h-1.5">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= level ? strengthColors[passwordStrength] : "bg-gray-100"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">Strength check</span>
                                <span className={`font-medium ${
                                    passwordStrength < 2 ? "text-red-500" : 
                                    passwordStrength < 4 ? "text-yellow-600" : 
                                    "text-green-600"
                                }`}>
                                    {strengthLabels[passwordStrength]}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">Confirm Password</Label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setError("")
                            }}
                            className={`pl-10 pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all ${error ? "border-red-500 focus:border-red-500" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                 {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                    {isLoading ? (
                         <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Resetting...</span>
                        </div>
                    ) : (
                        <>
                            Reset Password
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
             {/* Left Side - Hero/Image */}
             <div className="hidden lg:flex relative bg-zinc-900 flex-col justify-between p-12 text-white overflow-hidden">
                <div className="absolute inset-0">
                     <img 
                        src="https://images.unsplash.com/photo-1555421689-49178386ad8f?q=80&w=2072&auto=format&fit=crop" 
                        alt="Security" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                </div>
                
                <div className="relative z-10">
                   <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Global Pathways Academy
                        </span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <h2 className="text-3xl font-bold leading-tight text-white">
                        Secure your account
                    </h2>
                     <p className="text-zinc-300 text-lg">
                        Choose a strong password to keep your learning progress and personal information safe.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    )
}
