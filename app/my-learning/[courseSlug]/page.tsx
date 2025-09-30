"use client"

import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, ChevronLeft } from "lucide-react";
import { courses } from "@/utils/data/course";
import {use} from 'react';

export default function CourseModulesPage() {
  const router = useRouter();
  const params = useParams();
  const { courseSlug } = params;

  const course = courses.find((c) => c.slug === courseSlug);
  if (!course) return notFound();

  return (
    <div className="min-h-screen bg-background">
    
      <div className="container mx-auto px-6 py-8 mt-22">
        <div className="flex items-center gap-4 pb-6 border-b mb-6">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600" onClick={() => router.push("/my-learning")}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to My Learning
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{course.title}</h1>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {course.modules.map((module) => (
            <Card key={module.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">{module.title}</CardTitle>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Progress: {module.progress}%</span>
                  <Progress value={module.progress} className="w-1/3 h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        lesson.completed ? "bg-green-50 border-green-200 hover:bg-green-100" : "hover:bg-gray-50 border-gray-200"
                      }`}
                      onClick={() => router.push(`/my-learning/${courseSlug}/${lesson.id}`)}
                    >
                      <div className="flex items-start gap-3">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{lesson.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                            {lesson.completed && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Completed</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}