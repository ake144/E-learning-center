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

export interface Lesson {
  id: number
  title: string
  module: string
  duration: string
  overview: string
  transcript: string
  resources: string[]
}
export interface Module {
    id: number
    title: string
    lessons: Lesson[]
    }


export default function CourseDetail({ current }: { current?: Lesson }) {

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(145)
  const [duration] = useState(420)
  const [notes, setNotes] = useState("")
  const [currentView, setCurrentView] = useState("courses") // "courses" or "lesson"
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(current || null)

  const modules = [
    {
      id: 1,
      title: "Module 1: Self-Awareness & Career Foundations",
      lessons: [
        {
          id: 1,
          title: "Identifying strengths, weaknesses, and interests",
          module: "Module 1: Self-Awareness & Career Foundations",
          duration: "5:30",
          overview: "Learn to identify your strengths, weaknesses, and interests for career growth.",
          transcript: "This lesson covers self-assessment techniques to help you understand your professional profile.",
          resources: [
            "Self-assessment worksheet",
            "Career interest survey",
            "Recommended reading"
          ],
          completed: true
        }
      ]
    },
    {
      id: 2,
      title: "Module 2: Building a Professional Identity",
      lessons: [
        {
          id: 2,
          title: "Writing an impactful one-page resume",
          module: "Module 2: Building a Professional Identity",
          duration: "6:15",
          overview: "Master the art of resume writing for professional success.",
          transcript: "This lesson guides you through creating a concise and effective resume.",
          resources: [
            "Resume template",
            "Sample resumes",
            "Resume writing tips"
          ],
          completed: true
        }
      ]
    },
    {
      id: 3,
      title: "Module 3: Communication & Interview Skills",
      lessons: [
        {
          id: 3,
          title: "Business email etiquette",
          module: "Module 3: Communication & Interview Skills",
          duration: "4:45",
          overview: "Understand the essentials of professional email communication.",
          transcript: "Learn how to write clear, polite, and effective business emails.",
          resources: [
            "Email etiquette guide",
            "Sample business emails",
            "Checklist for professional emails"
          ],
          completed: true
        }
      ]
    },
    {
      id: 4,
      title: "Module 4: Workplace Readiness",
      lessons: [
        {
          id: 4,
          title: "Teamwork & collaboration",
          module: "Module 4: Workplace Readiness",
          duration: "7:20",
          overview: "Develop skills for effective teamwork and collaboration.",
          transcript: "Explore strategies for working well in teams and collaborating with colleagues.",
          resources: [
            "Teamwork exercises",
            "Collaboration tools overview",
            "Case studies"
          ],
          completed: false,
          current: true
        }
      ]
    },
    {
      id: 5,
      title: "Module 5: Career Growth & Future Skills",
      lessons: [
        {
          id: 5,
          title: "Upskilling with online platforms",
          module: "Module 5: Career Growth & Future Skills",
          duration: "5:10",
          overview: "Discover how to upskill using online learning platforms.",
          transcript: "This lesson introduces top platforms and strategies for continuous learning.",
          resources: [
            "List of online platforms",
            "Upskilling roadmap",
            "Success stories"
          ],
          completed: false
        }
      ]
    }
  ]

  const currentLessonData = currentLesson ? {
    id: currentLesson.id,
    title: currentLesson.title,
    module: modules.find(m => m.lessons.some(l => l.id === currentLesson.id))?.title || "Career Skills",
    overview: "Use this micro-lesson to build essential career skills and apply them directly to your professional development.",
    transcript: "In this lesson, you'll learn practical skills that can be immediately applied to enhance your career trajectory and professional presence.",
    resources: [
      "How to master this skill (YouTube)",
      "Practical templates and examples",
      "Additional reading materials"
    ]
  } : null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    setCurrentView("lesson")
  }


  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setCurrentView("courses")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{currentLessonData?.module}</h1>
                <p className="text-sm text-gray-600">Career Skills • Module {modules.findIndex(m => m.lessons.some(l => l.id === currentLessonData?.id)) + 1} of 5</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Professional
              </Badge>
              <Badge variant="outline" className="border-gray-300">
                <Clock className="w-3 h-3 mr-1" />
                {currentLesson?.duration}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative bg-gradient-to-br from-purple-900 to-blue-800 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">{currentLessonData?.title}</p>
                    <p className="text-sm opacity-70">Practical career development skills</p>
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
                        <span className="text-gray-900">Develop practical career skills</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-gray-900">Apply learning to real-world scenarios</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Circle className="w-5 h-5 text-gray-400 mt-0.5" />
                        <span className="text-gray-900">Enhance professional development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Key Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Immediate Application:</h4>
                      <p className="text-sm text-gray-700">
                        Skills you can apply directly to resume building, interviews, and workplace scenarios
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Professional Growth:</h4>
                      <p className="text-sm text-gray-700">
                        Develop competencies that enhance your career trajectory and professional presence
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transcript">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Lesson Transcript & Notes</CardTitle>
                    <CardDescription>Follow along and take your own notes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Transcript</h4>
                        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-900">
                          {currentLessonData?.transcript}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Your Notes</h4>
                        <Textarea 
                          placeholder="Write your key takeaways, action items, and reflections..." 
                          rows={8}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
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
                    <div className="grid grid-cols-1 gap-4">
                      {currentLessonData?.resources.map((resource, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-blue-600 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{resource}</h4>
                              <p className="text-sm text-gray-600 mb-2">Practical resource for skill development</p>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3 mr-2" />
                                Access Resource
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
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
                    <CardDescription>Share insights and learn from peers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">Amina Lee</span>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-900 mb-2">
                            This lesson helped me identify my key strengths for my resume. Anyone else working on their professional identity?
                          </p>
                          <div className="flex items-center gap-4">
                            <Button size="sm" variant="ghost" className="text-gray-500">
                              <ThumbsUp className="w-3 h-3 mr-1" />3
                            </Button>
                            <Button size="sm" variant="ghost" className="text-blue-600">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <Textarea placeholder="Share your takeaway or ask a question..." className="mb-3" />
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
                  <span className="text-sm text-gray-600">3 of 5 modules</span>
                  <span className="text-lg font-semibold text-blue-600">60%</span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={60} className="h-2 mb-4" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>~20 min remaining</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Career Skills Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {modules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900 mt-3 first:mt-0">{module.title}</h4>
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          lesson.id === currentLesson?.id
                            ? "bg-blue-50 border-blue-200"
                            : lesson.completed
                              ? "bg-green-50 border-green-200 hover:bg-green-100"
                              : "hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className="flex items-start gap-3">
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          ) : lesson.id === currentLesson?.id ? (
                            <Play className="w-4 h-4 text-blue-600 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <h4 className={`font-medium text-xs ${lesson.id === currentLesson?.id ? "text-blue-600" : "text-gray-900"}`}>
                              {lesson.title}
                            </h4>
                            <p className="text-xs text-gray-500">{lesson.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  <Download className="w-4 h-4 mr-2" />
                  Download Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}