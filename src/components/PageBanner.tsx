import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { bg, stock } from '../data/slides'
export default function PageBanner({ title }: { title: string }) {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, px: 3, color: '#fff', textAlign: 'center', background: `linear-gradient(rgba(11,27,92,.86),rgba(7,13,31,.8)),${bg(stock[3])}` }}>
      <Typography component="h1" fontWeight={800} sx={{ fontSize: { xs: 34, md: 52 }, textTransform: 'uppercase' }}>{title}</Typography>
      <Typography sx={{ opacity: 0.85, mt: 1 }}><Link to="/">Home</Link> / {title}</Typography>
    </Box>
  )
}
