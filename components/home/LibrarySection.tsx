"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, ArrowRight, Download } from "lucide-react"
import Link from "next/link"

export default function LibrarySection() {
    const books = [
        {
            id: "1",
            title: "Introduction to Algorithms",
             author: "Thomas H. Cormen",
            category: "Computer Science",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",

        },
        {
             id: "2",
            title: "Python for Data Analysis",
            author: "Wes McKinney",
            category: "Data Science",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",

                   },
        {
            id: "3",
            title: "Deep Learning",
            author: "Ian Goodfellow",
            category: "Computer Science",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        },
    ]

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            World-Class <span className="text-blue-600">E-Library</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Access thousands of books, research papers, and journals from
                            leading African and international authors.
                        </p>
                    </div>
                    <Link href="/library">
                        <Button variant="outline" className="h-14 px-8 border-2 font-bold text-lg rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1">
                            Explore Library <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {books.map((book, index) => (
                        <Link key={index} href={`/library/${book.id}`}>
                        <Card key={index} className="h-full border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-[2rem] bg-white">
                            <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300">
                                        <Download className="w-5 h-5" />
                                        Download PDF
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-8">
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{book.category}</span>
                                </div>
                                <h4 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                    {book.title}
                                </h4>
                                <p className="text-gray-500 font-medium mb-6">By {book.author}</p>
                                <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                                    Read Online <ArrowRight className="w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
