import { useState } from 'react'
import { Alert, Box, Button, Card, Checkbox, FormControlLabel, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import { SendRegular } from '@fluentui/react-icons'
import Guard from '../components/Guard'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import { admins } from '../data/demo'
import { useActivity } from '../context/Activity'
const keys = ['content.manage', 'resources.manage', 'events.manage', 'registrations.manage', 'gallery.manage', 'categories.manage', 'members.view', 'members.manage',
  'payments.view', 'payments.export', 'payments.refund', 'messages.manage', 'newsletter.manage', 'subscribers.manage', 'settings.manage', 'activity.view_all']
const presets: Record<string, string[]> = {
  'Content Editor': ['content.manage', 'resources.manage', 'gallery.manage', 'categories.manage'], 'Events Officer': ['events.manage', 'registrations.manage'],
  'Finance Officer': ['payments.view', 'payments.export', 'payments.refund'], 'Communications Officer': ['messages.manage', 'newsletter.manage', 'subscribers.manage'],
  'Membership Officer': ['members.view', 'members.manage'], Custom: [],
}
export default function AdminsPage() {
  const [rows, setRows] = useState(admins)
  const [f, setF] = useState({ name: '', email: '', preset: 'Content Editor' })
  const [perms, setPerms] = useState<string[]>(presets['Content Editor'])
  const [msg, setMsg] = useState('')
  const { log } = useActivity()
  const ok = f.name && /^\S+@\S+\.\S+$/.test(f.email) && perms.length > 0
  const invite = () => { setRows([{ name: f.name, email: f.email, preset: f.preset, status: 'pending' }, ...rows]); log('admin.invite', `${f.name} (${perms.length} permissions)`)
    setMsg('Invitation sent. The set-password link expires in 48 hours.'); setF({ ...f, name: '', email: '' }) }
  return (
    <Guard perm="admins.manage">
      <PageHeader title="Admin management" sub="Invite staff, pick a preset, then tick or untick any permission" />
      <Card sx={{ p: 3, mb: 3, display: 'grid', gap: 2 }}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { md: '1fr 1fr 1fr' } }}>
          <TextField label="Full name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
          <TextField label="Email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
          <TextField select label="Preset" value={f.preset} onChange={e => { setF({ ...f, preset: e.target.value }); setPerms(presets[e.target.value]) }}>
            {Object.keys(presets).map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}</TextField>
        </Box>
        <Typography fontWeight={800}>Permissions ({perms.length})</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))' }}>{keys.map(k => (
          <FormControlLabel key={k} label={k} control={<Checkbox checked={perms.includes(k)} onChange={e => setPerms(e.target.checked ? [...perms, k] : perms.filter(x => x !== k))} />} />))}</Box>
        <Alert severity="info">The new admin gets an email with a set-password link. Passwords are never emailed or shown. At least one Super Admin always remains.</Alert>
        <Box><Button variant="contained" startIcon={<SendRegular />} disabled={!ok} onClick={invite}>Send invitation</Button></Box>
      </Card>
      <DataTable rows={rows} onDelete={r => { setRows(rows.map(x => (x === r ? { ...x, status: 'deactivated' } : x))); log('admin.deactivate', r.name); setMsg('Admin deactivated and sessions ended') }} />
      <Snackbar open={!!msg} autoHideDuration={3000} onClose={() => setMsg('')} message={msg} />
    </Guard>
  )
}
