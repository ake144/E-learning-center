"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Award } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const examQuestions = {
  1: [
    {
      id: 1,
      question: "What is the correct way to create a list in Python?",
      options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "What does the 'len()' function do?",
      options: ["Returns the length of an object", "Converts to lowercase", "Removes whitespace", "Sorts a list"],
      correctAnswer: 0,
    },
    {
      id: 4,
      question: "Which of the following is a mutable data type in Python?",
      options: ["Tuple", "String", "List", "Integer"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "What is the output of: print(type([]))?",
      options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"],
      correctAnswer: 1,
    },
  ],
  2: [
    {
      id: 1,
      question: "What is the primary goal of supervised learning?",
      options: [
        "Find hidden patterns in data",
        "Learn from labeled data to make predictions",
        "Reduce dimensionality",
        "Cluster similar data points",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Which algorithm is commonly used for classification tasks?",
      options: ["K-means", "PCA", "Random Forest", "DBSCAN"],
      correctAnswer: 2,
    },
  ],
}

export default function TakeExamPage({ examId }: { examId: number }) {
//   const params = useParams()
  const router = useRouter()
//   const examId = Number(params.id)
  const questions = examQuestions[examId as keyof typeof examQuestions] || []

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (timeLeft > 0 && !examSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !examSubmitted) {
      handleSubmitExam()
    }
  }, [timeLeft, examSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex })
  }

  const handleSubmitExam = () => {
    let correctAnswers = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    setScore(finalScore)
    setExamSubmitted(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5FBFE]">
        <Navigation />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Exam not available</h1>
          <Button onClick={() => router.push("/exams")}>Back to Exams</Button>
        </div>
      </div>
    )
  }

  if (examSubmitted) {
    const passed = score >= 70
    return (
      <div className="min-h-screen  bg-[#F5FBFE]">
        {/* <Navigation /> */}
        <div className="container mx-auto px-6 py-12">
          <Card className="max-w-2xl mx-auto  mt-20">
            <CardContent className="p-12 text-center">
              {passed ? (
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              ) : (
                <XCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
              )}
              <h1 className="text-3xl font-bold mb-4">{passed ? "Congratulations!" : "Keep Practicing!"}</h1>
              <p className="text-lg text-gray-600 mb-8">
                {passed ? "You've successfully passed the exam!" : "You didn't pass this time, but don't give up!"}
              </p>
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
                <p className="text-gray-600">Your Score</p>
                <div className="mt-4 text-sm text-gray-500">
                  {questions.length} questions • {Object.keys(answers).length} answered
                </div>
              </div>
              {passed && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-blue-900 font-semibold mb-2">Certificate Earned!</p>
                  <p className="text-sm text-blue-700">Your certificate is ready to download and share</p>
                </div>
              )}
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push("/exams")} variant="outline">
                  Back to Exams
                </Button>
                {!passed && (
                  <Button
                    onClick={() => router.push(`/exams/${examId}/take`)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Try Again
                  </Button>
                )}
                {passed && <Button className="bg-blue-600 hover:bg-blue-700">Download Certificate</Button>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5FBFE]">
      {/* <Navigation /> */}

      <main className="container mx-auto px-6 py-8 ">
        {/* Header */}
        <div className="bg-white mt-20 rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Python Programming Fundamentals</h1>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-600">{formatTime(timeLeft)}</span>
              </div>
              <Badge variant="outline">
                {Object.keys(answers).length}/{questions.length} Answered
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[questions[currentQuestion].id]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(questions[currentQuestion].id, Number.parseInt(value))}
                >
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  {currentQuestion < questions.length - 1 ? (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="bg-blue-600 cursor-pointer hover:bg-blue-700"
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button onClick={() => setShowSubmitDialog(true)} className="bg-green-600 cursor-pointer  hover:bg-green-700">
                      Submit Exam
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((question, index) => (
                    <Button
                      key={question.id}
                      variant={currentQuestion === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentQuestion(index)}
                      className={
                        answers[question.id] !== undefined
                          ? "bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
                          : ""
                      }
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your exam? You have answered {Object.keys(answers).length} out of{" "}
              {questions.length} questions.
              {Object.keys(answers).length < questions.length && (
                <span className="block mt-2 text-amber-600 font-semibold">Warning: You have unanswered questions!</span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitExam} className="bg-blue-600 hover:bg-blue-700">
              Submit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
