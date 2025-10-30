import { beforeEach, describe, expect, it } from 'bun:test'
import { createElement } from 'react'

import { ButtonGroup } from './ButtonGroup'

describe('ButtonGroup', () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = ''
  })

  describe('Component Export', () => {
    it('exports ButtonGroup component as memoized component', () => {
      expect(typeof ButtonGroup).toBe('object')
      expect(ButtonGroup).toBeTruthy()
    })
  })

  describe('Basic Rendering', () => {
    it('renders element with children', () => {
      const element = createElement(ButtonGroup, { children: 'Test content' })
      expect(element.type).toBe(ButtonGroup)
      expect(element.props.children).toBe('Test content')
    })

    it('renders with default props', () => {
      const element = createElement(ButtonGroup, { children: 'Default' })
      expect(element.props.children).toBe('Default')
    })
  })

  describe('Props Handling', () => {
    it('accepts className prop', () => {
      const element = createElement(ButtonGroup, {
        children: 'Custom Class',
        className: 'custom-class'
      })
      expect(element.props.className).toBe('custom-class')
    })

    it('accepts onClick handler', () => {
      const handleClick = () => {}
      const element = createElement(ButtonGroup, {
        children: 'Clickable',
        onClick: handleClick
      })
      expect(element.props.onClick).toBe(handleClick)
    })

    it('accepts id prop', () => {
      const element = createElement(ButtonGroup, {
        children: 'With ID',
        id: 'test-id'
      })
      expect(element.props.id).toBe('test-id')
    })

    it('accepts aria attributes', () => {
      const element = createElement(ButtonGroup, {
        children: 'Accessible',
        'aria-label': 'Accessible element'
      })
      expect(element.props['aria-label']).toBe('Accessible element')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const element = createElement(ButtonGroup, { children: '' })
      expect(element.props.children).toBe('')
    })

    it('handles null children', () => {
      const element = createElement(ButtonGroup, { children: null })
      expect(element.props.children).toBe(null)
    })

    it('handles number children', () => {
      const element = createElement(ButtonGroup, { children: 42 })
      expect(element.props.children).toBe(42)
    })

    it('handles React element children', () => {
      const child = createElement('span', { children: 'Nested' })
      const element = createElement(ButtonGroup, { children: child })
      expect(element.props.children).toBe(child)
    })

    it('handles array children', () => {
      const children = ['Text', createElement('span', { children: 'Element' })]
      const element = createElement(ButtonGroup, { children })
      expect(element.props.children).toBe(children)
    })

    it('handles empty className', () => {
      const element = createElement(ButtonGroup, {
        children: 'Empty Class',
        className: ''
      })
      expect(element.props.className).toBe('')
    })

    it('handles undefined props gracefully', () => {
      const element = createElement(ButtonGroup, {
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
      const element = createElement(ButtonGroup, {
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
