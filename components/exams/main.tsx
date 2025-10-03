"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, FileText, Award, TrendingUp, Filter } from "lucide-react"

const exams = [
  {
    id: 1,
    title: "Python Programming Fundamentals",
    description: "Test your knowledge of Python basics, data structures, and object-oriented programming",
    category: "Programming",
    level: "Beginner",
    type: "Quiz",
    questions: 20,
    duration: 30,
    passingScore: 70,
    attempts: 1250,
    averageScore: 78,
    image: "/python-programming-data-science.jpg",
  },
  {
    id: 2,
    title: "Machine Learning Certification Exam",
    description: "Comprehensive exam covering supervised learning, neural networks, and model evaluation",
    category: "Data Science",
    level: "Advanced",
    type: "Exam",
    questions: 50,
    duration: 120,
    passingScore: 75,
    attempts: 890,
    averageScore: 72,
    image: "/machine-learning-advanced-algorithms.jpg",
  },
  {
    id: 3,
    title: "Web Development Quick Quiz",
    description: "Quick assessment of HTML, CSS, and JavaScript fundamentals",
    category: "Web Development",
    level: "Beginner",
    type: "Quiz",
    questions: 15,
    duration: 20,
    passingScore: 65,
    attempts: 2100,
    averageScore: 81,
    image: "/web-development-html-css-javascript.jpg",
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    description: "Comprehensive test on arrays, linked lists, trees, graphs, and sorting algorithms",
    category: "Computer Science",
    level: "Intermediate",
    type: "Exam",
    questions: 40,
    duration: 90,
    passingScore: 70,
    attempts: 1560,
    averageScore: 75,
    image: "/algorithms-book-cover.png",
  },
  {
    id: 5,
    title: "Database Management Systems",
    description: "Test your SQL skills, normalization, transactions, and database design principles",
    category: "Database",
    level: "Intermediate",
    type: "Quiz",
    questions: 25,
    duration: 45,
    passingScore: 70,
    attempts: 980,
    averageScore: 76,
    image: "/ai-artificial-intelligence-course.jpg",
  },
  {
    id: 6,
    title: "Calculus Final Examination",
    description: "Comprehensive calculus exam covering limits, derivatives, integrals, and applications",
    category: "Mathematics",
    level: "Advanced",
    type: "Exam",
    questions: 35,
    duration: 180,
    passingScore: 75,
    attempts: 670,
    averageScore: 68,
    image: "/calculus-mathematics-fundamentals.jpg",
  },
  {
    id: 7,
    title: "Cloud Computing Basics Quiz",
    description: "Quick quiz on cloud services, deployment models, and major cloud providers",
    category: "Cloud Computing",
    level: "Beginner",
    type: "Quiz",
    questions: 18,
    duration: 25,
    passingScore: 65,
    attempts: 1420,
    averageScore: 79,
    image: "/python-data-analysis-book.jpg",
  },
  {
    id: 8,
    title: "Cybersecurity Certification",
    description: "Advanced exam on network security, cryptography, and ethical hacking",
    category: "Security",
    level: "Advanced",
    type: "Exam",
    questions: 60,
    duration: 150,
    passingScore: 80,
    attempts: 540,
    averageScore: 71,
    image: "/deep-learning-book-cover.png",
  },
]

const categories = [
  "All Categories",
  "Programming",
  "Data Science",
  "Web Development",
  "Computer Science",
  "Database",
  "Mathematics",
  "Cloud Computing",
  "Security",
]
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
const types = ["All Types", "Quiz", "Exam"]
const questionCounts = ["All", "1-20", "21-40", "41-60", "60+"]

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedQuestionCount, setSelectedQuestionCount] = useState("All")

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || exam.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || exam.level === selectedLevel
    const matchesType = selectedType === "All Types" || exam.type === selectedType
    const matchesQuestionCount =
      selectedQuestionCount === "All" ||
      (selectedQuestionCount === "1-20" && exam.questions <= 20) ||
      (selectedQuestionCount === "21-40" && exam.questions >= 21 && exam.questions <= 40) ||
      (selectedQuestionCount === "41-60" && exam.questions >= 41 && exam.questions <= 60) ||
      (selectedQuestionCount === "60+" && exam.questions > 60)

    return matchesSearch && matchesCategory && matchesLevel && matchesType && matchesQuestionCount
  })

  return (
    <div className="min-h-screen bg-[#F5FBFE]">
      {/* <Navigation /> */}

      <main className="container  mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8 mt-28">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Exams & Assessments</h1>
          <p className="text-lg text-gray-600">Test your knowledge and earn certifications</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Question Count Filter */}
            <Select value={selectedQuestionCount} onValueChange={setSelectedQuestionCount}>
              <SelectTrigger>
                <SelectValue placeholder="Questions" />
              </SelectTrigger>
              <SelectContent>
                {questionCounts.map((count) => (
                  <SelectItem key={count} value={count}>
                    {count === "All" ? "All Questions" : `${count} questions`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== "All Categories" ||
            selectedLevel !== "All Levels" ||
            selectedType !== "All Types" ||
            selectedQuestionCount !== "All") && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {selectedCategory}
                </Badge>
              )}
              {selectedLevel !== "All Levels" && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {selectedLevel}
                </Badge>
              )}
              {selectedType !== "All Types" && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {selectedType}
                </Badge>
              )}
              {selectedQuestionCount !== "All" && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {selectedQuestionCount} questions
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All Categories")
                  setSelectedLevel("All Levels")
                  setSelectedType("All Types")
                  setSelectedQuestionCount("All")
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredExams.length}</span> exam
            {filteredExams.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img src={exam.image || "/placeholder.svg"} alt={exam.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className={exam.type === "Quiz" ? "bg-green-600" : "bg-purple-600"}>{exam.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {exam.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      exam.level === "Beginner"
                        ? "text-green-700 border-green-300"
                        : exam.level === "Intermediate"
                          ? "text-yellow-700 border-yellow-300"
                          : "text-red-700 border-red-300"
                    }
                  >
                    {exam.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2 line-clamp-2">{exam.title}</CardTitle>
                <CardDescription className="line-clamp-2 mb-4">{exam.description}</CardDescription>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{exam.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{exam.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Passing score: {exam.passingScore}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Avg. score: {exam.averageScore}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/exams/${exam.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setSelectedLevel("All Levels")
                setSelectedType("All Types")
                setSelectedQuestionCount("All")
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
