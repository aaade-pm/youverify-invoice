# YouVerify Invoice Dashboard

A production-grade React + TypeScript invoice dashboard application built with modern tooling and best practices.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Authentication**: Supabase
- **Data Fetching**: TanStack React Query
- **Mocking**: Mock Service Worker (MSW)
- **Testing**: Vitest + React Testing Library
- **Routing**: React Router v6
- **UI Components**: shadcn/ui (for accessible primitives)

## Architecture Approach

This project follows a **feature-based architecture** for scalability and maintainability:

```
src/
├── features/           # Feature modules
│   ├── auth/          # Authentication feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── providers/
│   └── invoices/      # Invoice feature
│       └── pages/
├── lib/               # Shared utilities and configurations
├── mocks/             # MSW handlers and setup
└── test/              # Test utilities and setup
```

### Key Architectural Decisions

1. **Feature-based structure**: Each feature is self-contained with its own components, hooks, pages, and providers
2. **Absolute imports**: All imports use `@/` alias for cleaner import paths
3. **Provider composition**: Auth and React Query providers are composed at the root level
4. **Protected routes**: Route protection is handled via a `ProtectedRoute` component
5. **Mock-first development**: MSW enables development without a backend

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Initialize shadcn/ui (if you haven't already):

```bash
npx shadcn@latest init
```

This will use the existing `components.json` configuration.

4. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Running the Application

**Development mode:**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Build for production:**

```bash
npm run build
```

**Preview production build:**

```bash
npm run preview
```

## How Mocking Works

This project uses **Mock Service Worker (MSW)** to intercept network requests during development and testing.

### Development (Browser)

MSW runs as a Service Worker in the browser during development. The worker is automatically initialized in `src/main.tsx` when running in development mode.

- **Location**: `src/mocks/browser.ts`
- **Handlers**: `src/mocks/handlers.ts`
- **Auto-start**: Enabled in development mode only

### Testing (Node)

MSW runs as a Node server during tests, allowing you to test components without making real network requests.

- **Location**: `src/mocks/server.ts`
- **Setup**: Configured in `src/test/setup.ts`
- **Integration**: Automatically started before tests, reset between tests, closed after tests

### Current Mock Handlers

- **Auth handlers**: Mock Supabase authentication endpoints
- **Invoice handlers**: Mock invoice CRUD operations

To add new handlers, edit `src/mocks/handlers.ts`.

## Testing

Run tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Test Setup

- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **MSW Integration**: Automatic via `src/test/setup.ts`
- **Test Utilities**: Custom render function in `src/test/utils.tsx` that includes all providers

## Project Structure

```
youverify-invoice/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/      # Auth-related components
│   │   │   ├── hooks/           # Auth hooks
│   │   │   ├── pages/           # Auth pages (Login, Signup)
│   │   │   └── providers/       # AuthProvider
│   │   └── invoices/
│   │       └── pages/           # Invoice pages
│   ├── lib/
│   │   └── supabase.ts          # Supabase client configuration
│   ├── mocks/
│   │   ├── browser.ts           # MSW browser worker
│   │   ├── server.ts            # MSW node server
│   │   └── handlers.ts          # Request handlers
│   ├── test/
│   │   ├── setup.ts             # Test setup (MSW, jest-dom)
│   │   └── utils.tsx            # Test utilities (custom render)
│   ├── App.tsx                  # Main app component with routing
│   └── main.tsx                 # Application entry point
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── vitest.config.ts             # Vitest configuration
└── tailwind.config.js           # TailwindCSS configuration
```

## Routes

- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/dashboard` - Invoice dashboard (protected, requires authentication)
- `/` - Redirects to `/dashboard`

## Authentication Flow

1. **AuthProvider** loads the current session on app startup
2. **ProtectedRoute** checks authentication status before rendering protected pages
3. Unauthenticated users are redirected to `/login`
4. Session state is managed via Supabase auth state changes

## Next Steps

This is the initial setup commit. Ready for feature development:

- Implement login/signup forms
- Build invoice dashboard UI
- Add invoice CRUD operations
- Implement data fetching with React Query
- Add shadcn/ui components as needed

## License

Private project for take-home assessment.

