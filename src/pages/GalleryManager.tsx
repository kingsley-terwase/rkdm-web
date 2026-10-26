import { useState } from 'react'
import { Alert, Box, Button, Card, Chip, IconButton, LinearProgress, Snackbar, TextField, Typography } from '@mui/material'
import { CloudArrowUpRegular, DeleteRegular, StarRegular } from '@fluentui/react-icons'
import Guard from '../components/Guard'
import PageHeader from '../components/PageHeader'
import { useSite } from '../context/Site'
import { useActivity } from '../context/Activity'
interface Up { name: string; url: string; p: number }
export default function GalleryManager() {
  const { albums, setAlbums } = useSite()
  const { log } = useActivity()
  const [sel, setSel] = useState<number>(albums[0].id)
  const [up, setUp] = useState<Up[]>([])
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')
  const al = albums.find((a: any) => a.id === sel) ?? albums[0]
  const patch = (fn: (a: any) => any) => setAlbums((l: any[]) => l.map(a => (a.id === sel ? fn(a) : a)))
  const onFiles = (files: FileList | null) => {
    if (!files) return
    const all = [...files]
    const ok = all.filter(f => /^image\/(jpeg|png|webp)$/.test(f.type) && f.size <= 5 * 1024 * 1024)
    if (ok.length < all.length) setMsg(`${all.length - ok.length} file(s) skipped (JPG, PNG or WebP, max 5 MB)`)
    const items = ok.map(f => ({ name: f.name, url: URL.createObjectURL(f), p: 0 }))
    setUp(u => [...u, ...items]); if (items.length) log('gallery.upload', `${items.length} images → ${al.title}`)
    items.forEach(it => {
      const t = setInterval(() => setUp(u => u.map(x => (x.url === it.url ? { ...x, p: Math.min(100, x.p + 10 + Math.random() * 10) } : x))), 200)
      setTimeout(() => { clearInterval(t); setUp(u => u.filter(x => x.url !== it.url)); patch(a => ({ ...a, imgs: [...a.imgs, it.url], count: a.count + 1 })) }, 2000 + Math.random() * 1200)
    })
  }
  return (
    <Guard perm="gallery.manage">
      <PageHeader title="Gallery albums" sub="Bulk-upload images with progress, set a cover and remove photos." />
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
        {albums.map((a: any) => <Chip key={a.id} label={`${a.title} (${a.count})`} clickable color={a.id === sel ? 'primary' : 'default'} onClick={() => setSel(a.id)} sx={{ fontWeight: 700 }} />)}
        <TextField size="small" placeholder="New album name" value={title} onChange={e => setTitle(e.target.value)} />
        <Button disabled={!title} onClick={() => { const id = Date.now(); setAlbums([...albums, { id, title, count: 0, c: '#1546d6', imgs: [] }]); setSel(id); setTitle(''); log('gallery.create', title) }}>Create album</Button>
      </Box>
      <Card component="label" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onFiles(e.dataTransfer.files) }}
        sx={{ display: 'grid', placeItems: 'center', gap: 1, p: 5, mb: 2, cursor: 'pointer', borderStyle: 'dashed', borderWidth: 2, textAlign: 'center', '&:hover': { borderColor: 'primary.main' } }}>
        <CloudArrowUpRegular fontSize={44} color="#1546d6" /><Typography fontWeight={800}>Drop images here or click to browse</Typography>
        <Typography variant="body2" color="text.secondary">Uploading to “{al.title}” · JPG, PNG, WebP · max 5 MB each</Typography>
        <input hidden multiple type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { onFiles(e.target.files); e.target.value = '' }} />
      </Card>
      {up.map(u => <Card key={u.url} sx={{ p: 1.5, mb: 1, display: 'flex', gap: 2, alignItems: 'center' }}><Box component="img" src={u.url} alt="" sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover' }} />
        <Box sx={{ flex: 1 }}><Typography variant="body2" noWrap>{u.name}</Typography><LinearProgress variant="determinate" value={u.p} sx={{ borderRadius: 9, mt: 0.5 }} /></Box><Typography variant="caption">{Math.round(u.p)}%</Typography></Card>)}
      {al.imgs.length === 0 && up.length === 0 && <Alert severity="info">No photos yet. Upload some to see them in the public gallery.</Alert>}
      <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))' }}>{al.imgs.map((u: string, i: number) => (
        <Box key={u} sx={{ position: 'relative', height: 140, borderRadius: 2, overflow: 'hidden', background: `url(${u}) center/cover` }}>
          {i === 0 && <Chip size="small" color="secondary" label="Cover" sx={{ position: 'absolute', top: 6, left: 6 }} />}
          <Box sx={{ position: 'absolute', bottom: 4, right: 4, bgcolor: 'rgba(0,0,0,.55)', borderRadius: 2 }}>
            <IconButton size="small" sx={{ color: '#fff' }} aria-label="Set cover" onClick={() => patch(a => ({ ...a, imgs: [u, ...a.imgs.filter((x: string) => x !== u)] }))}><StarRegular /></IconButton>
            <IconButton size="small" sx={{ color: '#fff' }} aria-label="Delete" onClick={() => patch(a => ({ ...a, imgs: a.imgs.filter((x: string) => x !== u), count: a.count - 1 }))}><DeleteRegular /></IconButton></Box></Box>))}</Box>
      <Snackbar open={!!msg} autoHideDuration={3000} onClose={() => setMsg('')} message={msg} />
    </Guard>
  )
}
