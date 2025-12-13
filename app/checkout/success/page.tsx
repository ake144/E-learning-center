"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Download } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { useAuthStore } from "@/store/auth-store"

function SuccessContent() {
    const searchParams = useSearchParams()
    const slug = searchParams.get('slug')
    const { enrollCourse } = useAuthStore()

    useEffect(() => {
        if (slug) {
            enrollCourse(slug)
        }
    }, [slug, enrollCourse])

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
            <Card className="w-full max-w-lg border-0 shadow-xl overflow-hidden">
                <div className="bg-green-600 h-2" />
                <CardContent className="pt-12 pb-8 text-center px-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase. You now have lifetime access to your course.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Order Number</span>
                            <span className="font-medium text-gray-900">#ORD-{Math.floor(Math.random() * 100000)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Date</span>
                            <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Payment Method</span>
                            <span className="font-medium text-gray-900">Credit Card</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link href="/my-learning">
                            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl">
                                Start Learning
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>

                        <Button variant="outline" className="w-full h-12 rounded-xl">
                            <Download className="w-4 h-4 mr-2" />
                            Download Receipt
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
