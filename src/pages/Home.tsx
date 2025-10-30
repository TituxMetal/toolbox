import { ToolCard, WelcomeCard } from '~/components'

export const Home = () => (
  <div className='flex min-h-screen flex-col bg-zinc-700'>
    {/* Header */}
    <header className='w-full px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='text-center text-4xl font-bold text-zinc-100 sm:text-5xl lg:text-6xl'>
          Developer Toolbox
        </h1>
        <p className='mx-auto mt-4 max-w-3xl text-center text-lg text-zinc-300 sm:text-xl'>
          A collection of essential development tools and utilities to streamline your workflow
        </p>
      </div>
    </header>

    {/* Main Content */}
    <main className='flex-1 px-4 pb-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <WelcomeCard />

        {/* Tools Grid */}
        <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <ToolCard
            title='Pomodoro Timer'
            description='Focus timer using the Pomodoro Technique with work sessions and breaks'
            href='/pomodoro'
            isActive={true}
            icon={
              <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            }
          />
          <ToolCard title='More Tools' description='Additional utilities will appear here' />
          <ToolCard title='Future Features' description='Exciting tools are on the way' />
        </section>
      </div>
    </main>

    {/* Footer */}
    <footer className='w-full border-t border-zinc-600/30 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl text-center'>
        <p className='text-sm text-zinc-400'>Built with React, Bun, and Tailwind CSS • PWA Ready</p>
      </div>
    </footer>
  </div>
)
