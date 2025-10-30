import { BeakerIcon } from '~/components/Icons/ToolIcons'
import { getGradientColorClasses } from '~/utils/colors'

export const WelcomeCard = () => {
  const gradientClasses = getGradientColorClasses('indigo')

  return (
    <section className='card mx-auto mb-8 max-w-4xl'>
      <div className='text-center'>
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ${gradientClasses}`}
        >
          <BeakerIcon className='h-8 w-8 text-zinc-100' />
        </div>
        <h2 className='mb-4 text-2xl font-semibold text-zinc-100 sm:text-3xl'>
          Welcome to Your Toolbox
        </h2>
        <p className='text-base leading-relaxed text-zinc-100 sm:text-lg'>
          This is your central hub for development tools and utilities. More tools will be added
          here as the application grows.
        </p>
      </div>
    </section>
  )
}
