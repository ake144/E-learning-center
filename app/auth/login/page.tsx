"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const { login, isLoading } = useAuthStore()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setErrors({})

        try {
            await login(formData.email, formData.password)
            toast.success("Welcome back!")
            router.push("/my-learning")
        } catch (err: any) {
            console.error("Login error:", err)
            const errorMessage = err.message || "Invalid credentials"
            setErrors({ submit: errorMessage })
            toast.error(errorMessage)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Hero/Image */}
            <div className="hidden lg:flex relative bg-zinc-900 flex-col justify-between p-12 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop" 
                        alt="Student studying" 
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
                    <blockquote className="space-y-2">
                        <p className="text-lg leading-relaxed font-light text-zinc-200">
                            "The flexibility to learn at my own pace while having access to world-class resources made all the difference. I was able to balance my studies with my full-time job."
                        </p>
                        <footer className="flex items-center gap-4 mt-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden border-2 border-white/20">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60" alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">David Miller</div>
                                <div className="text-sm text-zinc-400">Product Manager at CreativeUi</div>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
                        <p className="text-gray-500">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-900 font-medium">Email Address</Label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className={`pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
                                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className={`pl-10 pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 font-medium mt-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md animate-in fade-in slide-in-from-top-1">
                                {errors.submit}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                     <p className="text-center text-sm text-gray-500 mt-8">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors">
                            Create an account
                        </Link>
                    </p>

                    {/* Demo Credentials */}
                    <div className="pt-6 border-t border-gray-100">
                        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-500 text-center">
                            <p className="font-medium text-gray-900 mb-1">Demo Account:</p>
                            <p>Email: john@example.com</p>
                            <p>Password: password123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
