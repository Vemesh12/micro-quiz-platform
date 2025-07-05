import { NextRequest, NextResponse } from 'next/server'

// Mock data for individual quizzes
const quizData = {
  'history-1': {
    id: 'history-1',
    title: 'Ancient Civilizations',
    description: 'Test your knowledge about ancient civilizations',
    questions: [
      {
        id: 1,
        question: 'Which ancient civilization built the pyramids?',
        options: ['Greeks', 'Romans', 'Egyptians', 'Persians'],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'The Great Wall of China was built during which dynasty?',
        options: ['Ming Dynasty', 'Qin Dynasty', 'Han Dynasty', 'Tang Dynasty'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Which ancient city was known as the "City of Light"?',
        options: ['Rome', 'Athens', 'Babylon', 'Alexandria'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'The Code of Hammurabi was created in which ancient civilization?',
        options: ['Egypt', 'Babylon', 'Greece', 'Rome'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'Which ancient wonder was located in Alexandria?',
        options: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'Temple of Artemis'],
        correctAnswer: 1
      }
    ]
  },
  'science-1': {
    id: 'science-1',
    title: 'Basic Chemistry',
    description: 'Fundamental concepts in chemistry',
    questions: [
      {
        id: 1,
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Fe', 'Cu'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is the most abundant element in the universe?',
        options: ['Helium', 'Carbon', 'Oxygen', 'Hydrogen'],
        correctAnswer: 3
      },
      {
        id: 3,
        question: 'What is the atomic number of carbon?',
        options: ['6', '12', '14', '16'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'Which gas is known as the "silent killer"?',
        options: ['Carbon dioxide', 'Carbon monoxide', 'Nitrogen', 'Oxygen'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is the chemical formula for water?',
        options: ['H2O2', 'CO2', 'H2O', 'NaCl'],
        correctAnswer: 2
      }
    ]
  },
  'math-1': {
    id: 'math-1',
    title: 'Basic Arithmetic',
    description: 'Addition, subtraction, multiplication, and division',
    questions: [
      {
        id: 1,
        question: 'What is 15 + 27?',
        options: ['40', '42', '43', '41'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is 8 × 7?',
        options: ['54', '56', '58', '60'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is 100 ÷ 4?',
        options: ['20', '25', '30', '35'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is 45 - 18?',
        options: ['25', '27', '29', '31'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is 12 × 12?',
        options: ['144', '124', '134', '154'],
        correctAnswer: 0
      }
    ]
  },
  'programming-1': {
    id: 'programming-1',
    title: 'JavaScript Basics',
    description: 'Fundamental JavaScript concepts',
    questions: [
      {
        id: 1,
        question: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['var', 'let', 'const', 'All of the above'],
        correctAnswer: 3
      },
      {
        id: 2,
        question: 'What is the result of 2 + "2" in JavaScript?',
        options: ['4', '22', 'NaN', 'Error'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'What is the correct way to write a JavaScript array?',
        options: ['var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'How do you write "Hello World" in an alert box?',
        options: ['alert("Hello World")', 'msg("Hello World")', 'msgBox("Hello World")', 'alertBox("Hello World")'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: 'Which event occurs when the user clicks on an HTML element?',
        options: ['onchange', 'onclick', 'onmouseover', 'onmouseclick'],
        correctAnswer: 1
      }
    ]
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const quiz = quizData[id as keyof typeof quizData]

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  }

  return NextResponse.json(quiz)
} 