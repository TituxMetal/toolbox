import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home, PomodoroPage, PomodoroSettingsPage } from '~/pages'
import { PWABadge } from '~/PWABadge.tsx'

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pomodoro' element={<PomodoroPage />} />
      <Route path='/pomodoro/settings' element={<PomodoroSettingsPage />} />
    </Routes>
    <PWABadge />
  </BrowserRouter>
)
