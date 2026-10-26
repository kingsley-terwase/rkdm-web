import { useState } from 'react'
import { Alert, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, List, ListItem, ListItemText, Switch, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { events, naira, payments, resources } from '../data/demo'
import { useStore } from '../context/Store'
import { useAuth } from '../context/Auth'
import StatusChip from '../components/StatusChip'
export function PortalEvents() {
  const { registered, toggleRegister } = useStore()
  const mine = events.filter(e => registered.includes(e.id))
  return <List>{mine.map(e => <ListItem key={e.id} secondaryAction={<Button color="error" onClick={() => toggleRegister(e.id)}>Cancel</Button>}><ListItemText primary={e.title} secondary={e.date} /></ListItem>)}
    {mine.length === 0 && <Typography color="text.secondary">No registrations yet.</Typography>}</List>
}
export function PortalGiving() {
  const { gifts } = useStore()
  const all = [...gifts.map((g: any) => ({ ref: g.ref, cat: g.cat, amt: naira(g.amount), status: 'successful' })), ...payments.slice(0, 2).map(p => ({ ref: p.ref, cat: p.cat, amt: naira(p.amount, p.cur), status: p.status }))]
  return <List>{all.map(g => <ListItem key={g.ref} secondaryAction={<StatusChip s={g.status} />}><ListItemText primary={`${g.cat} · ${g.amt}`} secondary={`Receipt ${g.ref}`} /></ListItem>)}</List>
}
export function PortalLibrary() {
  const { owned } = useStore()
  return <List>{resources.filter(r => owned.includes(r.id)).map(r => <ListItem key={r.id} secondaryAction={<Button>Open</Button>}><ListItemText primary={r.title} secondary={r.type + ' · Unlocked'} /></ListItem>)}</List>
}
export function PortalNotifications() {
  return <List>{['Payment received', 'Event registration confirmed', 'Reminder: Night of Fire Prayer tomorrow'].map(n => <ListItem key={n}><ListItemText primary={n} /></ListItem>)}</List>
}
export function PortalProfile() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <Card sx={{ p: 3, display: 'grid', gap: 2, maxWidth: 480 }}>
      <TextField label="Name" defaultValue={user?.name} /><TextField label="Phone" placeholder="+234…" /><TextField label="Current password" type="password" />
      <FormControlLabel control={<Switch defaultChecked />} label="Newsletter" /><FormControlLabel control={<Switch defaultChecked />} label="Event reminder emails" />
      <Button variant="contained" onClick={() => setSaved(true)}>Save changes</Button>{saved && <Alert severity="success">Profile updated.</Alert>}
      <Button color="error" onClick={() => setOpen(true)}>Delete my account</Button>
      <Dialog open={open} onClose={() => setOpen(false)}><DialogTitle>Delete account?</DialogTitle>
        <DialogContent><DialogContentText>We email you to confirm. Personal details are anonymised; payment records are kept without identifiers.</DialogContentText></DialogContent>
        <DialogActions><Button onClick={() => setOpen(false)}>Keep</Button><Button color="error" onClick={() => { logout(); nav('/') }}>Confirm</Button></DialogActions></Dialog>
    </Card>
  )
}
