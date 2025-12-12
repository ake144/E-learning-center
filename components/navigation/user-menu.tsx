"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    BookOpen,
    Search,
    Menu,
    X,
    LogOut,
    User,
    Settings,
    GraduationCap,
    ChevronDown
} from "lucide-react"
import { useAuthStore } from "@/store/auth-store"

export function UserMenu() {
    const router = useRouter()
    const { user, signOut, isAuthenticated } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)

    const handleSignOut = () => {
        signOut()
        setIsOpen(false)
        router.push("/")
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/auth/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                        Sign In
                    </Button>
                </Link>
                <Link href="/auth/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Get Started
                    </Button>
                </Link>
            </div>
        )
    }

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
                <Avatar className="w-9 h-9 border-2 border-blue-100">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-semibold">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                            {user.isVerified && (
                                <span className="inline-flex items-center gap-1 mt-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                    ✓ Verified
                                </span>
                            )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            <Link href="/profile" onClick={() => setIsOpen(false)}>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                    <User className="w-4 h-4" />
                                    My Profile
                                </button>
                            </Link>
                            <Link href="/my-learning" onClick={() => setIsOpen(false)}>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                    <GraduationCap className="w-4 h-4" />
                                    My Learning
                                    {user.enrolledCourses.length > 0 && (
                                        <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                                            {user.enrolledCourses.length}
                                        </span>
                                    )}
                                </button>
                            </Link>
                            <Link href="/settings" onClick={() => setIsOpen(false)}>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                            </Link>
                        </div>

                        {/* Sign Out */}
                        <div className="border-t border-gray-100 pt-2">
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
