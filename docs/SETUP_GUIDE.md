# React + TypeScript PWA with Bun - Complete Setup Guide

**Date:** October 26, 2025  
**Bun Version:** 1.3.1  
**Target Devices:** iPad, iPhone SE, ArchLinux Desktop (Brave Browser)

## Table of Contents

1. [Project Initialization](#1-project-initialization)
2. [Dependencies Installation](#2-dependencies-installation)
3. [Configuration Files](#3-configuration-files)
4. [Project Structure](#4-project-structure)
5. [Pomodoro Timer Implementation](#5-pomodoro-timer-implementation)
6. [Testing PWA Locally](#6-testing-pwa-locally)
7. [Device Installation Guide](#7-device-installation-guide)

---

## 1. Project Initialization

### Step 1.1: Create Vite + React + TypeScript Project

```bash
# Initialize the project with Bun
bun create vite . --template react-ts

# This creates a React + TypeScript project in the current directory
```

**What this does:**

- Creates a Vite-powered React application
- Configures TypeScript with proper tsconfig
- Sets up hot module replacement (HMR)
- Optimized for Bun runtime

---

## 2. Dependencies Installation

### Step 2.1: Install Core Dependencies

```bash
# Install all dependencies with Bun
bun install

# Install Tailwind CSS V4 (CSS-first configuration)
bun add tailwindcss@next @tailwindcss/vite@next

# Install PWA plugin for Vite
bun add -D vite-plugin-pwa

# Install Workbox for service worker
bun add -D workbox-window
```

### Step 2.2: Verify Installation

```bash
bun --version  # Should show 1.3.1 or higher
```

**Dependency Breakdown:**

- `tailwindcss@next` - Tailwind CSS V4 with CSS-first configuration
- `@tailwindcss/vite@next` - Vite plugin for Tailwind V4
- `vite-plugin-pwa` - Generates service worker and manifest
- `workbox-window` - Client-side service worker registration

---

## 3. Configuration Files

### Step 3.1: Vite Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Toolbox - Productivity Tools',
        short_name: 'Toolbox',
        description: 'A collection of productivity tools including Pomodoro timer',
        theme_color: '#3f3f46',
        background_color: '#3f3f46',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    port: 3000,
    host: true
  }
})
```

### Step 3.2: Tailwind CSS V4 Setup (`src/index.css`)

```css
@import 'tailwindcss';

/* Custom theme configuration - CSS-first approach */
@theme {
  --color-primary: #3f3f46;
  --color-secondary: #6366f1;
  --color-accent: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}

/* Base styles */
body {
  @apply bg-zinc-700 text-zinc-100 min-h-screen;
}

/* Custom utilities */
.glass-effect {
  @apply bg-white/10 backdrop-blur-md border border-white/20;
}

.btn-primary {
  @apply bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200;
}

.btn-secondary {
  @apply bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200;
}

.btn-danger {
  @apply bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200;
}

.card {
  @apply glass-effect rounded-xl p-6 shadow-xl;
}
```

### Step 3.3: TypeScript Configuration

The default `tsconfig.json` from Vite is sufficient, but ensure these settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 4. Project Structure

```text
toolbox/
├── public/
│   ├── pwa-64x64.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── maskable-icon-512x512.png
│   ├── apple-touch-icon.png
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── tools/
│   │       └── PomodoroTimer.tsx
│   ├── hooks/
│   │   └── usePomodoro.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tsconfig.json
├── package.json
└── SETUP_GUIDE.md
```

**Architecture Principles:**

- **Modular Design:** Each tool is a separate component in `src/components/tools/`
- **Custom Hooks:** Business logic separated into hooks (e.g., `usePomodoro.ts`)
- **Type Safety:** All types defined in `src/types/`
- **Scalability:** Easy to add new tools by creating new components

---

## 5. Pomodoro Timer Implementation

### Architecture Overview

- **Component:** `PomodoroTimer.tsx` - UI and user interactions
- **Hook:** `usePomodoro.ts` - Timer logic and state management
- **Features:**
  - 25-minute work sessions
  - 5-minute short breaks
  - 15-minute long breaks (after 4 sessions)
  - Audio notifications
  - Pause/Resume functionality
  - Session counter

### Step 5.1: Type Definitions (`src/types/index.ts`)

```typescript
export type SessionType = 'work' | 'shortBreak' | 'longBreak'

export interface PomodoroState {
  timeLeft: number
  isRunning: boolean
  sessionType: SessionType
  sessionsCompleted: number
  totalSessions: number
}

export interface PomodoroConfig {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  sessionsBeforeLongBreak: number
}

export interface ToolConfig {
  id: string
  name: string
  description: string
  icon: string
}
```

### Step 5.2: Custom Hook (`src/hooks/usePomodoro.ts`)

```typescript
import { useState, useEffect, useCallback, useRef } from 'react'
import type { SessionType, PomodoroState, PomodoroConfig } from '../types'

const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsBeforeLongBreak: 4
}

export const usePomodoro = (config: Partial<PomodoroConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [state, setState] = useState<PomodoroState>({
    timeLeft: finalConfig.workDuration,
    isRunning: false,
    sessionType: 'work',
    sessionsCompleted: 0,
    totalSessions: 0
  })

  const getNextSessionType = useCallback(
    (current: SessionType, sessions: number): SessionType => {
      if (current === 'work') {
        return sessions % finalConfig.sessionsBeforeLongBreak === 0 ? 'longBreak' : 'shortBreak'
      }
      return 'work'
    },
    [finalConfig.sessionsBeforeLongBreak]
  )

  const getDurationForSession = useCallback(
    (sessionType: SessionType): number => {
      switch (sessionType) {
        case 'work':
          return finalConfig.workDuration
        case 'shortBreak':
          return finalConfig.shortBreakDuration
        case 'longBreak':
          return finalConfig.longBreakDuration
      }
    },
    [finalConfig]
  )

  const playNotification = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
      )
    }
    audioRef.current.play().catch(() => {
      console.log('Audio notification could not be played')
    })
  }, [])

  const handleSessionComplete = useCallback(() => {
    playNotification()
    const newSessionType = getNextSessionType(state.sessionType, state.sessionsCompleted + 1)
    const newDuration = getDurationForSession(newSessionType)

    setState(prev => ({
      ...prev,
      sessionType: newSessionType,
      timeLeft: newDuration,
      isRunning: false,
      sessionsCompleted:
        state.sessionType === 'work' ? prev.sessionsCompleted + 1 : prev.sessionsCompleted,
      totalSessions: prev.totalSessions + 1
    }))
  }, [
    state.sessionType,
    state.sessionsCompleted,
    getNextSessionType,
    getDurationForSession,
    playNotification
  ])

  useEffect(() => {
    if (!state.isRunning) return

    const interval = setInterval(() => {
      setState(prev => {
        const newTimeLeft = prev.timeLeft - 1

        if (newTimeLeft <= 0) {
          handleSessionComplete()
          return prev
        }

        return { ...prev, timeLeft: newTimeLeft }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [state.isRunning, handleSessionComplete])

  const toggleTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }, [])

  const resetTimer = useCallback(() => {
    setState({
      timeLeft: finalConfig.workDuration,
      isRunning: false,
      sessionType: 'work',
      sessionsCompleted: 0,
      totalSessions: 0
    })
  }, [finalConfig.workDuration])

  const skipSession = useCallback(() => {
    const newSessionType = getNextSessionType(state.sessionType, state.sessionsCompleted + 1)
    const newDuration = getDurationForSession(newSessionType)

    setState(prev => ({
      ...prev,
      sessionType: newSessionType,
      timeLeft: newDuration,
      isRunning: false,
      sessionsCompleted:
        state.sessionType === 'work' ? prev.sessionsCompleted + 1 : prev.sessionsCompleted,
      totalSessions: prev.totalSessions + 1
    }))
  }, [state.sessionType, state.sessionsCompleted, getNextSessionType, getDurationForSession])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return {
    ...state,
    toggleTimer,
    resetTimer,
    skipSession,
    formatTime,
    sessionDuration: getDurationForSession(state.sessionType)
  }
}
```

### Step 5.3: Reusable Button Component (`src/components/Button.tsx`)

```typescript
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  ariaLabel?: string
  ariaPressed?: boolean
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  ariaLabel,
  ariaPressed
}: ButtonProps) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    outline: 'btn-outline'
  }[variant]

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4',
    lg: 'py-4 px-6 text-lg'
  }[size]

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={`${variantClasses} ${sizeClasses} ${widthClass} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}
```

### Step 5.4: Reusable Progress Circle Component (`src/components/ProgressCircle.tsx`)

```typescript
interface ProgressCircleProps {
  progress: number
  size?: number
  strokeWidth?: number
  label?: string
  ariaLabel?: string
}

export const ProgressCircle = ({
  progress,
  size = 200,
  strokeWidth = 8,
  label,
  ariaLabel
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className='transform -rotate-90'
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='rgba(255, 255, 255, 0.1)'
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='white'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className='transition-all duration-1000'
          strokeLinecap='round'
        />
      </svg>
      {label && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-center'>{label}</span>
        </div>
      )}
    </div>
  )
}
```

### Step 5.5: Reusable Stat Card Component (`src/components/StatCard.tsx`)

```typescript
interface StatCardProps {
  label: string
  value: string | number
  color?: 'indigo' | 'green' | 'purple' | 'blue'
  ariaLabel?: string
}

export const StatCard = ({ label, value, color = 'indigo', ariaLabel }: StatCardProps) => {
  const colorClasses = {
    indigo: 'text-indigo-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400'
  }[color]

  return (
    <article className='text-center'>
      <h3 className='text-zinc-400 text-xs uppercase font-semibold'>{label}</h3>
      <p className={`text-2xl font-bold ${colorClasses}`} aria-label={ariaLabel}>
        {value}
      </p>
    </article>
  )
}
```

### Step 5.6: Reusable Card Component (`src/components/Card.tsx`)

```typescript
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'gradient'
  gradientFrom?: string
  gradientTo?: string
  ariaLabel?: string
}

export const Card = ({
  children,
  variant = 'default',
  gradientFrom = 'from-indigo-500',
  gradientTo = 'to-indigo-600',
  ariaLabel
}: CardProps) => {
  const classes =
    variant === 'gradient'
      ? `bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl p-8 shadow-2xl`
      : 'card'

  return (
    <section className={classes} aria-label={ariaLabel}>
      {children}
    </section>
  )
}
```

### Step 5.7: Reusable Button Group Component (`src/components/ButtonGroup.tsx`)

```typescript
import { ReactNode } from 'react'

interface ButtonGroupProps {
  children: ReactNode
  layout?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}

export const ButtonGroup = ({ children, layout = 'horizontal', gap = 'md' }: ButtonGroupProps) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  }[gap]

  const layoutClass = layout === 'horizontal' ? 'flex' : 'flex flex-col'

  return (
    <section className={`${layoutClass} ${gapClasses}`} aria-label='Actions'>
      {children}
    </section>
  )
}
```

### Step 5.8: Reusable Stats Grid Component (`src/components/StatsGrid.tsx`)

```typescript
import { ReactNode } from 'react'

interface StatsGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
}

export const StatsGrid = ({ children, columns = 3 }: StatsGridProps) => {
  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }[columns]

  return (
    <section className={`grid ${gridClasses} gap-4 text-center`} aria-label='Statistics'>
      {children}
    </section>
  )
}
```

### Step 5.9: Pomodoro Timer Component (`src/components/tools/PomodoroTimer.tsx`)

```typescript
import { usePomodoro } from '../../hooks/usePomodoro'
import { Button } from '../Button'
import { Card } from '../Card'
import { ProgressCircle } from '../ProgressCircle'
import { StatCard } from '../StatCard'
import { ButtonGroup } from '../ButtonGroup'
import { StatsGrid } from '../StatsGrid'

export const PomodoroTimer = () => {
  const {
    timeLeft,
    isRunning,
    sessionType,
    sessionsCompleted,
    totalSessions,
    toggleTimer,
    resetTimer,
    skipSession,
    formatTime,
    sessionDuration
  } = usePomodoro()

  const progress = ((sessionDuration - timeLeft) / sessionDuration) * 100

  const sessionLabel = {
    work: 'Work Session',
    shortBreak: 'Short Break',
    longBreak: 'Long Break'
  }[sessionType]

  const sessionColor = {
    work: 'from-indigo-500 to-indigo-600',
    shortBreak: 'from-green-500 to-green-600',
    longBreak: 'from-purple-500 to-purple-600'
  }[sessionType]

  return (
    <main className='min-h-screen bg-zinc-700 flex items-center justify-center p-4'>
      <article className='card max-w-md w-full'>
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>Pomodoro Timer</h1>
          <p className='text-zinc-300'>Stay focused, stay productive</p>
        </header>

        <Card
          variant='gradient'
          gradientFrom={sessionColor.split(' ')[0]}
          gradientTo={sessionColor.split(' ')[1]}
          ariaLabel='Timer display'
        >
          <header className='text-center mb-4'>
            <h2 className='text-zinc-100 text-sm font-semibold uppercase tracking-wider'>
              {sessionLabel}
            </h2>
          </header>

          <div className='flex justify-center mb-6'>
            <ProgressCircle
              progress={progress}
              size={200}
              label={formatTime(timeLeft)}
              ariaLabel={`Timer: ${formatTime(timeLeft)}`}
            />
          </div>

          <p className='text-center text-zinc-100 text-sm'>
            Progress: <span className='font-bold'>{Math.round(progress)}%</span>
          </p>
        </Card>

        <ButtonGroup layout='horizontal' gap='md'>
          <Button
            variant={isRunning ? 'danger' : 'primary'}
            onClick={toggleTimer}
            ariaLabel={isRunning ? 'Pause timer' : 'Start timer'}
            ariaPressed={isRunning}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button variant='secondary' onClick={skipSession} ariaLabel='Skip to next session'>
            Skip
          </Button>
        </ButtonGroup>

        <Button
          variant='outline'
          fullWidth
          onClick={resetTimer}
          ariaLabel='Reset timer to initial state'
        >
          Reset
        </Button>

        <StatsGrid columns={3}>
          <StatCard
            label='Total'
            value={totalSessions}
            color='indigo'
            ariaLabel={`Total sessions: ${totalSessions}`}
          />
          <StatCard
            label='Completed'
            value={sessionsCompleted}
            color='green'
            ariaLabel={`Completed sessions: ${sessionsCompleted}`}
          />
          <StatCard
            label='Type'
            value={sessionType}
            color='purple'
            ariaLabel={`Current session type: ${sessionType}`}
          />
        </StatsGrid>
      </article>
    </main>
  )
}
```

### Step 5.7: Layout Component (`src/components/Layout.tsx`)

```typescript
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export const Layout = ({ children, title }: LayoutProps) => (
  <div className='min-h-screen bg-zinc-700 flex flex-col'>
    <header className='bg-zinc-800 border-b border-zinc-600 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div
              className='w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center'
              aria-hidden='true'
            >
              <span className='text-white font-bold text-lg'>⚙️</span>
            </div>
            <h1 className='text-2xl font-bold text-white'>Toolbox</h1>
          </div>
          {title && (
            <nav className='text-zinc-300 text-sm' aria-label='Current page'>
              <span className='text-zinc-500'>/</span>
              <span className='ml-2'>{title}</span>
            </nav>
          )}
        </div>
      </div>
    </header>

    <main className='flex-1 max-w-7xl mx-auto w-full px-4 py-8'>{children}</main>

    <footer className='bg-zinc-800 border-t border-zinc-600 mt-12'>
      <div className='max-w-7xl mx-auto px-4 py-6 text-center text-zinc-400 text-sm'>
        <p>Toolbox PWA • Built with React, TypeScript & Tailwind CSS V4</p>
        <p className='mt-2 text-zinc-500'>Works offline • Installable on all devices</p>
      </div>
    </footer>
  </div>
)
```

### Step 5.8: Main App Component (`src/App.tsx`)

```typescript
import { Layout } from './components/Layout'
import { PomodoroTimer } from './components/tools/PomodoroTimer'

export const App = () => (
  <Layout title='Pomodoro Timer'>
    <PomodoroTimer />
  </Layout>
)

export default App
```

### Step 5.6: Entry Point (`src/main.tsx`)

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      console.log('Service Worker registered successfully:', registration)
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

registerServiceWorker()
```

### Step 5.7: Complete Tailwind CSS Styles (`src/index.css`)

```css
@import 'tailwindcss';

/* Custom theme configuration - CSS-first approach */
@theme {
  --color-primary: #3f3f46;
  --color-secondary: #6366f1;
  --color-accent: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}

/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-zinc-700 text-zinc-100 min-h-screen font-sans antialiased;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom utilities */
.glass-effect {
  @apply bg-white/10 backdrop-blur-md border border-white/20;
}

.glass-effect-dark {
  @apply bg-black/20 backdrop-blur-md border border-white/10;
}

.btn-primary {
  @apply bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-danger {
  @apply bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-success {
  @apply bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-outline {
  @apply border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95;
}

.card {
  @apply glass-effect rounded-xl p-6 shadow-xl;
}

.card-dark {
  @apply glass-effect-dark rounded-xl p-6 shadow-xl;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.8);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-in {
  animation: slideInFromLeft 0.3s ease-out;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-zinc-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-zinc-600 rounded-full hover:bg-zinc-500;
}

/* Focus styles for accessibility */
:focus-visible {
  @apply outline-2 outline-offset-2 outline-indigo-500;
}

button:focus-visible {
  @apply outline-2 outline-offset-2 outline-indigo-500;
}

input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  @apply outline-2 outline-offset-2 outline-indigo-500;
}

/* Responsive utilities */
@media (max-width: 640px) {
  body {
    font-size: 14px;
  }

  .card {
    @apply p-4;
  }
}

/* Print styles */
@media print {
  body {
    @apply bg-white text-black;
  }

  .card {
    @apply border border-gray-300 shadow-none;
  }
}
```

---

## 5.8: Package Configuration (`package.json`)

```json
{
  "name": "toolbox-pwa",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "A collection of productivity tools including Pomodoro timer - Progressive Web App",
  "author": "Your Name",
  "license": "MIT",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "tsc": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "workbox-window": "^7.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "next",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "next",
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "vite-plugin-pwa": "^0.17.4"
  }
}
```

**Key Dependencies Explained:**

- `react` & `react-dom` - Core React library
- `tailwindcss@next` & `@tailwindcss/vite@next` - Tailwind CSS V4 with CSS-first configuration
- `vite-plugin-pwa` - Generates service worker and web app manifest
- `workbox-window` - Client-side service worker utilities
- `@vitejs/plugin-react` - React Fast Refresh for Vite
- `typescript` - TypeScript compiler

## 5.9: HTML Entry Point (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />

    <!-- Viewport configuration for mobile devices -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#3f3f46" />
    <meta
      name="description"
      content="Toolbox - A collection of productivity tools including Pomodoro timer. Works offline, installable on all devices."
    />

    <!-- iOS PWA Support -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Toolbox" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Web App Manifest -->
    <link rel="manifest" href="/manifest.json" />

    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Title -->
    <title>Toolbox - Productivity Tools</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Meta Tags Explanation:**

- `viewport` - Ensures proper scaling on mobile devices with `viewport-fit=cover` for notch support
- `theme-color` - Sets the browser UI color to match the app
- `apple-mobile-web-app-capable` - Enables full-screen mode on iOS
- `apple-mobile-web-app-status-bar-style` - Controls iOS status bar appearance
- `apple-touch-icon` - Icon shown when adding to home screen on iOS
- `manifest` - Links to the web app manifest (auto-generated by Vite PWA plugin)

## 5.10: Service Worker Registration Details

The service worker is automatically generated by the `vite-plugin-pwa` plugin. The registration code
in `src/main.tsx` handles:

**Auto-Update Strategy:**

```typescript
registerType: 'autoUpdate'
```

This means the service worker will automatically update in the background without requiring user
action.

**Offline Support:** The Workbox configuration in `vite.config.ts` caches:

- All JavaScript, CSS, HTML, and image files
- External fonts from Google Fonts (cached for 1 year)
- Enables offline functionality for the entire app

**Service Worker Scope:**

```typescript
scope: '/'
```

The service worker controls the entire application at the root path.

---

## 6. Testing PWA Locally

### Step 6.1: Build and Preview

```bash
# Build the production version
bun run build

# Preview the production build
bun run preview
```

### Step 6.2: Test PWA Features

1. **Open in Brave Browser:**

   ```text
   http://localhost:4173
   ```

2. **Check PWA Installability:**

   - Open DevTools (F12)
   - Go to "Application" tab
   - Check "Manifest" section
   - Check "Service Workers" section
   - Look for install prompt in address bar

3. **Test Offline Mode:**
   - Install the PWA
   - Open DevTools → Network tab
   - Check "Offline" checkbox
   - Reload the app - it should still work

### Step 6.3: Test on Local Network

```bash
# Find your local IP
ip addr show | grep "inet " | grep -v 127.0.0.1

# Access from mobile devices
# http://YOUR_LOCAL_IP:4173
```

---

## 7. Device Installation Guide

### 7.1 iPad / iPhone SE (iOS)

**Requirements:**

- iOS 16.4+ (for better PWA support)
- Brave Browser installed

**Installation Steps:**

1. Open Brave Browser on iOS
2. Navigate to your app URL
3. Tap the Share button (square with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Edit the name if desired
6. Tap "Add"
7. The app icon appears on your home screen

**iOS-Specific Considerations:**

- Apple touch icon (180x180) is required
- Standalone display mode works best
- Status bar styling via meta tags

### 7.2 ArchLinux Desktop (Brave Browser)

**Installation Steps:**

1. Open Brave Browser
2. Navigate to your app URL
3. Look for the install icon in the address bar (⊕ or computer icon)
4. Click "Install"
5. The app opens in its own window
6. Access from app launcher or Brave's app menu

**Desktop-Specific Features:**

- Window controls integration
- Keyboard shortcuts
- System notifications support

### 7.3 Verification Checklist

✅ **Manifest.json is valid**

- Use Chrome DevTools → Application → Manifest
- All required fields present
- Icons load correctly

✅ **Service Worker is registered**

- Check Application → Service Workers
- Status should be "activated and running"

✅ **HTTPS or localhost**

- PWAs require secure context
- localhost works for development
- Production needs HTTPS

✅ **Icons are present**

- All icon sizes generated
- Maskable icon for Android
- Apple touch icon for iOS

---

## 8. Commands Reference

```bash
# Development
bun run dev              # Start dev server (http://localhost:3000)

# Build
bun run build            # Create production build

# Preview
bun run preview          # Preview production build

# Type checking
bun run tsc              # Run TypeScript compiler check

# Add new dependencies
bun add <package>        # Add runtime dependency
bun add -D <package>     # Add dev dependency
```

---

## 9. PWA Icon Generation Guide

### Step 9.1: Generate Icons Using PWA Asset Generator

```bash
# Install PWA Asset Generator globally
bun add -g pwa-asset-generator

# Generate all required icons from a source image (1024x1024 PNG recommended)
pwa-asset-generator ./source-icon.png ./public/pwa

# This generates:
# - pwa-64x64.png
# - pwa-192x192.png
# - pwa-512x512.png
# - maskable-icon-512x512.png (for Android adaptive icons)
# - apple-touch-icon.png (180x180 for iOS)
```

### Step 9.2: Manual Icon Requirements

If generating manually, ensure these files exist in `public/`:

| File                        | Size    | Purpose                   |
| --------------------------- | ------- | ------------------------- |
| `favicon.ico`               | 32x32   | Browser tab icon          |
| `pwa-64x64.png`             | 64x64   | Small device icon         |
| `pwa-192x192.png`           | 192x192 | Android home screen       |
| `pwa-512x512.png`           | 512x512 | Splash screen, app drawer |
| `maskable-icon-512x512.png` | 512x512 | Android adaptive icon     |
| `apple-touch-icon.png`      | 180x180 | iOS home screen           |

**Icon Design Tips:**

- Use solid colors with good contrast
- Avoid transparency in corners (for maskable icons)
- Keep important content in center 40% of image
- Test on actual devices for appearance

### Step 9.3: Online Icon Generation Tools

**Recommended Tools:**

1. **RealFaviconGenerator** (`https://realfavicongenerator.net/`)
   - Upload a single image
   - Generates all required sizes
   - Provides HTML meta tags
   - Free and reliable
2. **PWA Builder** (`https://www.pwabuilder.com/`)
   - Comprehensive PWA testing
   - Icon generation
   - Manifest validation
3. **Favicon.io** (`https://favicon.io/`)
   - Simple and fast
   - Supports emoji and text
   - Multiple format generation

---

## 10. Advanced PWA Features

### Step 10.1: Adding Push Notifications

To add push notifications to your PWA, extend `src/main.tsx`:

```typescript
const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return
  }
  if (Notification.permission === 'granted') {
    return
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      console.log('Notification permission granted')
    }
  }
}
requestNotificationPermission()
```

### Step 10.2: Background Sync for Offline Actions

Add to `src/hooks/usePomodoro.ts` to sync session data:

```typescript
const syncSessionData = async (sessionData: PomodoroState) => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('sync-pomodoro-data')
      console.log('Background sync registered')
    } catch (error) {
      console.error('Background sync registration failed:', error)
    }
  }
}
```

### Step 10.3: IndexedDB for Offline Data Persistence

Create `src/utils/storage.ts`:

```typescript
const DB_NAME = 'ToolboxDB'
const STORE_NAME = 'sessions'

export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

export const saveSession = async (sessionData: PomodoroState): Promise<void> => {
  const db = await openDatabase()
  const transaction = db.transaction([STORE_NAME], 'readwrite')
  const store = transaction.objectStore(STORE_NAME)
  store.add({ ...sessionData, timestamp: Date.now() })
}

export const getSessions = async (): Promise<PomodoroState[]> => {
  const db = await openDatabase()
  const transaction = db.transaction([STORE_NAME], 'readonly')
  const store = transaction.objectStore(STORE_NAME)

  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}
```

### Step 10.4: Share API Integration

Add to `src/components/tools/PomodoroTimer.tsx`:

```typescript
const handleShare = async () => {
  const shareData = {
    title: 'Toolbox - Pomodoro Timer',
    text: `I've completed ${sessionsCompleted} Pomodoro sessions!`,
    url: window.location.href
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (error) {
      console.log('Share failed:', error)
    }
  }
}

// Add button to UI:
// <button onClick={handleShare} className="btn-primary">Share</button>
```

---

## 11. Scaling: Adding More Tools

### Step 11.1: Create a New Tool Component

Create `src/components/tools/Calculator.tsx`:

```typescript
export const Calculator = () => {
  const [display, setDisplay] = useState('0')

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num)
  }

  return (
    <div className='card max-w-md w-full'>
      <h2 className='text-2xl font-bold text-white mb-4'>Calculator</h2>
      <div className='bg-zinc-800 rounded-lg p-4 mb-4'>
        <div className='text-right text-3xl font-mono text-indigo-400'>{display}</div>
      </div>
      {/* Calculator buttons */}
    </div>
  )
}
```

### Step 11.2: Add Tool Navigation

Update `src/App.tsx`:

```typescript
import { useState } from 'react'
import { Layout } from './components/Layout'
import { PomodoroTimer } from './components/tools/PomodoroTimer'
import { Calculator } from './components/tools/Calculator'

type ToolType = 'pomodoro' | 'calculator'

export const App = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('pomodoro')

  const renderTool = () => {
    switch (activeTool) {
      case 'pomodoro':
        return <PomodoroTimer />
      case 'calculator':
        return <Calculator />
      default:
        return <PomodoroTimer />
    }
  }

  return (
    <Layout title={activeTool}>
      <div className='mb-6 flex gap-2'>
        <button
          onClick={() => setActiveTool('pomodoro')}
          className={activeTool === 'pomodoro' ? 'btn-primary' : 'btn-outline'}
        >
          Pomodoro
        </button>
        <button
          onClick={() => setActiveTool('calculator')}
          className={activeTool === 'calculator' ? 'btn-primary' : 'btn-outline'}
        >
          Calculator
        </button>
      </div>
      {renderTool()}
    </Layout>
  )
}

export default App
```

### Step 11.3: Use React Router for Complex Navigation

```bash
bun add react-router-dom
```

Create `src/router.tsx`:

```typescript
import { createBrowserRouter } from 'react-router-dom'
import { PomodoroTimer } from './components/tools/PomodoroTimer'
import { Calculator } from './components/tools/Calculator'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PomodoroTimer />,
    errorElement: <div>Tool not found</div>
  },
  {
    path: '/calculator',
    element: <Calculator />
  }
])
```

---

## 12. Next Steps

1. **Generate PWA Icons:**

   - Use PWA Asset Generator or RealFaviconGenerator
   - Place all icons in `public/` directory
   - Test on actual devices

2. **Add More Tools:**

   - Create new components in `src/components/tools/`
   - Add routing if needed (React Router)
   - Implement tool selection UI
   - Follow the same modular pattern

3. **Deploy:**

   - **Self-hosted:** Use `bun run build` and serve `dist/` folder on your server

4. **Enhancements:**
   - Add push notifications (Step 10.1)
   - Implement background sync (Step 10.2)
   - Add offline data persistence with IndexedDB (Step 10.3)
   - Integrate Share API (Step 10.4)
   - Add analytics
   - Implement dark/light mode toggle
   - Add settings/preferences page

---

## Troubleshooting

### PWA not installing on iOS

- Ensure you're using HTTPS (or localhost)
- Check that manifest.json is valid
- Verify apple-touch-icon is present
- Try clearing browser cache

### Service Worker not updating

- Hard refresh (Ctrl+Shift+R)
- Clear application cache in DevTools
- Check `registerType: 'autoUpdate'` in config

### Tailwind styles not applying

- Verify `@import "tailwindcss"` in index.css
- Check that Tailwind plugin is in vite.config.ts
- Restart dev server

---

**Created:** October 26, 2025  
**Bun Version:** 1.3.1  
**Tailwind CSS:** V4 (CSS-first configuration)  
**Vite PWA Plugin:** Latest
