import Link from 'next/link'
import { Metadata } from 'next'
import { fetchQuizzesByCategory, fetchCategories } from '@/lib/api'
import { Quiz, Category } from '@/types'

interface PageProps {
  params: Promise<{ category: string }>
}

// Generate metadata dynamically for each category
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const categories = await fetchCategories()
  const cat = categories.find(cat => cat.id === category)
  
  if (!cat) {
    return {
      title: 'Category Not Found - Micro-Quiz Platform',
      description: 'The requested quiz category could not be found.'
    }
  }

  return {
    title: `${cat.name} Quizzes - Micro-Quiz Platform`,
    description: `${cat.description} Explore our collection of ${cat.name.toLowerCase()} quizzes.`,
    keywords: `quiz, ${cat.name.toLowerCase()}, education, learning`,
    openGraph: {
      title: `${cat.name} Quizzes`,
      description: cat.description,
      type: 'website',
    },
  }
}

// Generate static params for known categories
export async function generateStaticParams() {
  const categories = await fetchCategories()
  return categories.map((category) => ({
    category: category.id,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  // Fetch data server-side (SSR)
  const [quizzes, categories] = await Promise.all([
    fetchQuizzesByCategory(category),
    fetchCategories()
  ])
  
  const currentCategory = categories.find(cat => cat.id === category)
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The requested category could not be found.</p>
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            ← Back to Categories
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {currentCategory.name} Quizzes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>
        </div>

        {/* Quizzes Grid */}
        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Quizzes Available</h2>
            <p className="text-gray-600 mb-8">We're working on adding quizzes for this category.</p>
            <Link 
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Other Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quiz/${quiz.id}`}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {quiz.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {quiz.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          {quiz.questionCount} questions
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 group-hover:text-blue-700 transition-colors font-medium">
                          Start Quiz →
                        </span>
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <span className="text-blue-600 text-sm">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Category Navigation */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/quizzes/${category.id}`}
                className={`text-center p-4 rounded-lg transition-colors ${
                  category.id === currentCategory.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{category.name}</div>
                <div className="text-sm opacity-75">{category.quizCount} quizzes</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 