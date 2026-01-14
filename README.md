# Task Management Dashboard
🔗 **Live Demo**: [https://task-management-dashboard-vert.vercel.app/](https://task-management-dashboard-vert.vercel.app/)

A modern, feature-rich task management application built with React and TypeScript. This dashboard provides a comprehensive interface for managing tasks with advanced filtering, sorting, and search capabilities.

## Project Overview

The Task Management Dashboard is a client-side web application that enables users to create, update, delete, and organize tasks efficiently. It features a responsive design with dark mode support, persistent storage, and a polished user interface built with modern React patterns.

### Key Features

- **Task CRUD Operations**: Create, read, update, and delete tasks with full form validation
- **Advanced Filtering**: Filter tasks by status, priority, and search
- **Smart Sorting**: Sort tasks by due date, priority, or creation date
- **Real-time Search**: Search tasks by title and description with debounced input
- **Status Management**: Quick status updates with visual indicators for overdue tasks
- **Persistent Storage**: Tasks are automatically saved to localStorage and filtered query are stored in sessionStorage
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Fully responsive UI that works across desktop and mobile devices
- **Virtual Scrolling**: Optimized rendering for large task lists using TanStack Virtual

## Technology Stack

### Core Technologies

- **React 19.2.0**: Latest version with improved performance and concurrent features
- **TypeScript 5.9.3**: Type safety and enhanced developer experience
- **Vite 7.2.4**: Fast build tool with HMR for optimal development experience

### State Management

- **Zustand 5.0.9**: Lightweight state management with middleware support
  - **Justification**: Chosen over Redux for its simplicity, minimal boilerplate, and excellent TypeScript support. The persist middleware enables seamless localStorage and sessionStorage integration.

### UI Framework & Components

- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component primitives
  - Dialog, Dropdown Menu, Select, Checkbox, Popover, Label
  - **Justification**: Provides accessible, customizable components that follow WAI-ARIA standards without imposing design opinions
- **Lucide React**: Icon library with consistent design
- **Vaul**: Drawer component for mobile-friendly interactions

### Form Management & Validation

- **React Hook Form 7.70.0**: Performant form library
- **Zod 4.3.5**: Schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod
  - **Justification**: React Hook Form minimizes re-renders, while Zod provides type-safe validation with excellent TypeScript inference

### Utilities

- **date-fns 4.1.0**: Modern date utility library
- **clsx & tailwind-merge**: Conditional class name management
- **class-variance-authority**: Component variant management
- **sonner**: Toast notifications

### Testing

- **Vitest 4.0.17**: Fast unit test framework
- **React Testing Library 16.3.1**: Component testing utilities
- **@testing-library/jest-dom**: Custom DOM matchers
- **jsdom 27.4.0**: DOM implementation for Node.js

### Code Quality

- **ESLint 9.39.1**: Linting with TypeScript support
- **Prettier 3.7.4**: Code formatting with Tailwind plugin
- **Husky 9.1.7**: Git hooks management
- **lint-staged 16.2.7**: Run linters on staged files

## Setup and Running Instructions

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SamStha07/task-management-dashboard
cd task-management-dashboard
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
# or
npm run build
```

The production build will be generated in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server with hot module replacement |
| `build` | `tsc -b && vite build` | Type-check and build for production |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint . --fix` | Lint all files and auto-fix issues |
| `format` | `prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"` | Format all files with Prettier |
| `test` | `vitest` | Run tests in watch mode |
| `prepare` | `husky` | Setup Git hooks (automatically run after install) |

### Pre-commit Hook

The project uses Husky and lint-staged to automatically run checks before commits:
- Format code with Prettier
- Lint with ESLint (auto-fix enabled)
- Run tests without coverage

## Design Decisions and Trade-offs

### Architecture Decisions

1. **Feature-Based Structure**
   - Organized by features (tasks) rather than technical layers
   - **Trade-off**: Slightly more complex initial setup, but scales better for larger applications
   - **Benefit**: Improved code organization, easier to locate related files

2. **Client-Side Only**
   - No backend integration; all data stored in localStorage
   - **Trade-off**: Limited to single-device usage, no data synchronization
   - **Benefit**: Simpler deployment, no server costs, instant feedback

3. **Zustand with Persist Middleware**
   - Single store for task management with automatic persistence
   - **Trade-off**: All tasks loaded in memory; may not scale to thousands of tasks
   - **Benefit**: Simple state management, automatic localStorage sync

4. **Virtual Scrolling**
   - Implemented with TanStack Virtual for performance optimization
   - **Trade-off**: Added complexity in list rendering logic
   - **Benefit**: Handles large task lists without performance degradation

### UI/UX Decisions

1. **Radix UI + Custom Styling**
   - Used unstyled primitives with Tailwind CSS
   - **Trade-off**: More initial setup than pre-styled component libraries
   - **Benefit**: Full design control, better accessibility, smaller bundle size

2. **Drawer for Mobile Filters**
   - Filters appear in a drawer on mobile, inline on desktop
   - **Trade-off**: Different interaction patterns per device
   - **Benefit**: Better mobile UX without sacrificing desktop functionality

3. **Inline Status Updates**
   - Quick checkbox for marking tasks complete
   - **Trade-off**: Limited to one specific status change
   - **Benefit**: Faster workflow for common operations

### Performance Optimizations

1. **Debounced Search** (400ms delay)
   - Reduces unnecessary re-renders and computations
   - Custom `useDebounce` hook implementation

2. **Memoized Filtering Logic**
   - Filter computations separated into custom hook
   - Prevents unnecessary recalculations

3. **Form Field Optimization**
   - React Hook Form's uncontrolled components reduce re-renders
   - Validation runs on blur and submit, not on every keystroke

## Known Limitations

1. **Single-Device Storage**
   - Data stored in localStorage is not synchronized across devices
   - No backup mechanism if localStorage is cleared

2. **No User Authentication**
   - No user management or multi-user support
   - Tasks are device-specific

3. **Limited Scalability**
   - All tasks loaded in memory; performance may degrade with 1000+ tasks
   - Virtual scrolling helps but doesn't eliminate the limitation

4. **No Offline Indicator**
   - Application doesn't distinguish between online/offline states
   - No service worker for offline functionality

5. **Basic Task Model**
   - No support for subtasks, attachments, or comments
   - No task dependencies or relationships

6. **Limited Date Handling**
   - No recurring tasks
   - No time-specific deadlines (only dates)

7. **No Data Export/Import**
   - Cannot export tasks to CSV, JSON, or other formats
   - No bulk import functionality

8. **Browser Compatibility**
   - Requires modern browsers with ES2020+ support
   - No polyfills for older browsers

## Future Improvements

### High Priority

1. **Backend Integration**
   - RESTful API or GraphQL backend
   - Database persistence (PostgreSQL/MongoDB/Convex)
   - Real-time synchronization with WebSockets

2. **User Authentication**
   - User registration and login
   - JWT-based authentication
   - Protected routes

3. **Data Export/Import**
   - Export to CSV, JSON, PDF
   - Import from various formats
   - Backup and restore functionality

4. **Enhanced Task Features**
   - Subtasks and task dependencies
   - File attachments
   - Task comments and activity history
   - Rich text editor for descriptions

### Medium Priority

5. **Advanced Filtering**
   - Date range filters
   - Custom filter combinations
   - Saved filter presets

6. **Notifications**
   - Browser notifications for due tasks
   - Email reminders (requires backend)
   - Customizable notification settings

7. **Collaboration**
   - Task assignments to team members
   - Shared task lists
   - Real-time collaboration

8. **Analytics Dashboard**
   - Task completion statistics
   - Productivity metrics
   - Visual charts and graphs

### Low Priority

9. **Mobile Application**
   - React Native mobile app
   - Native push notifications
   - Offline-first architecture

10. **Integrations**
    - Calendar sync (Google Calendar, Outlook)
    - Third-party app integrations (Slack, Trello)
    - API for external integrations

11. **Accessibility Enhancements**
    - Keyboard shortcuts
    - Screen reader improvements
    - High contrast mode

12. **Internationalization**
    - Multi-language support
    - Date/time localization
    - RTL language support

## Time Spent Per Section

| Section | Time Estimate | Notes |
|---------|---------------|-------|
| **Project Setup** | 2 hours | Vite configuration, TypeScript setup, ESLint, Prettier, Husky |
| **Code Quality** | 0.5 hours | Linting rules, formatting configuration, pre-commit hooks |
| **UI Components & Design** | 5 hours | Installing and configuring Radix UI, creating reusable components | creating responsive layout with UI designs
| **Task Store** | 1.5 hours | Zustand setup, localStorage persistence, CRUD operations |
| **Task Form** | 1 hours | React Hook Form integration, Zod validation |
| **Filtering & Sorting** | 1.5 hours | Filter logic, sort implementation, filter store, integration |
| **Search Functionality** | 0.5 hours | Debounced search hook, integration |
| **Task List & Virtual Scrolling** | 1 hours | Table layout, TanStack Virtual |
| **Dark Mode** | 0.2 hour | Theme provider, persistence |
| **Status Management** | 0.5 hours | Quick status updates, overdue detection, badge system |
| **Error Handling** | 0.5 hour | Error boundary implementation, toast notifications |
| **Testing** | 3 hours | Test setup, component tests, store tests, hook tests |
| **Documentation** | 0.5 hour | Code comments, README, inline documentation |
| **Debugging & optimization** | 2 hour | Performance tweaks, fix bugs, code review |
| **Total** | **19.7 hours** | Approximate development time |

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── layouts/        # Layout components
│   ├── ui/             # Reusable UI primitives (Radix UI wrappers)
│   ├── error-boundary.tsx
│   ├── mode-toggle.tsx
│   └── theme-provider.tsx
├── features/
│   └── tasks/          # Task feature module
│       ├── components/ # Task-specific components
│       │   └── dashboard/
│       ├── hooks/      # Custom hooks
│       ├── libs/       # Types, validation, utilities
│       ├── stores/     # Zustand stores
│       ├── utils/      # Helper functions
│       └── views/      # Page-level components
├── hooks/              # Global custom hooks
├── lib/                # Utilities and helpers
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

## Acknowledgments

- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
