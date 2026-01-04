"use client"

import { useCourseStore } from "@/store/course-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CourseList() {
    const { courses } = useCourseStore()

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Explore Our <span className="text-blue-600">Popular Courses</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Discover world-class programs designed to help you master new skills
                            and advance your career in the digital age.
                        </p>
                    </div>
                    <Link href="/courses">
                        <Button variant="outline" className="h-14 px-8 border-2 font-bold text-lg rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group">
                            View All Courses <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {courses.map((course, index) => (
                        <Link key={index} href={`/courses/${course.slug}`}>
                            <Card className="h-full border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-[2rem] bg-white">
                                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-lg font-black text-blue-600 shadow-xl">
                                        ${course.price}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                        <span className="text-white font-bold text-lg flex items-center">
                                            View Details <ArrowRight className="w-5 h-5 ml-2" />
                                        </span>
                                    </div>
                                </div>
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                                            Best Seller
                                        </Badge>
                                        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-bold">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span>4.9</span>
                                            <span className="text-gray-300 font-normal">(2.4k)</span>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                        {course.title}
                                    </h4>
                                    <p className="text-gray-600 mb-8 line-clamp-2 leading-relaxed text-base">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-bold">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <BookOpen className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span>{course.modules.length} Modules</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                                            Enroll Now
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
