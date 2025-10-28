import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '~/pages'
import { PWABadge } from '~/PWABadge.tsx'

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    <PWABadge />
  </BrowserRouter>
)
