'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { QuizDetail, QuizState } from '@/types'

interface QuizComponentProps {
  quiz: QuizDetail
}

export default function QuizComponent({ quiz }: QuizComponentProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    answers: new Array(quiz.questions.length).fill(null),
    isCompleted: false,
    score: 0,
    showFeedback: false
  })

  const currentQuestion = quiz.questions[quizState.currentQuestion]
  const progress = ((quizState.currentQuestion + 1) / quiz.questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showFeedback) return // Prevent changing answer after feedback
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex
    }))
  }

  const handleSubmitAnswer = () => {
    if (quizState.selectedAnswer === null) return

    const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer
    
    setQuizState(prev => ({
      ...prev,
      answers: prev.answers.map((answer, index) => 
        index === prev.currentQuestion ? prev.selectedAnswer : answer
      ),
      score: isCorrect ? prev.score + 1 : prev.score,
      showFeedback: true
    }))

    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      setQuizState(prev => {
        if (prev.currentQuestion < quiz.questions.length - 1) {
          return {
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            selectedAnswer: null,
            showFeedback: false
          }
        } else {
          return {
            ...prev,
            isCompleted: true
          }
        }
      })
    }, 2000)
  }

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        showFeedback: false
      }))
    }
  }

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      answers: new Array(quiz.questions.length).fill(null),
      isCompleted: false,
      score: 0,
      showFeedback: false
    })
  }

  const getScorePercentage = () => {
    return Math.round((quizState.score / quiz.questions.length) * 100)
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return "Excellent! You're a master!"
    if (percentage >= 80) return "Great job! You really know your stuff!"
    if (percentage >= 70) return "Good work! You have solid knowledge."
    if (percentage >= 60) return "Not bad! Keep learning and improving."
    return "Keep studying! Practice makes perfect."
  }

  if (quizState.isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.description}</p>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">
                  {getScorePercentage()}%
                </div>
                <div className="text-xl text-gray-700 mb-2">
                  {quizState.score} out of {quiz.questions.length} correct
                </div>
                <div className="text-lg text-gray-600 mb-6">
                  {getScoreMessage()}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getScorePercentage()}%` }}
                  ></div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleRestartQuiz}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Take Quiz Again
                  </button>
                  <Link
                    href="/"
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors text-center"
                  >
                    Back to Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              ← Back to Categories
            </Link>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {quiz.title}
              </h1>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                Question {quizState.currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>
              
              {/* Answer Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={quizState.showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      quizState.selectedAnswer === index
                        ? quizState.showFeedback
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-blue-500 bg-blue-50'
                        : quizState.showFeedback && index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${quizState.showFeedback ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        quizState.selectedAnswer === index
                          ? quizState.showFeedback
                            ? index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-red-500 bg-red-500'
                            : 'border-blue-500 bg-blue-500'
                          : quizState.showFeedback && index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {quizState.selectedAnswer === index && (
                          <span className="text-white text-sm">✓</span>
                        )}
                        {quizState.showFeedback && index === currentQuestion.correctAnswer && quizState.selectedAnswer !== index && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {quizState.showFeedback && (
              <div className={`p-4 rounded-lg mb-6 ${
                quizState.selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-red-100 border border-red-300'
              }`}>
                <div className="flex items-center">
                  <span className={`text-2xl mr-3 ${
                    quizState.selectedAnswer === currentQuestion.correctAnswer
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {quizState.selectedAnswer === currentQuestion.correctAnswer ? '✓' : '✗'}
                  </span>
                  <div>
                    <div className={`font-semibold ${
                      quizState.selectedAnswer === currentQuestion.correctAnswer
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}>
                      {quizState.selectedAnswer === currentQuestion.correctAnswer
                        ? 'Correct!'
                        : 'Incorrect!'}
                    </div>
                    {quizState.selectedAnswer !== currentQuestion.correctAnswer && (
                      <div className="text-red-700 text-sm">
                        The correct answer is: {currentQuestion.options[currentQuestion.correctAnswer]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Score: {quizState.score} / {quiz.questions.length}
              </div>
              
              {!quizState.showFeedback ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={quizState.selectedAnswer === null}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    quizState.selectedAnswer === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <div className="text-sm text-gray-600">
                  {quizState.currentQuestion < quiz.questions.length - 1 
                    ? 'Moving to next question...' 
                    : 'Completing quiz...'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 