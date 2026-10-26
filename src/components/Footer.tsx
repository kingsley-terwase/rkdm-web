import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material'
const cols = [['Quick links', [['About us', '/p/genesis'], ['Events', '/events'], ['Sermons', '/resources'], ['Give', '/give'], ['Contact', '/contact']]],
  ['Community', [['Ministries', '/ministries'], ['Membership', '/register'], ['Welfare', '/p/welfare'], ['Home church', '/p/home-church']]]] as const
export default function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  return (
    <Box component="footer" sx={{ mt: 8, color: '#dbe6ff', background: 'linear-gradient(160deg,#071040,#0b1b5c)' }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3, py: 7, display: 'grid', gap: 5, gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr 1.4fr' } }}>
        <Box><Box component="img" src="/logo.png" alt="RKDM" sx={{ height: 100 }} />
          <Typography sx={{ mt: 1.5, opacity: 0.85 }}>A global family walking in royal dominion, set on fire by the Word and led by the Holy Spirit.</Typography></Box>
        {cols.map(([t, ls]) => <Box key={t}><Typography fontWeight={800} sx={{ color: '#f5b301', mb: 1.5 }}>{t}</Typography>
          {ls.map(([l, to]) => <Typography key={l} component={Link} to={to} sx={{ display: 'block', textDecorationStyle: 'none', py: 0.4, color: '#fff', opacity: 0.9, '&:hover': { color: '#f97316' } }}>{l}</Typography>)}</Box>)}
        <Box><Typography fontWeight={800} sx={{ color: '#f5b301', mb: 1.5 }}>Stay connected</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}><TextField size="small" fullWidth placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} sx={{ bgcolor: '#fff', borderRadius: 2 }} />
            <Button variant="contained" color="secondary" disabled={!/^\S+@\S+\.\S+$/.test(email)} onClick={() => { setMsg('Check your inbox to confirm'); setEmail('') }}>Join</Button></Box>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>info@rkdm.org · Abuja, Nigeria</Typography></Box>
      </Box>
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,.15)', py: 2, textAlign: 'center', fontSize: 14 }}>© 2026 Royal Kingdom Dominion Ministry Intl · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></Box>
      <Snackbar open={!!msg} autoHideDuration={3000} onClose={() => setMsg('')} message={msg} />
    </Box>
  )
}
