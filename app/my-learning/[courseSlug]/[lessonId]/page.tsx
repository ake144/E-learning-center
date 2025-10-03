"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { use } from "react";
import {
  Play, Pause, SkipForward, SkipBack, Volume2, Maximize, Clock, CheckCircle, Circle, FileText, Download, Bookmark, ChevronLeft,
  Target, MessageSquare, ThumbsUp, ArrowRight,
} from "lucide-react";
import { courses } from "@/utils/data/course";
// import PlyrVideoComponent from "@/components/plyr-video";
import dynamic from "next/dynamic";
import { useProgressStore } from "@/store/quiz";

const PlyrVideoComponent = dynamic(() => import("@/components/videoPlayer/main"), { ssr: false });

export default function LessonDetailPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(145);
  const [duration] = useState(420);
  const [notes, setNotes] = useState("");
  const params = useParams();

  const {submitQuiz, updateVideoProgress} = useProgressStore();

  const { courseSlug, lessonId } = params;
  console.log("Params:", params);

  if (typeof courseSlug !== "string") return notFound();

  const course = useProgressStore((state) => state.courses.find((c) => c.slug === courseSlug));
  if (!course) return notFound();

  const lessonIdNum = lessonId ? parseInt(lessonId as string, 10) : NaN;
  const lesson = course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonIdNum);
  if (!lesson) return notFound();


  const module = course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id));
  const moduleIndex = course.modules.findIndex((m) => m.id === module?.id) + 1;

  const { videoProgress, quizAnswers, quizScore, quizCompleted, hasQuiz } = lesson || {};
  const videoCompleted = videoProgress ? videoProgress >= 80 || lesson?.completed || false : false;
  const showQuiz = videoCompleted && hasQuiz && !quizCompleted; 


  const handleReTest=()=>{
    useProgressStore.setState((state) => {
      const course = state.courses.find((c) => c.slug === courseSlug);
      if (!course) return state;
      
      const targetLesson = course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonIdNum);
      if (!targetLesson) return state;
      targetLesson.quizCompleted = false;
      targetLesson.quizScore = 0;
      targetLesson.quizAnswers = {};
      return { courses: [...state.courses] }; 
    });
  }


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };


  const handleVideoProgress = (progress:number) => { // progress 0-1
    updateVideoProgress(courseSlug as string, lessonIdNum, progress);
    // Optional: Backend sync
    // if (progress >= 0.8) {
    //   fetch('/api/progress', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ courseSlug, lessonId: lessonIdNum, type: 'video', completed: true }),
    //   }).catch(console.error);
    // }
  };
  const handleVideoEnded = () => handleVideoProgress(1);

  const handleSubmitQuiz = (answers: Record<string, string>) => {
    console.log("Submitting quiz answers:", answers);

    submitQuiz(courseSlug as string, lessonIdNum, answers);
    // Optional: Backend sync
    // fetch('/api/progress', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ courseSlug, lessonId: lessonIdNum, type: 'quiz', answers }),
    // }).catch(console.error);
  }
  

  return (
    <div className="min-h-screen bg-background">
    
      <div className="container mx-auto px-6 py-8 mt-22">
        <div className="flex items-center justify-between  pb-5">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600" onClick={() => router.push(`/my-learning/${courseSlug}`)}>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
              <PlyrVideoComponent videoId={lesson.videoId}  onProgress={handleVideoProgress} onEnded={handleVideoEnded} />

              <div className="p-4 bg-gray-50">
                 <Progress value={videoProgress || 0} className="h-2 mb-2" />
                 <p className="text-sm text-gray-600 mt-1">
                   {videoCompleted ?  'video completed' : `${videoProgress}% watched`}
                 </p>
              </div>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                {  hasQuiz &&  <TabsTrigger value="quiz">Quiz ({lesson?.quiz?.length} questions)</TabsTrigger>}
                {/* <TabsTrigger value="transcript" className="data-[state=active]:bg-white">Transcript</TabsTrigger> */}
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

              <TabsContent value="quiz" className="space-y-6">
                {quizCompleted ? (
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Quiz Complete!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Progress value={quizScore} className="mx-auto w-1/2 h-4 mb-4" />
                      <p className="text-2xl font-bold text-green-600">{quizScore}%</p>
                      <p className="text-gray-600 mt-2">Excellent work! Progress updated.</p>
                      <Button onClick={handleReTest} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Retake Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ) : showQuiz ? (
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Module Quiz</CardTitle>
                      <CardDescription>Answer to test your knowledge.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {lesson?.quiz?.map((q) => (
                        <div key={q.id} className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">{q.question}</h4>
                          <div className="space-y-2">
                            {q.options.map((opt) => (
                              <label key={opt} className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <input
                                  type="radio"
                                  name={`q${q.id}`}
                                  value={opt}
                                  checked={(quizAnswers?.[q.id] ?? "") === opt}
                                  onChange={(e) => {
                                    const newAnswers = { ...quizAnswers, [q.id]: e.target.value };
                                    useProgressStore.setState((state) => {
                                      const course = state.courses.find((c) => c.slug === courseSlug);
                                      if (!course) return state;
                                      const targetLesson = course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonIdNum);
                                      if (!targetLesson) return state;
                                      targetLesson.quizAnswers = newAnswers;
                                      return { courses: [...state.courses] };
                                    }
                                    );
                                    // Live update store for preview
                                    // submitQuiz(courseSlug, lessonIdNum, newAnswers);
                                  }}
                                  className="mr-2"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button onClick={() => handleSubmitQuiz(quizAnswers ?? {})} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                        {/* {
                          (Object.keys(lesson.quiz || {}).length === Object.keys(quizAnswers || {}).length) ? "Submit & Score" : "Please answer all questions"
                        } */}
                        submit & score
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-gray-600">Complete the video to unlock the quiz.</p>
                      {!videoCompleted && (
                        <Progress value={videoProgress} className="mx-auto w-1/2 mt-4 h-2" />
                      )}
                    </CardContent>
                  </Card>
                )}
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
                <CardTitle className="text-gray-900 text-lg">Quiz Score</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {course.modules.map((m)=>{
                      const quizLessons = m.lessons.filter((l)=>l.hasQuiz);
                      const totalScore= quizLessons.reduce((sum, l) => sum + (l.quizScore || 0), 0);
                      const numberOfQuizzes = quizLessons.length;
                      const avgScore = numberOfQuizzes > 0 ? Math.round(totalScore / numberOfQuizzes) : 0;
                       return (
                          <div key={m.id} className="mb-4">
                            <h3 className="text-md font-semibold">{m.title}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Quizzes: {numberOfQuizzes}</span>
                              <span className="text-lg font-semibold text-blue-600">{avgScore}%</span>
                            </div>
                          </div>
                        );
                    })}
                  </span>
                </div>
              </CardHeader>
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
                        onClick={() => router.replace(`/my-learning/${courseSlug}/${les.id}`)}
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