"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Navigation } from "@/components/navigation"
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

export default function CourseDetailPage({ id }: { id: string }) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2])

  // Mock course data - in real app, fetch based on id
  const course = {
    id: 1,
    title: "Machine Learning Specialization",
    instructor: "Andrew Ng",
    slug: "machine-learning-specialization",
    university: "Stanford University",
    category: "Data Science",
    level: "Intermediate",
    duration: "3 months",
    rating: 4.9,
    students: 4200000,
    price: "Free",
    image: "/machine-learning-advanced-algorithms.jpg",
    skills: [
      "Python",
      "TensorFlow",
      "Neural Networks",
      "Deep Learning",
      "Supervised Learning",
      "Unsupervised Learning",
    ],
    description:
      "This Specialization from leading researchers at Stanford University and DeepLearning.AI introduces you to the exciting, high-demand field of Machine Learning. Through a series of practical case studies, you will gain applied experience in major areas of Machine Learning including Prediction, Classification, Clustering, and Information Retrieval.",
    whatYouWillLearn: [
      "Build machine learning models in Python using popular machine learning libraries NumPy and scikit-learn",
      "Build and train supervised machine learning models for prediction and binary classification tasks",
      "Build and train a neural network with TensorFlow to perform multi-class classification",
      "Apply best practices for machine learning development so that your models generalize to data and tasks in the real world",
      "Build and use decision trees and tree ensemble methods, including random forests and boosted trees",
      "Use unsupervised learning techniques for unsupervised learning including clustering and anomaly detection",
    ],
    modules: [
      {
        id: 1,
        title: "Supervised Machine Learning: Regression and Classification",
        duration: "33 hours",
        lessons: [
          { id: 1, title: "Introduction to Machine Learning", duration: "15 min", type: "video", completed: true },
          { id: 2, title: "Linear Regression with One Variable", duration: "45 min", type: "video", completed: true },
          {
            id: 3,
            title: "Linear Regression with Multiple Variables",
            duration: "38 min",
            type: "video",
            completed: false,
          },
          { id: 4, title: "Logistic Regression", duration: "42 min", type: "video", completed: false },
          {
            id: 5,
            title: "Programming Assignment: Linear Regression",
            duration: "2 hours",
            type: "assignment",
            completed: false,
          },
          { id: 6, title: "Quiz: Supervised Learning", duration: "30 min", type: "quiz", completed: false },
        ],
      },
      {
        id: 2,
        title: "Advanced Learning Algorithms",
        duration: "34 hours",
        lessons: [
          { id: 7, title: "Neural Networks", duration: "52 min", type: "video", completed: false },
          { id: 8, title: "Neural Network Training", duration: "48 min", type: "video", completed: false },
          { id: 9, title: "Advice for Applying Machine Learning", duration: "35 min", type: "video", completed: false },
          { id: 10, title: "Decision Trees", duration: "40 min", type: "video", completed: false },
          {
            id: 11,
            title: "Programming Assignment: Neural Networks",
            duration: "3 hours",
            type: "assignment",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
        duration: "27 hours",
        lessons: [
          { id: 12, title: "Unsupervised Learning", duration: "45 min", type: "video", completed: false },
          { id: 13, title: "Recommender Systems", duration: "38 min", type: "video", completed: false },
          { id: 14, title: "Reinforcement Learning", duration: "42 min", type: "video", completed: false },
          { id: 15, title: "Final Project", duration: "4 hours", type: "project", completed: false },
        ],
      },
    ],
    instructorInfo: {
      name: "Andrew Ng",
      title: "Co-founder of Coursera, Adjunct Professor at Stanford University",
      bio: "Andrew Ng is a globally recognized leader in AI. He is the founder of DeepLearning.AI, Co-founder of Coursera, and an Adjunct Professor at Stanford University.",
      courses: 12,
      students: 8500000,
      rating: 4.9,
    },
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const progressPercentage = (completedLessons.length / totalLessons) * 100

  const toggleLessonComplete = (lessonId: number) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId))
    } else {
      setCompletedLessons([...completedLessons, lessonId])
    }
  }

  const getLessonIcon = (type: string) => {
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

  return (
    <div className="min-h-screen pt-20 bg-[#F5FBFE]">
      {/* <Navigation /> */}

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/courses/catalog" className="hover:text-blue-600">
            Browse Courses
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/courses/catalog" className="hover:text-blue-600">
            {course.category}
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
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-blue-100 text-blue-700">{course.level}</Badge>
                <Badge variant="outline">{course.category}</Badge>
                {course.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="syllabus" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger value="syllabus" className="data-[state=active]:bg-white">
                  Syllabus
                </TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-white">
                  About
                </TabsTrigger>
                <TabsTrigger value="instructor" className="data-[state=active]:bg-white">
                  Instructor
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-white">
                  Reviews
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
                          <span className="text-blue-600 font-medium">{Math.round(progressPercentage)}% complete</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
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
                              {module.duration}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                isEnrolled ? "hover:bg-gray-50 cursor-pointer" : ""
                              }`}
                              onClick={() => isEnrolled && toggleLessonComplete(lesson.id)}
                            >
                              <div className="flex items-center gap-2">
                                {isEnrolled ? (
                                  completedLessons.includes(lesson.id) ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                                  )
                                ) : (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                )}
                                {getLessonIcon(lesson.type)}
                              </div>
                              <div className="flex-1">
                                <h4
                                  className={`font-medium ${
                                    completedLessons.includes(lesson.id)
                                      ? "text-green-700 line-through"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {lesson.title}
                                </h4>
                                <p className="text-sm text-gray-600 capitalize">
                                  {lesson.type} • {lesson.duration}
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
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills you'll gain</h3>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-blue-200 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.instructorInfo.name}</h3>
                        <p className="text-gray-600 mb-3">{course.instructorInfo.title}</p>
                        <p className="text-gray-700 mb-4">{course.instructorInfo.bio}</p>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{course.instructorInfo.courses}</div>
                            <div className="text-sm text-gray-600">Courses</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">
                              {(course.instructorInfo.students / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-sm text-gray-600">Students</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{course.instructorInfo.rating}</div>
                            <div className="text-sm text-gray-600">Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Reviews coming soon</h3>
                      <p className="text-gray-600">Student reviews will be displayed here</p>
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
                  <div className="text-2xl font-bold text-green-600 mb-2">{course.price}</div>
                  <p className="text-sm text-gray-600">Financial aid available</p>
                </div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <Link href={`/my-learning/${course.slug}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setIsEnrolled(true)}
                    >
                      Enroll for Free
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Heart className="w-4 h-4 mr-2" />
                      Save to Wishlist
                    </Button>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Flexible deadlines</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shareable certificate</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">100% online</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Beginner level</span>
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
