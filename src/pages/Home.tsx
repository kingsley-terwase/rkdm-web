import { Link } from 'react-router-dom'
import { Box, Button, Chip, Typography } from '@mui/material'
import { ChatRegular, HeartRegular, MailRegular, PeopleRegular, PersonRegular, PlayCircleRegular } from '@fluentui/react-icons'
import { resources, naira } from '../data/demo'
import { calendar } from '../data/calendar'
import { bg, stock } from '../data/slides'
import { CardGrid, Tile } from '../components/Tile'
import PosterSlider from '../components/PosterSlider'
import EventRow from '../components/EventRow'
import { useSite } from '../context/Site'
import WelcomeCard from '../components/WelcomeCard'
import AboutSection from '../components/AboutSection'
import ServiceTimes from '../components/ServiceTimes'
import { Anim, CountUp, kf, reduced, useInView } from '../components/Motion'

const quick = [['Sermons', <PlayCircleRegular />, '/resources'], ['Give', <HeartRegular />, '/give'], ['New here', <PeopleRegular />, '/new-here'],
['Testimonies', <ChatRegular />, '/p/testimonies'], ['Membership', <PersonRegular />, '/register'], ['Contact', <MailRegular />, '/contact']] as const
const stats = [['25+', 'Years of ministry'], ['120', 'Branches'], ['15', 'Nations'], ['1M+', 'Lives touched']]

/* Section heading: title rises out of a mask, gold rule draws itself */
const Head = ({ t, sub, to }: { t: string; sub: string; to: string }) => {
  const { ref, seen } = useInView()
  const ease = 'cubic-bezier(.2,.8,.2,1)'
  return (
    <Box ref={ref} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mt: 8, mb: 2 }}>
      <Box>
        <Typography fontWeight={800} color="secondary"
          sx={[{ letterSpacing: 2, fontSize: 13, opacity: seen ? 1 : 0, transition: 'opacity .6s' }, reduced] as any}>{sub}</Typography>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="h4" fontWeight={800}
            sx={[{ transform: seen ? 'none' : 'translateY(110%)', transition: `transform .8s ${ease} .1s` }, reduced] as any}>{t}</Typography>
        </Box>
        <Box sx={[{
          height: 3, mt: 0.5, width: 72, bgcolor: '#f5b301', borderRadius: 2, transformOrigin: 'left',
          transform: seen ? 'scaleX(1)' : 'scaleX(0)', transition: `transform .9s ${ease} .45s`,
        }, reduced] as any} />
      </Box>
      <Button component={Link} to={to}>View all →</Button>
    </Box>
  )
}

export default function Home() {
  const { pages } = useSite()
  return (
    <>
      <PosterSlider />

      {/* Quick links: tiles pop in one after another; icons wiggle on hover */}
      <Box sx={{ mt: -5, position: 'relative', zIndex: 2, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}>
        {quick.map(([t, ic, to], i) => (
          <Anim key={t} variant="pop" delay={i * 90} duration={700}>
            <Tile onClick={undefined}>
              <Box component={Link} to={to}
                sx={{
                  display: 'grid', placeItems: 'center', gap: 1, color: 'primary.main', '& svg': { fontSize: 34 },
                  '&:hover svg': { animation: `${kf.wiggle} .6s ease` },
                }}>{ic}
                <Typography fontWeight={800} color="text.primary">{t}</Typography>
              </Box>
            </Tile>
          </Anim>))}
      </Box>

      {/* Welcome: curtain wipes open */}
      <Anim variant="curtain" duration={1100} sx={{ mt: 8 }}>
        <WelcomeCard />
      </Anim>

      {/* Events: rows slide in from alternating sides */}
      <Head sub="WHAT'S HAPPENING" t="Upcoming programs" to="/events" />
      {calendar.slice(0, 3).map((e, i) => (
        <Anim key={e.id} variant={i % 2 ? 'slideR' : 'slideL'} delay={i * 130}>
          <EventRow e={e} />
        </Anim>
      ))}

      {/* About: camera focus-pull */}
      <Anim variant="focus" duration={1200}>
        <AboutSection />
      </Anim>

      {/* Stats: slow drifting backdrop, numbers count up and glow gold */}
      <Anim variant="unfold" sx={{ my: 8 }}>
        <Box sx={{
          p: { xs: 3, md: 6 }, borderRadius: 2, color: '#fff', overflow: 'hidden',
          backgroundImage: `linear-gradient(135deg,rgba(11,27,92,.92),rgba(2, 6, 19, 0.85)),url(${stock[4]})`,
          backgroundSize: '100% 100%, 125%', backgroundRepeat: 'no-repeat',
          animation: `${kf.pan} 24s ease-in-out infinite alternate`,
          display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
          textAlign: 'center',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}>
          {stats.map(([n, l], i) => (
            <Box key={l}>
              <Typography variant="h3" fontWeight={800}
                sx={{ color: '#f5b301', animation: `${kf.glow} 4s ease-in-out ${i * 0.6}s infinite`, '@media (prefers-reduced-motion: reduce)': { animation: 'none' } }}>
                <CountUp value={n} />
              </Typography>
              <Typography>{l}</Typography>
            </Box>))}
        </Box>
      </Anim>

      {/* Service times: unfolds like a printed programme card */}
      <Anim variant="unfold" duration={1000}>
        <ServiceTimes />
      </Anim>

      {/* Sermons: cards are dealt onto the page; play buttons ripple */}
      <Head sub="WATCH & LISTEN" t="Sermons & resources" to="/resources" />
      <CardGrid>{resources.map((r, i) => (
        <Anim key={r.id} variant="deal" delay={i * 110} sx={{ '--r': i % 2 ? '4deg' : '-4deg' } as any}>
          <Tile p={1}>
            <Box sx={{
              height: 160, mb: 1.5, overflow: 'hidden', position: 'relative',
              '& .art': { transition: 'transform .8s cubic-bezier(.2,.8,.2,1)' },
              '&:hover .art': { transform: 'scale(1.1)' },
              '&:hover .play': { transform: 'scale(1.18)' },
            }}>
              <Box className="art" sx={{ position: 'absolute', inset: 0, background: bg(stock[i], '#f97316') }} />
              <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <Box className="play" sx={{
                  position: 'relative', display: 'grid', placeItems: 'center', transition: 'transform .3s',
                  '&::before,&::after': {
                    content: '""', position: 'absolute', width: 64, height: 64, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,.8)', animation: `${kf.ping} 2.4s ease-out infinite`,
                  },
                  '&::after': { animationDelay: '1.2s' },
                  '@media (prefers-reduced-motion: reduce)': { '&::before,&::after': { animation: 'none', opacity: 0 } },
                }}>
                  <PlayCircleRegular fontSize={56} color="#fff" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight={800}>{r.title}</Typography>
              <Chip size="small" color={r.price ? 'warning' : 'success'} label={r.price ? naira(r.price) : 'FREE'} />
            </Box>
            <Typography color="text.secondary">{r.type}</Typography>
          </Tile>
        </Anim>
      ))}
      </CardGrid>

      {/* Partner CTA: light sweeps across, Give button has a heartbeat */}
      <Anim variant="focus" sx={{ mt: 8 }}>
        <Box sx={{
          position: 'relative', overflow: 'hidden', p: 5, borderRadius: 2, textAlign: 'center',
          background: 'linear-gradient(135deg,#0b1b5c,#0b1b5c)', color: '#fcfaf9',
          '&::after': {
            content: '""', position: 'absolute', top: 0, bottom: 0, left: 0, width: '22%',
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)',
            animation: `${kf.sweep} 6s ease-in-out 1.5s infinite`, pointerEvents: 'none',
          },
          '@media (prefers-reduced-motion: reduce)': { '&::after': { animation: 'none', display: 'none' } },
        }}>
          <Typography variant="h4" fontWeight={800}>Partner with the vision</Typography>
          <Typography sx={{ my: 1 }}>Your giving restores lives and builds the Kingdom.</Typography>
          <Button component={Link} to="/give" size="large" variant="contained"
            sx={{
              bgcolor: '#020614', mt: 1, animation: `${kf.heartbeat} 2.6s ease-in-out infinite`,
              '&:hover': { animationPlayState: 'paused', bgcolor: '#f5b301', color: '#020614' },
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}>Give online</Button>
        </Box>
      </Anim>
    </>
  )
}