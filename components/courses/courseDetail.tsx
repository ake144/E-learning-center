"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle,
  Lock,
  ChevronRight,
  Download,
  Share,
  Heart,
  Globe,
  Target,
} from "lucide-react"
import { courses } from "@/utils/data/course"
import { useAuthStore } from "@/store/auth-store"

export default function CourseDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [completedLessons, setCompletedLessons] = useState<number[]>([])

  // Find course by slug (id prop is the slug)
  const course = courses.find(c => c.slug === id) || courses[0] // Fallback for demo

  const isEnrolled = user?.enrolledCourses.includes(course.slug) || false

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedCount = course.modules.reduce((acc, module) =>
    acc + module.lessons.filter(l => l.completed).length, 0
  )
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

  const handleEnroll = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("returnUrl", `/checkout/${course.slug}`)
      router.push("/auth/login")
      return
    }
    router.push(`/checkout/${course.slug}`)
  }

  const getLessonIcon = (type: string = 'video') => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />
      case "assignment":
        return <BookOpen className="w-4 h-4" />
      case "quiz":
        return <Target className="w-4 h-4" />
      case "project":
        return <Award className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  if (!course) {
    return <div className="p-8 text-center">Course not found</div>
  }

  return (
    <div className="min-h-screen pt-20 bg-[#F5FBFE]">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/courses" className="hover:text-blue-600">
            Browse Courses
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.8</span>
                  <span>(1.2k students)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.modules.length * 4} hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-blue-100 text-blue-700">Intermediate</Badge>
                <Badge variant="outline">Career</Badge>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="syllabus" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="syllabus" className="data-[state=active]:bg-white">
                  Syllabus
                </TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-white">
                  About
                </TabsTrigger>
                <TabsTrigger value="instructor" className="data-[state=active]:bg-white">
                  Instructor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="syllabus" className="space-y-4">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Course Modules</CardTitle>
                    {isEnrolled && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Your Progress</span>
                          <span className="text-blue-600 font-medium">{Math.round(course.progress)}% complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                              Module {moduleIndex + 1}: {module.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {module.lessons.length} lessons
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isEnrolled ? "hover:bg-gray-50 cursor-pointer" : ""
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                {isEnrolled ? (
                                  lesson.completed ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                                  )
                                ) : (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                )}
                                {getLessonIcon('video')}
                              </div>
                              <div className="flex-1">
                                <h4
                                  className={`font-medium ${lesson.completed && isEnrolled
                                      ? "text-green-700 line-through"
                                      : "text-gray-900"
                                    }`}
                                >
                                  {lesson.title}
                                </h4>
                                <p className="text-sm text-gray-600 capitalize">
                                  Video • {lesson.duration}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">Master core concepts and practical skills</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">Build real-world projects for your portfolio</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">Earn a certificate of completion</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">Expert Instructor</h3>
                        <p className="text-gray-600 mb-3">Senior Developer & Educator</p>
                        <p className="text-gray-700 mb-4">
                          Learn from industry experts with years of experience in the field.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Preview Card */}
            <Card className="border border-gray-200 shadow-sm sticky top-24">
              <div className="aspect-video w-full bg-gray-100 rounded-t-lg overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  {isEnrolled ? (
                    <div className="text-2xl font-bold text-green-600 mb-2">Enrolled</div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                        )}
                      </div>
                      {course.originalPrice && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </>
                  )}
                </div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <Link href={`/my-learning/${course.slug}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg">
                        <Play className="w-5 h-5 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Resources
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg shadow-lg shadow-blue-200"
                      onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      30-Day Money-Back Guarantee
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Heart className="w-4 h-4 mr-2" />
                      Save to Wishlist
                    </Button>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Full Lifetime Access</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Certificate of Completion</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mobile & TV Access</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
