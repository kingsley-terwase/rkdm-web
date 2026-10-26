import { Typography } from '@mui/material'
import { CardGrid, Tile } from '../components/Tile'
import Reveal from '../components/Reveal'
import { ministries } from '../data/demo'
export default function Ministries() {
  return (
    <>
      <CardGrid>{ministries.map((m, i) => <Reveal key={m.name} i={i}><Tile><Typography variant="h6" fontWeight={800}>{m.name}</Typography>
        <Typography color="text.secondary">Led by {m.leader}</Typography><Typography color="secondary" fontWeight={700}>{m.time}</Typography></Tile></Reveal>)}</CardGrid>
    </>
  )
}
