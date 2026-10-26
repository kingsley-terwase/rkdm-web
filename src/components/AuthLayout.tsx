import { Link, Outlet } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { ArrowLeftRegular } from '@fluentui/react-icons'
import ThemeToggle from './ThemeToggle'
import { stock } from '../data/slides'
export default function AuthLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { md: '1.1fr 1fr' } }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', p: 6, color: '#fff',
        background: `linear-gradient(160deg,rgba(11,27,92,.9),rgba(21,70,214,.65)),url(${stock[0]}) center/cover` }}>
        <Box component="img" src="/logo.png" alt="RKDM" sx={{ height: 90, alignSelf: 'start', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.4))' }} />
        <Box><Typography variant="h3" fontWeight={800}>Walking in royal dominion.</Typography>
          <Typography sx={{ mt: 1, opacity: 0.85 }}>One account for your giving, events, library and notifications.</Typography></Box>
      </Box>
      <Box sx={{ display: 'grid', placeItems: 'center', p: 3, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} to="/" startIcon={<ArrowLeftRegular />}>Back to site</Button><ThemeToggle /></Box>
        <Box sx={{ width: '100%', maxWidth: 520, pt: 6 }}><Outlet /></Box>
      </Box>
    </Box>
  )
}
