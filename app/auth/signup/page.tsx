"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

export default function SignupPage() {
    const router = useRouter()
    const { register, isLoading } = useAuthStore()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Please enter a valid phone number"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (!agreedToTerms) {
            newErrors.terms = "You must agree to the terms and conditions"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setErrors({})

        try {
            await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            })

            toast.success("Account created successfully!")
            router.push("/")
        } catch (err: any) {
            console.error("Signup error:", err)
            setErrors({ submit: err.message || "Signup failed" })
            toast.error(err.message || "Signup failed")
        }
    }

    const getPasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        return strength
    }

    const passwordStrength = getPasswordStrength(formData.password)
    const strengthColors = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-400", "bg-green-600"]
    const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"]

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Hero/Image */}
            <div className="hidden lg:flex relative bg-zinc-900 flex-col justify-between p-12 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" 
                        alt="Students learning" 
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
                            "The structured learning path and expert guidance at Global Pathways Academy completely transformed my career trajectory. It's not just a course; it's a career launchpad."
                        </p>
                        <footer className="flex items-center gap-4 mt-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden border-2 border-white/20">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60" alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">Sarah Chen</div>
                                <div className="text-sm text-zinc-400">Software Engineer at TechCorp</div>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h1>
                        <p className="text-gray-500">Enter your details below to create your account and start learning.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-900 font-medium">Full Name</Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className={`pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 font-medium mt-1">{errors.name}</p>}
                        </div>

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

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-900 font-medium">Phone Number</Label>
                            <div className="relative group">
                                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+251 9XX XXX XXX"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    className={`pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
                                />
                            </div>
                            {errors.phone && <p className="text-xs text-red-500 font-medium mt-1">{errors.phone}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
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

                            {/* Password Strength Indicator */}
                             {formData.password && (
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

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">Confirm Password</Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className={`pl-10 pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <CheckCircle className="absolute right-10 top-3 w-5 h-5 text-green-500 animate-in fade-in zoom-in" />
                                )}
                            </div>
                            {errors.confirmPassword && <p className="text-xs text-red-500 font-medium mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Terms Checkbox */}
                         <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                                I agree to the{" "}
                                <Link href="/terms" className="text-blue-600 hover:underline font-medium">Terms of Service</Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>
                            </label>
                        </div>
                        {errors.terms && <p className="text-xs text-red-500 font-medium">{errors.terms}</p>}

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">
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
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                     <p className="text-center text-sm text-gray-500 mt-8">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors">
                            Sign in to your account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
