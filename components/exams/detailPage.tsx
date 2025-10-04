"use client"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, FileText, Award, TrendingUp, Users, CheckCircle, AlertCircle, ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

const examData = {
  1: {
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
    image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    topics: [
      "Python Syntax and Variables",
      "Data Types and Operators",
      "Control Flow (if/else, loops)",
      "Functions and Modules",
      "Lists, Tuples, and Dictionaries",
      "Object-Oriented Programming Basics",
    ],
    requirements: [
      "Basic understanding of programming concepts",
      "Familiarity with Python syntax",
      "Completed Python Basics course (recommended)",
    ],
    benefits: [
      "Validate your Python programming skills",
      "Earn a certificate upon passing",
      "Identify areas for improvement",
      "Boost your resume and LinkedIn profile",
    ],
  },
  2: {
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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    topics: [
      "Supervised Learning Algorithms",
      "Unsupervised Learning",
      "Neural Networks and Deep Learning",
      "Model Evaluation and Validation",
      "Feature Engineering",
      "Hyperparameter Tuning",
    ],
    requirements: [
      "Strong foundation in mathematics and statistics",
      "Experience with Python and ML libraries",
      "Completed Machine Learning course",
    ],
    benefits: [
      "Industry-recognized certification",
      "Demonstrate advanced ML expertise",
      "Career advancement opportunities",
      "Access to exclusive ML community",
    ],
  },
}

export default function ExamDetailPage({ examId }: { examId: number }) {
//   const params = useParams()
//   const router = useRouter()
//   const examId = Number(params.id)
  const exam = examData[examId as keyof typeof examData]

  if (!exam) {
    return (
      <div className="min-h-screen  bg-[#F5FBFE]">
        {/* <Navigation /> */}
        <div className="container mt-28 mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Exam not found</h1>
          <Link href="/exams">
            <Button>Back to Exams</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  bg-[#F5FBFE]">
      {/* <Navigation /> */}

      <main className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/exams">
          <Button variant="ghost" className="mb-8 mt-28">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exams
          </Button>
        </Link>

        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className={exam.type === "Quiz" ? "bg-green-600" : "bg-purple-600"}>{exam.type}</Badge>
                <Badge variant="outline">{exam.category}</Badge>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{exam.title}</h1>
              <p className="text-lg text-gray-600">{exam.description}</p>
            </div>

            {/* Image */}
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              <img src={exam.image || "/placeholder.svg"} alt={exam.title} className="w-full h-full object-cover" />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="topics">Topics Covered</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Exam</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      This {exam.type.toLowerCase()} is designed to assess your understanding of{" "}
                      {exam.title.toLowerCase()}. It consists of {exam.questions} carefully crafted questions that cover
                      all essential topics.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">{exam.questions} Questions</p>
                          <p className="text-sm text-gray-600">Multiple choice and practical</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">{exam.duration} Minutes</p>
                          <p className="text-sm text-gray-600">Time limit to complete</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">{exam.passingScore}% to Pass</p>
                          <p className="text-sm text-gray-600">Minimum passing score</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">{exam.averageScore}% Average</p>
                          <p className="text-sm text-gray-600">Student average score</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">What You'll Gain</h4>
                      <ul className="space-y-2">
                        {exam.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-blue-800">
                            <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Topics Covered</CardTitle>
                    <CardDescription>This exam will test your knowledge on the following topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {exam.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 pt-0.5">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Prerequisites</CardTitle>
                    <CardDescription>Make sure you meet these requirements before taking the exam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {exam.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Exam Statistics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Average Score</span>
                        <span className="font-semibold text-gray-900">{exam.averageScore}%</span>
                      </div>
                      <Progress value={exam.averageScore} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{exam.attempts.toLocaleString()} students have taken this exam</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Link href={`/exams/${exam.id}/take`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3" size="lg">
                      <Play className="w-4 h-4 mr-2" />
                      Start Exam
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-gray-500">
                    Make sure you have {exam.duration} minutes available
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Important Notes</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>You can take this exam multiple times</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Your highest score will be recorded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Certificate awarded upon passing</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
