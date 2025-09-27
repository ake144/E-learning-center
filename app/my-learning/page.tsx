// import LearnPage from "@/components/learn/main"

// const Learn=()=>{
//     return(<>
//     <LearnPage/>
//     </>)
// }


// export default Learn;


"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { Course, courses } from "@/utils/data/course";

export default function MyLearningPage() {
  const router = useRouter();

  const getButtonProps = (course: Course) => {
    if (course.progress === 100) {
      return { text: "Completed", variant: "secondary", disabled: false, onClick: () => router.push(`/my-learning/${course.slug}`) };
    } else if (course.progress > 0) {
      return { text: "Continue", variant: "default", disabled: false, onClick: () => router.push(`/my-learning/${course.slug}`) };
    }
    return { text: "Start", variant: "default", disabled: false, onClick: () => router.push(`/my-learning/${course.slug}`) };
  };

  return (
    <div className="min-h-screen bg-background">
    
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600" onClick={() => router.back()}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">My Learning</h1>
                <p className="text-sm text-gray-600">Your enrolled courses</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">Enrolled: {courses.length}</Badge>
          </div>
        </div>
    

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const { text, variant, disabled, onClick } = getButtonProps(course);
            return (
              <Card key={course.slug} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-blue-600 font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <Button className="w-full" variant={variant as any} disabled={disabled} onClick={onClick}>
                    {text}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}