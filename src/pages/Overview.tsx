import { Avatar, Box, Card, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { MailRegular, MoneyRegular, PeopleRegular, CalendarRegular } from '@fluentui/react-icons'
import { events, monthly } from '../data/demo'
import { useAuth } from '../context/Auth'
import { useActivity } from '../context/Activity'
import Reveal from '../components/Reveal'
const cards = [['payments.view', <MoneyRegular fontSize={26} />, 'Giving this month', '₦4.2M', '#1546d6,#5b8cff'], ['payments.view', <MoneyRegular fontSize={26} />, 'Giving (USD)', '$320', '#f97316,#f5b301'],
  ['members.view', <PeopleRegular fontSize={26} />, 'New members (30d)', '48', '#16a34a,#4ade80'], ['events.manage', <CalendarRegular fontSize={26} />, 'Upcoming events', '3', '#7c3aed,#a78bfa'], ['messages.manage', <MailRegular fontSize={26} />, 'Unread messages', '7', '#dc2626,#fb7185']] as const
const mo = ['N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O']
export default function Overview() {
  const { can, user } = useAuth()
  const { logs } = useActivity()
  const shown = cards.filter(c => can(c[0]))
  const mine = logs.filter(l => can('activity.view_all') || l.actor === user?.name).slice(0, 5)
  return (
    <>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))' }}>{shown.map((c, i) => (
        <Reveal key={c[2]} i={i}><Card sx={{ p: 2.5, color: '#fff', border: 0, background: `linear-gradient(135deg,${c[4]})` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>{c[2]}{c[1]}</Box><Typography variant="h4" fontWeight={800}>{c[3]}</Typography></Card></Reveal>))}</Box>
      <Box sx={{ display: 'grid', gap: 2, mt: 2, gridTemplateColumns: { lg: '1.4fr 1fr' } }}>
        {can('payments.view') && <Card sx={{ p: 3 }}><Typography fontWeight={800} gutterBottom>Giving per month (last 12)</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 190 }}>{monthly.map((v, i) => (
            <Box key={i} sx={{ flex: 1, textAlign: 'center' }}><Box title={String(v)} sx={{ height: v * 1.6, borderRadius: '8px 8px 0 0', background: 'linear-gradient(#f97316,#1546d6)', transition: '.3s', '&:hover': { opacity: 0.8 } }} />
              <Typography variant="caption">{mo[i]}</Typography></Box>))}</Box></Card>}
        {can('events.manage') && <Card sx={{ p: 3 }}><Typography fontWeight={800}>Upcoming events</Typography>{events.map(e => (
          <Box key={e.id} sx={{ mt: 2 }}><Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" fontWeight={700}>{e.title}</Typography><Typography variant="body2">{e.reg}/{e.cap}</Typography></Box>
            <LinearProgress variant="determinate" value={(e.reg / e.cap) * 100} color={e.reg >= e.cap * 0.9 ? 'secondary' : 'primary'} sx={{ height: 8, borderRadius: 9, mt: 0.5 }} /></Box>))}</Card>}
        <Card sx={{ p: 3 }}><Typography fontWeight={800}>Recent activity</Typography><List dense>{mine.map(l => (
          <ListItem key={l.id} disableGutters><ListItemAvatar><Avatar sx={{ width: 32, height: 32 }}>{l.actor[0]}</Avatar></ListItemAvatar><ListItemText primary={`${l.actor} · ${l.action}`} secondary={`${l.entity} · ${l.time}`} /></ListItem>))}</List></Card>
      </Box>
      {shown.length === 0 && <Typography color="text.secondary">Your role has no stat cards. Use the areas in your sidebar.</Typography>}
    </>
  )
}
