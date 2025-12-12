"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Clock, Award } from "lucide-react"

interface OrderSummaryProps {
    courseTitle: string
    courseImage: string
    price: number
    originalPrice?: number
    currency: string
}

export function OrderSummary({ courseTitle, courseImage, price, originalPrice, currency }: OrderSummaryProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="aspect-video relative">
                    <img
                        src={courseImage}
                        alt={courseTitle}
                        className="w-full h-full object-cover"
                    />
                </div>
                <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{courseTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Original Price</span>
                        <span className="text-gray-400 line-through">
                            {currency === 'USD' ? '$' : 'ETB '}{originalPrice?.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-green-600 font-medium">
                        <span>Discount</span>
                        <span>-{discount}% OFF</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total</span>
                        <span>{currency === 'USD' ? '$' : 'ETB '}{price.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-blue-900">Secure Checkout</h4>
                        <p className="text-sm text-blue-700">
                            Your payment information is encrypted and secure.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-gray-900">Lifetime Access</h4>
                        <p className="text-sm text-gray-600">
                            Pay once, learn forever. No monthly fees.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Award className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-gray-900">Certificate Included</h4>
                        <p className="text-sm text-gray-600">
                            Get a verified certificate upon completion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
