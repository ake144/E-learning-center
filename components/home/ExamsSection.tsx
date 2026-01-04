"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, ArrowRight, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

export default function ExamsSection() {
    const exams = [
        {
            title: "African Leadership Certification",
            duration: "2 Hours",
            questions: 50,
            level: "Advanced",
            category: "Leadership",
        },
        {
            title: "Digital Economy Specialist",
            duration: "1.5 Hours",
            questions: 40,
            level: "Intermediate",
            category: "Economics",
        },
        {
            title: "Pan-African Tech Proficiency",
            duration: "1 Hour",
            questions: 30,
            level: "Beginner",
            category: "Technology",
        },
    ]

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Professional <span className="text-blue-600">Exams & Certs</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Validate your skills with our industry-recognized certifications
                            designed for the modern African workforce.
                        </p>
                    </div>
                    <Link href="/exams">
                        <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 transition-all group">
                            View All Exams <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {exams.map((exam, index) => (
                        <Card key={index} className="h-full border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-[2rem] bg-white border-b-8 border-b-blue-600">
                            <CardContent className="p-10">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <Award className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{exam.category}</span>
                                </div>
                                <h4 className="text-2xl font-extrabold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                                    {exam.title}
                                </h4>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                                        <Clock className="w-5 h-5 text-blue-400" />
                                        <span>{exam.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                        <span>{exam.questions} Questions</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                                        <Award className="w-5 h-5 text-blue-400" />
                                        <span>{exam.level} Level</span>
                                    </div>
                                </div>

                                <Link href={`/exams/${index}`}>
                                    <Button variant="outline" className="w-full h-14 border-2 font-bold rounded-xl hover:bg-blue-50 transition-all group">
                                        Start Exam <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
