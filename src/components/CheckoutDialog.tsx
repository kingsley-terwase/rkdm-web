import { useEffect } from 'react'
import { CircularProgress, Dialog, DialogContent, Typography } from '@mui/material'
export default function CheckoutDialog({ open, label, onDone }: { open: boolean; label: string; onDone: () => void }) {
  useEffect(() => { if (!open) return; const t = setTimeout(onDone, 2400); return () => clearTimeout(t) }, [open]) // eslint-disable-line
  return (
    <Dialog open={open}>
      <DialogContent sx={{ textAlign: 'center', p: 5, display: 'grid', placeItems: 'center', gap: 2 }}>
        <CircularProgress color="secondary" />
        <Typography fontWeight={800}>Secure checkout · {label}</Typography>
        <Typography variant="body2" color="text.secondary">Waiting for the server to verify payment…</Typography>
      </DialogContent>
    </Dialog>
  )
}
