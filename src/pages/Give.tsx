import { useState } from 'react'
import { Alert, Box, Button, Card, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { CheckmarkCircleFilled } from '@fluentui/react-icons'
import { naira } from '../data/demo'
import CheckoutDialog from '../components/CheckoutDialog'
import { useAuth } from '../context/Auth'
import { Gift, useStore } from '../context/Store'
const cats = ['Tithe', 'Offering', 'Seed', 'Building Project']
export default function Give() {
  const { user } = useAuth()
  const { addGift, gifts } = useStore()
  const [cat, setCat] = useState(cats[0])
  const [amount, setAmount] = useState(10000)
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState<Gift | null>(null)
  const bad = amount < 500 || !name || !/^\S+@\S+\.\S+$/.test(email)
  const finish = () => {
    const g = { cat, amount, name, ref: `RKDM-2026-${String(124 + gifts.length).padStart(6, '0')}`, date: new Date().toISOString().slice(0, 10) }
    addGift(g); setDone(g); setPending(false)
  }
  if (done) return (
    <Card sx={{ p: 4, maxWidth: 480, mx: 'auto', textAlign: 'center', display: 'grid', gap: 1 }}>
      <CheckmarkCircleFilled fontSize={72} color="#16a34a" style={{ margin: '0 auto' }} />
      <Typography variant="h5" fontWeight={800}>Thank you, {done.name}!</Typography>
      <Typography color="text.secondary">Receipt {done.ref} · {done.cat} · {naira(done.amount)}</Typography>
      <Typography variant="body2" color="text.secondary">A receipt was emailed to {email}.</Typography>
      <Button onClick={() => setDone(null)}>Give again</Button>
    </Card>)
  return (
    <Card sx={{ p: 3, maxWidth: 520, mx: 'auto', display: 'grid', gap: 2 }}>
      <Typography variant="h4" fontWeight={800}>Give online</Typography>
      <TextField select label="Category" value={cat} onChange={e => setCat(e.target.value)}>{cats.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField>
      <ToggleButtonGroup exclusive value={amount} onChange={(_, v) => v && setAmount(v)} sx={{ flexWrap: 'wrap' }}>
        {[5000, 10000, 20000, 50000].map(p => <ToggleButton key={p} value={p} sx={{ flex: 1 }}>{naira(p)}</ToggleButton>)}</ToggleButtonGroup>
      <TextField label="Custom amount (₦)" inputProps={{ inputMode: 'decimal' }} value={amount} onChange={e => setAmount(Number(e.target.value.replace(/\D/g, '')))} helperText="Minimum ₦500" error={amount < 500} />
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { sm: '1fr 1fr' } }}>
        <TextField label="Name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></Box>
      <Button size="large" variant="contained" color="secondary" disabled={bad || pending} onClick={() => setPending(true)}>Continue to Paystack</Button>
      <Alert severity="info">International cards give in ₦; your bank converts. {user ? 'This gift appears in your portal.' : 'No account needed.'}</Alert>
      <CheckoutDialog open={pending} label={cat} onDone={finish} />
    </Card>
  )
}
