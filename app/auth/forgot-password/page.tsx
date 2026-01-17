"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight, ArrowLeft, BookOpen } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const { forgotPassword, isLoading } = useAuthStore()
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) {
            setError("Email is required")
            return
        }

        try {
            await forgotPassword(email)
            setIsSubmitted(true)
            toast.success("Reset link sent to your email")
        } catch (err: any) {
             setError(err.message || "Failed to send reset link")
             toast.error(err.message || "Failed to send reset link")
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
             {/* Left Side - Hero/Image */}
             <div className="hidden lg:flex relative bg-zinc-900 flex-col justify-between p-12 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop" 
                        alt="Library" 
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
                        Forgot your password?
                    </h2>
                    <p className="text-zinc-300 text-lg">
                        Don't worry, it happens to the best of us. We'll help you recover your account in no time.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center lg:text-left space-y-2"> 
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reset Password</h1>
                                <p className="text-gray-500">Enter your email address and we'll send you a link to reset your password.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-900 font-medium">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setError("")
                                            }}
                                            className={`pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all ${error ? "border-red-500 focus:border-red-500" : ""}`}
                                        />
                                    </div>
                                    {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Sending Link...</span>
                                        </div>
                                    ) : (
                                        <>
                                            Send Reset Link
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <Mail className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-gray-900">Check your email</h3>
                                <p className="text-gray-500 max-w-xs mx-auto">
                                    We have sent a password reset link to <span className="font-medium text-gray-900">{email}</span>
                                </p>
                            </div>
                             <p className="text-sm text-gray-500">
                                Didn't receive the email?{" "}
                                <button 
                                    onClick={handleSubmit} 
                                    disabled={isLoading}
                                    className="text-blue-600 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Click to resend
                                </button>
                            </p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                         <Link href="/auth/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
