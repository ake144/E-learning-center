"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  Clock,
  CheckCircle,
  Circle,
  FileText,
  Download,
  Bookmark,
  ChevronLeft,
  Target,
  Users,
  MessageSquare,
  ThumbsUp,
  ArrowRight,
} from "lucide-react"

export default function LessonsPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(145) // 2:25
  const [duration] = useState(420) // 7:00
  const [notes, setNotes] = useState("")

  const lessons = [
    { id: 1, title: "What makes a quantity a vector?", duration: "2:45", completed: true },
    { id: 2, title: "Scalar vs Vector Examples", duration: "3:20", completed: true },
    { id: 3, title: "Vector Representation", duration: "4:15", completed: true },
    { id: 4, title: "Vector Addition Basics", duration: "5:30", completed: false, current: true },
    { id: 5, title: "Vector Subtraction", duration: "4:45", completed: false },
    { id: 6, title: "Magnitude and Direction", duration: "6:10", completed: false },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Vectors vs. Scalars</h1>
                <p className="text-sm text-gray-600">AI Foundations • Week 2 of 4</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Beginner
              </Badge>
              <Badge variant="outline" className="border-gray-300">
                <Clock className="w-3 h-3 mr-1" />7 min
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Video Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative bg-black aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">Vector Addition Basics</p>
                    <p className="text-sm opacity-70">Understanding how vectors combine</p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1">
                        <Progress value={(currentTime / duration) * 100} className="h-1 bg-white/20" />
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="transcript" className="data-[state=active]:bg-white">
                  Transcript
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-white">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="discussion" className="data-[state=active]:bg-white">
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Learning Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-gray-900">Distinguish between scalar and vector quantities</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-gray-900">Identify real-world examples of vectors and scalars</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Circle className="w-5 h-5 text-gray-400 mt-0.5" />
                        <span className="text-gray-900">
                          Explain the relationship between distance and displacement
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Scalar Quantities:</h4>
                      <p className="text-sm text-gray-700">
                        Have magnitude only (e.g., mass: 3 kg, temperature: 20°C, speed: 50 mph)
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Vector Quantities:</h4>
                      <p className="text-sm text-gray-700">
                        Have both magnitude and direction (e.g., velocity: 12 m/s east, force: 10 N upward)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transcript">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Video Transcript</CardTitle>
                    <CardDescription>Follow along with the complete lesson transcript</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-blue-600 font-medium">0:00</span>
                          <Badge variant="secondary" >
                            Intro
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-900">
                          Welcome to our lesson on vectors versus scalars. Today we'll learn the fundamental difference
                          between these two types of quantities in physics and mathematics.
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-blue-600 font-medium">1:15</span>
                          <Badge className="bg-blue-600" >
                            Current
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-900">
                          A vector, on the other hand, has both magnitude and direction. This means it tells us not just
                          how much, but also which way. Examples include velocity, force, and displacement.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Additional Resources</CardTitle>
                    <CardDescription>Supplementary materials to enhance your learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-blue-600 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Practice Problems</h4>
                            <p className="text-sm text-gray-600 mb-2">10 problems to test your understanding</p>
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3 mr-2" />
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      Discussion Forum
                    </CardTitle>
                    <CardDescription>Ask questions and discuss with fellow learners</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">John Doe</span>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-900 mb-2">
                            Great explanation! I'm still confused about when displacement becomes a vector. Can someone
                            help clarify?
                          </p>
                          <div className="flex items-center gap-4">
                            <Button size="sm" variant="ghost" className="text-gray-500">
                              <ThumbsUp className="w-3 h-3 mr-1" />5
                            </Button>
                            <Button size="sm" variant="ghost" className="text-blue-600">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <Textarea placeholder="Ask a question or share your thoughts..." className="mb-3" />
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Post Comment</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Course Progress</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">4 of 6 lessons</span>
                  <span className="text-lg font-semibold text-blue-600">67%</span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={67} className="h-2 mb-4" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>~15 min remaining</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Course Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      lesson.current
                        ? "bg-blue-50 border-blue-200"
                        : lesson.completed
                          ? "bg-green-50 border-green-200 hover:bg-green-100"
                          : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : lesson.current ? (
                        <Play className="w-5 h-5 text-blue-600 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${lesson.current ? "text-blue-600" : "text-gray-900"}`}>
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Next Lesson
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save for Later
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Study Group
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
