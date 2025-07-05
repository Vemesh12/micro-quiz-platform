export interface Category {
  id: string
  name: string
  description: string
  icon: string
  quizCount: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  questionCount: number
  difficulty: string
}

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizDetail {
  id: string
  title: string
  description: string
  questions: Question[]
}

export interface QuizState {
  currentQuestion: number
  selectedAnswer: number | null
  answers: (number | null)[]
  isCompleted: boolean
  score: number
  showFeedback: boolean
} 