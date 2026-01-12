# YouVerify – Invoicing App (Frontend Assessment)

This project is a frontend implementation of the **Invoice App** based strictly on the provided Figma design and assessment requirements. The goal of this submission is to demonstrate strong UI implementation, clean architecture, testability, and good engineering judgment around scope.

---

## 1. Assessment Requirements (From Email)

**Objective**  
Implement a UI for the Figma design provided for the Invoice App.

### Key Requirements

- Build a simple invoice app based on the design
- Implement user authentication (Firebase or another auth service)
- Create a mock backend for API calls
- Incorporate real-time data flow using a socket _where necessary_
- Implement unit and integration tests
- Ensure responsiveness (desktop + mobile)
- Provide loading feedback (spinners/skeletons)
- Clean, modular, well-documented code
- GitHub repository with README explaining approach

---

## 2. What Has Been Implemented (Requirement-by-Requirement)

### ✅ UI (Figma-Accurate)

- Invoice dashboard layout (sidebar, header, main content)
- Stats cards: Total Paid, Overdue, Draft, Unpaid
- Invoice actions section
- Recent invoices list
- Recent activities feed
- Invoice details modal with:
  - Header actions (Download PDF, Send Invoice, More menu)
  - Reminder chips
  - Invoice summary card
  - Items table
  - Totals section
  - Payment information
  - Notes
  - Activity feed (sticky on large screens)

The UI mirrors the Figma design in spacing, hierarchy, and interaction patterns.

---

### ✅ Authentication

- Implemented using **Supabase Auth** (email/password)
- Protected routes ensure unauthenticated users cannot access the dashboard

> The assessment explicitly allows _Firebase or another authentication service_. Supabase satisfies this requirement.

---

### ✅ Mock Backend (API Calls)

- API calls are made via a dedicated data layer (`features/**/api`)
- **Mock Service Worker (MSW)** intercepts `/api/*` requests
- Mock data simulates:
  - invoice stats
  - recent invoices
  - invoice activity
  - loading delays
  - empty states

This keeps the UI realistic without needing a real backend.

---

### ✅ Data Fetching & State Management

- **@tanstack/react-query** is used for:
  - server-state management
  - caching
  - retries
  - loading & error states
- Components remain declarative and easy to test

---

### ✅ Loading, Empty & Error States

- Skeleton loaders while data is fetching
- Empty states when no invoices exist
- Graceful handling of failed or invalid API responses

---

### ✅ Tests (Unit + Integration)

- **Vitest + React Testing Library**
- **MSW in test mode** to mock network requests
- Tests cover:
  - dashboard rendering with data
  - loading → data transitions
  - empty invoice state
  - modal rendering and content

These tests validate real user flows, not just isolated components.

---

### ✅ Responsiveness

- Mobile-first friendly layouts
- Grid collapses appropriately on smaller screens
- Scrollable modal content with fixed/sticky sections where appropriate

---

## 3. Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- @tanstack/react-query
- Supabase (Auth)
- MSW (Mock backend)
- Vitest + React Testing Library

---

## 4. Project Structure (Simplified)

src/
├── components/
│ └── (shared, reusable UI components used across features)
│
├── features/
│ ├── auth/
│ │ ├── api/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── types/
│ │
│ └── invoices/
│ ├── api/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ └── types/
│
├── lib/
│ └── supabase.ts
│
├── mocks/
│ ├── handlers/
│ ├── browser.ts
│ └── server.ts
│
└── main.tsx / App.tsx (entry point)

This structure keeps the app domain-driven and scalable.

---

## 5. Why Real-Time Data (Sockets) Is _Not Necessary_ for This Task

The assessment mentions:

> “Incorporate real-time data flow using a socket **where necessary**.”

### Key Interpretation: _“Where necessary”_

For this specific Invoice App UI, **real-time updates are not functionally required** to meet the product goals demonstrated in the Figma or assessment scope.

### Reasons

#### 1. Invoice dashboards are not latency-critical

Invoice data changes infrequently:

- invoices are created
- invoices are paid
- invoices are updated

These actions are **user-initiated** and typically followed by:

- a redirect
- a refetch
- a page refresh
- or polling

Real-time sockets provide little UX value here.

---

#### 2. React Query already solves the core problem

With React Query:

- data is cached
- refetched on focus
- invalidated after mutations

This already provides _near real-time freshness_ without the complexity of sockets.

---

#### 3. The codebase is _socket-ready_ by design

Even though sockets are not implemented, the architecture allows it easily:

- Centralized data fetching
- React Query cache invalidation
- Clear API boundaries

If real-time were required later, it could be added cleanly via:

- Supabase Realtime
- WebSocket events that invalidate queries

This demonstrates **my personal engineering judgment**, not omission.

---

## Environment Setup

### Install Dependencies

```bash
npm install

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

npm run dev

npm run test

```
