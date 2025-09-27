"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { BookOpen, Code, Beaker, Calculator, Globe, Palette, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CoursesPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/courses/catalog")
  }, [router])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen, count: 24 },
    { id: "programming", name: "Programming", icon: Code, count: 8 },
    { id: "science", name: "Science", icon: Beaker, count: 6 },
    { id: "math", name: "Mathematics", icon: Calculator, count: 4 },
    { id: "languages", name: "Languages", icon: Globe, count: 3 },
    { id: "design", name: "Design", icon: Palette, count: 2 },
    { id: "business", name: "Business", icon: Briefcase, count: 1 },
  ]

  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to AI Basics",
      instructor: "Dr. Sarah Chen",
      university: "Stanford University",
      category: "programming",
      level: "Beginner",
      progress: 45,
      totalLessons: 12,
      completedLessons: 5,
      duration: "6 weeks",
      rating: 4.8,
      students: 1234,
      image: "/ai-artificial-intelligence-course.jpg",
      nextLesson: "Neural Networks Fundamentals",
      dueDate: "Jan 25",
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Prof. Michael Rodriguez",
      university: "University of Michigan",
      category: "programming",
      level: "Intermediate",
      progress: 78,
      totalLessons: 16,
      completedLessons: 12,
      duration: "8 weeks",
      rating: 4.9,
      students: 2156,
      image: "/python-programming-data-science.jpg",
      nextLesson: "Machine Learning Libraries",
      dueDate: "Feb 1",
    },
  ]

  const recommendedCourses = [
    {
      id: 4,
      title: "Advanced Machine Learning",
      instructor: "Dr. Alex Kim",
      university: "MIT",
      category: "programming",
      level: "Advanced",
      duration: "12 weeks",
      rating: 4.9,
      students: 3421,
      image: "/machine-learning-advanced-algorithms.jpg",
      price: "Free",
      skills: ["TensorFlow", "PyTorch", "Deep Learning"],
    },
    {
      id: 5,
      title: "Calculus Fundamentals",
      instructor: "Prof. Lisa Johnson",
      university: "UC Berkeley",
      category: "math",
      level: "Beginner",
      duration: "10 weeks",
      rating: 4.7,
      students: 1876,
      image: "/calculus-mathematics-fundamentals.jpg",
      price: "Free",
      skills: ["Derivatives", "Integrals", "Limits"],
    },
    {
      id: 6,
      title: "Web Development Bootcamp",
      instructor: "John Smith",
      university: "Google",
      category: "programming",
      level: "Beginner",
      duration: "16 weeks",
      rating: 4.8,
      students: 5432,
      image: "/web-development-html-css-javascript.jpg",
      price: "Free",
      skills: ["HTML", "CSS", "JavaScript", "React"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5FBFE]">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p>Redirecting to course catalog...</p>
        </div>
      </div>
    </div>
  )
}
