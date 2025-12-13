"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Star,
  Code,
  Beaker,
  Calculator,
  Globe,
  Palette,
  Briefcase,
  GraduationCap,
  Brain,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { courses } from "@/utils/data/course"

export default function CoursesCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen, count: courses.length, color: "bg-blue-100 text-blue-700" },
    { id: "education", name: "Education", icon: GraduationCap, count: 1, color: "bg-green-100 text-green-700" },
    // { id: "programming", name: "Computer Science", icon: Code, count: 892, color: "bg-green-100 text-green-700" },
    // { id: "data-science", name: "Data Science", icon: TrendingUp, count: 456, color: "bg-purple-100 text-purple-700" },
    // { id: "business", name: "Business", icon: Briefcase, count: 378, color: "bg-orange-100 text-orange-700" },
    // { id: "math", name: "Mathematics", icon: Calculator, count: 234, color: "bg-red-100 text-red-700" },
    // { id: "science", name: "Physical Science", icon: Beaker, count: 189, color: "bg-cyan-100 text-cyan-700" },
    // { id: "languages", name: "Language Learning", icon: Globe, count: 156, color: "bg-indigo-100 text-indigo-700" },
    // { id: "arts", name: "Arts and Humanities", icon: Palette, count: 134, color: "bg-pink-100 text-pink-700" },
    // { id: "health", name: "Health", icon: GraduationCap, count: 98, color: "bg-emerald-100 text-emerald-700" },
    // { id: "psychology", name: "Psychology", icon: Brain, count: 87, color: "bg-violet-100 text-violet-700" },
  ]

const allCourses = courses.map(course => ({
    id: course.slug,
    title: course.title,
    instructor: "Global Pathways Academy",
    university: "Global Pathways Academy",
    category: "education",
    level: "Beginner",
    duration: "Self-paced",
    rating: 5.0,
    students: 1200,
    price: course.price === 0 ? "Free" : `$${course.price}`,
    image: course.image,
    skills: ["Scholarships", "Interviews", "Career Development"],
    description: course.description
}));

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.university.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen pt-22 bg-[#F5FBFE]">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
          <p className="text-gray-600">Choose from over 2,800 courses from top universities and companies</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Subject Areas
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-left ${
                        selectedCategory === category.id ? "bg-blue-600 text-white" : "hover:bg-gray-50 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant={selectedCategory === category.id ? "secondary" : "outline"} className="text-xs">
                        {category.count.toLocaleString()}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>
                <div className="space-y-4">
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

                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">Duration</label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Duration</SelectItem>
                        <SelectItem value="short">Less than 2 months</SelectItem>
                        <SelectItem value="medium">2-6 months</SelectItem>
                        <SelectItem value="long">More than 6 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">Price</label>
                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setSelectedCategory("all")
                      setSelectedLevel("all")
                      setSelectedDuration("all")
                      setSelectedPrice("all")
                      setSearchQuery("")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{filteredCourses.length} courses found</h2>
                {selectedCategory !== "all" && (
                  <p className="text-sm text-gray-600 mt-1">
                    in {categories.find((c) => c.id === selectedCategory)?.name}
                  </p>
                )}
              </div>
              <Select defaultValue="popular">
                <SelectTrigger className="w-48 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
                    <div className="aspect-video w-full bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-base">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.university}</p>
                          <p className="text-xs text-gray-500">{course.instructor}</p>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">
                            {course.students > 1000000
                              ? `${(course.students / 1000000).toFixed(1)}M`
                              : `${(course.students / 1000).toFixed(0)}K`}{" "}
                            students
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="secondary" className="text-xs bg-gray-100">
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {course.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs border-gray-300">
                              {skill}
                            </Badge>
                          ))}
                          {course.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs border-gray-300">
                              +{course.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-auto">
                        <span className="text-sm font-semibold text-green-600">{course.price}</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700  text-white">
                          View Course
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse different categories</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedLevel("all")
                    setSearchQuery("")
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
