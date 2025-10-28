import { ToolCard, WelcomeCard } from '~/components'

export const Home = () => (
  <div className='min-h-screen bg-zinc-700 flex flex-col'>
    {/* Header */}
    <header className='w-full py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 text-center'>
          Developer Toolbox
        </h1>
        <p className='mt-4 text-lg sm:text-xl text-zinc-300 text-center max-w-3xl mx-auto'>
          A collection of essential development tools and utilities to streamline your workflow
        </p>
      </div>
    </header>

    {/* Main Content */}
    <main className='flex-1 px-4 sm:px-6 lg:px-8 pb-8'>
      <div className='max-w-7xl mx-auto'>
        <WelcomeCard />

        {/* Tools Grid Placeholder */}
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <ToolCard title='Tools Coming Soon' description='Development tools will be added here' />
          <ToolCard title='More Tools' description='Additional utilities will appear here' />
          <ToolCard title='Future Features' description='Exciting tools are on the way' />
        </section>
      </div>
    </main>

    {/* Footer */}
    <footer className='w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-zinc-600/30'>
      <div className='max-w-7xl mx-auto text-center'>
        <p className='text-sm text-zinc-400'>Built with React, Bun, and Tailwind CSS • PWA Ready</p>
      </div>
    </footer>
  </div>
)
