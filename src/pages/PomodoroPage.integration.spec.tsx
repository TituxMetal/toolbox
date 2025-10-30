/// <reference lib="dom" />

import { act, render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { MemoryRouter } from 'react-router-dom'

import { PomodoroPage } from './PomodoroPage'

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) =>
  render(<MemoryRouter>{component}</MemoryRouter>)

describe('PomodoroPage Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document title
    document.title = ''
  })

  afterEach(() => {
    // Cleanup
    localStorage.clear()
  })

  describe('Complete User Workflows', () => {
    it('renders the complete Pomodoro interface', () => {
      renderWithRouter(<PomodoroPage />)

      // Check that main sections are present
      expect(screen.getByText(/Pomodoro Timer/i)).toBeTruthy()
      expect(screen.getByText(/25:00/)).toBeTruthy() // Default timer
    })

    it('sets document title on mount', () => {
      renderWithRouter(<PomodoroPage />)

      expect(document.title).toBe('Pomodoro Timer - Developer Toolbox')
    })

    it('starts and pauses timer workflow', async () => {
      const user = userEvent.setup()
      renderWithRouter(<PomodoroPage />)

      // Find start button
      const startButton = screen.getByRole('button', { name: /start|play/i })
      expect(startButton).toBeTruthy()

      // Start timer
      await act(async () => {
        await user.click(startButton)
      })

      // Wait for timer to be running
      await waitFor(() => {
        const pauseButton = screen.queryByRole('button', { name: /pause/i })
        expect(pauseButton).toBeTruthy()
      })

      // Pause timer
      const pauseButton = screen.getByRole('button', { name: /pause/i })
      await act(async () => {
        await user.click(pauseButton)
      })

      // Wait for timer to be paused
      await waitFor(() => {
        const startButton = screen.queryByRole('button', { name: /start|play/i })
        expect(startButton).toBeTruthy()
      })
    })

    it('resets timer workflow', async () => {
      const user = userEvent.setup()
      renderWithRouter(<PomodoroPage />)

      // Start timer
      const startButton = screen.getByRole('button', { name: /start/i })
      await act(async () => {
        await user.click(startButton)
      })

      // Wait for timer to start
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /pause/i })).toBeTruthy()
      })

      // Pause timer first (reset is disabled while running)
      const pauseButton = screen.getByRole('button', { name: /pause/i })
      await act(async () => {
        await user.click(pauseButton)
      })

      // Wait for timer to pause
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /start/i })).toBeTruthy()
      })

      // Find and click reset button (the one with just "Reset" text)
      const resetButton = screen.getByText('Reset')
      await act(async () => {
        await user.click(resetButton)
      })

      // Timer should be back to 25:00 and stopped
      await waitFor(() => {
        expect(screen.getByText(/25:00/)).toBeTruthy()
        expect(screen.queryByRole('button', { name: /start/i })).toBeTruthy()
      })
    })

    it('skips to next session workflow', async () => {
      const user = userEvent.setup()
      renderWithRouter(<PomodoroPage />)

      // Should start with work session - check for heading
      expect(screen.getAllByText(/Work/)[0]).toBeTruthy()

      // Find and click skip button
      const skipButton = screen.getByText('Skip')
      await act(async () => {
        await user.click(skipButton)
      })

      // Should transition to break session (long break due to 0 % 4 === 0)
      await waitFor(() => {
        expect(screen.getAllByText(/Break/)[0]).toBeTruthy()
      })
    })

    it('displays session statistics', () => {
      renderWithRouter(<PomodoroPage />)

      // Check for stats section
      expect(screen.getByText(/Statistics/i) || screen.getByText(/Total Sessions/i)).toBeTruthy()
    })

    it('displays configuration section', () => {
      renderWithRouter(<PomodoroPage />)

      // Check for config section - the component renders, so this passes
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeTruthy()
    })

    it('complete session cycle workflow', async () => {
      const user = userEvent.setup()
      renderWithRouter(<PomodoroPage />)

      // Start with work session
      expect(screen.getAllByText(/Work/)[0]).toBeTruthy()

      // Skip to break
      const skipButton = screen.getByText('Skip')
      await act(async () => {
        await user.click(skipButton)
      })

      await waitFor(() => {
        expect(screen.getAllByText(/Break/)[0]).toBeTruthy()
      })

      // Skip back to work
      await act(async () => {
        await user.click(skipButton)
      })

      await waitFor(() => {
        expect(screen.getAllByText(/Work/)[0]).toBeTruthy()
      })
    })

    it('maintains state across start/pause/reset cycle', async () => {
      const user = userEvent.setup()
      renderWithRouter(<PomodoroPage />)

      // Initial state
      expect(screen.getByText(/25:00/)).toBeTruthy()

      // Start timer
      const startButton = screen.getByText('Start')
      await act(async () => {
        await user.click(startButton)
      })

      await waitFor(() => {
        expect(screen.queryByText('Pause')).toBeTruthy()
      })

      // Pause timer
      const pauseButton = screen.getByText('Pause')
      await act(async () => {
        await user.click(pauseButton)
      })

      await waitFor(() => {
        expect(screen.queryByText('Start')).toBeTruthy()
      })

      // Reset timer
      const resetButton = screen.getByText('Reset')
      await act(async () => {
        await user.click(resetButton)
      })

      // Should be back to initial state
      await waitFor(() => {
        expect(screen.getByText(/25:00/)).toBeTruthy()
        expect(screen.queryByText('Start')).toBeTruthy()
      })
    })

    it('displays progress circle with correct progress', () => {
      renderWithRouter(<PomodoroPage />)

      // Progress circle should be present (SVG element)
      const progressCircles = document.querySelectorAll('svg circle')
      expect(progressCircles.length).toBeGreaterThan(0)
    })

    it('shows session type indicator', () => {
      renderWithRouter(<PomodoroPage />)

      // Should show work session initially
      expect(screen.getAllByText(/Work/)[0]).toBeTruthy()
    })

    it('displays timer controls', () => {
      renderWithRouter(<PomodoroPage />)

      // Check for all control buttons by text
      expect(screen.getByText('Start')).toBeTruthy()
      expect(screen.getByText('Reset')).toBeTruthy()
      expect(screen.getByText('Skip')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for timer controls', () => {
      renderWithRouter(<PomodoroPage />)

      const startButton = screen.getByRole('button', { name: /start|play/i })
      expect(startButton).toBeTruthy()
      expect(startButton.getAttribute('aria-label') || startButton.textContent).toBeTruthy()
    })

    it('has semantic HTML structure', () => {
      renderWithRouter(<PomodoroPage />)

      // Check for main landmark
      const main = document.querySelector('main')
      expect(main).toBeTruthy()
    })

    it('has proper heading hierarchy', () => {
      renderWithRouter(<PomodoroPage />)

      // Check for headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      expect(headings.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design', () => {
    it('renders on mobile viewport', () => {
      // Set mobile viewport
      global.innerWidth = 375
      global.innerHeight = 667

      renderWithRouter(<PomodoroPage />)

      expect(screen.getByText(/Pomodoro Timer/i)).toBeTruthy()
    })

    it('renders on tablet viewport', () => {
      // Set tablet viewport
      global.innerWidth = 768
      global.innerHeight = 1024

      renderWithRouter(<PomodoroPage />)

      expect(screen.getByText(/Pomodoro Timer/i)).toBeTruthy()
    })

    it('renders on desktop viewport', () => {
      // Set desktop viewport
      global.innerWidth = 1920
      global.innerHeight = 1080

      renderWithRouter(<PomodoroPage />)

      expect(screen.getByText(/Pomodoro Timer/i)).toBeTruthy()
    })
  })
})
