"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Code,
  Beaker,
  Calculator,
  Globe,
  Palette,
  Briefcase,
  GraduationCap,
} from "lucide-react"

export default function CoursesPage() {
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
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">My Courses</h1>
                <p className="text-sm text-gray-600">Manage your learning journey</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-300"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Catalog
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedCategory === category.id ? "bg-blue-600 text-white" : "hover:bg-gray-50 text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <Badge variant={selectedCategory === category.id ? "secondary" : "outline"} className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedLevel("all")
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Enrolled Courses</span>
                  <span className="text-lg font-semibold text-blue-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="text-lg font-semibold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certificates</span>
                  <span className="text-lg font-semibold text-purple-600">5</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Overall Progress</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">68% average completion</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Enrolled Courses</h2>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {enrolledCourses.length} active
                </Badge>
              </div>

              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-48 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600">
                              {course.university} • {course.instructor}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{course.students.toLocaleString()} students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current text-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {course.completedLessons} of {course.totalLessons} lessons completed
                              </span>
                              <span className="text-blue-600 font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <p className="text-gray-600">Next: {course.nextLesson}</p>
                              <p className="text-gray-500">Due {course.dueDate}</p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                              <Play className="w-4 h-4 mr-2" />
                              Continue Learning
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Recommended for You</h2>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <Card key={course.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video w-full bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.university}</p>
                          <p className="text-xs text-gray-500">{course.instructor}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{course.students.toLocaleString()} students</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="secondary" className="text-xs bg-gray-100">
                            {course.level}
                          </Badge>
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {course.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs border-gray-300">
                              {skill}
                            </Badge>
                          ))}
                          {course.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs border-gray-300">
                              +{course.skills.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-semibold text-green-600">{course.price}</span>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border border-gray-200 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Keep up the great work!</h3>
                    <p className="text-gray-600 mb-3">
                      You've completed 3 courses this month and earned 2 certificates. Continue your learning journey!
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Award className="w-4 h-4 mr-2" />
                      View Certificates
                    </Button>
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
