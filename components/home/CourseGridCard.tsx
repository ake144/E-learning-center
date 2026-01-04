import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, BarChart, Play } from "lucide-react"
import { Course } from "@/utils/data/course"

interface CourseGridCardProps {
  course: Course
}

export default function CourseGridCard({ course }: CourseGridCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="group block h-full">
      <Card className="h-full border-none shadow-none hover:shadow-lg transition-all duration-300 bg-white overflow-hidden rounded-xl">
        {/* Image Header */}
        <div className="aspect-video relative overflow-hidden rounded-xl mb-4">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
              <Play className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          {/* Author Info (Mock data for now as it might not be in course object) */}
          <div className="flex items-center gap-2 mb-3">
             {/* Placeholder for author avatar if available, or just text */}
             <div className="text-xs font-medium text-gray-500">
                By : <span className="text-gray-900">E-Learning Instructor</span>
             </div>
          </div>

          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            {course.description}
          </p>

          {/* Metadata Footer */}
          <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center gap-1.5">
              <BarChart className="w-3.5 h-3.5 text-red-400" />
              <span>{course?.level || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>{course?.duration || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
              <span>{course?.lessons || "N/A"} Lessons</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
