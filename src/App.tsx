import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import PublicLayout from './components/PublicLayout'
import AuthLayout from './components/AuthLayout'
import DashLayout from './components/DashLayout'
import Home from './pages/Home'
import About from './pages/About'
import Ministries from './pages/Ministries'
import Resources from './pages/Resources'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Give from './pages/Give'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import Portal from './pages/Portal'
import Legal from './pages/Legal'
import NewHere from './pages/NewHere'
import InfoPage from './pages/InfoPage'
import Branches from './pages/Branches'
import { areas } from './pages/areas'
export default function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 1800); return () => clearTimeout(t) }, [])
  if (!ready) return <Loader />
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/forgot-password" element={<Forgot />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/ministries" element={<Ministries />} />
        <Route path="/resources" element={<Resources />} /><Route path="/events" element={<Events />} /><Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} /><Route path="/give" element={<Give />} /><Route path="/new-here" element={<NewHere />} />
        <Route path="/p/:slug" element={<InfoPage />} /><Route path="/branches" element={<Branches />} /><Route path="/portal" element={<Portal />} />
        <Route path="/privacy" element={<Legal title="Privacy Policy" k="privacy" />} /><Route path="/terms" element={<Legal title="Terms of Use" k="terms" />} />
        <Route path="*" element={<Legal title="404 · Page not found" />} />
      </Route>
      <Route path="/dashboard" element={<DashLayout />}>
        {areas.map(a => a.path === '' ? <Route key="i" index element={a.el} /> : <Route key={a.path} path={a.path} element={a.el} />)}
      </Route>
    </Routes>
  )
}
