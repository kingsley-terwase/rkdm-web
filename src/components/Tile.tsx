import { ReactNode, MouseEvent, KeyboardEvent } from 'react'
import { Box, Card, alpha, useTheme } from '@mui/material'

type TileProps = {
  children: ReactNode
  onClick?: () => void
  /** Any CSS color. Defaults to theme.palette.primary.main */
  accent?: string
  p?: any
}

export const Tile = ({ children, onClick, p= 3, accent }: TileProps) => {
  const theme = useTheme()
  const color = accent ?? theme.palette.primary.main
  const interactive = Boolean(onClick)

  // Feeds the cursor-following glow
  const track = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <Card
      onClick={onClick}
      onMouseMove={track}
      onKeyDown={interactive ? onKeyDown : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      elevation={0}
      sx={{
        '--x': '50%',
        '--y': '0%',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        p: p,
        borderRadius: 0.7,
        cursor: interactive ? 'pointer' : 'default',
        border: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(160deg, ${theme.palette.background.paper} 55%, ${alpha(color, 0.07)} 100%)`,
        transition: 'transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s, border-color .35s',

        // Cursor-following glow
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity .35s',
          background: `radial-gradient(260px circle at var(--x) var(--y), ${alpha(color, 0.2)}, transparent 70%)`,
        },

        // Accent bar that grows on hover
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${theme.palette.secondary.main})`,
          transform: 'scaleX(.18)',
          transformOrigin: 'left',
          transition: 'transform .45s cubic-bezier(.2,.8,.2,1)',
        },

        '&:hover, &:focus-visible': {
          transform: interactive ? 'translateY(-6px)' : 'none',
          borderColor: alpha(color, 0.55),
          boxShadow: `0 22px 44px -18px ${alpha(color, 0.45)}`,
          '&::before': { opacity: 1 },
          '&::after': { transform: 'scaleX(1)' },
        },

        '&:focus-visible': { outline: `2px solid ${color}`, outlineOffset: 3 },

        '&:active': { transform: interactive ? 'translateY(-2px)' : 'none' },

        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&::before, &::after': { transition: 'none' },
          '&:hover, &:focus-visible': { transform: 'none' },
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Card>
  )
}

export const CardGrid = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      display: 'grid',
      gap: 3,
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      alignItems: 'stretch',
    }}
  >
    {children}
  </Box>
)