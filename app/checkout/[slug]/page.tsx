"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Course } from "@/utils/data/course"
import { useCourseStore } from "@/store/course-store"
import { PaymentTabs } from "@/components/checkout/payment-tabs"
import { StripeForm } from "@/components/checkout/stripe-form"
import { ChapaButton } from "@/components/checkout/chapa-button"
import { OrderSummary } from "@/components/checkout/order-summary"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder")

export default function CheckoutPage( ) {
    const params =  useParams();
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()
    const [activeTab, setActiveTab] = useState<'chapa' >('chapa')
    const { getCourseBySlug } = useCourseStore()
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)

    const slug = params.slug;


    useEffect(() => {
        const loadCourse = async () => {
            setLoading(true)
            const data = await getCourseBySlug(slug as string)
            if (data) {
                setCourse(data)
            }
            setLoading(false)
        }
        loadCourse()
    }, [params.slug, getCourseBySlug])

    useEffect(() => {
        if (!isAuthenticated) {
            // Save return URL and redirect to login
            sessionStorage.setItem("returnUrl", `/checkout/${params.slug}`)
            router.push("/auth/login")
        }
    }, [isAuthenticated, params.slug, router])

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>
    }

    if (!course) {
        return <div className="p-8 text-center">Course not found</div>
    }

    if (!user) return null

    const handleSuccess = () => {
        router.push("/checkout/success")
    }

    const handleError = (error: string) => {
        console.error(error)
        // Show error toast
    }

    // Generate unique transaction ref
    const txRef = `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Payment Methods */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>

                            <PaymentTabs activeTab={activeTab} onTabChange={setActiveTab} />

                            <div className="mt-6">
                                {/* {activeTab === 'stripe' ? (
                                    <Elements stripe={stripePromise}>
                                        <StripeForm
                                            amount={course.price}
                                            onSuccess={handleSuccess}
                                            onError={handleError}
                                        />
                                    </Elements>
                                ) : (
                                    <ChapaButton
                                        amount={course.priceETB || course.price * 50} // Fallback conversion
                                        email={user.email}
                                        firstName={user.name.split(' ')[0]}
                                        lastName={user.name.split(' ')[1] || ''}
                                        txRef={txRef}
                                        phone_number={user.phone || ''}
                                        courseSlug={course.slug}
                                    />
                                )} */}
                                
                                    <ChapaButton
                                        amount={course.priceETB || course.price * 50} // Fallback conversion
                                        email={user.email}
                                        firstName={user.name.split(' ')[0]}
                                        lastName={user.name.split(' ')[1] || ''}
                                        txRef={txRef}
                                        phone_number={user.phone || ''}
                                        courseSlug={course.slug}
                                    />
                                
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary
                            courseTitle={course.title}
                            courseImage={course.image || ""}
                            price={course.priceETB || 0}
                            originalPrice={(course.originalPrice || 0) * 50} // Approx conversion
                            currency={'ETB'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
