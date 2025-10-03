"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Save,
  Download,
  Share,
  Search,
  Plus,
  Edit3,
  Trash2,
  Clock,
  Calendar,
  Tag,
  Star,
  ChevronLeft,
  Target,
  CheckCircle,
  Brain,
} from "lucide-react"


export default function LearnPage() {
  const [notes, setNotes] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const savedNotes = [
    {
      id: 1,
      title: "Vector Addition Rules",
      content: "When adding vectors, we use the head-to-tail method or parallelogram method...",
      subject: "Physics",
      date: "Jan 15, 2024",
      tags: ["vectors", "physics", "math"],
      starred: true,
    },
    {
      id: 2,
      title: "Python Functions Basics",
      content: "Functions in Python are defined using the 'def' keyword...",
      subject: "Programming",
      date: "Jan 14, 2024",
      tags: ["python", "functions", "programming"],
      starred: false,
    },
    {
      id: 3,
      title: "AI Ethics Principles",
      content: "Key principles include fairness, accountability, transparency...",
      subject: "AI Ethics",
      date: "Jan 13, 2024",
      tags: ["ai", "ethics", "principles"],
      starred: true,
    },
  ]

  const studyGoals = [
    { id: 1, title: "Complete Vector Calculus Module", progress: 75, dueDate: "Jan 20" },
    { id: 2, title: "Python Project Submission", progress: 40, dueDate: "Jan 25" },
    { id: 3, title: "AI Ethics Essay", progress: 20, dueDate: "Jan 30" },
  ]

  const recentActivity = [
    {
      type: "lesson",
      title: "Completed: Vector Addition",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "note",
      title: "Added note: Python Functions",
      time: "4 hours ago",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      type: "quiz",
      title: "Quiz: AI Fundamentals (85%)",
      time: "1 day ago",
      icon: Brain,
      color: "text-purple-600",
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
                <h1 className="text-xl font-semibold text-gray-900">Learning Center</h1>
                <p className="text-sm text-gray-600">Your personalized study space</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notes, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-300"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Learning Goals
                </CardTitle>
                <CardDescription>Track your learning objectives and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{goal.title}</h4>
                        <Badge variant="outline" className="text-xs border-gray-300">
                          <Calendar className="w-3 h-3 mr-1" />
                          {goal.dueDate}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-blue-600 font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="notes" className="data-[state=active]:bg-white">
                  My Notes
                </TabsTrigger>
                <TabsTrigger value="editor" className="data-[state=active]:bg-white">
                  Note Editor
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="data-[state=active]:bg-white">
                  Flashcards
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="space-y-4">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900">Saved Notes</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedNotes.map((note) => (
                        <div
                          key={note.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all cursor-pointer hover:shadow-md"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 line-clamp-1">{note.title}</h4>
                            {note.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{note.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs bg-gray-100">
                                {note.subject}
                              </Badge>
                              <span className="text-xs text-gray-500">{note.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {note.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs border-gray-300">
                                <Tag className="w-2 h-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="editor">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-blue-600" />
                      Note Editor
                    </CardTitle>
                    <CardDescription>Create and edit your study notes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Note title..." className="font-medium border-gray-300" />
                      <Input placeholder="Subject/Course..." className="border-gray-300" />
                    </div>

                    <Textarea
                      placeholder="Start taking notes... Use markdown for formatting!"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[300px] font-mono text-sm border-gray-300"
                    />

                    <div className="flex items-center gap-2">
                      <Input placeholder="Add tags (comma separated)..." className="flex-1 border-gray-300" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Auto-saved 2 minutes ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline">
                          <Save className="w-4 h-4 mr-2" />
                          Save Draft
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Save Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flashcards">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Flashcards
                    </CardTitle>
                    <CardDescription>Create and review flashcards for active recall</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No flashcards yet</h3>
                      <p className="text-gray-600 mb-4">
                        Create your first flashcard set to start practicing active recall
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Flashcard Set
                      </Button>
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
                <CardTitle className="text-gray-900 text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <activity.icon className={`w-4 h-4 mt-1 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Study Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Notes Created</span>
                  <span className="text-lg font-semibold text-blue-600">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Study Hours</span>
                  <span className="text-lg font-semibold text-green-600">18.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed Goals</span>
                  <span className="text-lg font-semibold text-purple-600">7</span>
                </div>
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">This Week&apos;s Focus</p>
                  <Badge className="bg-blue-100 text-blue-700">Vector Mathematics</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Quick Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Export All Notes
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Study Planner
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Brain className="w-4 h-4 mr-2" />
                  Quiz Generator
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Share className="w-4 h-4 mr-2" />
                  Study Groups
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
