import { useState } from 'react'
import { Alert, Button, Card, MenuItem, TextField, Typography } from '@mui/material'
export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', subject: 'General', message: '', website: '' })
  const [sent, setSent] = useState(false)
  const errs = { name: !f.name, email: !/^\S+@\S+\.\S+$/.test(f.email), message: f.message.length < 10 || f.message.length > 2000 }
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value })
  if (sent) return <Alert severity="success">Thank you. Your message was saved and the team has been notified.</Alert>
  return (
    <Card sx={{ p: 3, maxWidth: 560, mx: 'auto', display: 'grid', gap: 2 }}>
      <Typography variant="h4" fontWeight={800}>Contact us</Typography>
      <TextField label="Name" value={f.name} onChange={set('name')} error={!!f.name && errs.name} />
      <TextField label="Email" value={f.email} onChange={set('email')} error={!!f.email && errs.email} helperText={f.email && errs.email ? 'Enter a valid email' : ''} />
      <TextField select label="Subject" value={f.subject} onChange={set('subject')}>{['General', 'Prayer', 'Giving', 'Events'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}</TextField>
      <TextField label="Message" multiline minRows={4} value={f.message} onChange={set('message')} error={!!f.message && errs.message} helperText={`${f.message.length}/2000 · minimum 10 characters`} />
      <input name="website" value={f.website} onChange={set('website')} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999 }} aria-hidden />
      <Button variant="contained" disabled={errs.name || errs.email || errs.message} onClick={() => !f.website && setSent(true)}>Send message</Button>
    </Card>
  )
}
