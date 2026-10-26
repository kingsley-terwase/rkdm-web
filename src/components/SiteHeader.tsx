import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Box, Button, Drawer, IconButton, List, ListItemButton, ListItemText, ListSubheader, Menu, MenuItem, TextField, Typography } from '@mui/material'
import { AddRegular, HeartFilled, LocationRegular, MailRegular, NavigationRegular, PersonRegular, SearchRegular, VideoRegular } from '@fluentui/react-icons'
import ThemeToggle from './ThemeToggle'
import { nav, NavItem } from '../data/nav'
import { useAuth } from '../context/Auth'
const navBtn = { fontWeight: 800, fontSize: 14, letterSpacing: 0.3, color: 'text.primary', '&.active': { color: 'primary.main' } }
function Item({ n }: { n: NavItem }) {
  const [a, setA] = useState<HTMLElement | null>(null)
  if (!n.items) return <Button component={NavLink} to={n.to!} end sx={navBtn}>{n.label}</Button>
  return (
    <>
      <Button sx={navBtn} endIcon={<AddRegular fontSize={14} color="#f97316" />} onClick={e => setA(e.currentTarget)}>{n.label}</Button>
      <Menu anchorEl={a} open={!!a} onClose={() => setA(null)} slotProps={{ paper: { sx: { mt: 0.5, minWidth: 220, borderRadius: 2, borderTop: '3px solid #f97316' } } }}>
        {n.items.map(([t, to]) => <MenuItem key={t} component={Link} to={to} onClick={() => setA(null)} sx={{ fontWeight: 700 }}>{t}</MenuItem>)}</Menu>
    </>
  )
}
export default function SiteHeader() {
  const { user } = useAuth()
  const go = useNavigate()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const account = user ? (user.role === 'member' ? '/portal' : '/dashboard') : '/login'
  return (
    <>
      <Box sx={{ background: 'linear-gradient(95deg,#0b1b5c,#1546d6 70%,#2a6bff)', color: '#fff' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
          <Link to="/"><Box component="img" src="/logo.png" alt="RKDM" sx={{ height: { xs: 70, md: 110 }, display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.4))' }} /></Link>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={800} sx={{ fontSize: { xs: 15, md: 30 }, lineHeight: 1.1 }}>ROYAL KINGDOM DOMINION</Typography>
            <Typography fontWeight={800} sx={{ fontSize: { xs: 12, md: 18 }, color: '#f5b301', letterSpacing: 2 }}>MINISTRY INTERNATIONAL</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 3, alignItems: 'center' }}>
            <Typography sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><MailRegular />info@rkdm.org</Typography>
            <Typography sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><LocationRegular />Headquarters, Abuja, Nigeria</Typography>
          </Box>
          {search && <TextField size="small" autoFocus placeholder="Search…" onKeyDown={e => e.key === 'Enter' && (go('/resources'), setSearch(false))} sx={{ bgcolor: '#fff', borderRadius: 2, display: { xs: 'none', md: 'block' } }} />}
          <IconButton sx={{ color: '#fff' }} onClick={() => setSearch(!search)} aria-label="Search"><SearchRegular /></IconButton>
          <IconButton sx={{ color: '#fff', display: { lg: 'none' } }} onClick={() => setOpen(true)} aria-label="Menu"><NavigationRegular /></IconButton>
        </Box>
      </Box>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, bgcolor: 'background.paper', boxShadow: '0 4px 20px rgba(11,27,92,.12)' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3, minHeight: 64, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1 }}>{nav.map(n => <Item key={n.label} n={n} />)}<Button component={Link} to="/give" sx={navBtn}>Give</Button><Button component={Link} to="/contact" sx={navBtn}>Contact</Button></Box>
          <Box sx={{ flex: { xs: 1, lg: 0 } }} />
          <Button component={Link} to="/give" variant="contained" color="secondary" startIcon={<HeartFilled />}>Give</Button>
          <Button component={Link} to="/resources" variant="contained" startIcon={<VideoRegular />} sx={{ bgcolor: '#0b1b5c', display: { xs: 'none', sm: 'inline-flex' } }}>RKDM TV Live</Button>
          <IconButton component={Link} to={account} aria-label="Account"><PersonRegular /></IconButton><ThemeToggle />
        </Box>
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 280 }}>{nav.map(n => n.items ? [<ListSubheader key={n.label} sx={{ fontWeight: 800 }}>{n.label}</ListSubheader>,
          ...n.items.map(([t, to]) => <ListItemButton key={t} component={Link} to={to} onClick={() => setOpen(false)}><ListItemText primary={t} /></ListItemButton>)]
          : <ListItemButton key={n.label} component={Link} to={n.to!} onClick={() => setOpen(false)}><ListItemText primary={n.label} primaryTypographyProps={{ fontWeight: 800 }} /></ListItemButton>)}
          <ListItemButton component={Link} to={account} onClick={() => setOpen(false)}><ListItemText primary={user ? 'My account' : 'Login / Register'} /></ListItemButton></List>
      </Drawer>
    </>
  )
}
