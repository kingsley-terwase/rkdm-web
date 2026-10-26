import { Link, Outlet } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { keyframes } from '@mui/material/styles'
import { ArrowLeftRegular, HeartRegular, PeopleRegular, PlayCircleRegular } from '@fluentui/react-icons'
import ThemeToggle from './ThemeToggle'
import { stock } from '../data/slides'
import { Anim, kf } from './Motion'

const GOLD = '#f5b301'

// slow camera drift on the photo
const drift = keyframes`from{transform:scale(1.05) translate3d(0,0,0)}to{transform:scale(1.18) translate3d(-2%,-2%,0)}`

const perks = [
  [<HeartRegular />, 'Give with ease', 'Give online and keep a record of every gift.'],
  [<PlayCircleRegular />, 'Sermons and library', 'Watch, listen and download whenever you like.'],
  // [<PeopleRegular />, 'Events and updates', 'Never miss a program or an announcement.'],
] as const

export default function AuthLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { md: '1.1fr 1fr' } }}>
      {/* Brand panel */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between',
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', color: '#fff', p: { md: 5, lg: 7 },
        bgcolor: '#020614',
      }}>
        {/* photo, slowly drifting */}
        <Box sx={{
          position: 'absolute', inset: 0, backgroundImage: `url(${stock[0]})`, backgroundSize: 'cover', backgroundPosition: 'center',
          animation: `${drift} 28s ease-in-out infinite alternate`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }} />
        {/* colour wash: navy at the top, near-black at the bottom for legible text */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(170deg,rgba(11,27,92,.86) 0%,rgba(11,27,92,.72) 38%,rgba(2,6,20,.94) 100%)' }} />
        {/* warm light from the corner */}
        <Box sx={{
          position: 'absolute', width: 520, height: 520, borderRadius: '50%', right: -180, top: -160,
          background: 'radial-gradient(circle,rgba(245,179,1,.38),transparent 68%)',
          animation: `${kf.glow} 7s ease-in-out infinite`, pointerEvents: 'none',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }} />

        {/* top: identity */}
        <Anim variant="slideL" duration={800} sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box component="img" src="/logo.png" alt="RKDM"
              sx={{ height: 76, width: 76, objectFit: 'contain', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,.45))' }} />
            <Box>
              <Typography fontWeight={800} fontSize={18} sx={{ lineHeight: 1.2 }}>Royal Kingdom<br />Dominion Ministry</Typography>
            </Box>
          </Box>
        </Anim>

        {/* middle: message and perks */}
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
          <Anim variant="curtain" duration={1100} delay={150}>
            <Typography variant="h2" fontWeight={800} sx={{ lineHeight: 1.05, fontSize: { md: 44, lg: 56 }, letterSpacing: -1 }}>
              Walking in royal dominion.
            </Typography>
          </Anim>
          <Box sx={{
            width: 72, height: 4, borderRadius: 2, bgcolor: GOLD, my: 3, transformOrigin: 'left',
            animation: `${keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`} .9s cubic-bezier(.2,.8,.2,1) .6s both`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }} />
          <Typography sx={{ opacity: 0.88, fontSize: 18, lineHeight: 1.6, maxWidth: 440 }}>
            One account for your giving, events, library and notifications.
          </Typography>

          <Box sx={{ display: 'grid', gap: 1.5, mt: 4.5, mb:3, }}>
            {perks.map(([icon, title, text], i) => (
              <Anim key={title} variant="slideL" delay={700 + i * 140} duration={800}>
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '16px',
                  bgcolor: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)',
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  transition: 'transform .25s, background-color .25s, border-color .25s',
                  '&:hover': { transform: 'translateX(6px)', bgcolor: 'rgba(255,255,255,.13)', borderColor: 'rgba(245,179,1,.6)' },
                }}>
                  <Box sx={{
                    width: 46, height: 46, flexShrink: 0, borderRadius: '14px', display: 'grid', placeItems: 'center',
                    bgcolor: GOLD, color: '#020614', '& svg': { fontSize: 24 },
                  }}>{icon}</Box>
                  <Box>
                    <Typography fontWeight={800}>{title}</Typography>
                    <Typography fontSize={14} sx={{ opacity: 0.78 }}>{text}</Typography>
                  </Box>
                </Box>
              </Anim>
            ))}
          </Box>
        </Box>

        {/* bottom: quiet footer */}
        <Typography fontSize={13} sx={{ position: 'relative', zIndex: 1, opacity: 0.6 }}>
          © {new Date().getFullYear()} Royal Kingdom Dominion Ministry Int’l
        </Typography>
      </Box>

      {/* Form side */}
      <Box sx={{ display: 'grid', placeItems: 'center', p: 3, position: 'relative', minHeight: '100vh' }}>
        <Box sx={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button component={Link} to="/" startIcon={<ArrowLeftRegular />} sx={{ fontWeight: 700, textTransform: 'none' }}>Back to site</Button>
          <ThemeToggle />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 520, pt: 8, pb: 4 }}>
          {/* logo only shows on mobile, where the brand panel is hidden */}
          <Box component="img" src="/logo.png" alt="RKDM"
            sx={{ display: { xs: 'block', md: 'none' }, height: 64, mx: 'auto', mb: 3 }} />
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}