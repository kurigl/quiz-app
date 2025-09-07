# AGENTS.md - Quiz App Development Guide

## Commands
- `npm start` - Start development server (localhost:3000)
- `npm run build` - Create production build
- `npm test` - Run all tests
- `npm test -- --testNamePattern="pattern"` - Run specific test
- `docker-compose up --build` - Start app with Docker

## Architecture
- **React 18 + TypeScript** single-page application
- **Components**: StartScreen, Question, Results, ErrorScreen in `/src/components/`
- **State Management**: React hooks (useState/useEffect) in App.tsx
- **Data**: questions.json loaded from public folder (20 questions, 10 random selected)
- **Types**: All interfaces defined in `/src/types/Quiz.ts`
- **Utils**: Quiz logic and question shuffling in `/src/utils/quizUtils.ts`

## Code Style
- **TypeScript**: Strict mode enabled, explicit interface types required
- **Components**: Functional components with React.FC, props interfaces above component
- **Imports**: Named imports for types, default imports for components
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **State**: Enum-based state management (QuizState.START/PLAYING/RESULTS/ERROR)
- **Error Handling**: Try-catch with console.error, git add .
fallback to ERROR state
- **Testing**: React Testing Library with Jest, German text matching
