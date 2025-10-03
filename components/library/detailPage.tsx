"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, Download, Eye, Star, Clock, FileText, Globe, ChevronLeft } from "lucide-react"

// Mock data - in real app, this would come from a database
const booksData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest",
    category: "Computer Science",
    description:
      "A comprehensive textbook on computer algorithms. This book provides a comprehensive introduction to the modern study of computer algorithms. It presents many algorithms and covers them in considerable depth, yet makes their design and analysis accessible to all levels of readers.",
    longDescription:
      "Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study. The algorithms are described in English and in a pseudocode designed to be readable by anyone who has done a little programming.",
    price: "Free",
    image: "/algorithms-book-cover.png",
    pages: 1312,
    language: "English",
    format: "PDF",
    publisher: "MIT Press",
    edition: "3rd Edition",
    isbn: "978-0262033848",
    rating: 4.8,
    reviews: 2847,
    downloadUrl: "/downloads/intro-to-algorithms.pdf",
  },
  "2": {
    id: "2",
    title: "Python for Data Analysis",
    author: "Wes McKinney",
    category: "Data Science",
    description:
      "Data wrangling with Pandas, NumPy, and IPython. Get complete instructions for manipulating, processing, cleaning, and crunching datasets in Python.",
    longDescription:
      "Looking for complete instructions on manipulating, processing, cleaning, and crunching structured data in Python? This hands-on book is packed with practical cases studies that show you how to effectively solve a broad set of data analysis problems using Python. You'll learn the latest versions of pandas, NumPy, IPython, and Jupyter in the process.",
    price: "Free",
    image: "/python-data-analysis-book.jpg",
    pages: 544,
    language: "English",
    format: "PDF",
    publisher: "O'Reilly Media",
    edition: "2nd Edition",
    isbn: "978-1491957660",
    rating: 4.6,
    reviews: 1523,
    downloadUrl: "/downloads/python-data-analysis.pdf",
  },
  "3": {
    id: "3",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
    category: "Computer Science",
    description:
      "An MIT Press book on deep learning fundamentals. The Deep Learning textbook is a resource intended to help students and practitioners enter the field of machine learning.",
    longDescription:
      "The Deep Learning textbook is a resource intended to help students and practitioners enter the field of machine learning in general and deep learning in particular. The online version of the book is now complete and will remain available online for free.",
    price: "Free",
    image: "/deep-learning-book-cover.png",
    pages: 800,
    language: "English",
    format: "PDF",
    publisher: "MIT Press",
    edition: "1st Edition",
    isbn: "978-0262035613",
    rating: 4.7,
    reviews: 1876,
    downloadUrl: "/downloads/deep-learning.pdf",
  },
}

export default function BookDetailPage({ bookId }: { bookId: string }) {
  const params = useParams()
  const router = useRouter()
  const [showAccessDialog, setShowAccessDialog] = useState(false)
  const book = booksData[bookId]

  if (!book) {
    return (
      <div className="min-h-screen bg-[#F5FBFE]">
        <Navigation />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
          <Button onClick={() => router.push("/library")}>Back to Library</Button>
        </div>
      </div>
    )
  }

  const handleAccessBook = () => {
    setShowAccessDialog(true)
  }

  const handleOpenBook = () => {
    // In a real app, this would open the book in a reader
    window.open(book.downloadUrl, "_blank")
    setShowAccessDialog(false)
  }

  const handleDownloadBook = () => {
    // In a real app, this would trigger a download
    const link = document.createElement("a")
    link.href = book.downloadUrl
    link.download = `${book.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowAccessDialog(false)
  }

  return (
    <div className="min-h-screen bg-[#F5FBFE]">
      {/* <Navigation /> */}

      <main className="container mx-auto px-6 pt-12 mt-12 py-8">
        {/* Breadcrumb */}
        <Button variant="ghost" onClick={() => router.push("/library")} className="mb-6 -ml-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Library
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Image and Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-base px-3 py-1">
                    {book.price}
                  </Badge>
                </div>

                <Button onClick={handleAccessBook} className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 mb-3">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Access Book
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {book.rating} ({book.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pages</span>
                    <span className="font-semibold">{book.pages}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Format</span>
                    <span className="font-semibold">{book.format}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-semibold">{book.language}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <Badge variant="outline" className="mb-3">
                {book.category}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-6">by {book.author}</p>

              <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{book.pages} pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{book.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{book.format}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">About this book</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{book.description}</p>
                  <p className="text-gray-700 leading-relaxed">{book.longDescription}</p>
                </div>

                <Separator />

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Publication Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Publisher</p>
                      <p className="font-semibold text-gray-900">{book.publisher}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Edition</p>
                      <p className="font-semibold text-gray-900">{book.edition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">ISBN</p>
                      <p className="font-semibold text-gray-900">{book.isbn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Format</p>
                      <p className="font-semibold text-gray-900">{book.format}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Free Educational Resource</h3>
                  <p className="text-sm text-gray-700">
                    This book is available for free as part of our educational initiative. You can read it online or
                    download it for offline access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Access Dialog */}
      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Book</DialogTitle>
            <DialogDescription>Choose how you'd like to access "{book.title}"</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Button
              onClick={handleOpenBook}
              className="w-full h-14 text-base justify-start bg-transparent"
              variant="outline"
            >
              <Eye className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Open in Reader</div>
                <div className="text-xs text-gray-500">Read online in your browser</div>
              </div>
            </Button>
            <Button
              onClick={handleDownloadBook}
              className="w-full h-14 text-base justify-start bg-transparent"
              variant="outline"
            >
              <Download className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Download PDF</div>
                <div className="text-xs text-gray-500">Save for offline reading</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
