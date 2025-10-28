interface ToolCardProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export const ToolCard = ({ title, description, icon }: ToolCardProps) => (
  <article className="card opacity-50 border-dashed border-2 border-zinc-600">
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto mb-4 bg-zinc-600 rounded-lg flex items-center justify-center">
        {icon || (
          <svg 
            className="w-6 h-6 text-zinc-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-medium text-zinc-400 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-500">
        {description}
      </p>
    </div>
  </article>
)
