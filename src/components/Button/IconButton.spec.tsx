import { describe, expect, it, beforeEach } from 'bun:test'
import { createElement } from 'react'

import { IconButton } from './IconButton'

describe('IconButton', () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = ''
  })

  describe('Component Export', () => {
    it('exports IconButton component as forwardRef object', () => {
      expect(typeof IconButton).toBe('object')
      expect(IconButton).toBeTruthy()
      expect(IconButton.displayName).toBe('IconButton')
    })
  })

  describe('Basic Rendering', () => {
    it('renders element with children', () => {
      const element = createElement(IconButton, { children: 'Test content' })
      expect(element.type).toBe(IconButton)
      expect(element.props.children).toBe('Test content')
    })

    it('renders with default props', () => {
      const element = createElement(IconButton, { children: 'Default' })
      expect(element.props.children).toBe('Default')
    })
  })

  describe('Props Handling', () => {
    it('accepts className prop', () => {
      const element = createElement(IconButton, {
        children: 'Custom Class',
        className: 'custom-class'
      })
      expect(element.props.className).toBe('custom-class')
    })

    it('accepts onClick handler', () => {
      const handleClick = () => {}
      const element = createElement(IconButton, {
        children: 'Clickable',
        onClick: handleClick
      })
      expect(element.props.onClick).toBe(handleClick)
    })

    it('accepts id prop', () => {
      const element = createElement(IconButton, {
        children: 'With ID',
        id: 'test-id'
      })
      expect(element.props.id).toBe('test-id')
    })

    it('accepts aria attributes', () => {
      const element = createElement(IconButton, {
        children: 'Accessible',
        'aria-label': 'Accessible element'
      })
      expect(element.props['aria-label']).toBe('Accessible element')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const element = createElement(IconButton, { children: '' })
      expect(element.props.children).toBe('')
    })

    it('handles null children', () => {
      const element = createElement(IconButton, { children: null })
      expect(element.props.children).toBe(null)
    })

    it('handles number children', () => {
      const element = createElement(IconButton, { children: 42 })
      expect(element.props.children).toBe(42)
    })

    it('handles React element children', () => {
      const child = createElement('span', { children: 'Nested' })
      const element = createElement(IconButton, { children: child })
      expect(element.props.children).toBe(child)
    })

    it('handles array children', () => {
      const children = ['Text', createElement('span', { children: 'Element' })]
      const element = createElement(IconButton, { children })
      expect(element.props.children).toBe(children)
    })

    it('handles empty className', () => {
      const element = createElement(IconButton, {
        children: 'Empty Class',
        className: ''
      })
      expect(element.props.className).toBe('')
    })

    it('handles undefined props gracefully', () => {
      const element = createElement(IconButton, {
        children: 'Undefined Props',
        className: undefined,
        id: undefined
      })

      expect(element.props.className).toBeUndefined()
      expect(element.props.id).toBeUndefined()
    })
  })

  describe('Component Specific Tests', () => {
    it('renders correctly with all props', () => {
      const handleClick = () => {}
      const element = createElement(IconButton, {
        children: 'Full Test',
        className: 'test-class',
        onClick: handleClick,
        id: 'full-test',
        'aria-label': 'Full test element'
      })

      expect(element.props.children).toBe('Full Test')
      expect(element.props.className).toBe('test-class')
      expect(element.props.onClick).toBe(handleClick)
      expect(element.props.id).toBe('full-test')
      expect(element.props['aria-label']).toBe('Full test element')
    })
  })
})
