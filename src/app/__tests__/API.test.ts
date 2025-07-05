import { NextRequest } from 'next/server'
import { GET as getCategories } from '../api/categories/route'
import { GET as getQuizzes } from '../api/quizzes/[category]/route'
import { GET as getQuiz } from '../api/quiz/[id]/route'

describe('API Routes', () => {
  describe('/api/categories', () => {
    it('returns all categories', async () => {
      const response = await getCategories()
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
      expect(data[0]).toHaveProperty('id')
      expect(data[0]).toHaveProperty('name')
      expect(data[0]).toHaveProperty('description')
    })
  })

  describe('/api/quizzes/[category]', () => {
    it('returns quizzes for a valid category', async () => {
      const request = new NextRequest('http://localhost:3000/api/quizzes/history')
      const response = await getQuizzes(request, { params: Promise.resolve({ category: 'history' }) })
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
      expect(data[0]).toHaveProperty('id')
      expect(data[0]).toHaveProperty('title')
    })

    it('returns 404 for invalid category', async () => {
      const request = new NextRequest('http://localhost:3000/api/quizzes/invalid')
      const response = await getQuizzes(request, { params: Promise.resolve({ category: 'invalid' }) })
      
      expect(response.status).toBe(404)
    })
  })

  describe('/api/quiz/[id]', () => {
    it('returns quiz details for a valid id', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/history-1')
      const response = await getQuiz(request, { params: Promise.resolve({ id: 'history-1' }) })
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('title')
      expect(data).toHaveProperty('questions')
      expect(Array.isArray(data.questions)).toBe(true)
    })

    it('returns 404 for invalid quiz id', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/invalid-id')
      const response = await getQuiz(request, { params: Promise.resolve({ id: 'invalid-id' }) })
      
      expect(response.status).toBe(404)
    })
  })
}) 