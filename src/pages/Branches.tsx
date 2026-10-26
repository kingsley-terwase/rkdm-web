import { useState } from 'react'
import { Box, Button, Card, Chip, TextField, Typography } from '@mui/material'
import { LocationRegular, PhoneRegular, ClockRegular } from '@fluentui/react-icons'
import { useSite } from '../context/Site'
export default function Branches() {
  const { branches } = useSite()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const list = branches.filter((b: any) => JSON.stringify(b).toLowerCase().includes(q.toLowerCase()))
  const cur = list[sel] ?? list[0]
  const place = cur ? encodeURIComponent(`${cur.address}, ${cur.city}`) : ''
  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '1fr 1.4fr' } }}>
      <Box sx={{ display: 'grid', gap: 1.5, alignContent: 'start' }}>
        <TextField label="Search city, country or branch" value={q} onChange={e => { setQ(e.target.value); setSel(0) }} />
        {list.map((b: any, i: number) => (
          <Card key={b.name} onClick={() => setSel(i)} sx={{ p: 2, cursor: 'pointer', borderColor: cur?.name === b.name ? 'secondary.main' : undefined, borderWidth: 2, transition: '.2s', '&:hover': { transform: 'translateX(4px)' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography fontWeight={800}>{b.name}</Typography><Chip size="small" label={b.country} /></Box>
            <Typography variant="body2" color="text.secondary">{b.city} · {b.pastor}</Typography></Card>))}
        {list.length === 0 && <Typography color="text.secondary">No branch found.</Typography>}
      </Box>
      {cur && (
        <Card sx={{ overflow: 'hidden', alignSelf: 'start' }}>
          <Box component="iframe" title="Map" src={`https://www.google.com/maps?q=${place}&output=embed`} loading="lazy" sx={{ border: 0, width: '100%', height: 360 }} />
          <Box sx={{ p: 3, display: 'grid', gap: 1 }}>
            <Typography variant="h5" fontWeight={800}>{cur.name}</Typography>
            <Typography sx={{ display: 'flex', gap: 1 }}><LocationRegular />{cur.address}</Typography>
            <Typography sx={{ display: 'flex', gap: 1 }}><ClockRegular />{cur.time}</Typography>
            <Typography sx={{ display: 'flex', gap: 1 }}><PhoneRegular />{cur.phone}</Typography>
            <Box><Button variant="contained" component="a" href={`https://www.google.com/maps/dir/?api=1&destination=${place}`} target="_blank" rel="noopener noreferrer">Get directions</Button></Box>
          </Box>
        </Card>)}
    </Box>
  )
}
