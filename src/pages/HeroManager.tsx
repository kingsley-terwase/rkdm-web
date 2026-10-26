import { useState } from 'react'
import { Box, Button, Card, IconButton, Snackbar, TextField } from '@mui/material'
import { AddRegular, ArrowDownRegular, ArrowUpRegular, DeleteRegular } from '@fluentui/react-icons'
import Guard from '../components/Guard'
import PageHeader from '../components/PageHeader'
import { Slide, useSite } from '../context/Site'
import { useActivity } from '../context/Activity'
import { bg, stock } from '../data/slides'
const F = [['tag', 'Tag'], ['title', 'Title'], ['sub', 'Subtitle'], ['date', 'Date label'], ['cta', 'Button text'], ['to', 'Button link'], ['img', 'Image URL']] as const
export default function HeroManager() {
  const { slides, setSlides } = useSite()
  const { log } = useActivity()
  const [msg, setMsg] = useState('')
  const set = (i: number, p: Partial<Slide>) => setSlides(slides.map((s: Slide, k: number) => (k === i ? { ...s, ...p } : s)))
  const move = (i: number, d: number) => { const a = [...slides]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setSlides(a) }
  const add = () => setSlides([...slides, { tag: 'New program', title: 'New slide', sub: 'Describe the program', date: 'Date', at: Date.now() + 7 * 864e5, cta: 'Learn more', to: '/events', img: stock[0], c: '#1546d6' }])
  return (
    <Guard perm="content.manage">
      <PageHeader title="Home hero slides" sub="Changes appear on the home page instantly. Reorder, edit or remove programs.">
        <Button variant="outlined" startIcon={<AddRegular />} onClick={add}>Add slide</Button>
        <Button variant="contained" onClick={() => { log('hero.update', `${slides.length} slides`); setMsg('Hero slides published and logged') }}>Publish</Button></PageHeader>
      <Box sx={{ display: 'grid', gap: 2 }}>{slides.map((s: Slide, i: number) => (
        <Card key={i} sx={{ p: 2, display: 'grid', gap: 2, gridTemplateColumns: { md: '140px 1fr auto' }, alignItems: 'start' }}>
          <Box sx={{ height: 100, borderRadius: 2, background: bg(s.img, s.c) }} />
          <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { sm: '1fr 1fr' } }}>
            {F.map(([k, l]) => <TextField key={k} size="small" label={l} value={s[k]} onChange={e => set(i, { [k]: e.target.value })} sx={k === 'img' || k === 'sub' ? { gridColumn: { sm: '1 / -1' } } : undefined} />)}
            <TextField size="small" type="number" label="Countdown (days from now)" value={Math.max(0, Math.round((s.at - Date.now()) / 864e5))} onChange={e => set(i, { at: Date.now() + Number(e.target.value) * 864e5 })} />
          </Box>
          <Box sx={{ display: 'flex', md: { flexDirection: 'column' } } as any}>
            <IconButton aria-label="Up" onClick={() => move(i, -1)}><ArrowUpRegular /></IconButton><IconButton aria-label="Down" onClick={() => move(i, 1)}><ArrowDownRegular /></IconButton>
            <IconButton aria-label="Delete" color="error" onClick={() => setSlides(slides.filter((_: Slide, k: number) => k !== i))}><DeleteRegular /></IconButton></Box>
        </Card>))}</Box>
      <Snackbar open={!!msg} autoHideDuration={2500} onClose={() => setMsg('')} message={msg} />
    </Guard>
  )
}
