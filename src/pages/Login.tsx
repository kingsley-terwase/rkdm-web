import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, ButtonBase, Divider, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { ChevronRightRegular, EyeOffRegular, EyeRegular, LockClosedRegular, MailRegular } from '@fluentui/react-icons'
import { USERS, User } from '../data/demo'
import { useAuth } from '../context/Auth'
import { Anim, reduced } from '../components/Motion'

const NAVY = '#0b1b5c'
const INK = '#020614'
const GOLD = '#f5b301'

const initials = (n: string) => n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const from = (useLocation().state as any)?.from as string | undefined
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const dark = useTheme().palette.mode === 'dark'
  const go = (u: User) => { login(u); nav(from ?? (u.role === 'member' ? '/portal' : '/dashboard')) }
  const valid = /^\S+@\S+\.\S+$/.test(email) && pw.length >= 6

  // theme tokens
  const heading = dark ? '#ffffff' : NAVY
  const muted = dark ? 'rgba(255,255,255,.62)' : 'rgba(2,6,20,.6)'
  const fieldBg = dark ? 'rgba(255,255,255,.07)' : '#f3f5fb'
  const fieldBgFocus = dark ? 'rgba(255,255,255,.11)' : '#ffffff'
  const line = dark ? 'rgba(255,255,255,.14)' : 'rgba(11,27,92,.14)'
  const link = dark ? GOLD : NAVY

  const field = {
    '& .MuiInputLabel-root': { color: muted },
    '& .MuiInputLabel-root.Mui-focused': { color: dark ? GOLD : NAVY },
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px', bgcolor: fieldBg, color: heading, transition: 'box-shadow .2s, background-color .2s',
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: line },
      '&.Mui-focused': { bgcolor: fieldBgFocus, boxShadow: '0 0 0 4px rgba(245,179,1,.22)' },
      '&.Mui-focused fieldset': { borderColor: GOLD, borderWidth: 1.5 },
      // browser autofill: keep the field's own colours and rounded shape
      '& input:-webkit-autofill, & input:-webkit-autofill:focus': {
        WebkitBoxShadow: `0 0 0 100px ${dark ? '#161b33' : '#eef1fa'} inset`,
        WebkitTextFillColor: heading, caretColor: heading, borderRadius: 'inherit',
        transition: 'background-color 99999s ease-out',
      },
    },
    '& .MuiInputAdornment-root svg': { fontSize: 20, color: muted },
    '& .MuiIconButton-root': { color: muted },
  }

  return (
    <Anim variant="focus" duration={800}>
      <Box component="form" onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (valid) go(USERS[0]) }}
        sx={{ width: '100%', maxWidth: 420, mx: 'auto', display: 'grid', gap: 2.25 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color={heading}>Welcome back</Typography>
          <Box sx={{ width: 48, height: 4, borderRadius: 2, bgcolor: GOLD, my: 1.5 }} />
          <Typography sx={{ color: muted }}>Log in to follow your giving, sermons and community.</Typography>
        </Box>

        <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}
          autoComplete="email" fullWidth sx={field}
          InputProps={{ startAdornment: <InputAdornment position="start"><MailRegular /></InputAdornment> }} />
        <TextField label="Password" type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)}
          autoComplete="current-password" fullWidth sx={field}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockClosedRegular /></InputAdornment>,
            endAdornment: <InputAdornment position="end">
              <IconButton edge="end" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(s => !s)}>
                {show ? <EyeOffRegular /> : <EyeRegular />}
              </IconButton></InputAdornment>,
          }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
          <Typography component={Link} to="/forgot-password" variant="body2" fontWeight={700}
            sx={{ color: link, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Forgot password?</Typography>
        </Box>

        <Button type="submit" variant="contained" size="large" disabled={!valid} endIcon={<ChevronRightRegular />}
          sx={{
            height: 54, borderRadius: '14px', fontWeight: 800, textTransform: 'none', fontSize: 16,
            color: dark ? INK : '#fff',
            background: dark ? `linear-gradient(135deg,${GOLD},#ffcf40)` : `linear-gradient(135deg,${NAVY},#16298a)`,
            boxShadow: dark ? '0 12px 28px -12px rgba(245,179,1,.7)' : '0 12px 24px -10px rgba(11,27,92,.6)',
            transition: 'transform .2s, box-shadow .2s',
            '&:hover': { transform: 'translateY(-2px)' },
            '& .MuiButton-endIcon': { transition: 'transform .2s' },
            '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
            '&.Mui-disabled': { background: dark ? 'rgba(255,255,255,.1)' : '#e3e6f0', color: dark ? 'rgba(255,255,255,.4)' : '#9aa2bd', boxShadow: 'none' },
          }}>Log in</Button>

        <Typography variant="body2" textAlign="center" sx={{ color: muted }}>
          New to RKDM?{' '}
          <Typography component={Link} to="/register" variant="body2" fontWeight={800}
            sx={{ color: link, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Create an account</Typography>
        </Typography>

        <Divider sx={{ my: 0.5, fontSize: 13, color: muted, '&::before,&::after': { borderColor: line } }}>or explore a demo role</Divider>

        <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {USERS.map((u, i) => (
            <Anim key={u.label} variant="pop" delay={250 + i * 70} duration={600}>
              <ButtonBase onClick={() => go(u)} sx={[{
                width: '100%', justifyContent: 'flex-start', textAlign: 'left', gap: 1.25, p: 1.25, borderRadius: '14px',
                border: `1px solid ${line}`, bgcolor: dark ? 'rgba(255,255,255,.04)' : '#fff', transition: 'all .2s',
                '&:hover': { borderColor: GOLD, bgcolor: dark ? 'rgba(245,179,1,.08)' : '#fffaf0', transform: 'translateY(-2px)' },
                '&:focus-visible': { outline: `3px solid ${GOLD}`, outlineOffset: 2 },
              }, reduced] as any}>
                <Avatar sx={{ width: 36, height: 36, fontSize: 13, fontWeight: 800, bgcolor: dark ? GOLD : NAVY, color: dark ? INK : GOLD }}>{initials(u.name)}</Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={800} fontSize={14} color={heading} noWrap>{u.label}</Typography>
                  <Typography fontSize={12.5} sx={{ color: muted }} noWrap>{u.name}</Typography>
                </Box>
              </ButtonBase>
            </Anim>
          ))}
        </Box>
      </Box>
    </Anim>
  )
}