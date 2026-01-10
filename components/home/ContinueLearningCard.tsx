import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play } from "lucide-react"
import { Course } from "@/utils/data/course"

interface ContinueLearningCardProps {
  course: Course
}

export default function ContinueLearningCard({ course }: ContinueLearningCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row gap-6 items-center">
      {/* Image Section */}
      <div className="relative w-full md:w-80 h-48 shrink-0 rounded-lg overflow-hidden group">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play className="w-5 h-5 text-blue-600 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Progress</span>
            <span className="font-bold text-gray-900">{course.progress}%</span>
          </div>
<Progress value={course.progress} className="h-2 bg-gray-100 [&>div]:bg-green-500" />
        </div>

        <div className="mt-6">
          <Link href={`/my-learning/${course.slug}`}>
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-medium px-8"
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
