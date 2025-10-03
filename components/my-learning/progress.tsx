"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { month: "February", learning: 305, Quiz: 200 },
  { month: "March", learning: 237, Quiz: 120 },
  { month: "April", learning: 73, Quiz: 190 },
  { month: "May", learning: 209, Quiz: 130 },
  { month: "June", learning: 214, Quiz: 140 },
]

const chartConfig = {
  learning: {
    label: "Learning",
    color: "var(--chart-1)",
  },
  Quiz: {
    label: "Quiz",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function LearningProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Learning & Quiz Progress</CardTitle>
        <CardDescription>Track your learning and quiz growth each week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="learning" fill="var(--chart-1)" radius={4} name="Learning Progress" />
            <Bar dataKey="Quiz" fill="var(--chart-2)" radius={4} name="Quiz Growth" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <TrendingUp className="h-4 w-4 text-green-600" />
          Your learning and quiz activity is trending up this month!
        </div>
        <div className="text-muted-foreground leading-none">
          Weekly bars show lessons completed and quizzes passed.
        </div>
      </CardFooter>
    </Card>
  )
}
