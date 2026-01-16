import { useQuery } from "@tanstack/react-query"
import { Course } from "./course"

export function searchCourse(slug: string): Course[] | undefined {
      const { data, error, isLoading } = useQuery({
        queryKey: ['course', slug],
        queryFn: async () => {
          const response = await fetch(`/api/courses/${slug}`)
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json() as Promise<Course[]>
        }
      })

      return data
}