import { useState } from 'react'
import { Box, Button, Card, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import Guard from '../components/Guard'
import PageHeader from '../components/PageHeader'
import RichText from '../components/RichText'
import { clean, useSite } from '../context/Site'
import { useActivity } from '../context/Activity'
const labels: Record<string, string> = { welcome: 'Home · Welcome message', privacy: 'Privacy Policy', terms: 'Terms of Use' }
export default function ContentEditor() {
  const { pages, setPages } = useSite()
  const { log } = useActivity()
  const [key, setKey] = useState('welcome')
  const [draft, setDraft] = useState<string>(pages.welcome)
  const [msg, setMsg] = useState('')
  const pick = (k: string) => { setKey(k); setDraft(pages[k]) }
  const publish = () => { setPages({ ...pages, [key]: clean(draft) }); log('content.update', labels[key]); setMsg('Published. The public page now shows this content.') }
  return (
    <Guard perm="content.manage">
      <PageHeader title="Page content" sub="Edit with the rich-text editor. Content is sanitised before it is saved.">
        <Button variant="contained" onClick={publish}>Publish changes</Button></PageHeader>
      <TextField select size="small" label="Section" value={key} onChange={e => pick(e.target.value)} sx={{ mb: 2, minWidth: 260 }}>{Object.keys(labels).map(k => <MenuItem key={k} value={k}>{labels[k]}</MenuItem>)}</TextField>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { lg: '1fr 1fr' } }}>
        <RichText value={draft} onChange={setDraft} />
        <Card sx={{ p: 3 }}><Typography variant="caption" color="text.secondary">LIVE PREVIEW (sanitised)</Typography>
          <Box dangerouslySetInnerHTML={{ __html: clean(draft) }} sx={{ '& img': { maxWidth: '100%' } }} /></Card>
      </Box>
      <Snackbar open={!!msg} autoHideDuration={3000} onClose={() => setMsg('')} message={msg} />
    </Guard>
  )
}
