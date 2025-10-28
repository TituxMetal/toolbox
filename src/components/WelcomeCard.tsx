export const WelcomeCard = () => (
  <section className="card max-w-4xl mx-auto mb-8">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
        <svg 
          className="w-8 h-8 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
          />
        </svg>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-4">
        Welcome to Your Toolbox
      </h2>
      <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
        This is your central hub for development tools and utilities. 
        More tools will be added here as the application grows.
      </p>
    </div>
  </section>
)
