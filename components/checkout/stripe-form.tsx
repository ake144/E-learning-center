"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Lock } from "lucide-react"

interface StripeFormProps {
    amount: number
    onSuccess: () => void
    onError: (error: string) => void
}

export function StripeForm({ amount, onSuccess, onError }: StripeFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [cardError, setCardError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setIsProcessing(true)
        setCardError("")

        try {
            // 1. Create PaymentIntent on server
            const response = await fetch("/api/payment/stripe/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Payment failed")
            }

            // 2. Confirm card payment
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            })

            if (result.error) {
                setCardError(result.error.message || "Payment failed")
                onError(result.error.message || "Payment failed")
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    onSuccess()
                }
            }
        } catch (err: any) {
            console.error("Payment error:", err)
            setCardError(err.message || "Something went wrong")
            onError(err.message || "Something went wrong")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Card Information</Label>
                    <div className="p-4 border rounded-lg bg-white">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                    },
                                    invalid: {
                                        color: "#9e2146",
                                    },
                                },
                            }}
                            onChange={(e) => setCardError(e.error ? e.error.message : "")}
                        />
                    </div>
                    {cardError && <p className="text-sm text-red-500">{cardError}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Name on Card</Label>
                    <Input placeholder="John Doe" required />
                </div>
            </div>

            <Button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
            >
                {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Pay ${amount.toFixed(2)}
                    </div>
                )}
            </Button>

            <div className="flex justify-center gap-4 opacity-50 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
            </div>
        </form>
    )
}
