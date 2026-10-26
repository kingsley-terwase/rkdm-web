import { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
export default function PageHeader({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
      <Box><Typography variant="h5" fontWeight={800}>{title}</Typography>{sub && <Typography variant="body2" color="text.secondary">{sub}</Typography>}</Box>
      <Box sx={{ display: 'flex', gap: 1 }}>{children}</Box>
    </Box>
  )
}
