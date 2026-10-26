import { Avatar, Typography } from '@mui/material'
import { CardGrid, Tile } from '../components/Tile'
import Reveal from '../components/Reveal'
import { leaders } from '../data/demo'
const blocks = [['Mission', 'To raise a royal priesthood who demonstrate God’s dominion in every sphere of life.'],
  ['Vision', 'A global community of believers walking in power, purity and purpose.'], ['History', 'Founded in prayer, RKDM has grown from a living-room fellowship into a multi-nation ministry.']]
export default function About() {
  return (
    <>
      <CardGrid>{blocks.map(([t, b], i) => <Reveal key={t} i={i}><Tile><Typography variant="h6" fontWeight={800}>{t}</Typography><Typography color="text.secondary">{b}</Typography></Tile></Reveal>)}</CardGrid>
      <Typography variant="h4" fontWeight={800} sx={{ my: 3 }}>Leadership</Typography>
      <CardGrid>{leaders.map((l, i) => <Reveal key={l.name} i={i}><Tile><Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: 'primary.main' }}>{l.name[0]}</Avatar>
      <Typography fontWeight={800}>{l.name}</Typography><Typography color="text.secondary">{l.title}</Typography></Tile></Reveal>)}</CardGrid>
    </>
  )
}
