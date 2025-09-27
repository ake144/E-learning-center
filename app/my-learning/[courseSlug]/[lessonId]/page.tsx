"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Play, Pause, SkipForward, SkipBack, Volume2, Maximize, Clock, CheckCircle, Circle, FileText, Download, Bookmark, ChevronLeft,
  Target, MessageSquare, ThumbsUp, ArrowRight,
} from "lucide-react";
import { courses } from "@/utils/data/course";

export default function LessonDetailPage({ params }: { params: { courseSlug: string; lessonId: string } }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(145);
  const [duration] = useState(420);
  const [notes, setNotes] = useState("");

  const course = courses.find((c) => c.slug === params.courseSlug);
  if (!course) return notFound();

  const lessonIdNum = parseInt(params.lessonId, 10);
  const lesson = course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonIdNum);
  if (!lesson) return notFound();

  const module = course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id));
  const moduleIndex = course.modules.findIndex((m) => m.id === module?.id) + 1;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600" onClick={() => router.push(`/my-learning/${params.courseSlug}`)}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Modules
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{module?.title}</h1>
                <p className="text-sm text-gray-600">{course.title} • Module {moduleIndex} of {course.modules.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">Professional</Badge>
              <Badge variant="outline" className="border-gray-300">
                <Clock className="w-3 h-3 mr-1" />
                {lesson.duration}
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
                    <p className="text-lg font-medium">{lesson.title}</p>
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
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setIsPlaying(!isPlaying)}>
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
                <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                <TabsTrigger value="transcript" className="data-[state=active]:bg-white">Transcript</TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-white">Resources</TabsTrigger>
                <TabsTrigger value="discussion" className="data-[state=active]:bg-white">Discussion</TabsTrigger>
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
                      <p className="text-sm text-gray-700">Skills you can apply directly to resume building, interviews, and workplace scenarios</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Professional Growth:</h4>
                      <p className="text-sm text-gray-700">Develop competencies that enhance your career trajectory and professional presence</p>
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
                        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-900">{lesson.transcript}</div>
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
                      {lesson.resources.map((resource, index) => (
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
                            <Button size="sm" variant="ghost" className="text-blue-600">Reply</Button>
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
                  <span className="text-sm text-gray-600">{course.modules.filter((m) => m.progress === 100).length} of {course.modules.length} modules</span>
                  <span className="text-lg font-semibold text-blue-600">{course.progress}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={course.progress} className="h-2 mb-4" />
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
                {course.modules.map((mod) => (
                  <div key={mod.id} className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900 mt-3 first:mt-0">{mod.title}</h4>
                    {mod.lessons.map((les) => (
                      <div
                        key={les.id}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          les.id === lesson.id
                            ? "bg-blue-50 border-blue-200"
                            : les.completed
                              ? "bg-green-50 border-green-200 hover:bg-green-100"
                              : "hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => router.push(`/my-learning/${params.courseSlug}/${les.id}`)}
                      >
                        <div className="flex items-start gap-3">
                          {les.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          ) : les.id === lesson.id ? (
                            <Play className="w-4 h-4 text-blue-600 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <h4 className={`font-medium text-xs ${les.id === lesson.id ? "text-blue-600" : "text-gray-900"}`}>
                              {les.title}
                            </h4>
                            <p className="text-xs text-gray-500">{les.duration}</p>
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
  );
}