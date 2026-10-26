import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Card, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { USERS } from '../data/demo'
import { useAuth } from '../context/Auth'
export default function Register() {
  const [f, setF] = useState({ first: '', last: '', email: '', pw: '', pw2: '' })
  const [terms, setTerms] = useState(false)
  const [news, setNews] = useState(false)
  const [sent, setSent] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value })
  const bad = !f.first || !f.last || !/^\S+@\S+\.\S+$/.test(f.email) || f.pw.length < 10 || f.pw !== f.pw2 || !terms
  if (sent) return (
    <Card sx={{ p: 4, maxWidth: 460, mx: 'auto', display: 'grid', gap: 2 }}>
      <Typography variant="h5" fontWeight={800}>Verify your email</Typography>
      <Alert severity="success">We sent a link to {f.email}. It is valid for 24 hours.</Alert>
      <Button variant="contained" onClick={() => { login({ ...USERS[0], name: `${f.first} ${f.last}` }); nav('/portal') }}>Simulate clicking the link</Button>
      <Button onClick={() => setSent(false)}>Resend link</Button>
    </Card>)
  return (
    <Card sx={{ p: 3, maxWidth: 520, mx: 'auto', display: 'grid', gap: 2 }}>
      <Typography variant="h4" fontWeight={800}>Create account</Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { sm: '1fr 1fr' } }}><TextField label="First name" value={f.first} onChange={set('first')} /><TextField label="Last name" value={f.last} onChange={set('last')} /></Box>
      <TextField label="Email" value={f.email} onChange={set('email')} />
      <TextField label="Password" type="password" value={f.pw} onChange={set('pw')} helperText="At least 10 characters" error={!!f.pw && f.pw.length < 10} />
      <TextField label="Confirm password" type="password" value={f.pw2} onChange={set('pw2')} error={!!f.pw2 && f.pw !== f.pw2} />
      <FormControlLabel control={<Checkbox checked={terms} onChange={e => setTerms(e.target.checked)} />} label={<span>I accept the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link></span>} />
      <FormControlLabel control={<Checkbox checked={news} onChange={e => setNews(e.target.checked)} />} label="Send me the newsletter" />
      <Button variant="contained" disabled={bad} onClick={() => setSent(true)}>Register</Button>
    </Card>
  )
}
