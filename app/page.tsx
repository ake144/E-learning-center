"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { useCourseStore } from "@/store/course-store"
import Hero from "@/components/hero/Hero"
import Partners from "@/components/home/Partners"
import Features from "@/components/home/Features"
import Testimonials from "@/components/home/Testimonials"
import CourseList from "@/components/home/CourseList"
import LibrarySection from "@/components/home/LibrarySection"
import ExamsSection from "@/components/home/ExamsSection"
import AuthenticatedHome from "@/components/home/AuthenticatedHome"

export default function StudentDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const { fetchCourses } = useCourseStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchCourses()
  }, [fetchCourses])

  if (!mounted) return null

  // If authenticated, show the new dashboard
  if (isAuthenticated && user) {
    return <AuthenticatedHome />
  }

  // Public Homepage
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Partners />
      <Features />
      <CourseList />
      <LibrarySection />
      <ExamsSection />
      <Testimonials />
    </div>
  )
}