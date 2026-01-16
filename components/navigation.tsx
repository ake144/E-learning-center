"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Menu, X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserMenu } from "@/components/navigation/user-menu"
import debounce from 'debounce';
import { useSearchCourses } from "@/utils/data/useSearchCourses"
import { Course } from "@/utils/data/course"

export function Navigation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const { data: results = [], isLoading } = useSearchCourses(debouncedTerm)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => setDebouncedTerm(value), 300),
    []
  )

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setShowResults(true)
    debouncedSearch(value)
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Browse" },
    { href: "/my-learning", label: "My Learning" },
    { href: "/library", label: "Library" },
    { href: "/exams", label: "Exams" },
  ]

  // Don't show navigation on auth pages
  if (pathname?.startsWith("/auth")) {
    return null
  }

  return (
    <header className="border-b bg-white fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                <Globe className="w-5 h-5 text-white" />
              </div>
              {/* <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">Global Pathways Academy</h1> */}
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.slice(1).map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-gray-700 cursor-pointer hover:text-blue-600",
                      pathname === item.href && "text-blue-600 bg-blue-50",
                    )}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="What do you want to learn?"
                value={searchTerm}
                onChange={onSearchChange}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="pl-10 w-80 border-gray-300"
              />
              {showResults && searchTerm && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg border border-t-0 p-2 max-h-96 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-2 text-center text-sm text-gray-500">Loading...</div>
                  ) : results.length > 0 ? (
                    results.map((course) => (
                      <Link
                        href={`/courses/${course.slug}`}
                        key={course.slug}
                        className="block p-2 hover:bg-gray-100 rounded"
                        onClick={() => setShowResults(false)}
                      >
                        <div className="font-medium text-sm text-gray-900">{course.title}</div>
                        {course.description && (
                          <div className="text-xs text-gray-500 truncate">{course.description}</div>
                        )}
                      </Link>
                    ))
                  ) : (
                    <div className="p-2 text-center text-sm text-gray-500">No courses found</div>
                  )}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* User Menu / Auth Buttons */}
            <UserMenu />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="space-y-2">
              {navItems.slice(1).map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-gray-700 hover:text-blue-600",
                      pathname === item.href && "text-blue-600 bg-blue-50",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="What do you want to learn?"
                  value={searchTerm}
                  onChange={onSearchChange}
                  className="pl-10 w-full border-gray-300"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
