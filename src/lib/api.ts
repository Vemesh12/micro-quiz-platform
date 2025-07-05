import { Category, Quiz, QuizDetail } from '@/types'
import { headers } from 'next/headers'

function isPromise<T>(value: any): value is Promise<T> {
  return !!value && typeof value.then === 'function'
}

async function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '' // relative URL for client
  }
  // Use VERCEL_URL or fallback to localhost for SSG/build
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  try {
    const h = await headers()
    if (typeof h.get === 'function') {
      const host = h.get('host')
      const protocol = host?.startsWith('localhost') ? 'http' : 'https'
      return `${protocol}://${host}`
    }
  } catch {}
  return 'http://localhost:3000'
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${await getBaseUrl()}/api/categories`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

export async function fetchQuizzesByCategory(category: string): Promise<Quiz[]> {
  const response = await fetch(`${await getBaseUrl()}/api/quizzes/${category}`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes')
  }
  return response.json()
}

export async function fetchQuizById(id: string): Promise<QuizDetail> {
  const response = await fetch(`${await getBaseUrl()}/api/quiz/${id}`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch quiz')
  }
  return response.json()
} 