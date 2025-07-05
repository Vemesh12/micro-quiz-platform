import { Metadata } from 'next'
import { fetchQuizById } from '@/lib/api'
import { QuizDetail } from '@/types'
import QuizComponent from './QuizComponent'

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate metadata dynamically for each quiz
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const quiz = await fetchQuizById(id)
    
    return {
      title: `${quiz.title} - Micro-Quiz Platform`,
      description: quiz.description,
      keywords: `quiz, ${quiz.title.toLowerCase()}, education, learning`,
      openGraph: {
        title: quiz.title,
        description: quiz.description,
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: 'Quiz Not Found - Micro-Quiz Platform',
      description: 'The requested quiz could not be found.'
    }
  }
}

export default async function QuizPage({ params }: PageProps) {
  try {
    const { id } = await params
    // Fetch quiz data server-side (SSR)
    const quiz = await fetchQuizById(id)
    
    return <QuizComponent quiz={quiz} />
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">The requested quiz could not be found.</p>
          <a 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }
} 