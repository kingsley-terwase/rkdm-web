import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Box, Button, Card, TextField, Typography } from '@mui/material'
import { bg, stock } from '../data/slides'
import { CardGrid, Tile } from '../components/Tile'
import Legal from './Legal'
const P: Record<string, { t: string; b: string; i: number; form?: boolean }> = {
  genesis: { t: 'Our Story', b: 'RKDM began as a small prayer fellowship and grew by the power of the Word and the Spirit into a global ministry restoring lives and destinies.', i: 0 },
  mandate: { t: 'The Mandate', b: 'To demonstrate the Kingdom of God in power, raising a generation that rules in every sphere of life.', i: 1 },
  mission: { t: 'The Mission', b: 'Preach the gospel, make disciples, heal the broken and establish believers in Kingdom dominion across nations.', i: 2 },
  vision: { t: 'The Vision', b: 'A global community of believers walking in power, purity and purpose, with the fire of God burning in every home.', i: 3 },
  goal: { t: 'The Goal', b: 'To see every member mature in Christ, effective in service and prosperous in destiny.', i: 4 },
  welfare: { t: 'Welfare', b: 'We support widows, orphans and families in need through food drives, medical outreaches and education grants.', i: 1 },
  'home-church': { t: 'Home Church', b: 'Meet weekly in a small group near you for prayer, the Word and fellowship. Join a home church from your member portal.', i: 3 },
  'foreign-desk': { t: 'Foreign Desk', b: 'Visiting from abroad? Our team will help with accommodation, transport and a warm welcome.', i: 0, form: true },
  'within-nigeria': { t: 'Visiting from within Nigeria', b: 'Planning to attend a program? Tell us your dates and we will assist you.', i: 2, form: true },
  prayer: { t: 'Prayer Request', b: 'Share your need and our intercessors will stand with you in prayer.', i: 1, form: true },
  testimonies: { t: 'Testimonies', b: 'Lives changed by the power of God.', i: 4 },
}
const tests = [['Healed after 10 years', 'Grace A.'], ['Debt-free miracle', 'Samuel O.'], ['Restored marriage', 'Ruth & Daniel']]
export default function InfoPage() {
  const p = P[useParams().slug ?? '']
  const [sent, setSent] = useState(false)
  if (!p) return <Legal title="404 · Page not found" />
  return (
    <>
      <Box sx={{ borderRadius: 5, p: { xs: 4, md: 8 }, color: '#fff', mb: 4, background: `linear-gradient(90deg,rgba(7,13,31,.85),rgba(7,13,31,.3)),${bg(stock[p.i])}` }}>
        <Typography variant="h2" fontWeight={800} sx={{ fontSize: { xs: 36, md: 56 } }}>{p.t}</Typography><Typography sx={{ mt: 1, maxWidth: 560, opacity: 0.9 }}>{p.b}</Typography></Box>
      {p.t === 'Testimonies' && <CardGrid>{tests.map(([a, b]) => <Tile key={a}><Typography variant="h6" fontWeight={800}>{a}</Typography><Typography color="text.secondary">{b}</Typography></Tile>)}</CardGrid>}
      {p.form && (sent ? <Alert severity="success">Request received. Our team will contact you shortly.</Alert> :
        <Card sx={{ p: 3, maxWidth: 560, display: 'grid', gap: 2 }}><Typography variant="h6" fontWeight={800}>Assistance form</Typography>
          <TextField label="Full name" /><TextField label="Email" /><TextField label="Arrival date" type="date" InputLabelProps={{ shrink: true }} /><TextField label="How can we help?" multiline minRows={3} />
          <Button variant="contained" onClick={() => setSent(true)}>Submit request</Button></Card>)}
    </>
  )
}
