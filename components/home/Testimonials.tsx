"use client"

import { Star } from "lucide-react"

export default function Testimonials() {
    const testimonials = [
        {
            name: "Abebe Kebede",
            role: "Software Engineer",
            content: "Global Pathways Academy transformed my career. The AI-driven paths helped me focus on what mattered most, and I landed my dream job within months.",
            avatar: "https://i.pravatar.cc/150?u=abebe",
        },
        {
            name: "Selamawit Tekle",
            role: "Digital Marketer",
            content: "The expert mentorship is unparalleled. Having someone to guide me through complex projects made all the difference.",
            avatar: "https://i.pravatar.cc/150?u=selam",
        },
        {
            name: "Yonas Alemu",
            role: "Data Scientist",
            content: "I love the gamified experience! It keeps me coming back every day. The certificates are also highly recognized in the industry.",
            avatar: "https://i.pravatar.cc/150?u=yonas",
        },
    ]

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
                    <p className="text-lg text-gray-600">
                        Join thousands of successful learners who have transformed their lives with Global Pathways Academy.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-8 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
