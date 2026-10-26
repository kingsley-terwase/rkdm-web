import { Typography } from '@mui/material'
import DataTable from '../components/DataTable'
import { useActivity } from '../context/Activity'
import { useAuth } from '../context/Auth'
export default function ActivityPage() {
  const { logs } = useActivity()
  const { user, can } = useAuth()
  const rows = logs.filter(l => can('activity.view_all') || l.actor === user?.name)
  return (<><Typography variant="h5" fontWeight={800} gutterBottom>Activity log {can('activity.view_all') ? '(everyone)' : '(your actions)'}</Typography>
    <DataTable rows={rows.map(({ id, ...r }) => ({ id, ...r }))} /></>)
}
