import { Box, LinearProgress, Typography } from '@mui/material'
import { keyframes } from '@emotion/react'
const pulse = keyframes`50%{transform:scale(1.07);filter:drop-shadow(0 0 24px #f97316)}`
export default function Loader() {
  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 2000, bgcolor: 'background.default', display: 'grid', placeContent: 'center', justifyItems: 'center', gap: 3 }}>
      <Box component="img" src="/logo.png" alt="RKDM" sx={{ width: 150, animation: `${pulse} 1.6s infinite` }} />
      <LinearProgress color="secondary" sx={{ width: 180, borderRadius: 9 }} />
      <Typography color="text.secondary">Loading Royal Kingdom Dominion…</Typography>
    </Box>
  )
}
