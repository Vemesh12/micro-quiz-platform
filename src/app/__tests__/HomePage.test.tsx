import { render, screen } from '@testing-library/react'
import HomePage from '../page'

// Mock the categories data
jest.mock('../../data/mockData', () => ({
  categories: [
    {
      id: 'history',
      name: 'History',
      description: 'Test your knowledge of historical events and figures',
      icon: '/history-icon.svg',
      quizCount: 3
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Explore scientific concepts and discoveries',
      icon: '/science-icon.svg',
      quizCount: 4
    }
  ]
}))

describe('HomePage', () => {
  it('renders the main heading', async () => {
    render(await HomePage())
    expect(screen.getByText('Micro-Quiz Platform')).toBeInTheDocument()
  })

  it('renders category cards', async () => {
    render(await HomePage())
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('Science')).toBeInTheDocument()
  })

  it('displays category descriptions', async () => {
    render(await HomePage())
    expect(screen.getByText('Test your knowledge of historical events and figures')).toBeInTheDocument()
    expect(screen.getByText('Explore scientific concepts and discoveries')).toBeInTheDocument()
  })

  it('shows quiz counts', async () => {
    render(await HomePage())
    expect(screen.getByText('3 quizzes')).toBeInTheDocument()
    expect(screen.getByText('4 quizzes')).toBeInTheDocument()
  })

  it('renders features section', async () => {
    render(await HomePage())
    expect(screen.getByText('Why Choose Our Platform?')).toBeInTheDocument()
    expect(screen.getByText('Quick & Easy')).toBeInTheDocument()
    expect(screen.getByText('Topic-Focused')).toBeInTheDocument()
    expect(screen.getByText('Instant Feedback')).toBeInTheDocument()
  })
}) 