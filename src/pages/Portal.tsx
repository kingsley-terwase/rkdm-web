import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Tab, Tabs, Typography } from '@mui/material'
import { useAuth } from '../context/Auth'
import { PortalEvents, PortalGiving, PortalLibrary, PortalNotifications, PortalProfile } from './PortalTabs'
import Reveal from '../components/Reveal'
const tabs: [string, JSX.Element][] = [['My Events', <PortalEvents />], ['Giving', <PortalGiving />], ['My Library', <PortalLibrary />], ['Notifications', <PortalNotifications />], ['Profile', <PortalProfile />]]
export default function Portal() {
  const { user } = useAuth()
  const [t, setT] = useState(0)
  if (!user) return <Navigate to="/login" replace />
  return (
    <>
      <Typography variant="h4" fontWeight={800} gutterBottom>Welcome, {user.name.split(' ')[0]} 👋</Typography>
      <Tabs value={t} onChange={(_, v) => setT(v)} variant="scrollable" sx={{ mb: 2 }}>{tabs.map(([l]) => <Tab key={l} label={l} />)}</Tabs>
      <Reveal key={t}>{tabs[t][1]}</Reveal>
    </>
  )
}
