/**
 * NavigationHeader Component
 *
 * Reusable navigation header with left and right links
 */

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface NavigationLink {
  /** Link destination */
  to: string
  /** Link label text */
  label: string
  /** Icon component */
  icon: ReactNode
}

interface NavigationHeaderProps {
  /** Left navigation link */
  leftLink: NavigationLink
  /** Right navigation link */
  rightLink: NavigationLink
}

/**
 * Navigation header with left and right links
 */
export const NavigationHeader = ({ leftLink, rightLink }: NavigationHeaderProps) => (
  <nav className='mb-8 flex items-center justify-between'>
    <Link
      to={leftLink.to}
      className='flex items-center gap-2 text-zinc-100 transition-colors hover:text-zinc-100'
    >
      {leftLink.icon}
      {leftLink.label}
    </Link>

    <Link
      to={rightLink.to}
      className='flex items-center gap-2 text-zinc-100 transition-colors hover:text-zinc-100'
    >
      {rightLink.icon}
      {rightLink.label}
    </Link>
  </nav>
)
