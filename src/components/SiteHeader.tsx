import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Box, Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, TextField, Typography } from '@mui/material'
import type { Theme } from '@mui/material'
import {
  BookRegular, BuildingRegular, CalendarRegular, ChatRegular, ChevronDownRegular, DocumentRegular, GlobeRegular,
  HeartFilled, HeartRegular, HomeRegular, ImageRegular, InfoRegular, LocationRegular, MailRegular, NavigationRegular,
  NewsRegular, PeopleRegular, PersonRegular, SearchRegular, VideoRegular,
} from '@fluentui/react-icons'
import type { FluentIcon } from '@fluentui/react-icons'
import ThemeToggle from './ThemeToggle'
import { nav, NavItem } from '../data/nav'
import { useAuth } from '../context/Auth'

const NAVY = '#0b1b5c'

// Picks an icon from the label text. Add or reorder rules to match your menu.
const ICONS: [RegExp, FluentIcon][] = [
  // [/home/i, HomeRegular],
  [/give|donat|offering|tithe|partner/i, HeartRegular],
  [/tv|live|video|watch|media/i, VideoRegular],
  [/event|calendar|program|service|schedule/i, CalendarRegular],
  [/resource|sermon|message|teach|book|library|study|devotion/i, BookRegular],
  [/news|blog|update|announce/i, NewsRegular],
  [/gallery|photo|image/i, ImageRegular],
  [/prayer|counsel/i, ChatRegular],
  [/mission|outreach|global|world|nation/i, GlobeRegular],
  [/leader|pastor|team|people|member|fellowship|youth|children|women|men/i, PeopleRegular],
  [/ministr|church|branch|location|find|visit|campus/i, BuildingRegular],
  [/about|who|vision|mission|belief|history/i, InfoRegular],
  [/contact|connect|reach/i, MailRegular],
  [/login|account|portal/i, PersonRegular],
]
const iconFor = (label: string): FluentIcon => ICONS.find(([re]) => re.test(label))?.[1] ?? DocumentRegular

// One simple rule: black in light mode, white in dark mode (text and icons together).
const ink = (t: Theme) => (t.palette.mode === 'dark' ? '#fff' : '#000')
const navBtn = (t: Theme) => ({
  color: ink(t),
  fontWeight: 700,
  fontSize: 14,
  px: 1.25,
  minWidth: 0,
  whiteSpace: 'nowrap',
  '& .MuiButton-startIcon': { mr: 0.75, ml: 0 },
  '& .MuiButton-endIcon': { ml: 0.25, mr: -0.25 },
  '&.active': { boxShadow: 'inset 0 -3px 0 currentColor' },
})

function Item({ n }: { n: NavItem }) {
  const [a, setA] = useState<HTMLElement | null>(null)
  const Icon = iconFor(n.label)
  if (!n.items) return <Button component={NavLink} to={n.to!} end sx={navBtn} startIcon={<Icon />}>{n.label}</Button>
  return (
    <>
      <Button sx={navBtn} startIcon={<Icon />} endIcon={<ChevronDownRegular fontSize={14} />} onClick={e => setA(e.currentTarget)}>{n.label}</Button>
      <Menu anchorEl={a} open={!!a} onClose={() => setA(null)} slotProps={{ paper: { sx: { mt: 0.5, minWidth: 30, borderRadius: 0.3, borderTop: '3px solid', borderColor: 'text.primary' } } }}>
        {n.items.map(([label, to]) => {
          const SubIcon = iconFor(label)
          return (
            <MenuItem key={label} component={Link} to={to} onClick={() => setA(null)} sx={{ fontWeight: 500 }}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}><SubIcon fontSize={20} /></ListItemIcon>
              {label}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default function SiteHeader() {
  const { user } = useAuth()
  const go = useNavigate()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [stuck, setStuck] = useState(false) // true once the top banner has scrolled away
  const bannerRef = useRef<HTMLDivElement>(null)
  const account = user ? (user.role === 'member' ? '/portal' : '/dashboard') : '/login'

  useEffect(() => {
    const el = bannerRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Box ref={bannerRef} sx={{ background: 'linear-gradient(95deg,#0b1b5c,#1546d6 70%,#2a6bff)', color: '#fff' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
          <Link to="/"><Box component="img" src="/logo.png" alt="RKDM" sx={{ height: { xs: 70, md: 110 }, display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.4))' }} /></Link>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={800} sx={{ fontSize: { xs: 15, md: 30 }, lineHeight: 1.1 }}>ROYAL KINGDOM DOMINION</Typography>
            <Typography fontWeight={800} sx={{ fontSize: { xs: 12, md: 18 }, color: '#f5b301', letterSpacing: 2 }}>MINISTRY INTERNATIONAL</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 3, alignItems: 'center' }}>
            <Typography sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><MailRegular />info@rkdm.org</Typography>
            <Typography sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><LocationRegular />Headquarters, Gboko, Nigeria</Typography>
          </Box>
          {search && <TextField size="small" autoFocus placeholder="Search…" onKeyDown={e => e.key === 'Enter' && (go('/resources'), setSearch(false))} sx={{ bgcolor: '#fff', borderRadius: 2, display: { xs: 'none', md: 'block' } }} />}
          <IconButton sx={{ color: '#fff' }} onClick={() => setSearch(!search)} aria-label="Search"><SearchRegular /></IconButton>
          <IconButton sx={{ color: '#fff', display: { lg: 'none' } }} onClick={() => setOpen(true)} aria-label="Menu"><NavigationRegular /></IconButton>
        </Box>
      </Box>

      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, bgcolor: 'background.paper', boxShadow: '0 4px 20px rgba(11,27,92,.12)' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3, minHeight: 64, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Logo: hidden at the top of the page, slides in once the banner scrolls away */}
          <Box
            component={Link}
            to="/"
            aria-label="RKDM home"
            aria-hidden={!stuck}
            tabIndex={stuck ? 0 : -1}
            sx={{
              display: 'flex', alignItems: 'center', overflow: 'hidden', flexShrink: 0,
              width: stuck ? 52 : 0, mr: stuck ? 1.5 : 0, opacity: stuck ? 1 : 0, visibility: stuck ? 'visible' : 'hidden',
              transition: 'width .3s ease, margin .3s ease, opacity .25s ease, visibility .3s',
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            }}
          >
            <Box component="img" src="/logo.png" alt="" sx={{ height: 46, display: 'block', flexShrink: 0 }} />
          </Box>

          <Box sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1 }}>
            {nav.map(n => <Item key={n.label} n={n} />)}
            <Button component={Link} to="/contact" sx={navBtn} startIcon={<MailRegular />}>Contact</Button>
          </Box>
          <Box sx={{ flex: { xs: 1, lg: 0 } }} />
          <Button component={Link} to="/give" variant="contained" color="secondary" startIcon={<HeartFilled />}>Give</Button>
          <Button component={Link} to="/resources" variant="contained" startIcon={<VideoRegular />} sx={{ bgcolor: NAVY, whiteSpace: 'nowrap', display: { xs: 'none', sm: 'inline-flex' } }}>RKDM TV Live</Button>
          <IconButton component={Link} to={account} aria-label="Account"><PersonRegular /></IconButton>
          <ThemeToggle />
          {/* Menu button stays reachable after the banner scrolls away (mobile) */}
          <IconButton sx={{ display: { lg: 'none' } }} onClick={() => setOpen(true)} aria-label="Menu"><NavigationRegular /></IconButton>
        </Box>
      </Box>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 280 }}>
          {nav.map(n => {
            if (!n.items) {
              const Icon = iconFor(n.label)
              return (
                <ListItemButton key={n.label} component={Link} to={n.to!} onClick={() => setOpen(false)}>
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Icon /></ListItemIcon>
                  <ListItemText primary={n.label} primaryTypographyProps={{ fontWeight: 800 }} />
                </ListItemButton>
              )
            }
            return [
              <ListSubheader key={n.label} sx={{ fontWeight: 800 }}>{n.label}</ListSubheader>,
              ...n.items.map(([label, to]) => {
                const SubIcon = iconFor(label)
                return (
                  <ListItemButton key={label} component={Link} to={to} onClick={() => setOpen(false)}>
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><SubIcon /></ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                )
              }),
            ]
          })}
          <ListItemButton component={Link} to={account} onClick={() => setOpen(false)}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><PersonRegular /></ListItemIcon>
            <ListItemText primary={user ? 'My account' : 'Login / Register'} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}