import { describe, expect, it, beforeEach } from 'bun:test'
import { createElement } from 'react'

import { CardContent } from './CardContent'

describe('CardContent', () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = ''
  })

  describe('Component Export', () => {
    it('exports CardContent component as forwardRef object', () => {
      expect(typeof CardContent).toBe('object')
      expect(CardContent).toBeTruthy()
      expect(CardContent.displayName).toBe('CardContent')
    })
  })

  describe('Basic Rendering', () => {
    it('renders element with children', () => {
      const element = createElement(CardContent, { children: 'Test content' })
      expect(element.type).toBe(CardContent)
      expect(element.props.children).toBe('Test content')
    })

    it('renders with default props', () => {
      const element = createElement(CardContent, { children: 'Default' })
      expect(element.props.children).toBe('Default')
    })
  })

  describe('Props Handling', () => {
    it('accepts className prop', () => {
      const element = createElement(CardContent, {
        children: 'Custom Class',
        className: 'custom-class'
      })
      expect(element.props.className).toBe('custom-class')
    })

    it('accepts onClick handler', () => {
      const handleClick = () => {}
      const element = createElement(CardContent, {
        children: 'Clickable',
        onClick: handleClick
      })
      expect(element.props.onClick).toBe(handleClick)
    })

    it('accepts id prop', () => {
      const element = createElement(CardContent, {
        children: 'With ID',
        id: 'test-id'
      })
      expect(element.props.id).toBe('test-id')
    })

    it('accepts aria attributes', () => {
      const element = createElement(CardContent, {
        children: 'Accessible',
        'aria-label': 'Accessible element'
      })
      expect(element.props['aria-label']).toBe('Accessible element')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const element = createElement(CardContent, { children: '' })
      expect(element.props.children).toBe('')
    })

    it('handles null children', () => {
      const element = createElement(CardContent, { children: null })
      expect(element.props.children).toBe(null)
    })

    it('handles number children', () => {
      const element = createElement(CardContent, { children: 42 })
      expect(element.props.children).toBe(42)
    })

    it('handles React element children', () => {
      const child = createElement('span', { children: 'Nested' })
      const element = createElement(CardContent, { children: child })
      expect(element.props.children).toBe(child)
    })

    it('handles array children', () => {
      const children = ['Text', createElement('span', { children: 'Element' })]
      const element = createElement(CardContent, { children })
      expect(element.props.children).toBe(children)
    })

    it('handles empty className', () => {
      const element = createElement(CardContent, {
        children: 'Empty Class',
        className: ''
      })
      expect(element.props.className).toBe('')
    })

    it('handles undefined props gracefully', () => {
      const element = createElement(CardContent, {
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
      const element = createElement(CardContent, {
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
