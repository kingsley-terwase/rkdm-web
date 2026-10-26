import { useState } from 'react'
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material'
import { NavigationRegular, SignOutRegular } from '@fluentui/react-icons'
import ThemeToggle from './ThemeToggle'
import NotifBell from './NotifBell'
import { areas } from '../pages/areas'
import { useAuth } from '../context/Auth'
const W = 268
const groups: [string, string[]][] = [['Main', ['', 'activity']], ['Content', ['content', 'hero', 'branches', 'gallery', 'resources', 'events', 'categories']],
  ['People', ['members', 'subscribers', 'admins']], ['Money & mail', ['payments', 'messages', 'newsletter']], ['System', ['settings']]]
export default function DashLayout() {
  const { user, can, logout } = useAuth()
  const nav = useNavigate()
  const { pathname } = useLocation()
  const mobile = useMediaQuery('(max-width:900px)')
  const [open, setOpen] = useState(false)
  if (!user || user.role === 'member') return <Navigate to="/login" replace />
  const cur = areas.find(a => pathname === `/dashboard${a.path ? '/' + a.path : ''}`)
  const menu = (
    <Box sx={{ width: W, height: '100%', color: '#c9d6ff', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#071040,#0b1b5c)' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
        <Box component="img" src="/logo.png" alt="RKDM" sx={{ height: 56 }} /><Box><Typography fontWeight={800} color="#fff">RKDM</Typography><Typography variant="caption" sx={{ color: '#f5b301' }}>Admin console</Typography></Box></Box>
      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 1 }}>{groups.map(([g, paths]) => {
        const items = areas.filter(a => paths.includes(a.path) && can(a.perm))
        return items.length === 0 ? null : (
          <Box key={g}><Typography variant="caption" sx={{ px: 1.5, mt: 2, mb: 0.5, display: 'block', letterSpacing: 1.5, fontWeight: 800, opacity: 0.55 }}>{g.toUpperCase()}</Typography>
            <List disablePadding>{items.map(a => (
              <ListItemButton key={a.path} component={NavLink} to={`/dashboard/${a.path}`} end onClick={() => setOpen(false)}
                sx={{ borderRadius: 2, mb: 0.3, color: 'inherit', '&.active': { color: '#fff', background: 'linear-gradient(90deg,#f97316,#f5b301 160%)', '& svg': { color: '#fff' } } }}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{a.icon}</ListItemIcon><ListItemText primary={a.label} primaryTypographyProps={{ fontWeight: 700, fontSize: 14 }} /></ListItemButton>))}</List></Box>)
      })}</Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderTop: '1px solid rgba(255,255,255,.1)' }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>{user.name[0]}</Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}><Typography noWrap fontWeight={800} color="#fff" fontSize={14}>{user.name}</Typography><Typography variant="caption">{user.label}</Typography></Box>
        <IconButton sx={{ color: '#fff' }} aria-label="Logout" onClick={() => { logout(); nav('/') }}><SignOutRegular /></IconButton></Box>
    </Box>)
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {mobile ? <Drawer open={open} onClose={() => setOpen(false)}>{menu}</Drawer> : <Drawer variant="permanent" sx={{ width: W, '& .MuiDrawer-paper': { width: W, border: 0 } }}>{menu}</Drawer>}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, px: { xs: 2, md: 3 }, height: 68, display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          {mobile && <IconButton onClick={() => setOpen(true)} aria-label="Menu"><NavigationRegular /></IconButton>}
          <Box sx={{ flex: 1 }}><Typography variant="caption" color="text.secondary">Dashboard / {cur?.label ?? ''}</Typography><Typography fontWeight={800}>{cur?.label ?? 'Dashboard'}</Typography></Box>
          <Button component={Link} to="/" size="small" variant="outlined" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>View site</Button><NotifBell /><ThemeToggle />
        </Box>
        <Box sx={{ p: { xs: 2, md: 3 } }}><Outlet /></Box>
      </Box>
    </Box>
  )
}
