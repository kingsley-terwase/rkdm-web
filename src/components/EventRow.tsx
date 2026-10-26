import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { bg } from '../data/slides'
import { calendar } from '../data/calendar'
type Ev = typeof calendar[number]
export default function EventRow({ e, mine, onAct }: { e: Ev; mine?: boolean; onAct?: () => void }) {
  const full = e.reg >= e.cap && !mine
  return (
    <Box sx={{ display: 'grid', gap: 3, py: 3, borderBottom: 1, borderColor: 'divider', gridTemplateColumns: { xs: '64px 1fr', md: '90px 1fr 340px' } }}>
      <Box sx={{ textAlign: 'center' }}><Typography variant="caption" fontWeight={800} color="text.secondary">{e.wk}</Typography><Typography variant="h4" fontWeight={800}>{e.day}</Typography></Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{e.time} · {e.venue}</Typography>
        <Typography variant="h5" fontWeight={800} color="primary" sx={{ my: 0.5 }}>{e.title}</Typography>
        <Typography color="text.secondary">{e.desc}</Typography>
        <Box sx={{ mt: 1.5, display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {onAct ? <Button variant={mine ? 'outlined' : 'contained'} disabled={full} onClick={onAct}>{full ? 'Full' : mine ? 'Cancel registration' : 'Register'}</Button>
            : <Button component={Link} to="/events" variant="outlined">View details</Button>}
          <Typography variant="caption" color="text.secondary">{e.reg}/{e.cap} registered</Typography></Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' }, height: 190, borderRadius: 1, background: bg(e.img) }} />
    </Box>
  )
}
