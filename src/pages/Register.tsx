import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { ChevronRightRegular, EyeOffRegular, EyeRegular, LockClosedRegular, MailRegular, PersonRegular } from '@fluentui/react-icons'
import { USERS } from '../data/demo'
import { useAuth } from '../context/Auth'
import { Anim } from '../components/Motion'

const NAVY = '#0b1b5c'
const INK = '#020614'
const GOLD = '#f5b301'

export default function Register() {
  const [f, setF] = useState({ first: '', last: '', email: '', pw: '', pw2: '' })
  const [terms, setTerms] = useState(false)
  const [news, setNews] = useState(false)
  const [sent, setSent] = useState(false)
  const [show, setShow] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()
  const dark = useTheme().palette.mode === 'dark'
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value })

  const emailOk = /^\S+@\S+\.\S+$/.test(f.email)
  const pwShort = !!f.pw && f.pw.length < 10
  const pwMismatch = !!f.pw2 && f.pw !== f.pw2
  const bad = !f.first || !f.last || !emailOk || f.pw.length < 10 || f.pw !== f.pw2 || !terms

  // theme tokens (same as Login)
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
      borderRadius: '12px', bgcolor: fieldBg, color: heading, transition: 'box-shadow .2s, background-color .2s',
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: line },
      '&.Mui-focused': { bgcolor: fieldBgFocus, boxShadow: '0 0 0 4px rgba(245,179,1,.22)' },
      '&.Mui-focused fieldset': { borderColor: GOLD, borderWidth: 1.5 },
      '&.Mui-error fieldset': { borderColor: '#e5484d' },
      '& input:-webkit-autofill, & input:-webkit-autofill:focus': {
        WebkitBoxShadow: `0 0 0 100px ${dark ? '#161b33' : '#eef1fa'} inset`,
        WebkitTextFillColor: heading, caretColor: heading, borderRadius: 'inherit',
        transition: 'background-color 99999s ease-out',
      },
    },
    '& .MuiInputAdornment-root svg': { fontSize: 20, color: muted },
    '& .MuiIconButton-root': { color: muted },
    // tighter inputs on short screens so the whole form fits without scrolling
    '@media (max-height: 820px)': { '& .MuiOutlinedInput-input': { py: '12px' } },
    '@media (max-height: 700px)': { '& .MuiOutlinedInput-input': { py: '14px' } },
  }

  const eye = (
    <InputAdornment position="end">
      <IconButton edge="end" aria-label={show ? 'Hide passwords' : 'Show passwords'} onClick={() => setShow(s => !s)}>
        {show ? <EyeOffRegular /> : <EyeRegular />}
      </IconButton>
    </InputAdornment>
  )

  const primaryBtn = {
    height: 'clamp(46px,6.4vh,54px)', borderRadius: '14px', fontWeight: 800, textTransform: 'none', fontSize: 16,
    color: dark ? INK : '#fff',
    background: dark ? `linear-gradient(135deg,${GOLD},#ffcf40)` : `linear-gradient(135deg,${NAVY},#16298a)`,
    boxShadow: dark ? '0 12px 28px -12px rgba(245,179,1,.7)' : '0 12px 24px -10px rgba(11,27,92,.6)',
    transition: 'transform .2s, box-shadow .2s',
    '&:hover': { transform: 'translateY(-2px)' },
    '& .MuiButton-endIcon': { transition: 'transform .2s' },
    '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
    '&.Mui-disabled': { background: dark ? 'rgba(255,255,255,.1)' : '#e3e6f0', color: dark ? 'rgba(255,255,255,.4)' : '#9aa2bd', boxShadow: 'none' },
  } as const

  const checkSx = {
    m: 0, alignItems: 'center',
    '& .MuiCheckbox-root': { color: muted, py: 0.5, '&.Mui-checked': { color: dark ? GOLD : NAVY } },
    '& .MuiFormControlLabel-label': { fontSize: 14, color: muted },
  }
  const inlineLink = { color: link, fontWeight: 700, textDecoration: 'none' } as const

  if (sent) return (
    <Anim variant="focus" duration={800}>
      <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', display: 'grid', gap: 2.25 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color={heading}>Verify your email</Typography>
          <Box sx={{ width: 48, height: 4, borderRadius: 2, bgcolor: GOLD, my: 1.5 }} />
          <Typography sx={{ color: muted }}>One last step before you can log in.</Typography>
        </Box>
        <Alert severity="success" sx={{ borderRadius: '14px' }}>We sent a link to {f.email}. It is valid for 24 hours.</Alert>
        <Button variant="contained" size="large" endIcon={<ChevronRightRegular />} sx={primaryBtn}
          onClick={() => { login({ ...USERS[0], name: `${f.first} ${f.last}` }); nav('/portal') }}>
          Simulate clicking the link
        </Button>
        <Button onClick={() => setSent(false)} sx={{ textTransform: 'none', fontWeight: 700, color: link }}>Resend link</Button>
      </Box>
    </Anim>
  )

  return (
    <Anim variant="focus" duration={800}>
      <Box component="form" onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (!bad) setSent(true) }}
        sx={{ width: '100%', maxWidth: 460, mx: 'auto', display: 'grid', gap: 'clamp(12px,1.9vh,18px)' }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color={heading}>Create account</Typography>
          <Box sx={{ width: 48, height: 4, borderRadius: 2, bgcolor: GOLD, my: 1.5 }} />
          <Typography sx={{ color: muted }}>Join RKDM to manage your giving, sermons and community.</Typography>
        </Box>

        {/* row of two */}
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          <TextField label="First name" value={f.first} onChange={set('first')} autoComplete="given-name" sx={field}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonRegular /></InputAdornment> }} />
          <TextField label="Last name" value={f.last} onChange={set('last')} autoComplete="family-name" sx={field}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonRegular /></InputAdornment> }} />
        </Box>

        {/* full width */}
        <TextField label="Email" type="email" value={f.email} onChange={set('email')} autoComplete="email" fullWidth sx={field}
          error={!!f.email && !emailOk}
          InputProps={{ startAdornment: <InputAdornment position="start"><MailRegular /></InputAdornment> }} />

        {/* row of two */}
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          <TextField label="Password" type={show ? 'text' : 'password'} value={f.pw} onChange={set('pw')}
            autoComplete="new-password" error={pwShort} sx={field}
            InputProps={{ startAdornment: <InputAdornment position="start"><LockClosedRegular /></InputAdornment>, endAdornment: eye }} />
          <TextField label="Confirm password" type={show ? 'text' : 'password'} value={f.pw2} onChange={set('pw2')}
            autoComplete="new-password" error={pwMismatch} sx={field}
            InputProps={{ startAdornment: <InputAdornment position="start"><LockClosedRegular /></InputAdornment> }} />
        </Box>
        <Typography variant="caption" sx={{ mt: -1, color: pwShort || pwMismatch ? '#e5484d' : muted }}>
          {pwMismatch ? 'Passwords do not match.' : 'Use at least 10 characters.'}
        </Typography>

        <Box sx={{ display: 'grid', gap: 0 }}>
          <FormControlLabel sx={checkSx} control={<Checkbox checked={terms} onChange={e => setTerms(e.target.checked)} />}
            label={<span>I accept the <Link to="/terms" style={inlineLink}>Terms</Link> and <Link to="/privacy" style={inlineLink}>Privacy Policy</Link></span>} />
          <FormControlLabel sx={checkSx} control={<Checkbox checked={news} onChange={e => setNews(e.target.checked)} />}
            label="Send me the newsletter" />
        </Box>

        <Button type="submit" variant="contained" size="large" disabled={bad} endIcon={<ChevronRightRegular />} sx={primaryBtn}>
          Register
        </Button>

        <Typography variant="body2" textAlign="center" sx={{ color: muted }}>
          Already have an account?{' '}
          <Typography component={Link} to="/login" variant="body2" fontWeight={800}
            sx={{ color: link, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Log in</Typography>
        </Typography>
      </Box>
    </Anim>
  )
}