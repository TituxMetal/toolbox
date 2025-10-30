import { describe, expect, it, beforeEach } from 'bun:test'
import { createElement } from 'react'

import { ToolCard } from './ToolCard'

describe('ToolCard', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('Component Export', () => {
    it('exports ToolCard component as function', () => {
      expect(typeof ToolCard).toBe('function')
      expect(ToolCard).toBeTruthy()
    })
  })

  describe('Basic Rendering', () => {
    it('renders element with required props', () => {
      const element = createElement(ToolCard, {
        title: 'Test Tool',
        description: 'Test description'
      })
      expect(element.type).toBe(ToolCard)
      expect(element.props.title).toBe('Test Tool')
      expect(element.props.description).toBe('Test description')
    })

    it('renders with all props', () => {
      const element = createElement(ToolCard, {
        title: 'Full Tool',
        description: 'Full description',
        icon: 'icon',
        href: '/test',
        isActive: true,
        className: 'test-class'
      })
      expect(element.props.title).toBe('Full Tool')
      expect(element.props.description).toBe('Full description')
      expect(element.props.icon).toBe('icon')
      expect(element.props.href).toBe('/test')
      expect(element.props.isActive).toBe(true)
      expect(element.props.className).toBe('test-class')
    })
  })
})
