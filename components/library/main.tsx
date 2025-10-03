"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookOpen, Filter } from "lucide-react"

const categories = [
  "All Categories",
  "Computer Science",
  "Data Science",
  "Business",
  "Mathematics",
  "Physics",
  "Literature",
  "Psychology",
  "History",
  "Philosophy",
]

const books = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    description: "A comprehensive textbook on computer algorithms",
    price: "Free",
    image: "/algorithms-book-cover.png",
    pages: 1312,
    language: "English",
    format: "PDF",
  },
  {
    id: "2",
    title: "Python for Data Analysis",
    author: "Wes McKinney",
    category: "Data Science",
    description: "Data wrangling with Pandas, NumPy, and IPython",
    price: "Free",
    image: "/python-data-analysis-book.jpg",
    pages: 544,
    language: "English",
    format: "PDF",
  },
  {
    id: "3",
    title: "Deep Learning",
    author: "Ian Goodfellow",
    category: "Computer Science",
    description: "An MIT Press book on deep learning fundamentals",
    price: "Free",
    image: "/deep-learning-book-cover.png",
    pages: 800,
    language: "English",
    format: "PDF",
  },
  {
    id: "4",
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie",
    category: "Data Science",
    description: "Data mining, inference, and prediction",
    price: "Free",
    image: "/statistical-learning-book.jpg",
    pages: 745,
    language: "English",
    format: "PDF",
  },
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Computer Science",
    description: "A handbook of agile software craftsmanship",
    price: "Free",
    image: "/clean-code-book-cover.png",
    pages: 464,
    language: "English",
    format: "PDF",
  },
  {
    id: "6",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    description: "The two systems that drive the way we think",
    price: "Free",
    image: "/thinking-fast-slow-book.jpg",
    pages: 499,
    language: "English",
    format: "PDF",
  },
  {
    id: "7",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    category: "Mathematics",
    description: "Comprehensive calculus textbook",
    price: "Free",
    image: "/images/book-calculo.png",
    pages: 1368,
    language: "English",
    format: "PDF",
  },
  {
    id: "8",
    title: "Physics for Scientists and Engineers",
    author: "Raymond A. Serway",
    category: "Physics",
    description: "Comprehensive physics textbook with modern physics",
    price: "Free",
    image: "/physics-textbook-cover.jpg",
    pages: 1280,
    language: "English",
    format: "PDF",
  },
  {
    id: "9",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    description: "From the Stone Age to the Silicon Age",
    price: "Free",
    image: "/sapiens-book-cover.png",
    pages: 443,
    language: "English",
    format: "PDF",
  },
  {
    id: "10",
    title: "The Republic",
    author: "Plato",
    category: "Philosophy",
    description: "Plato's influential dialogue on justice and the ideal state",
    price: "Free",
    image: "/plato-republic-book.jpg",
    pages: 416,
    language: "English",
    format: "PDF",
  },
  {
    id: "11",
    title: "Business Model Generation",
    author: "Alexander Osterwalder",
    category: "Business",
    description: "A handbook for visionaries, game changers, and challengers",
    price: "Free",
    image: "/business-model-book.jpg",
    pages: 288,
    language: "English",
    format: "PDF",
  },
  {
    id: "12",
    title: "1984",
    author: "George Orwell",
    category: "Literature",
    description: "A dystopian social science fiction novel",
    price: "Free",
    image: "/1984-book-cover.png",
    pages: 328,
    language: "English",
    format: "PDF",
  },
]

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || book.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#F5FBFE]">
      {/* <Navigation /> */}

      <main className="container mx-auto px-6 pt-12 mt-12  py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Library</h1>
          <p className="text-lg text-gray-600">Access thousands of free educational resources and textbooks</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search books by title, author, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <BookOpen className="w-4 h-4" />
            <span>
              Showing {filteredBooks.length} of {books.length} books
            </span>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Link key={book.id} href={`/library/${book.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">{book.price}</Badge>
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {book.category}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{book.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span>{book.pages} pages</span>
                      <span>•</span>
                      <span>{book.format}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for</p>
          </div>
        )}
      </main>
    </div>
  )
}
