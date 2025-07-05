import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import QuizComponent from '../quiz/[id]/QuizComponent'

const mockQuiz = {
  id: 'test-quiz',
  title: 'Test Quiz',
  description: 'A test quiz for testing',
  questions: [
    {
      id: 1,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2
    }
  ]
}

describe('QuizComponent', () => {
  it('renders quiz title and description', () => {
    render(<QuizComponent quiz={mockQuiz} />)
    expect(screen.getByText('Test Quiz')).toBeInTheDocument()
    expect(screen.getByText('A test quiz for testing')).toBeInTheDocument()
  })

  it('displays the first question', () => {
    render(<QuizComponent quiz={mockQuiz} />)
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
  })

  it('shows all answer options', () => {
    render(<QuizComponent quiz={mockQuiz} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('allows selecting an answer', () => {
    render(<QuizComponent quiz={mockQuiz} />)
    const answerOption = screen.getByText('4')
    fireEvent.click(answerOption)
    expect(screen.getByText('Submit Answer')).toBeEnabled()
  })

  it('shows feedback after submitting answer', async () => {
    render(<QuizComponent quiz={mockQuiz} />)
    const answerOption = screen.getByText('4') // Correct answer
    fireEvent.click(answerOption)
    
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument()
    })
  })

  it('shows progress information', () => {
    render(<QuizComponent quiz={mockQuiz} />)
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('50% Complete')).toBeInTheDocument()
  })
}) 