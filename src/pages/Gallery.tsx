import { useState } from 'react'
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { CardGrid, Tile } from '../components/Tile'
import Reveal from '../components/Reveal'
import { useSite } from '../context/Site'
export default function Gallery() {
  const { albums } = useSite()
  const [id, setId] = useState<number | null>(null)
  const [big, setBig] = useState<number | null>(null)
  const al = albums.find((a: any) => a.id === id)
  const tile = (a: any, i: number) => (a.imgs[i] ? `url(${a.imgs[i]}) center/cover` : `linear-gradient(${i * 40}deg,${a.c},#0b1b5c)`)
  return (
    <>
      <CardGrid>{albums.map((g: any, i: number) => (
        <Reveal key={g.id} i={i}><Tile onClick={() => setId(g.id)}><Box sx={{ height: 150, borderRadius: 3, mb: 1.5, background: tile(g, 0) }} />
          <Typography fontWeight={800}>{g.title}</Typography><Typography color="text.secondary">{g.count} photos</Typography></Tile></Reveal>))}</CardGrid>
      <Dialog open={!!al} onClose={() => { setId(null); setBig(null) }} fullWidth maxWidth="md">
        <DialogTitle>{al?.title}</DialogTitle>
        <DialogContent>{al && (big !== null
          ? <Box onClick={() => setBig(null)} sx={{ height: 380, borderRadius: 3, cursor: 'zoom-out', background: tile(al, big).replace('center/cover', 'center/contain no-repeat') }} />
          : <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))' }}>{Array.from({ length: Math.max(al.imgs.length, 6) }).map((_, i) => (
            <Box key={i} onClick={() => setBig(i)} sx={{ height: 110, borderRadius: 2, cursor: 'zoom-in', background: tile(al, i) }} />))}</Box>)}</DialogContent>
      </Dialog>
    </>
  )
}
