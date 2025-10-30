/// <reference lib="dom" />

import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { MemoryRouter } from 'react-router-dom'

import { PomodoroSettingsPage } from './PomodoroSettingsPage'

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) =>
  render(<MemoryRouter>{component}</MemoryRouter>)

describe('PomodoroSettingsPage', () => {
  beforeEach(() => {
    document.title = ''
  })

  afterEach(() => {
    document.title = ''
  })

  it('exports PomodoroSettingsPage component', () => {
    expect(typeof PomodoroSettingsPage).toBe('function')
  })

  describe('Document Title', () => {
    it('sets document title on mount', () => {
      renderWithRouter(<PomodoroSettingsPage />)
      expect(document.title).toBe('Pomodoro Settings - Developer Toolbox')
    })

    it('resets document title on unmount', () => {
      const { unmount } = renderWithRouter(<PomodoroSettingsPage />)
      expect(document.title).toBe('Pomodoro Settings - Developer Toolbox')
      unmount()
      expect(document.title).toBe('Developer Toolbox')
    })
  })

  describe('Page Structure', () => {
    it('renders main element', () => {
      renderWithRouter(<PomodoroSettingsPage />)
      expect(screen.getByRole('main')).toBeTruthy()
    })

    it('renders with dark background', () => {
      renderWithRouter(<PomodoroSettingsPage />)
      const main = screen.getByRole('main')
      expect(main.className).toContain('bg-zinc-700')
    })

    it('renders with full height layout', () => {
      renderWithRouter(<PomodoroSettingsPage />)
      const main = screen.getByRole('main')
      expect(main.className).toContain('min-h-screen')
    })
  })

  describe('Content', () => {
    it('renders PomodoroSettings component', () => {
      renderWithRouter(<PomodoroSettingsPage />)
      // PomodoroSettings should render a heading
      expect(screen.getByText('Pomodoro Settings')).toBeTruthy()
    })
  })
})
