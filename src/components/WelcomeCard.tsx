import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Stack } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { LocationRegular, VideoRegular } from '@fluentui/react-icons'
import { clean, useSite } from '../context/Site' // adjust the path to your SiteProvider file

const NAVY = '#0b1b5c'
const BLUE = '#1546d6'
const GOLD = '#f5b301'

type WelcomeCardProps = {
  /** HTML to show. Leave empty to use pages.welcome from SiteProvider (demo).
   *  Later: <WelcomeCard html={apiData.welcome} /> */
  html?: string
  /** Show the "Plan a visit" / "Watch RKDM TV" buttons */
  actions?: boolean
  sx?: SxProps<Theme>
}

export default function WelcomeCard({ html, actions = true, sx }: WelcomeCardProps) {
  const site = useSite()
  const source = html ?? site?.pages?.welcome ?? ''
  const safe = useMemo(() => clean(source), [source])
  if (!safe) return null

  return (
    <Box
      component="section"
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
          overflow: 'hidden',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: (t: Theme) => (t.palette.mode === 'dark' ? 'none' : '0 24px 60px -32px rgba(11,27,92,.35)'),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Brand panel */}
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          minHeight: { xs: 150, md: 'auto' },
          background: `linear-gradient(170deg, ${NAVY}, ${BLUE} 70%, #2a6bff)`,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 220,
            height: 220,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,.22)',
          },
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt=""
          aria-hidden
          sx={{ position: 'relative', zIndex: 1, height: { xs: 96, md: 130 }, filter: 'drop-shadow(0 10px 24px rgba(0,0,0,.45))' }}
        />
      </Box>

      {/* Message */}
      <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box
          sx={{
            '& h2': {
              m: 0,
              mb: 2,
              fontSize: { xs: 26, md: 36 },
              fontWeight: 800,
              lineHeight: 1.15,
              color: (t: Theme) => (t.palette.mode === 'dark' ? '#fff' : NAVY),
            },
            '& p': { m: 0, mb: 1.5, maxWidth: '62ch', fontSize: { xs: 16, md: 18 }, lineHeight: 1.75, color: 'text.secondary' },
            '& b, & strong': {
              color: 'text.primary',
              fontWeight: 800,
              backgroundImage: `linear-gradient(${GOLD}66, ${GOLD}66)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 40%',
              backgroundPosition: '0 90%',
            },
            '& a': { color: 'primary.main', fontWeight: 700 },
            '& > :last-child': { mb: 0 },
          }}
          dangerouslySetInnerHTML={{ __html: safe }}
        />

        {actions && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
            <Button component={Link} to="/contact" variant="contained" size="large" startIcon={<LocationRegular />} sx={{ bgcolor: NAVY, '&:hover': { bgcolor: BLUE }, whiteSpace: 'nowrap' }}>
              Plan a visit
            </Button>
            <Button component={Link} to="/resources" variant="outlined" size="large" startIcon={<VideoRegular />} sx={{ color: 'text.primary', borderColor: 'divider', whiteSpace: 'nowrap', '&:hover': { borderColor: 'text.primary' } }}>
              Watch RKDM TV
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  )
}