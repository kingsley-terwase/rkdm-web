import { useState } from 'react'
import { Alert, Button, Card, TextField, Typography } from '@mui/material'
export default function Forgot() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <Card sx={{ p: 3, maxWidth: 440, mx: 'auto', display: 'grid', gap: 2 }}>
      <Typography variant="h4" fontWeight={800}>Reset password</Typography>
      {sent ? <Alert severity="success">If that email has an account, we sent a link valid for 60 minutes.</Alert> : <>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Button variant="contained" disabled={!/^\S+@\S+\.\S+$/.test(email)} onClick={() => setSent(true)}>Send reset link</Button></>}
    </Card>
  )
}
