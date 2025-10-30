import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { PlusIcon } from '~/components/Icons/ToolIcons'

interface ToolCardProps extends HTMLAttributes<HTMLElement> {
  title: string
  description: string
  icon?: ReactNode
  href?: string
  isActive?: boolean
}

export const ToolCard = ({
  title,
  description,
  icon,
  href,
  isActive = false,
  ...props
}: ToolCardProps) => {
  const cardClasses = isActive
    ? 'card hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer'
    : 'card opacity-50 border-dashed border-2 border-zinc-600'

  const content = (
    <div className='py-8 text-center'>
      <div
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
          isActive ? 'bg-indigo-600' : 'bg-zinc-600'
        }`}
      >
        {icon || <PlusIcon className={`h-6 w-6 ${isActive ? 'text-zinc-100' : 'text-zinc-200'}`} />}
      </div>
      <h3 className={`mb-2 text-lg font-medium ${isActive ? 'text-zinc-100' : 'text-zinc-200'}`}>
        {title}
      </h3>
      <p className={`text-sm ${isActive ? 'text-zinc-100' : 'text-zinc-200'}`}>{description}</p>
    </div>
  )

  if (href && isActive) {
    return (
      <Link to={href}>
        <article className={cardClasses} {...props}>
          {content}
        </article>
      </Link>
    )
  }

  return (
    <article className={cardClasses} {...props}>
      {content}
    </article>
  )
}
