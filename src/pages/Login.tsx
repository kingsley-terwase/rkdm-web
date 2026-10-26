import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Divider, TextField, Typography } from '@mui/material'
import { USERS, User } from '../data/demo'
import { useAuth } from '../context/Auth'
export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const from = (useLocation().state as any)?.from as string | undefined
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const go = (u: User) => { login(u); nav(from ?? (u.role === 'member' ? '/portal' : '/dashboard')) }
  return (
    <Card sx={{ p: 3, maxWidth: 440, mx: 'auto', display: 'grid', gap: 2 }}>
      <Typography variant="h4" fontWeight={800}>Welcome back</Typography>
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
      <TextField label="Password" type="password" value={pw} onChange={e => setPw(e.target.value)} autoComplete="current-password" />
      <Button variant="contained" disabled={!/^\S+@\S+\.\S+$/.test(email) || pw.length < 6} onClick={() => go(USERS[0])}>Log in</Button>
      <Typography variant="body2"><Link to="/forgot-password">Forgot password?</Link> · <Link to="/register">Create account</Link></Typography>
      <Divider>Demo roles</Divider><Alert severity="info">See each role’s permissions in action.</Alert>
      {USERS.map(u => <Button key={u.label} variant="outlined" onClick={() => go(u)}>{u.label} · {u.name}</Button>)}
    </Card>
  )
}
