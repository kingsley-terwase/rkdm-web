import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Chip, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import { LockClosedRegular, LockOpenRegular } from '@fluentui/react-icons'
import { resources, naira } from '../data/demo'
import { CardGrid, Tile } from '../components/Tile'
import Reveal from '../components/Reveal'
import CheckoutDialog from '../components/CheckoutDialog'
import { useAuth } from '../context/Auth'
import { useStore } from '../context/Store'
export default function Resources() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('All')
  const [price, setPrice] = useState('All')
  const [buying, setBuying] = useState<number | null>(null)
  const [msg, setMsg] = useState('')
  const { user } = useAuth()
  const { owned, buy } = useStore()
  const nav = useNavigate()
  const loc = useLocation()
  const list = resources.filter(r => r.title.toLowerCase().includes(q.toLowerCase()) && (type === 'All' || r.type === type) && (price === 'All' || (price === 'Free') === (r.price === 0)))
  const onBuy = (id: number) => (user ? setBuying(id) : nav('/login', { state: { from: loc.pathname } }))
  return (
    <>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        <TextField size="small" label="Search" value={q} onChange={e => setQ(e.target.value)} />
        <TextField select size="small" label="Type" value={type} onChange={e => setType(e.target.value)} sx={{ minWidth: 120 }}>{['All', 'Video', 'Audio', 'Book'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}</TextField>
        <TextField select size="small" label="Price" value={price} onChange={e => setPrice(e.target.value)} sx={{ minWidth: 120 }}>{['All', 'Free', 'Paid'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}</TextField>
      </Box>
      <CardGrid>{list.map((r, i) => {
        const open = r.price === 0 || owned.includes(r.id)
        return (
          <Reveal key={r.id} i={i}><Tile><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Chip size="small" label={r.type} /><Chip size="small" color={r.price ? 'warning' : 'success'} label={r.price ? 'PAID ' + naira(r.price) : 'FREE'} /></Box>
            <Typography variant="h6" fontWeight={800}>{r.title}</Typography>
            <Button sx={{ mt: 1 }} variant={open ? 'outlined' : 'contained'} startIcon={open ? <LockOpenRegular /> : <LockClosedRegular />}
              onClick={() => (open ? setMsg('Opening via a short-lived signed URL (demo)') : onBuy(r.id))}>{open ? (r.price ? 'Unlocked · Open' : 'Play / Download') : 'Buy'}</Button></Tile></Reveal>)
      })}</CardGrid>
      <CheckoutDialog open={buying !== null} label={resources.find(r => r.id === buying)?.title ?? ''} onDone={() => { buy(buying!); setBuying(null); setMsg('Payment verified. Added to My Library.') }} />
      <Snackbar open={!!msg} autoHideDuration={2800} onClose={() => setMsg('')} message={msg} />
    </>
  )
}
