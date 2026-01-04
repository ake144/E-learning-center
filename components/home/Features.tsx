"use client"

import { BookOpen, Target, Users, Zap } from "lucide-react"

export default function Features() {
    const features = [
        {
            title: "AI-Driven Learning",
            description: "Personalized learning paths powered by advanced AI to match your pace and style.",
            icon: Zap,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Expert Mentorship",
            description: "Get direct guidance from industry professionals and experienced educators.",
            icon: Users,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            title: "Gamified Experience",
            description: "Stay motivated with badges, leaderboards, and interactive challenges.",
            icon: Target,
            color: "bg-purple-50 text-purple-600",
        },
        {
            title: "Recognized Certificates",
            description: "Earn certificates that are valued by top employers across the nation.",
            icon: BookOpen,
            color: "bg-emerald-50 text-emerald-600",
        },
    ]

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Global Pathways Academy?</h2>
                    <p className="text-lg text-gray-600">
                        We combine cutting-edge technology with world-class education to provide
                        the best learning experience across Africa and the globe.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all group">
                            <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
