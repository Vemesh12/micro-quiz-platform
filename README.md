# Micro-Quiz Platform

A modern, interactive quiz platform built with Next.js 15, featuring dynamic routing, server-side rendering, static site generation, and API routes. Users can take short, topic-specific quizzes on various subjects including History, Science, Math, and Programming.

## 🚀 Features

- **Interactive Quiz Experience**: Take quizzes with immediate feedback and progress tracking
- **Multiple Categories**: History, Science, Math, and Programming quizzes
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **SEO Optimized**: Proper meta tags and Open Graph support
- **Performance Optimized**: Uses Next.js 15 with App Router for optimal performance

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel-ready

## 📋 Requirements Implemented

### ✅ Core Next.js Features

1. **Home Page (/) - Static Site Generation (SSG)**
   - Lists available quiz categories
   - Uses `generateStaticParams` for build-time generation
   - Fetches category data from API routes
   - Includes SEO meta tags with Next.js metadata API
   - Responsive design with Tailwind CSS

2. **Quiz Category Listing Page (/quizzes/[category]) - Server-Side Rendering (SSR)**
   - Dynamic routing with `[category].tsx`
   - Server-side data fetching for each request
   - Displays quizzes for selected category
   - Dynamic SEO meta tags based on category
   - Error handling for invalid categories

3. **Individual Quiz Page (/quiz/[id]) - SSR + Client State**
   - Dynamic routing with `[id].tsx`
   - Server-side data fetching for quiz details
   - Client-side state management with React hooks
   - Interactive quiz interface with immediate feedback
   - Progress tracking and score calculation

4. **Next.js API Routes**
   - `/api/categories` - Returns all quiz categories
   - `/api/quizzes/[category]` - Returns quizzes for a category
   - `/api/quiz/[id]` - Returns detailed quiz with questions and answers
   - Mock JSON data embedded in API routes

5. **Image Optimization**
   - Uses `next/image` component for optimized images
   - Placeholder icons with proper optimization

6. **Styling & Responsiveness**
   - Modern, responsive design with Tailwind CSS
   - Beautiful gradients and animations
   - Mobile-first approach
   - Accessible color schemes and typography

## 🏗️ Project Structure

```
micro-quiz-platform/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── categories/
│   │   │   │   └── route.ts
│   │   │   ├── quizzes/
│   │   │   │   └── [category]/
│   │   │   │       └── route.ts
│   │   │   └── quiz/
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── quiz/
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── QuizComponent.tsx
│   │   ├── quizzes/
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── public/
├── jest.config.js
├── jest.setup.js
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micro-quiz-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🎯 Implementation Details

### Static Site Generation (SSG)
The home page uses Next.js 15's App Router with `generateStaticParams` to pre-render the page at build time. This ensures fast loading and excellent SEO performance.

### Server-Side Rendering (SSR)
Category and quiz pages use server-side rendering to fetch data on each request, ensuring fresh content and dynamic SEO meta tags.

### API Routes
All data is served through Next.js API routes:
- Categories API provides quiz categories with metadata
- Quizzes API returns quizzes filtered by category
- Quiz API provides detailed quiz data with questions and answers

### Client-Side State Management
The quiz interface uses React hooks (`useState`) for managing:
- Current question index
- Selected answers
- Quiz progress
- Score calculation
- Feedback display

### Responsive Design
Built with Tailwind CSS featuring:
- Mobile-first responsive design
- Beautiful gradients and animations
- Accessible color schemes
- Modern card-based layouts

## 🧪 Testing

The project includes Jest and React Testing Library for comprehensive testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Deploy automatically

2. **Environment Variables**
   - No environment variables required for this demo
   - All data is mock data embedded in API routes

## 🎨 Design Decisions

### UI/UX Choices
- **Card-based Layout**: Easy to scan and navigate
- **Progress Indicators**: Clear visual feedback on quiz progress
- **Immediate Feedback**: Instant correct/incorrect feedback
- **Responsive Design**: Works seamlessly on all devices
- **Accessibility**: Proper contrast ratios and keyboard navigation

### Technical Choices
- **Next.js 15 App Router**: Latest features and performance optimizations
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Rapid development and consistent styling
- **API Routes**: Serverless functions for data serving
- **Static Generation**: Optimal performance for static content

## 🔧 Challenges and Solutions

### Challenge 1: React 19 Compatibility
**Problem**: Testing libraries weren't compatible with React 19
**Solution**: Updated to compatible versions and used `--legacy-peer-deps` for installation

### Challenge 2: App Router vs Pages Router
**Problem**: Different patterns for SSG/SSR in App Router
**Solution**: Used `generateStaticParams` for SSG and async components for SSR

### Challenge 3: Client-Side State Management
**Problem**: Managing complex quiz state with multiple interactions
**Solution**: Implemented comprehensive state management with React hooks

## 🤖 AI Development Tools

This project was developed using **Cursor.ai**, an AI-powered code editor that significantly accelerated development:

- **Code Generation**: AI-assisted component creation and API route development
- **TypeScript Support**: Automatic type inference and error detection
- **Refactoring**: AI-powered code optimization and restructuring
- **Documentation**: Automated README and comment generation

## 📝 Future Enhancements

- [ ] User authentication and progress tracking
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] More quiz categories and questions
- [ ] Leaderboards and social features
- [ ] Quiz creation tools
- [ ] Advanced analytics and reporting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built as a technical assessment demonstrating Next.js expertise and modern web development practices.

---

**Note**: This is a demonstration project with mock data. In a production environment, you would integrate with a real database and implement proper authentication and data management.
