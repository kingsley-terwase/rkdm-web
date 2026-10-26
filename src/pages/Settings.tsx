import { useState } from 'react'
import { Box, Button, Card, Chip, FormControlLabel, MenuItem, Snackbar, Switch, TextField, Typography } from '@mui/material'
import Guard from '../components/Guard'
import { useActivity } from '../context/Activity'
export default function Settings() {
  const [s, setS] = useState({ site: 'Royal Kingdom Dominion Ministry Intl', email: 'info@rkdm.org', gateway: 'Paystack', min: '500', usd: false, test: true })
  const [msg, setMsg] = useState('')
  const { log } = useActivity()
  return (
    <Guard perm="settings.manage">
      <Card sx={{ p: 3, display: 'grid', gap: 2, maxWidth: 560 }}>
        <Typography variant="h5" fontWeight={800}>Site & payment settings</Typography>
        <TextField label="Site name" value={s.site} onChange={e => setS({ ...s, site: e.target.value })} />
        <TextField label="Contact / alert email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} />
        <TextField select label="Active gateway" value={s.gateway} onChange={e => setS({ ...s, gateway: e.target.value })}><MenuItem value="Paystack">Paystack</MenuItem><MenuItem value="Flutterwave">Flutterwave</MenuItem></TextField>
        <TextField label="Minimum gift (₦)" value={s.min} onChange={e => setS({ ...s, min: e.target.value })} />
        <FormControlLabel control={<Switch checked={s.usd} onChange={e => setS({ ...s, usd: e.target.checked })} />} label="USD giving enabled" />
        <FormControlLabel control={<Switch checked={s.test} onChange={e => setS({ ...s, test: e.target.checked })} />} label="Test mode (hidden from reports)" />
        <Box sx={{ display: 'flex', gap: 1 }}><Chip color="success" label="Secret key configured ✓" /><Chip color="success" label="Webhook secret configured ✓" /></Box>
        <Button variant="contained" onClick={() => { log('settings.update', 'Site settings'); setMsg('Settings saved and logged') }}>Save settings</Button>
      </Card>
      <Snackbar open={!!msg} autoHideDuration={2500} onClose={() => setMsg('')} message={msg} />
    </Guard>
  )
}
