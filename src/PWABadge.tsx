import { useRegisterSW } from 'virtual:pwa-register/react'

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
const registerPeriodicSync = (period: number, swUrl: string, r: ServiceWorkerRegistration) => {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache'
      }
    })

    if (resp?.status === 200) await r.update()
  }, period)
}

export const PWABadge = () => {
  // PERIODIC_SYNC_COMMENT
  const period = 0

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', e => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r)
        })
      }
    }
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div
      className='pointer-events-none fixed inset-0 z-50 flex items-end justify-center p-4 sm:p-6'
      role='alert'
      aria-labelledby='toast-message'
    >
      {(offlineReady || needRefresh) && (
        <div className='animate-slide-up pointer-events-auto w-full max-w-md rounded-lg border border-zinc-600/30 bg-zinc-800 shadow-lg'>
          <div className='flex flex-col gap-3 p-4'>
            <div className='flex items-start gap-3'>
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  offlineReady
                    ? 'bg-linear-to-br from-green-500 to-emerald-600'
                    : 'bg-linear-to-br from-indigo-500 to-purple-600'
                }`}
              >
                {offlineReady ? (
                  <svg
                    className='h-5 w-5 text-zinc-100'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-5 w-5 text-zinc-100'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>
                )}
              </div>

              {/* Message */}
              <div className='flex-1'>
                <p id='toast-message' className='text-sm font-medium text-zinc-100'>
                  {offlineReady
                    ? 'App ready to work offline'
                    : 'New content available, click on reload button to update.'}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-2'>
              {needRefresh && (
                <button
                  className='inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:outline-none'
                  onClick={() => updateServiceWorker(true)}
                >
                  Reload
                </button>
              )}
              <button
                className='inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-600/30 bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-600 focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:outline-none'
                onClick={() => close()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
