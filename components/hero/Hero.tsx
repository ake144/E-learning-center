"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageSquareText } from "lucide-react"

export default function Hero() {
    return (
        <section className="relative bg-white pt-24 pb-16 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <Badge variant="secondary" className="mb-6 px-4 py-1.5 bg-blue-50 text-blue-600 border-blue-100 text-sm font-medium rounded-full">
                            Africa's Gateway to Excellence
                        </Badge>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Global Pathways <br />
                            <span className="text-blue-600">Academy</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Empowering the next generation of African leaders with world-class
                            E-Learning, a vast E-Library, and professional Certifications.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/auth/signup">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/faq">
                                <Button variant="outline" className="h-14 px-8 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all flex items-center gap-2">
                                    <MessageSquareText className="w-5 h-5 text-blue-600" />
                                    Ask AI
                                </Button>
                            </Link>
                        </div>

                        {/* Stats or Trust Badge */}
                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">10k+</span>
                                <span>Active Learners</span>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">500+</span>
                                <span>Expert Mentors</span>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">95%</span>
                                <span>Success Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 relative w-full max-w-2xl">
                        <div className="relative z-10 animate-in fade-in slide-in-from-right-10 duration-1000">
                            <Image
                                src="/hero-image.png"
                                alt="Ethiopia's Premier Talent Management Platform"
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-0" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-0" />
                    </div>
                </div>
            </div>
        </section>
    )
}
