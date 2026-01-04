"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Search, Play, Star, ChevronRight, Calendar, Bell, LayoutGrid, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Course } from "@/utils/data/course"
import { useAuthStore } from "@/store/auth-store"
import { useCourseStore } from "@/store/course-store"
import Hero from "@/components/hero/Hero"
import Partners from "@/components/home/Partners"
import Features from "@/components/home/Features"
import Testimonials from "@/components/home/Testimonials"
import CourseList from "@/components/home/CourseList"
import LibrarySection from "@/components/home/LibrarySection"
import ExamsSection from "@/components/home/ExamsSection"

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { courses, fetchCourses } = useCourseStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchCourses()
  }, [fetchCourses])

  // Filter courses user is enrolled in
  const myCourses = mounted && user
    ? courses.filter(c => user.enrolledCourses.includes(c.slug))
    : []

  const getButtonProps = (course: Course) => {
    if (course.progress === 100) {
      return { text: "Completed", variant: "secondary" as const };
    } else if (course.progress > 0) {
      return { text: "Continue", variant: "default" as const };
    }
    return { text: "Start", variant: "default" as const };
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white">
      {isAuthenticated && user ? (
        <div className="container mx-auto px-6 py-8 pt-24">
          {/* Dashboard View for Authenticated Users */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name.split(' ')[0]}</h2>
            <p className="text-gray-600 text-sm">Pick up where you left off or explore something new.</p>
          </div>

          {myCourses.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">Continue learning</h3>
                <Link href="/my-learning">
                  <Button variant="ghost" className="text-blue-600 cursor-pointer hover:text-blue-700">
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((course) => (
                  <Card key={course.slug} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="aspect-[16/9] bg-gray-100 relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                        {course.progress}% Complete
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 h-12">{course.title}</h4>
                      <Progress value={course.progress} className="h-1.5 mb-4" />
                      <Link href={`/my-learning/${course.slug}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Continue Learning
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Recommended for You */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">Recommended for you</h3>
              <Link href="/courses">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Link key={index} href={`/courses/${course.slug}`}>
                  <Card className="h-full border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                        ${course.price}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                          Career
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>4.8</span>
                          <span>(1.2k)</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <BookOpen className="w-3 h-3" />
                          <span>{course.modules.length} Modules</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                          View Course <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming Deadlines */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming deadlines</h3>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Quiz: Machine Learning Basics</p>
                    <p className="text-sm text-gray-600">Due Friday, 10:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto border-red-200 text-red-600 hover:bg-red-50">
                    Start Quiz
                  </Button>
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Assignment: Data Analysis Project</p>
                    <p className="text-sm text-gray-600">Due Monday, 11:59 PM</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto border-yellow-200 text-yellow-600 hover:bg-yellow-50">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Landing Page for Guest Users */}
          <Hero />
          <Partners />
          <Features />
          <CourseList />
          <LibrarySection />
          <ExamsSection />
          <Testimonials />

          {/* CTA Section */}
          <section className="py-24 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                Join Global Pathways Academy today and get access to world-class education that fits your schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/auth/signup">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 h-16 px-10 text-xl font-bold rounded-2xl shadow-2xl transition-all hover:scale-105">
                    Join for Free
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="border-2 text-blue-600 border-white  hover:bg-white/10 h-16 px-10 text-xl font-bold rounded-2xl transition-all">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}