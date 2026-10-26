import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
export default function Countdown({ at }: { at: number }) {
  const [n, setN] = useState(Date.now())
  useEffect(() => { const i = setInterval(() => setN(Date.now()), 1000); return () => clearInterval(i) }, [])
  const s = Math.max(0, Math.floor((at - n) / 1000))
  const parts: [string, number][] = [['Days', Math.floor(s / 86400)], ['Hrs', Math.floor((s % 86400) / 3600)], ['Min', Math.floor((s % 3600) / 60)], ['Sec', s % 60]]
  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>{parts.map(([l, v]) => (
      <Box key={l} sx={{ minWidth: 74, py: 1, textAlign: 'center', borderRadius: 50, bgcolor: 'rgba(255,255,255,.14)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.25)' }}>
        <Typography variant="h5" fontWeight={800}>{String(v).padStart(2, '0')}</Typography><Typography variant="caption">{l}</Typography></Box>))}</Box>
  )
}
