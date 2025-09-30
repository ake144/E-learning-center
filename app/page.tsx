"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Search, Play, Star, ChevronRight, Calendar, Bell, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { Course, courses } from "@/utils/data/course"

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Expanded recommended courses with different categories
  const recommendedCourses = [
    {
      title: "Python for Data Science",
      university: "University of Michigan",
      rating: 4.7,
      students: "2.1M",
      level: "Beginner",
      duration: "6 months",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Data Visualization with Tableau",
      university: "UC Davis",
      rating: 4.6,
      students: "890K",
      level: "Intermediate",
      duration: "4 months",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Machine Learning",
      university: "Stanford University",
      rating: 4.9,
      students: "1.5M",
      level: "Advanced",
      duration: "3 months",
      category: "AI & Machine Learning",
      image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Business Strategy",
      university: "Harvard Business School",
      rating: 4.8,
      students: "1M",
      level: "Beginner",
      duration: "2 months",
      category: "Business",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Nutrition and Health",
      university: "Yale University",
      rating: 4.5,
      students: "500K",
      level: "Intermediate",
      duration: "1 month",
      category: "Health",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Web Development Basics",
      university: "California Institute of the Arts",
      rating: 4.7,
      students: "300K",
      level: "Beginner",
      duration: "4 months",
      category: "Web Development & Design",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  const getButtonProps = (course: Course) => {
    if (course.progress === 100) {
      return { text: "Completed", variant: "secondary" as const };
    } else if (course.progress > 0) {
      return { text: "Continue", variant: "default" as const };
    }
    return { text: "Start", variant: "default" as const };
  }

  // Categories for browsing
  const categories = [
    { name: "Data Science", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Business", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Computer Science", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Health", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Arts & Humanities", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Personal Development", icon: <LayoutGrid className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-[#F5FBFE] pt-20">
     

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex</h2>
          <p className="text-gray-800 text-sm">Pick up where you left off or explore something new.</p>
        </div>

        {/* Continue Learning */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Continue learning</h3>
            <Link href="/my-learning">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const { text, variant } = getButtonProps(course);
              return (
                <Card key={course.slug} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="aspect-[16/9] bg-gray-100">
                    <img
                      src={`http://images.unsplash.com/photo-1758691736664-0b83e4f1215e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">{course.description}</p>
                    <Progress value={course.progress} className="h-1 mb-2" />
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{course.progress}% complete</span>
                      <Button variant={variant} size="sm" className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white" onClick={() => router.push(`/my-learning/${course.slug}`)}>
                        {text}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

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
            {recommendedCourses.map((course, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-[16/9] bg-gray-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">{course.category}</Badge>
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{course.university}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{course.rating}</span>
                    <span className="text-gray-400">•</span>
                    <span>{course.students} learners</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline" className="text-xs">{course.level}</Badge>
                    <span>{course.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Browse by category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <Button key={index} variant="outline" className="h-24 flex flex-col items-center justify-center text-center">
                {cat.icon}
                <span className="mt-2 text-sm">{cat.name}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming deadlines</h3>
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                <Calendar className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium text-gray-900">Quiz: Machine Learning Basics</p>
                  <p className="text-sm text-gray-600">Due Friday, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-900">Assignment: Data Analysis Project</p>
                  <p className="text-sm text-gray-600">Due Monday, 11:59 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}