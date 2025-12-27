"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  BookOpen,
  Play,
  X,
  RotateCw,
} from "lucide-react"
import { LearningProgress } from "@/components/my-learning/progress"
import { useAuthStore } from "@/store/auth-store"
import { useProgressCourseStore } from "@/store/progress-store"
import { useNotesStore, Note } from "@/store/notes-store"
import { useFlashcardsStore, Deck } from "@/store/flashcards-store"
import { useProgressStore } from "@/store/quiz"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function MyLearningPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { getCourseProgress } = useProgressCourseStore()
  const { notes, addNote, updateNote, deleteNote, toggleNoteStar } = useNotesStore()
  const { decks, createDeck, deleteDeck, addCard, deleteCard } = useFlashcardsStore()
  const { courses, fetchCourses } = useProgressStore()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const [mounted, setMounted] = useState(false)

  // Note Editor State
  const [activeTab, setActiveTab] = useState("notes")
  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const [noteSubject, setNoteSubject] = useState("")
  const [noteTags, setNoteTags] = useState("")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  // Flashcard State
  const [newDeckTitle, setNewDeckTitle] = useState("")
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)
  const [newCardFront, setNewCardFront] = useState("")
  const [newCardBack, setNewCardBack] = useState("")
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // --- Derived Data ---

  // Filter courses user is enrolled in
  const myCourses = mounted && user
    ? courses.filter(c => user.enrolledCourses.includes(c.slug))
    : []

  // Calculate progress for each course dynamically
  const myCoursesWithProgress = myCourses.map(course => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    const progress = getCourseProgress(course.slug, totalLessons)
    return { ...course, progress }
  })

  // Calculate overall progress
  const overallProgress = myCoursesWithProgress.length > 0
    ? Math.round(myCoursesWithProgress.reduce((acc, course) => acc + course.progress, 0) / myCoursesWithProgress.length)
    : 0
  const completedCourses = myCoursesWithProgress.filter(c => c.progress === 100).length

  // Recent Activity (Dynamic Mock)
  const recentActivity = [
    ...(notes.length > 0 ? [{
      type: "note",
      title: `Created note: ${notes[0].title}`,
      time: notes[0].date,
      icon: FileText,
      color: "text-blue-600",
    }] : []),
    ...(myCourses.length > 0 ? [{
      type: "lesson",
      title: `Enrolled in ${myCourses[0].title}`,
      time: "Recently",
      icon: CheckCircle,
      color: "text-green-600",
    }] : []),
  ]

  // --- Handlers ---

  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const tagsArray = noteTags.split(',').map(t => t.trim()).filter(t => t);

    if (editingNoteId) {
      updateNote(editingNoteId, {
        title: noteTitle,
        content: noteContent,
        subject: noteSubject,
        tags: tagsArray,
      });
      setEditingNoteId(null);
    } else {
      addNote({
        title: noteTitle,
        content: noteContent,
        subject: noteSubject || "General",
        tags: tagsArray,
        starred: false,
      });
    }

    // Reset form and switch to list
    setNoteTitle("");
    setNoteContent("");
    setNoteSubject("");
    setNoteTags("");
    setActiveTab("notes");
  };

  const handleEditNote = (note: Note) => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteSubject(note.subject);
    setNoteTags(note.tags.join(', '));
    setEditingNoteId(note.id);
    setActiveTab("editor");
  };

  const handleCreateDeck = () => {
    if (newDeckTitle.trim()) {
      createDeck(newDeckTitle);
      setNewDeckTitle("");
    }
  };

  const handleAddCard = () => {
    if (selectedDeck && newCardFront.trim() && newCardBack.trim()) {
      addCard(selectedDeck.id, newCardFront, newCardBack);
      setNewCardFront("");
      setNewCardBack("");
    }
  };

  const getButtonProps = (progress: number, slug: string) => {
    const onClick = () => router.push(`/my-learning/${slug}`)
    if (progress === 100) {
      return { text: "Completed", variant: "secondary" as const, onClick }
    } else if (progress > 0) {
      return { text: "Continue", variant: "default" as const, onClick }
    }
    return { text: "Start", variant: "default" as const, onClick }
  }

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5FBFE] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your learning dashboard.</p>
          <Link href="/auth/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5FBFE]">
      <div className="container mx-auto px-6 py-8 mt-22">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">My Learning Center</h1>
                <p className="text-sm text-gray-600">Your personalized study space and progress overview</p>
              </div>
            </div>

            {/* Overall Progress Summary */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Overall Learning Progress
                </CardTitle>
                <CardDescription>Track your enrolled courses and achievements</CardDescription>
              </CardHeader>
              <CardContent>

                <LearningProgress />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{myCourses.length}</div>
                      <div className="text-sm text-gray-600">Enrolled Courses</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{completedCourses}</div>
                      <div className="text-sm text-gray-600">Completed Courses</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{overallProgress}%</div>
                      <div className="text-sm text-gray-600">Average Progress</div>
                    </div>
                  </div>
                  <Progress value={overallProgress} className="h-2 bg-blue-600" />
                </div>
              </CardContent>
            </Card>

            {/* Enrolled Courses */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Enrolled Courses
                </CardTitle>
                <CardDescription>Your current learning paths</CardDescription>
              </CardHeader>
              <CardContent>
                {myCoursesWithProgress.length > 0 ? (
                  <div className="space-y-4">
                    {myCoursesWithProgress.map((course) => {
                      const { text, variant, onClick } = getButtonProps(course.progress, course.slug)
                      return (
                        <div
                          key={course.slug}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{course.title}</h4>
                            <Badge variant="outline" className="text-xs border-gray-300">
                              Self-Paced
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-blue-600 font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant={variant} onClick={onClick}>
                              <Play className="w-4 h-4 mr-2" />
                              {text}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No courses enrolled</h3>
                    <p className="text-gray-500 mb-4">Start your learning journey today!</p>
                    <Link href="/courses">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes and Flashcards Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="notes" className="data-[state=active]:bg-white">My Notes</TabsTrigger>
                <TabsTrigger value="editor" className="data-[state=active]:bg-white">Note Editor</TabsTrigger>
                <TabsTrigger value="flashcards" className="data-[state=active]:bg-white">Flashcards</TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="space-y-4">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900">Saved Notes</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => {
                        setNoteTitle("");
                        setNoteContent("");
                        setNoteSubject("");
                        setNoteTags("");
                        setEditingNoteId(null);
                        setActiveTab("editor");
                      }}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Note
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {notes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {notes.map((note) => (
                          <div
                            key={note.id}
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all cursor-pointer hover:shadow-md relative group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900 line-clamp-1">{note.title}</h4>
                              <button onClick={(e) => { e.stopPropagation(); toggleNoteStar(note.id); }}>
                                <Star className={`w-4 h-4 ${note.starred ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{note.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs bg-gray-100">
                                  {note.subject}
                                </Badge>
                                <span className="text-xs text-gray-500">{note.date}</span>
                              </div>
                              <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEditNote(note); }}>
                                  <Edit3 className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}>
                                  <Trash2 className="w-3 h-3 text-red-500" />
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
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No notes yet. Create one to get started!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="editor">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-blue-600" />
                      {editingNoteId ? "Edit Note" : "Create New Note"}
                    </CardTitle>
                    <CardDescription>Create and edit your study notes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Note title..."
                        className="font-medium border-gray-300"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                      />
                      <Input
                        placeholder="Subject/Course..."
                        className="border-gray-300"
                        value={noteSubject}
                        onChange={(e) => setNoteSubject(e.target.value)}
                      />
                    </div>

                    <Textarea
                      placeholder="Start taking notes... Use markdown for formatting!"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="min-h-[300px] font-mono text-sm border-gray-300"
                    />

                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add tags (comma separated)..."
                        className="flex-1 border-gray-300"
                        value={noteTags}
                        onChange={(e) => setNoteTags(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Auto-saved just now</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => setActiveTab("notes")}>
                          Cancel
                        </Button>
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={handleSaveNote}
                        >
                          <Save className="w-4 h-4 mr-2" />
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
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-blue-600" />
                          Flashcards
                        </CardTitle>
                        <CardDescription>Create and review flashcards for active recall</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            New Deck
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Deck</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Label htmlFor="deck-title">Deck Title</Label>
                            <Input
                              id="deck-title"
                              value={newDeckTitle}
                              onChange={(e) => setNewDeckTitle(e.target.value)}
                              placeholder="e.g., Physics Formulas"
                            />
                          </div>
                          <DialogFooter>
                            <Button onClick={handleCreateDeck}>Create</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedDeck ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedDeck(null)}>
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Decks
                          </Button>
                          <h3 className="font-semibold text-lg">{selectedDeck.title}</h3>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Card
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add New Card</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div>
                                  <Label htmlFor="front">Front</Label>
                                  <Textarea
                                    id="front"
                                    value={newCardFront}
                                    onChange={(e) => setNewCardFront(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="back">Back</Label>
                                  <Textarea
                                    id="back"
                                    value={newCardBack}
                                    onChange={(e) => setNewCardBack(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={handleAddCard}>Add Card</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {selectedDeck.cards.length > 0 ? (
                          <div className="flex flex-col items-center gap-4">
                            <div
                              className="w-full max-w-md h-64 perspective-1000 cursor-pointer"
                              onClick={() => setIsFlipped(!isFlipped)}
                            >
                              <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                                {/* Front */}
                                <div className="absolute w-full h-full bg-white border-2 border-blue-200 rounded-xl flex items-center justify-center p-6 backface-hidden shadow-lg">
                                  <p className="text-xl text-center font-medium">{selectedDeck.cards[currentCardIndex].front}</p>
                                  <span className="absolute bottom-4 text-xs text-gray-400">Click to flip</span>
                                </div>
                                {/* Back */}
                                <div className="absolute w-full h-full bg-blue-50 border-2 border-blue-300 rounded-xl flex items-center justify-center p-6 backface-hidden rotate-y-180 shadow-lg">
                                  <p className="text-xl text-center font-medium text-blue-800">{selectedDeck.cards[currentCardIndex].back}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setCurrentCardIndex(prev => Math.max(0, prev - 1));
                                  setIsFlipped(false);
                                }}
                                disabled={currentCardIndex === 0}
                              >
                                Previous
                              </Button>
                              <span className="text-sm text-gray-500">
                                {currentCardIndex + 1} / {selectedDeck.cards.length}
                              </span>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setCurrentCardIndex(prev => Math.min(selectedDeck.cards.length - 1, prev + 1));
                                  setIsFlipped(false);
                                }}
                                disabled={currentCardIndex === selectedDeck.cards.length - 1}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <p>No cards in this deck yet.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {decks.map((deck) => (
                          <div
                            key={deck.id}
                            className="p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white relative group"
                            onClick={() => setSelectedDeck(deck)}
                          >
                            <h3 className="font-semibold text-lg mb-2">{deck.title}</h3>
                            <p className="text-sm text-gray-500">{deck.cards.length} cards</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id); }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {decks.length === 0 && (
                          <div className="col-span-full text-center py-12 text-gray-500">
                            <Brain className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No flashcard decks yet. Create one to start studying!</p>
                          </div>
                        )}
                      </div>
                    )}
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
                {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <activity.icon className={`w-4 h-4 mt-1 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-gray-500">No recent activity.</p>
                )}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Study Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Notes Created</span>
                  <span className="text-lg font-semibold text-blue-600">{notes.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Flashcard Decks</span>
                  <span className="text-lg font-semibold text-green-600">{decks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed Courses</span>
                  <span className="text-lg font-semibold text-purple-600">{completedCourses}</span>
                </div>
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">This Week's Focus</p>
                  <Badge className="bg-blue-100 text-blue-700">Scholarships</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Quick Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => setActiveTab("editor")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Create Note
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => setActiveTab("flashcards")}>
                  <Brain className="w-4 h-4 mr-2" />
                  Review Flashcards
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}