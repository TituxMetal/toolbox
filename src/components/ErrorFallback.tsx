/**
 * ErrorFallback Component
 *
 * Fallback UI displayed when an error boundary catches an error
 */

import type { FallbackProps } from 'react-error-boundary'

import { getTextColorClasses } from '~/utils/colors'

import { Button } from './Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className='flex min-h-screen items-center justify-center bg-zinc-900 p-4'>
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle className={getTextColorClasses('red')}>Something went wrong</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='space-y-4'>
          <p className='text-zinc-300'>
            An unexpected error occurred. Please try refreshing the page or contact support if the
            problem persists.
          </p>

          {error && (
            <details className='rounded-lg border border-zinc-700 bg-zinc-800/50 p-4'>
              <summary className='cursor-pointer text-sm font-medium text-zinc-400'>
                Error details
              </summary>
              <pre className={`mt-2 overflow-auto text-xs ${getTextColorClasses('red')}`}>
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
      </CardContent>

      <CardFooter className='flex gap-3'>
        <Button onClick={resetErrorBoundary} variant='primary' fullWidth>
          Try again
        </Button>
        <Button onClick={() => window.location.reload()} variant='secondary' fullWidth>
          Reload page
        </Button>
      </CardFooter>
    </Card>
  </div>
)
