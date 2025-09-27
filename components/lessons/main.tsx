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
import Link from "next/link"

export interface Lesson {
  id: number
  title: string
  duration: string
  completed?: boolean
  current?: boolean // Make sure 'current' is always present as optional
  // The following fields are only present for currentLessonData
  module?: string
  overview?: string
  transcript?: string
  resources?: string[]
}
export interface Module {
    id: number
    title: string
    lessons: Lesson[]
    }


export default function CareerSkillsPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(145)
  const [duration] = useState(420)
  const [notes, setNotes] = useState("")
  const [currentView, setCurrentView] = useState("courses") // "courses" or "lesson"
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)

  const modules = [
    {
      id: 1,
      title: "Module 1: Self-Awareness & Career Foundations",
      lessons: [
        { id: 1, title: "Identifying strengths, weaknesses, and interests", duration: "5:30", completed: true, current: false }
      ]
    },
    {
      id: 2,
      title: "Module 2: Building a Professional Identity",
      lessons: [
        { id: 2, title: "Writing an impactful one-page resume", duration: "6:15", completed: true, current: false }
      ]
    },
    {
      id: 3,
      title: "Module 3: Communication & Interview Skills",
      lessons: [
        { id: 3, title: "Business email etiquette", duration: "4:45", completed: true, current: false }
      ]
    },
    {
      id: 4,
      title: "Module 4: Workplace Readiness",
      lessons: [
        { id: 4, title: "Teamwork & collaboration", duration: "7:20", completed: false, current: true }
      ]
    },
    {
      id: 5,
      title: "Module 5: Career Growth & Future Skills",
      lessons: [
        { id: 5, title: "Upskilling with online platforms", duration: "5:10", completed: false, current: false }
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

  if (currentView === "courses") {
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
                  <h1 className="text-xl font-semibold text-gray-900">Career Skills Modules</h1>
                  <p className="text-sm text-gray-600">Professional Development • Complete at your own pace</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Self-Paced
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-lg">{module.title}</CardTitle>
                  <CardDescription>Essential skills for professional growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {module.lessons.map((lesson) => (
                      <Link href="" key={lesson.id} onClick={() => handleLessonClick(lesson)}>
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          lesson.current
                            ? "bg-blue-50 border-blue-200"
                            : lesson.completed
                              ? "bg-green-50 border-green-200 hover:bg-green-100"
                              : "hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => handleLessonClick(lesson)}
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
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                              {lesson.completed && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                  Completed
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

}