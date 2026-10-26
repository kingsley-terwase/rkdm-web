import { useState } from 'react'
import { Badge, Box, IconButton, List, ListItem, ListItemText, Popover, Tab, Tabs, Button } from '@mui/material'
import { AlertRegular } from '@fluentui/react-icons'
import { useAuth } from '../context/Auth'
import { useActivity } from '../context/Activity'
import { events } from '../data/demo'
export default function NotifBell() {
  const { user, can } = useAuth()
  const { logs } = useActivity()
  const [a, setA] = useState<HTMLElement | null>(null)
  const [tab, setTab] = useState(0)
  const [read, setRead] = useState<string[]>([])
  const general = [['g1', 'New contact message', 'Peter A. · Prayer', 'messages.manage'], ['g2', 'Payment received', '₦120,000 · Building Project', 'payments.view'],
    ['g3', 'New member registered', 'Ruth Musa', 'members.view']].filter(g => can(g[3])).map(g => ({ id: g[0], t: g[1], b: g[2] }))
  const activity = logs.filter(l => can('activity.view_all') || l.actor === user?.name).slice(0, 5).map(l => ({ id: 'a' + l.id, t: l.action, b: `${l.actor} · ${l.entity}` }))
  const ev = can('events.manage') ? events.map(e => ({ id: 'e' + e.id, t: e.title, b: `${e.reg} registered · ${e.date}` })) : []
  const lists = [general, activity, ev]
  const unread = lists.flat().filter(x => !read.includes(x.id)).length
  return (
    <>
      <IconButton aria-label="Notifications" onClick={e => setA(e.currentTarget)}><Badge badgeContent={unread} color="secondary"><AlertRegular /></Badge></IconButton>
      <Popover open={!!a} anchorEl={a} onClose={() => setA(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Box sx={{ width: 340, maxWidth: '90vw' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth"><Tab label="General" /><Tab label="Activity" /><Tab label="Events" /></Tabs>
          <List dense>{lists[tab].map(n => (
            <ListItem key={n.id}><ListItemText primary={n.t} secondary={n.b} primaryTypographyProps={{ fontWeight: read.includes(n.id) ? 400 : 800 }} /></ListItem>))}
            {lists[tab].length === 0 && <ListItem><ListItemText secondary="Nothing for your role." /></ListItem>}</List>
          <Button fullWidth onClick={() => setRead([...read, ...lists[tab].map(x => x.id)])}>Mark all read</Button>
        </Box>
      </Popover>
    </>
  )
}
