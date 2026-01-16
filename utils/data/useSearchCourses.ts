import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Course } from "@/utils/data/course";

export function useSearchCourses(query: string) {
  return useQuery({
    queryKey: ["searchCourses", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const { data } = await api.get(`/courses/search/${encodeURIComponent(query)}`);
      return Array.isArray(data) ? (data as Course[]) : [];
    },
    enabled: query.trim().length > 0,
  });
}
