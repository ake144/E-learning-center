import Link from "next/link"
import { Facebook, Linkedin, Twitter, Youtube, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* LearnHub Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">LearnHub</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/what-we-offer" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  What We Offer
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/courses/catalog" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/plus" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  LearnHub Plus
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Professional Certificates
                </Link>
              </li>
              <li>
                <Link href="/degrees" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Degrees
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  For Enterprise
                </Link>
              </li>
              <li>
                <Link href="/government" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  For Government
                </Link>
              </li>
              <li>
                <Link href="/campus" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  For Campus
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link href="/social-impact" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Social Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/learners" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Learners
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/beta" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Beta Testers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  The LearnHub Podcast
                </Link>
              </li>
              <li>
                <Link href="/tech-blog" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Tech Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* More Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">More</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/press" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Affiliates
                </Link>
              </li>
              <li>
                <Link href="/modern-slavery" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Modern Slavery Statement
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Manage Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile App Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Mobile App</h3>
            <div className="space-y-3">
              <Link href="#" className="block">
                <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Link>
              <Link href="#" className="block">
                <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Link>
              <div className="mt-6">
                <div className="bg-white border-2 border-gray-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <div className="text-center">
                    <div className="text-xs font-semibold">Certified</div>
                    <div className="text-2xl font-bold">B</div>
                    <div className="text-xs">Corporation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 LearnHub Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Youtube className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
