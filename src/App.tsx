import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './screens/Landing'
import Join from './screens/Join'

const Host = lazy(() => import('./screens/Host'))
const PlayerScreen = lazy(() => import('./screens/Player'))
const Guides = lazy(() => import('./screens/Guides'))

function Splash() {
  return (
    <div className="stage grid min-h-dvh place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/join" element={<Join />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/host/:code" element={<Host />} />
          <Route path="/host" element={<Landing />} />
          <Route path="/play/:code" element={<PlayerScreen />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
