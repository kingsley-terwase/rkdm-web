import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Chip, Fade, IconButton, Typography } from '@mui/material'
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons'
import { bg } from '../data/slides'
import { useSite } from '../context/Site'
import Countdown from './Countdown'

interface PosterSlideBackground {
  img: string
  c?: string
}

const arrow = { position: 'absolute', top: '50%', bgcolor: 'rgba(0,0,0,.4)', color: '#fff', '&:hover': { bgcolor: 'secondary.main' } } as const

export default function PosterSlider() {
  const { slides } = useSite()
  const [i, setI] = useState<number>(0)
  const go = (n: number): void => setI((n + slides.length) % slides.length)

  useEffect(() => {
    const t = setInterval(() => setI((x: number) => (x + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [slides.length])

  if (!slides.length) return null
  const s = slides[i % slides.length]

  return (
    <Box sx={{ position: 'relative', height: { xs: 560, md: 640 }, width: '100vw', ml: 'calc(50% - 50vw)', mt: -3, overflow: 'hidden', color: '#fff', bgcolor: '#070d1f' }}>
      {slides.map((x: PosterSlideBackground, k: number) => <Box key={k} sx={{ position: 'absolute', inset: 0, background: bg(x.img, x.c), opacity: k === i ? 1 : 0, transform: k === i ? 'scale(1.07)' : 'scale(1)', transition: 'opacity 1.2s, transform 9s ease-out' }} />)}
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(11,27,92,.92),rgba(7,13,31,.45) 60%,rgba(7,13,31,.2)),linear-gradient(0deg,rgba(7,13,31,.85),transparent 45%)' }} />
      <Box sx={{ position: 'relative', maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 10 }, height: '100%', display: 'flex', alignItems: 'center' }}>
        <Fade in key={i} timeout={1000}>
          <Box sx={{ maxWidth: 700, display: 'grid', gap: 2.5 }}>
            <Box><Chip label={s.tag} color="secondary" sx={{ fontWeight: 800 }} /> <Chip label={s.date} sx={{ bgcolor: '#f5b301', fontWeight: 800 }} /></Box>
            <Typography component="h1" fontWeight={800} sx={{ fontSize: { xs: 40, md: 72 }, lineHeight: 1.02, textTransform: 'uppercase', textShadow: '0 4px 24px rgba(0,0,0,.5)' }}>{s.title}</Typography>
            <Typography sx={{ fontSize: { xs: 16, md: 20 }, opacity: 0.92 }}>{s.sub}</Typography>
            <Countdown at={s.at} />
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button component={Link} to={s.to} size="large" variant="contained" color="secondary" sx={{ px: 4 }}>{s.cta}</Button>
              <Button component={Link} to="/events" size="large" variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)' }}>Full calendar</Button></Box>
          </Box>
        </Fade>
      </Box>
      <IconButton onClick={() => go(i - 1)} sx={{ ...arrow, left: 16 }} aria-label="Previous"><ChevronLeftRegular /></IconButton>
      <IconButton onClick={() => go(i + 1)} sx={{ ...arrow, right: { xs: 16, md: 120 } }} aria-label="Next"><ChevronRightRegular /></IconButton>
      <Box sx={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', display: { xs: 'none', md: 'grid' }, gap: 1.5 }}>
        {slides.map((x: PosterSlideBackground, k: number) =>
          <Box key={k} onClick={() => setI(k)} sx={{ width: 72, height: 72, borderRadius: '50%', cursor: 'pointer', background: bg(x.img, x.c), border: k === i ? '3px solid #f97316' : '3px solid rgba(255,255,255,.6)', opacity: k === i ? 1 : 0.7, transition: '.3s', '&:hover': { transform: 'scale(1.1)' } }} />)}
      </Box>
    </Box>
  )
}