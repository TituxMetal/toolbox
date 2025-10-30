/**
 * useDocumentTitle Hook
 *
 * Custom hook to manage document title with automatic cleanup.
 * Sets the document title when the component mounts and resets it when unmounting.
 */

import { useEffect } from 'react'

/**
 * Default title to reset to when component unmounts
 */
const DEFAULT_TITLE = 'Developer Toolbox'

/**
 * Set document title with automatic cleanup
 *
 * @param title - The title to set for the document
 * @param resetTitle - Optional title to reset to on unmount (defaults to 'Developer Toolbox')
 *
 * @example
 * ```tsx
 * const MyPage = () => {
 *   useDocumentTitle('My Page - Developer Toolbox')
 *   return <div>Page content</div>
 * }
 * ```
 */
export const useDocumentTitle = (title: string, resetTitle: string = DEFAULT_TITLE): void => {
  useEffect(() => {
    // Set the document title
    document.title = title

    // Cleanup: reset title when component unmounts
    return () => {
      document.title = resetTitle
    }
  }, [title, resetTitle])
}
