import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Card, Chip, IconButton, InputAdornment, Snackbar, Tab, Tabs, TextField, Typography } from '@mui/material'
import { ChevronLeftRegular, ChevronRightRegular, SearchRegular } from '@fluentui/react-icons'
import { calendar, MONTHS } from '../data/calendar'
import EventRow from '../components/EventRow'
import { useAuth } from '../context/Auth'
import { useStore } from '../context/Store'
export default function Events() {
  const [q, setQ] = useState('')
  const [view, setView] = useState(0)
  const [mi, setMi] = useState(0)
  const [msg, setMsg] = useState('')
  const { user } = useAuth()
  const { registered, toggleRegister } = useStore()
  const nav = useNavigate()
  const loc = useLocation()
  const list = calendar.filter(e => e.title.toLowerCase().includes(q.toLowerCase()))
  const act = (id: number) => {
    if (!user) return nav('/login', { state: { from: loc.pathname } })
    setMsg(registered.includes(id) ? 'Registration cancelled' : 'Registered! Confirmation email sent.'); toggleRegister(id)
  }
  const month = 9 + mi
  const first = new Date(2026, month, 1).getDay()
  const days = new Date(2026, month + 1, 0).getDate()
  return (
    <>
      <Card sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, flexWrap: 'wrap' }}>
        <TextField variant="standard" placeholder="Search for events" value={q} onChange={e => setQ(e.target.value)} sx={{ flex: 1, minWidth: 180, px: 1 }}
          InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><SearchRegular /></InputAdornment> }} />
        <Button variant="contained" size="large">Find Events</Button>
        <Tabs value={view} onChange={(_, v) => setView(v)}><Tab label="List" /><Tab label="Month" /></Tabs>
      </Card>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 3, flexWrap: 'wrap' }}>
        <IconButton onClick={() => setMi(Math.max(0, mi - 1))} aria-label="Previous"><ChevronLeftRegular /></IconButton>
        <IconButton onClick={() => setMi(Math.min(2, mi + 1))} aria-label="Next"><ChevronRightRegular /></IconButton>
        <Button variant="outlined" size="small" onClick={() => setMi(0)}>Today</Button>
        <Typography variant="h4" fontWeight={800}>{view === 0 ? 'Now – February 16, 2027' : MONTHS[mi]}</Typography>
      </Box>
      {view === 0 ? MONTHS.map((m, k) => {
        const rows = list.filter(e => e.m === 9 + k)
        return rows.length === 0 ? null : (
          <Box key={m}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}><Typography>{m}</Typography><Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} /></Box>
            {rows.map(e => <EventRow key={e.id} e={e} mine={registered.includes(e.id)} onAct={() => act(e.id)} />)}</Box>)
      }) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', border: 1, borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <Box key={d} sx={{ p: 1, textAlign: 'center', fontWeight: 800, bgcolor: 'primary.main', color: '#fff', fontSize: 12 }}>{d}</Box>)}
          {Array.from({ length: first + days }).map((_, k) => {
            const d = k - first + 1
            return (
              <Box key={k} sx={{ minHeight: { xs: 64, md: 100 }, p: 0.5, border: '1px solid', borderColor: 'divider', bgcolor: d < 1 ? 'action.hover' : 'transparent' }}>
                {d > 0 && <Typography variant="caption" fontWeight={800}>{d}</Typography>}
                {list.filter(e => e.m === month && e.day === d).map(e => <Chip key={e.id} size="small" color="secondary" label={e.title} sx={{ display: 'flex', mt: 0.5, fontSize: 10 }} />)}
              </Box>)
          })}
        </Box>)}
      {view === 0 && list.length === 0 && <Typography color="text.secondary">No events match your search.</Typography>}
      <Snackbar open={!!msg} autoHideDuration={2500} onClose={() => setMsg('')} message={msg} />
    </>
  )
}
