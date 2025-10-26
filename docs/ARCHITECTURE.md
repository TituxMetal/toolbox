# Architecture & Project Structure

**Toolbox PWA - React + TypeScript with Bun**

---

## Project Structure

```text
toolbox/
├── public/
│   ├── favicon.ico
│   ├── pwa-64x64.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── maskable-icon-512x512.png
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── tools/
│   │       └── PomodoroTimer.tsx
│   ├── hooks/
│   │   └── usePomodoro.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── storage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── bun.lockb
```

---

## Component Architecture

```text
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   └── Title
│   ├── Main
│   │   └── PomodoroTimer
│   │       ├── Timer Display (SVG Circle)
│   │       ├── Control Buttons
│   │       └── Stats Display
│   └── Footer
```

---

## Data Flow Architecture

```text
User Interaction
    ↓
Component (PomodoroTimer.tsx)
    ↓
Custom Hook (usePomodoro.ts)
    ↓
State Management (useState)
    ↓
Effects (useEffect, useCallback)
    ↓
Service Worker (Offline Support)
    ↓
IndexedDB (Data Persistence)
```

---

## Module Responsibilities

**src/types/index.ts**

- Defines all TypeScript interfaces
- Ensures type safety across the app
- Centralized type definitions

**src/hooks/usePomodoro.ts**

- Manages timer state
- Handles session logic
- Provides timer controls
- Manages audio notifications

**src/components/Layout.tsx**

- Wraps all pages
- Provides consistent header/footer
- Manages navigation

**src/components/tools/PomodoroTimer.tsx**

- Renders timer UI
- Handles user interactions
- Displays progress visually
- Shows statistics

**src/App.tsx**

- Routes between tools
- Manages active tool state
- Renders Layout wrapper

**src/main.tsx**

- Application entry point
- Registers service worker
- Mounts React app

**src/index.css**

- Tailwind CSS V4 setup
- Custom utilities
- Theme variables
- Animations

---

## Type System

```typescript
type SessionType = 'work' | 'shortBreak' | 'longBreak'

interface PomodoroState {
  timeLeft: number
  isRunning: boolean
  sessionType: SessionType
  sessionsCompleted: number
  totalSessions: number
}

interface PomodoroConfig {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  sessionsBeforeLongBreak: number
}
```

---

## State Management Pattern

```typescript
const usePomodoro = (config?: Partial<PomodoroConfig>) => {
  const [state, setState] = useState<PomodoroState>(initialState)

  const toggleTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }, [])

  return { ...state, toggleTimer, resetTimer, skipSession, formatTime }
}

const PomodoroTimer = () => {
  const { timeLeft, isRunning, toggleTimer } = usePomodoro()

  return <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
}
```

---

## Styling Architecture

```text
Tailwind CSS V4 (CSS-First)
├── Base Styles
│   ├── Reset (*, html, body)
│   └── Typography
├── Custom Utilities
│   ├── .btn-primary
│   ├── .btn-secondary
│   ├── .card
│   └── .glass-effect
├── Animations
│   ├── @keyframes fadeIn
│   ├── @keyframes slideInFromLeft
│   └── @keyframes pulse-glow
└── Responsive
    ├── Mobile-first approach
    └── Media queries
```

---

## Build & Deployment Flow

```text
Source Code (src/)
    ↓
TypeScript Compilation
    ↓
Vite Build Process
    ↓
Tailwind CSS Processing
    ↓
Service Worker Generation
    ↓
Asset Optimization
    ↓
Production Build (dist/)
    ↓
Deploy to Platform
    ├── Vercel
    ├── Netlify
    ├── Cloudflare Pages
    └── Self-hosted
```

---

## File Size Estimates

| File                                   | Size          | Purpose        |
| -------------------------------------- | ------------- | -------------- |
| src/App.tsx                            | ~200 bytes    | Main component |
| src/components/Layout.tsx              | ~800 bytes    | Layout wrapper |
| src/components/tools/PomodoroTimer.tsx | ~2.5 KB       | Timer UI       |
| src/hooks/usePomodoro.ts               | ~3 KB         | Timer logic    |
| src/index.css                          | ~4 KB         | Styles         |
| vite.config.ts                         | ~2 KB         | Configuration  |
| **Total Source**                       | **~13 KB**    | Uncompressed   |
| **Production Build**                   | **~50-80 KB** | Gzipped        |

---

## Extension Points

**Adding a New Tool:**

1. Create component: src/components/tools/NewTool.tsx
2. Create hook (if needed): src/hooks/useNewTool.ts
3. Add types: Update src/types/index.ts
4. Update src/App.tsx with navigation
5. Add styling to src/index.css

**Adding PWA Features:**

1. Push Notifications: Extend src/main.tsx
2. Background Sync: Add to service worker config
3. IndexedDB: Create src/utils/storage.ts
4. Share API: Add to component

---

## Testing Architecture

```text
Unit Tests
├── Hooks (usePomodoro.ts)
├── Utilities (storage.ts)
└── Types (index.ts)

Component Tests
├── Layout.tsx
├── PomodoroTimer.tsx
└── App.tsx

Integration Tests
├── PWA Installation
├── Offline Functionality
└── Service Worker

E2E Tests
├── iOS Installation
├── Android Installation
└── Desktop Installation
```

---

## Performance Optimization

- Code splitting via Vite
- Tree-shaking with ES modules
- CSS purging with Tailwind
- Service worker caching
- Image optimization
- Lazy loading components
- useCallback for memoization
- useMemo for expensive computations

---

## Security Considerations

- HTTPS required for PWA (localhost OK for dev)
- Service worker scope limitation
- Content Security Policy headers
- No sensitive data in localStorage
- Use IndexedDB for sensitive data
- Validate all user inputs

---

**Architecture Version:** 1.0 **Last Updated:** October 26, 2025 **Bun Version:** 1.3.1
