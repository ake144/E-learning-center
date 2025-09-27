"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Search, Play, Users, Star, ChevronRight, Calendar, Award, Video, FileText } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Coursera Style */}
      

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section - Coursera Style */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back, Alex</h2>
          <p className="text-gray-600">Continue your learning journey and achieve your goals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning - Coursera Style */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Continue Learning</CardTitle>
                  <Link href="/courses">
                    <Button variant="ghost" size="sm" className="text-blue-600 cursor-pointer hover:text-blue-700">
                      View all courses
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">Introduction to AI Basics</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Stanford University • Course 1 of 4 in the AI Specialization
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Week 2 of 4</span>
                        <span className="text-blue-600 font-medium">45% complete</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                  <Link href="/lessons" className="ml-auto">
                  <Button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses - Coursera Style */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Recommended for you</CardTitle>
                      <Link href="/categories">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          View all
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Python for Data Science",
                      university: "University of Michigan",
                      rating: 4.7,
                      students: "2.1M",
                      level: "Beginner",
                      duration: "6 months",
                      image: "/python-programming-concept.png",
                    },
                    {
                      title: "Data Visualization with Tableau",
                      university: "UC Davis",
                      rating: 4.6,
                      students: "890K",
                      level: "Intermediate",
                      duration: "4 months",
                      image: "/data-visualization-abstract.png",
                    },
                  ].map((course, index) => (
                    <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="aspect-video w-full bg-gray-100 rounded-t-lg overflow-hidden">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 line-clamp-2">{course.title}</h4>
                          <p className="text-sm text-gray-600">{course.university}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{course.rating}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{course.students} students</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="secondary" className="text-xs">
                              {course.level}
                            </Badge>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Your Learning Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      goal: "Complete AI Fundamentals Specialization",
                      progress: 45,
                      deadline: "Dec 2024",
                      status: "On track",
                    },
                    {
                      goal: "Earn Python Programming Certificate",
                      progress: 20,
                      deadline: "Jan 2025",
                      status: "Behind",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.goal}</h4>
                        <Badge
                          variant={item.status === "On track" ? "default" : "destructive"}
                          className={item.status === "On track" ? "bg-green-100 text-green-800" : ""}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Target: {item.deadline}</span>
                          <span className="text-blue-600 font-medium">{item.progress}% complete</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Stats */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">6</div>
                    <div className="text-sm text-gray-600">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">12.5</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">This week</span>
                    <span className="text-sm font-medium text-gray-900">3.2 hours</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Goal: 5 hours per week</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">Quiz: Machine Learning Basics</p>
                    <p className="text-xs text-gray-600">Due Friday, 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">Assignment: Data Analysis Project</p>
                    <p className="text-xs text-gray-600">Due Monday, 11:59 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Certificates
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Discussion Forums
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Award className="w-4 h-4 mr-2" />
                  Career Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
