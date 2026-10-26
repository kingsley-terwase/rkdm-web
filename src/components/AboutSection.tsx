import type { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import type { Theme } from '@mui/material'

const NAVY = '#0b1b5c'
const BLUE = '#1546d6'
const GOLD = '#f5b301'

type AboutSectionProps = {
  eyebrow?: string
  title?: string
  /** One string, or several paragraphs */
  body?: string | string[]
  ctaLabel?: string
  ctaTo?: string
  /** Large leaf-shaped image */
  mainImage?: string
  /** Small round image at the bottom-left */
  smallImage?: string
}

// Free placeholder photos (Unsplash). Replace with your own later.
const MAIN = 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1100&q=80'
const SMALL = 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80'

// If a placeholder URL ever fails, fall back to a guaranteed-working image
const fallback = (seed: string) => (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (img.dataset.fb) return
  img.dataset.fb = '1'
  img.src = `https://picsum.photos/seed/${seed}/1000/1000`
}

export default function AboutSection({
  eyebrow = 'Who We Are',
  title = 'About Us',
  body = 'Royal Kingdom Dominion Ministry International is a vibrant, Spirit-led family of believers headquartered in Abuja, Nigeria. We are set on fire by the Word, committed to prayer, and passionate about seeing lives transformed by the power of God. Wherever you are on your journey, there is a place for you here.',
  ctaLabel = 'Read More',
  ctaTo = '/about',
  mainImage = MAIN,
  smallImage = SMALL,
}: AboutSectionProps) {
  const paragraphs = Array.isArray(body) ? body : [body]

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: 3,
          display: 'grid',
          gap: { xs: 6, md: 8 },
          alignItems: 'center',
          gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr' },
        }}
      >
        {/* Text */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 16, color: (t: Theme) => (t.palette.mode === 'dark' ? GOLD : BLUE) }}>
            {eyebrow}
          </Typography>
          <Typography component="h2" sx={{ mt: 0.5, fontWeight: 800, fontSize: { xs: 32, md: 38 }, lineHeight: 1.2, color: 'text.primary' }}>
            {title}
          </Typography>

          {/* Two-part underline */}
          <Box sx={{ display: 'flex', gap: '6px', mt: 2, mb: 3.5 }}>
            <Box sx={{ width: 30, height: 4, borderRadius: 1, bgcolor: BLUE }} />
            <Box sx={{ width: 22, height: 4, borderRadius: 1, bgcolor: GOLD }} />
          </Box>

          {paragraphs.map((p, i) => (
            <Typography
              key={i}
              sx={{ mb: 2, fontSize: 16, lineHeight: 2.1, textAlign: { xs: 'left', md: 'justify' }, color: 'text.primary' }}
            >
              {p}
            </Typography>
          ))}

          <Button
            component={Link}
            to={ctaTo}
            variant="contained"
            sx={{
              mt: 2,
              px: 3,
              py: 1.25,
              borderRadius: 1,
              fontWeight: 800,
              fontSize: 16,
              textTransform: 'none',
              bgcolor: NAVY,
              color: '#fff',
              '&:hover': { bgcolor: BLUE },
            }}
          >
            {ctaLabel}
          </Button>
        </Box>

        {/* Images */}
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 520, mx: { xs: 'auto', md: 0 }, ml: { md: 'auto' }, aspectRatio: '1.04 / 1' }}>
          <Box
            component="img"
            src={mainImage}
            alt=""
            onError={fallback('rkdm-about-main')}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '50% 0 50% 50%' }}
          />
          <Box
            component="img"
            src={smallImage}
            alt=""
            onError={fallback('rkdm-about-small')}
            sx={{
              position: 'absolute',
              left: -8,
              bottom: 0,
              width: '37%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '5px solid',
              borderColor: 'background.default',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}