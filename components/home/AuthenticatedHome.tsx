"use client"

import { useAuthStore } from "@/store/auth-store"
import { useCourseStore } from "@/store/course-store"
import ContinueLearningCard from "./ContinueLearningCard"
import CourseGridCard from "./CourseGridCard"

export default function AuthenticatedHome() {
  const { user } = useAuthStore()
  const { courses } = useCourseStore()

  // Get enrolled courses
  const myCourses = user
    ? courses.filter(c => user.enrolledCourses.includes(c.slug))
    : []

  // Get the most recent active course (mock logic: just take the first one for now)
  // In a real app, you'd sort by 'lastAccessed'
  const activeCourse = myCourses.length > 0 ? myCourses[0] : null

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        {/* My Courses Section */}
        {activeCourse && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
            <ContinueLearningCard course={activeCourse} />
          </section>
        )}

        {/* All Courses Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseGridCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
