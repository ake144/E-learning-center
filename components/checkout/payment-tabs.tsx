"use client"

import { Button } from "@/components/ui/button"
import { CreditCard, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentTabsProps {
    activeTab: 'stripe' | 'chapa'
    onTabChange: (tab: 'stripe' | 'chapa') => void
}

export function PaymentTabs({ activeTab, onTabChange }: PaymentTabsProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <button
                onClick={() => onTabChange('stripe')}
                className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                    activeTab === 'stripe'
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                )}
            >
                <CreditCard className="w-6 h-6 mb-2" />
                <span className="font-medium">Credit Card</span>
                <span className="text-xs text-gray-500 mt-1">International</span>
            </button>

            <button
                onClick={() => onTabChange('chapa')}
                className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                    activeTab === 'chapa'
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                )}
            >
                <Wallet className="w-6 h-6 mb-2" />
                <span className="font-medium">Chapa</span>
                <span className="text-xs text-gray-500 mt-1">Ethiopia</span>
            </button>
        </div>
    )
}
