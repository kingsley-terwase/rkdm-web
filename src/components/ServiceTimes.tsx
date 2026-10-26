import type { SyntheticEvent } from 'react'
import { Box, Typography } from '@mui/material'
import type { Theme } from '@mui/material'
import { BookRegular, BuildingRegular, HeartRegular, SparkleRegular, WeatherMoonRegular } from '@fluentui/react-icons'
import type { FluentIcon } from '@fluentui/react-icons'

const NAVY = '#0b1b5c'
const BLUE = '#1546d6'
const GOLD = '#f5b301'

export type Service = {
    title: string
    icon: FluentIcon
    /** e.g. "Every Sunday: 8:00am" */
    when: string
    /** Photo shown behind the card on hover */
    image: string
}

type ServiceTimesProps = {
    eyebrow?: string
    title?: string
    timezone?: string
    services?: Service[]
}

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`

// Placeholder times and free photos. Replace with your own (or API data) later.
const DEFAULT_SERVICES: Service[] = [
    { title: 'Sunday Worship Service', icon: BuildingRegular, when: 'Every Sunday: 8:00am', image: u('photo-1438232992991-995b7058bbb3') },
    { title: 'Healing and Deliverance Service', icon: HeartRegular, when: 'Every Tuesday: 9:30am', image: u('photo-1529070538774-1843cb3265df') },
    { title: 'Power Communion Service', icon: SparkleRegular, when: 'Every First Sunday: 8:00am', image: u('photo-1507692049790-de58290a4334') },
    { title: 'Worship, Word & Wonders Night', icon: BookRegular, when: 'Every Friday: 6:00pm', image: u('photo-1519491050282-cf00c82424b4') },
    { title: 'Commanding The Day Midnight Prayer', icon: WeatherMoonRegular, when: 'Every Day: 12:00am', image: u('photo-1470225620780-dba8ba36b745') },
]

const fallback = (seed: string) => (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.dataset.fb) return
    img.dataset.fb = '1'
    img.src = `https://picsum.photos/seed/${seed}/700/700`
}

// The look shown on hover, keyboard focus, and always on touch screens (no hover there)
const active = {
    zIndex: 1,
    '& .bg, & .veil': { opacity: 1 },
    '& .icon': { color: GOLD, transform: 'translateY(-4px)' },
    '& .title': { color: '#fff' },
    '& .more': { maxHeight: 120, opacity: 1, mt: 1.5 },
}

export default function ServiceTimes({
    eyebrow = 'Join Us In Worship',
    title = 'Service Times',
    timezone = 'GMT+1',
    services = DEFAULT_SERVICES,
}: ServiceTimesProps) {
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 9 },
                          }}
        >
            <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3 }}>
                {/* Heading */}
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, color: (t: Theme) => (t.palette.mode === 'dark' ? GOLD : BLUE) }}>{eyebrow}</Typography>
                    <Typography component="h2" sx={{ mt: 0.5, fontWeight: 800, fontSize: { xs: 32, md: 38 }, lineHeight: 1.2, color: 'text.primary' }}>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '6px', mt: 2 }}>
                        <Box sx={{ width: 30, height: 4, borderRadius: 1, bgcolor: BLUE }} />
                        <Box sx={{ width: 22, height: 4, borderRadius: 1, bgcolor: GOLD }} />
                    </Box>
                </Box>

                {/* Cards */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' },
                        pl: '1px',
                        pt: '1px',
                    }}
                >
                    {services.map((s, i) => {
                        const Icon = s.icon
                        return (
                            <Box
                                key={s.title}
                                tabIndex={0}
                                sx={(t: Theme) => ({
                                    position: 'relative',
                                    overflow: 'hidden',
                                    minHeight: { xs: 240, lg: 360 },
                                    ml: '-1px',
                                    mt: '-1px',
                                    px: 3,
                                    py: 4,
                                    border: 1,
                                    borderColor: 'divider',
                                    bgcolor: 'background.paper',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    outline: 'none',
                                    cursor: 'default',
                                    '& .bg, & .veil': { position: 'absolute', inset: 0, opacity: 0, transition: 'opacity .45s ease' },
                                    '& .bg': { width: '100%', height: '100%', objectFit: 'cover' },
                                    '& .veil': { background: `linear-gradient(180deg, ${NAVY}e8, ${NAVY}f5)` },
                                    '& .in': { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' },
                                    '& .icon': { fontSize: 64, color: t.palette.mode === 'dark' ? GOLD : BLUE, transition: 'color .3s, transform .4s ease' },
                                    '& .title': { mt: 3, fontWeight: 800, fontSize: { xs: 20, xl: 22 }, lineHeight: 1.35, color: 'text.primary', transition: 'color .3s' },
                                    '& .more': { maxHeight: 0, opacity: 0, overflow: 'hidden', color: '#fff', transition: 'max-height .45s ease, opacity .35s ease, margin .35s' },
                                    '&:hover, &:focus-visible': active,
                                    '@media (hover: none)': active,
                                    '&:focus-visible': { ...active, outline: `2px solid ${GOLD}`, outlineOffset: -4 },
                                    '@media (prefers-reduced-motion: reduce)': { '&, & *': { transition: 'none !important' } },
                                })}
                            >
                                <Box component="img" className="bg" src={s.image} alt="" onError={fallback(`rkdm-service-${i}`)} />
                                <Box className="veil" />
                                <Box className="in">
                                    <Icon className="icon" />
                                    <Typography className="title" component="h3">{s.title}</Typography>
                                    <Box className="more">
                                        <Box sx={{ width: 20, height: 3, borderRadius: 1, bgcolor: GOLD, mx: 'auto', mb: 1.5 }} />
                                        <Typography sx={{ fontSize: 15, lineHeight: 2 }}>Timezone: {timezone}</Typography>
                                        <Typography sx={{ fontSize: 15, lineHeight: 2 }}>{s.when}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}