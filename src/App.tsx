import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Join from './screens/Join'

const Portal = lazy(() => import('./screens/Portal'))
const Landing = lazy(() => import('./screens/Landing'))
const Guides = lazy(() => import('./screens/Guides'))
const Host = lazy(() => import('./screens/Host'))
const PlayGate = lazy(() => import('./screens/PlayGate'))
const SecretCodeLanding = lazy(() => import('./screens/SecretCodeLanding'))
const BattleLanding = lazy(() => import('./screens/BattleLanding'))
const SecretCodeHost = lazy(() => import('./screens/SecretCodeHost'))
const BattleHost = lazy(() => import('./screens/BattleHost'))
const Detective = lazy(() => import('./screens/Detective'))
const TruthOrDareLanding = lazy(() => import('./screens/TruthOrDareLanding'))
const TruthOrDareHost = lazy(() => import('./screens/TruthOrDareHost'))
const TruthOrDare = lazy(() => import('./screens/TruthOrDare'))
const MonopolyLanding = lazy(() => import('./screens/MonopolyLanding'))
const MonopolyHost = lazy(() => import('./screens/MonopolyHost'))
const CatanLanding = lazy(() => import('./screens/CatanLanding'))
const CatanHost = lazy(() => import('./screens/CatanHost'))

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
          <Route path="/" element={<Portal />} />
          <Route path="/ma-soi" element={<Landing />} />
          <Route path="/ma-soi/host" element={<Landing />} />
          <Route path="/secret-code" element={<SecretCodeLanding />} />
          <Route path="/sea-battle" element={<BattleLanding />} />
          <Route path="/join" element={<Join />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/host/:code" element={<Host />} />
          <Route path="/secret-code/host/:code" element={<SecretCodeHost />} />
          <Route path="/sea-battle/host/:code" element={<BattleHost />} />
          <Route path="/detective" element={<Detective />} />
          <Route path="/truth-or-dare" element={<TruthOrDareLanding />} />
          <Route path="/truth-or-dare/host/:code" element={<TruthOrDareHost />} />
          <Route path="/truth-or-dare/offline" element={<TruthOrDare />} />
          <Route path="/monopoly" element={<MonopolyLanding />} />
          <Route path="/monopoly/host/:code" element={<MonopolyHost />} />
          <Route path="/catan" element={<CatanLanding />} />
          <Route path="/catan/host/:code" element={<CatanHost />} />
          <Route path="/play/:code" element={<PlayGate />} />
          <Route path="*" element={<Portal />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
