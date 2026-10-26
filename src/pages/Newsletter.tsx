import { useState } from 'react'
import { Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import { SendRegular } from '@fluentui/react-icons'
import Guard from '../components/Guard'
import DataTable from '../components/DataTable'
import { newsletters, subscribers } from '../data/demo'
import { useActivity } from '../context/Activity'
function Preview({ subject, body }: { subject: string; body: string }) {
  return (
    <Card sx={{ overflow: 'hidden', bgcolor: '#eef2fb', color: '#0b1b3d' }}>
      <Box sx={{ p: 2.5, textAlign: 'center', background: 'linear-gradient(135deg,#0b1b5c,#1546d6)', color: '#fff' }}>
        <Box component="img" src="/logo.png" alt="" sx={{ height: 56 }} /><Typography fontWeight={800}>Royal Kingdom Dominion Ministry Intl</Typography></Box>
      <Box sx={{ m: 2, p: 3, bgcolor: '#fff', borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={800}>{subject || 'Your subject appears here'}</Typography>
        <Typography sx={{ whiteSpace: 'pre-line', mt: 1 }}>{body.replace(/{{firstName}}/g, 'Grace')}</Typography></Box>
      <Typography variant="caption" sx={{ display: 'block', p: 2, textAlign: 'center', color: '#5c6b8a' }}>Abuja, Nigeria · Unsubscribe in one click</Typography>
    </Card>
  )
}
export default function Newsletter() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('Hello {{firstName}},\n\nGrace and peace to you. Here is what is happening this month…')
  const [aud, setAud] = useState('All confirmed subscribers')
  const [confirm, setConfirm] = useState(false)
  const [hist, setHist] = useState(newsletters)
  const [msg, setMsg] = useState('')
  const { log } = useActivity()
  const n = (s: string) => subscribers.filter(x => x.status === s).length
  const count = aud.startsWith('All confirmed') ? n('confirmed') * 206 : 128
  const send = () => { setHist([{ subject, audience: aud, recipients: count, status: 'sent' }, ...hist]); log('newsletter.send', subject); setConfirm(false); setSubject(''); setMsg('Newsletter queued and sent') }
  return (
    <Guard perm="newsletter.manage">
      <Typography variant="h5" fontWeight={800} gutterBottom>Newsletter</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}><Chip color="success" label={`${n('confirmed') * 206} confirmed`} /><Chip color="warning" label={`${n('pending')} pending`} /><Chip color="error" label={`${n('unsubscribed')} unsubscribed`} /></Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '1fr 1fr' }, mb: 4 }}>
        <Card sx={{ p: 3, display: 'grid', gap: 2, alignContent: 'start' }}>
          <TextField label="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <TextField label="Message (use {{firstName}})" multiline minRows={8} value={body} onChange={e => setBody(e.target.value)} />
          <TextField select label="Audience" value={aud} onChange={e => setAud(e.target.value)}>{['All confirmed subscribers', 'Members with newsletter on', 'Group: Youth'].map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}</TextField>
          <Box sx={{ display: 'flex', gap: 1 }}><Button variant="outlined" onClick={() => setMsg('Test email sent to you')}>Send test</Button>
            <Button variant="contained" startIcon={<SendRegular />} disabled={!subject} onClick={() => setConfirm(true)}>Send to {count}</Button></Box>
        </Card>
        <Box><Typography fontWeight={800} gutterBottom>Live preview</Typography><Preview subject={subject} body={body} /></Box>
      </Box>
      <Typography variant="h6" fontWeight={800} gutterBottom>Sent history</Typography><DataTable rows={hist} />
      <Dialog open={confirm} onClose={() => setConfirm(false)}><DialogTitle>Send to {count} recipients?</DialogTitle>
        <DialogContent><DialogContentText>Duplicates and suppressed addresses are skipped automatically.</DialogContentText></DialogContent>
        <DialogActions><Button onClick={() => setConfirm(false)}>Cancel</Button><Button variant="contained" onClick={send}>Send</Button></DialogActions></Dialog>
      <Snackbar open={!!msg} autoHideDuration={2500} onClose={() => setMsg('')} message={msg} />
    </Guard>
  )
}
