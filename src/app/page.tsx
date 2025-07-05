import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { categories } from '@/data/mockData'
import { Category } from '@/types'

export const metadata: Metadata = {
  title: 'Micro-Quiz Platform - Test Your Knowledge',
  description: 'Take short, topic-specific quizzes on History, Science, Math, and Programming. Challenge yourself with our interactive quiz platform.',
  keywords: 'quiz, education, learning, history, science, math, programming',
  openGraph: {
    title: 'Micro-Quiz Platform',
    description: 'Test your knowledge with our interactive quiz platform',
    type: 'website',
  },
}

// This function runs at build time (SSG)
export async function generateStaticParams() {
  return []
}

export default async function HomePage() {
  // Use categories directly for SSG (build time)
  // For client-side, this will be the same data
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Micro-Quiz Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our interactive quizzes. Choose from various categories and challenge yourself!
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/quizzes/${category.id}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
                <div className="flex flex-col items-center text-center">
                  {/* Placeholder icon - in a real app, you'd use actual SVG icons */}
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-gray-500">
                      {category.quizCount} quizzes
                    </span>
                    <span className="text-blue-600 group-hover:text-blue-700 transition-colors">
                      Start →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Take short quizzes that fit into your busy schedule</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Topic-Focused</h3>
              <p className="text-gray-600">Choose from specific categories that interest you</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Feedback</h3>
              <p className="text-gray-600">Get immediate results and learn from your mistakes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
