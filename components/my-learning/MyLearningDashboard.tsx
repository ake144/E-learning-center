"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { useProgressCourseStore } from "@/store/progress-store"
import { useNotesStore } from "@/store/notes-store"
import { useFlashcardsStore } from "@/store/flashcards-store"
import { useProgressStore } from "@/store/quiz"
import { useBooksStore } from "@/store/books-store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Award, 
  FileText, 
  Brain, 
  Library, 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  MoreVertical,
  PlayCircle,
  CheckCircle2,
  Trophy
} from "lucide-react"
import Link from "next/link"

export default function MyLearningDashboard() {
  const { user } = useAuthStore()
  const { getCourseProgress } = useProgressCourseStore()
  const { notes } = useNotesStore()
  const { decks } = useFlashcardsStore()
  const { courses, fetchCourses } = useProgressStore()
  const { purchasedBooks, fetchPurchasedBooks } = useBooksStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    fetchCourses()
    fetchPurchasedBooks()
    setMounted(true)
  }, [fetchCourses, fetchPurchasedBooks])

  if (!mounted) return null

  // --- Derived Data ---
  const myCourses = user
    ? courses.filter(c => user.enrolledCourses.includes(c.slug))
    : []

  const myCoursesWithProgress = myCourses.map(course => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    const progress = getCourseProgress(course.slug, totalLessons)
    return { ...course, progress }
  })

  const inProgressCourses = myCoursesWithProgress.filter(c => c.progress > 0 && c.progress < 100)
  const completedCourses = myCoursesWithProgress.filter(c => c.progress === 100)

  // Mock Data for missing stores
  const certificates = [
    { id: 1, title: "Advanced React Patterns", date: "Dec 2025", image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop&q=60" },
    { id: 2, title: "UI/UX Design Fundamentals", date: "Nov 2025", image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop&q=60" }
  ]

  const books = [
    { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60", progress: 45 },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60", progress: 12 }
  ]

  const examsTaken = [
    { id: 1, title: "React Certification Exam", score: 92, date: "Jan 2, 2026", status: "Passed" },
    { id: 2, title: "AWS Cloud Practitioner", score: 85, date: "Dec 15, 2025", status: "Passed" }
  ]

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning</h1>
              <p className="text-gray-500">Track your progress, manage your courses, and view your achievements.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-blue-50 px-4 py-3 rounded-xl flex items-center gap-3 border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">In Progress</p>
                  <p className="text-xl font-bold text-gray-900">{inProgressCourses.length}</p>
                </div>
              </div>
              <div className="bg-green-50 px-4 py-3 rounded-xl flex items-center gap-3 border border-green-100">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Certificates</p>
                  <p className="text-xl font-bold text-gray-900">{certificates.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="bg-white p-1 h-auto border border-gray-200 rounded-xl shadow-sm inline-flex">
            <TabsTrigger value="courses" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-2.5 px-5 rounded-lg gap-2">
              <BookOpen className="w-4 h-4" /> Courses
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-2.5 px-5 rounded-lg gap-2">
              <Award className="w-4 h-4" /> Certificates
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-2.5 px-5 rounded-lg gap-2">
              <FileText className="w-4 h-4" /> Notes
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-2.5 px-5 rounded-lg gap-2">
              <Brain className="w-4 h-4" /> Flashcards
            </TabsTrigger>
            <TabsTrigger value="books" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-2.5 px-5 rounded-lg gap-2">
              <Library className="w-4 h-4" /> Books
            </TabsTrigger>
            <TabsTrigger value="exams" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 py-2.5 px-5 rounded-lg gap-2">
              <GraduationCap className="w-4 h-4" /> Exams
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-8">
            {myCoursesWithProgress.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCoursesWithProgress.map((course) => (
                  <Card key={course.slug} className="group overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link href={`/my-learning/${course.slug}`}>
                          <Button className="rounded-full bg-white text-gray-900 hover:bg-gray-100">
                            <PlayCircle className="w-5 h-5 mr-2" /> Continue
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          Intermediate
                        </Badge>
                        {course.progress === 100 && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Progress</span>
                          <span className="font-medium text-gray-900">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                <p className="text-gray-500 mb-6">Start your learning journey today by enrolling in a course.</p>
                <Link href="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-all">
                  <div className="aspect-[4/3] bg-gray-100 relative p-6 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h4 className="font-serif font-bold text-gray-900 text-lg mb-1">Certificate of Completion</h4>
                      <p className="text-xs text-gray-500">Global Pathways Academy</p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{cert.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">Issued on {cert.date}</p>
                    <Button variant="outline" className="w-full gap-2">
                      <Award className="w-4 h-4" /> View Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <Card key={note.id} className="hover:shadow-md transition-all border-gray-200 bg-yellow-50/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-gray-500">{note.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{note.title || "Untitled Note"}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{note.content}</p>
                    <div className="flex gap-2">
                      {note.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-white text-gray-600 text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {notes.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                  <p className="text-gray-500">Take notes while watching lessons to see them here.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Flashcards Tab */}
          <TabsContent value="flashcards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {decks.map((deck) => (
                <Card key={deck.id} className="hover:shadow-md transition-all border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                      <Brain className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{deck.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{deck.cards.length} Cards</p>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      Study Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {decks.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                  <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No flashcards yet</h3>
                  <p className="text-gray-500">Create flashcards to help you memorize key concepts.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value="books">
            {purchasedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {purchasedBooks.map((book) => (
                <div key={book.id} className="group cursor-pointer">
                  <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all relative">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" variant="secondary">Read Now</Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div className="h-full bg-blue-600" style={{ width: `${book.progress}%` }} />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{book.title}</h3>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
              ))}
            </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <Library className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books purchased yet</h3>
                <p className="text-gray-500 mb-6">Explore our library to find books to read.</p>
                <Link href="/library">
                  <Button>Browse Library</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-900">Exam Name</th>
                      <th className="px-6 py-4 font-semibold text-gray-900">Date Taken</th>
                      <th className="px-6 py-4 font-semibold text-gray-900">Score</th>
                      <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 font-semibold text-gray-900 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {examsTaken.map((exam) => (
                      <tr key={exam.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">{exam.title}</td>
                        <td className="px-6 py-4 text-gray-500">{exam.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{exam.score}%</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                            {exam.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            View Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
