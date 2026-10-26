import { Link } from 'react-router-dom'
import { Box, Button, Chip, Typography } from '@mui/material'
import { ChatRegular, HeartRegular, MailRegular, PeopleRegular, PersonRegular, PlayCircleRegular } from '@fluentui/react-icons'
import { resources, naira } from '../data/demo'
import { calendar } from '../data/calendar'
import { bg, stock } from '../data/slides'
import { CardGrid, Tile } from '../components/Tile'
import Reveal from '../components/Reveal'
import PosterSlider from '../components/PosterSlider'
import EventRow from '../components/EventRow'
import { useSite } from '../context/Site'
const quick = [['Sermons', <PlayCircleRegular />, '/resources'], ['Give', <HeartRegular />, '/give'], ['New here', <PeopleRegular />, '/new-here'],
  ['Testimonies', <ChatRegular />, '/p/testimonies'], ['Membership', <PersonRegular />, '/register'], ['Contact', <MailRegular />, '/contact']] as const
const stats = [['25+', 'Years of ministry'], ['120', 'Branches'], ['15', 'Nations'], ['1M+', 'Lives touched']]
const Head = ({ t, sub, to }: { t: string; sub: string; to: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mt: 8, mb: 2 }}>
    <Box><Typography fontWeight={800} color="secondary" sx={{ letterSpacing: 2, fontSize: 13 }}>{sub}</Typography><Typography variant="h4" fontWeight={800}>{t}</Typography></Box>
    <Button component={Link} to={to}>View all →</Button></Box>)
export default function Home() {
  const { pages } = useSite()
  return (
    <>
      <PosterSlider />
      <Box sx={{ mt: -5, position: 'relative', zIndex: 2, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}>
        {quick.map(([t, ic, to], i) => (
          <Reveal key={t} i={i}><Tile onClick={undefined}><Box component={Link} to={to} sx={{ display: 'grid', placeItems: 'center', gap: 1, color: 'primary.main', '& svg': { fontSize: 34 } }}>{ic}<Typography fontWeight={800} color="text.primary">{t}</Typography></Box></Tile></Reveal>))}
      </Box>
      <Box sx={{ mt: 5, p: 4, borderRadius: 4, bgcolor: 'background.paper', border: 1, borderColor: 'divider', '& h2': { mt: 0, color: 'primary.main' } }} dangerouslySetInnerHTML={{ __html: pages.welcome }} />
      <Head sub="WHAT'S HAPPENING" t="Upcoming programs" to="/events" />
      {calendar.slice(0, 3).map(e => <EventRow key={e.id} e={e} />)}
      <Box sx={{ my: 8, p: { xs: 3, md: 6 }, borderRadius: 5, color: '#fff', background: `linear-gradient(135deg,rgba(11,27,92,.92),rgba(21,70,214,.85)),url(${stock[4]}) center/cover`, display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', textAlign: 'center' }}>
        {stats.map(([n, l]) => <Box key={l}><Typography variant="h3" fontWeight={800} sx={{ color: '#f5b301' }}>{n}</Typography><Typography>{l}</Typography></Box>)}</Box>
      <Head sub="WATCH & LISTEN" t="Sermons & resources" to="/resources" />
      <CardGrid>{resources.map((r, i) => (
        <Reveal key={r.id} i={i}><Tile><Box sx={{ height: 160, borderRadius: 3, mb: 1.5, background: bg(stock[i], '#f97316'), display: 'grid', placeItems: 'center' }}><PlayCircleRegular fontSize={56} color="#fff" /></Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="h6" fontWeight={800}>{r.title}</Typography>
            <Chip size="small" color={r.price ? 'warning' : 'success'} label={r.price ? naira(r.price) : 'FREE'} /></Box><Typography color="text.secondary">{r.type}</Typography></Tile></Reveal>))}</CardGrid>
      <Box sx={{ mt: 8, p: 5, borderRadius: 5, textAlign: 'center', background: 'linear-gradient(135deg,#f97316,#f5b301)', color: '#2a1200' }}>
        <Typography variant="h4" fontWeight={800}>Partner with the vision</Typography><Typography sx={{ my: 1 }}>Your giving restores lives and builds the Kingdom.</Typography>
        <Button component={Link} to="/give" size="large" variant="contained" sx={{ bgcolor: '#0b1b5c', mt: 1 }}>Give online</Button></Box>
    </>
  )
}
