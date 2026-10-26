import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Card, Fab, MenuItem, Popover, Select, Typography } from '@mui/material'
import { ChatRegular } from '@fluentui/react-icons'
export default function FloatingWidgets() {
  const [a, setA] = useState<HTMLElement | null>(null)
  const [lang, setLang] = useState('EN')
  return (
    <>
      <Select size="small" value={lang} onChange={e => setLang(e.target.value)} sx={{ position: 'fixed', left: 16, bottom: 16, zIndex: 1200, bgcolor: 'background.paper', fontWeight: 800, boxShadow: 4 }}>
        {['EN', 'FR', 'HA', 'YO', 'IG'].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}</Select>
      <Fab color="primary" onClick={e => setA(e.currentTarget)} aria-label="Chat" sx={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1200 }}><ChatRegular fontSize={26} /></Fab>
      <Popover open={!!a} anchorEl={a} onClose={() => setA(null)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Card sx={{ p: 2.5, width: 270, display: 'grid', gap: 1.5 }}>
          <Typography fontWeight={800}>Hello 👋 How can we help?</Typography>
          <Button component={Link} to="/new-here" variant="outlined" onClick={() => setA(null)}>Plan a visit</Button>
          <Button component={Link} to="/p/foreign-desk" variant="outlined" onClick={() => setA(null)}>Foreign desk</Button>
          <Button component={Link} to="/contact" variant="contained" onClick={() => setA(null)}>Talk to us</Button>
          <Box />
        </Card>
      </Popover>
    </>
  )
}
