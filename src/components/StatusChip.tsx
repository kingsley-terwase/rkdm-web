import { Chip } from '@mui/material'
const c: Record<string, any> = { successful: 'success', active: 'success', confirmed: 'success', published: 'success', sent: 'success', read: 'default',
  failed: 'error', refunded: 'error', unsubscribed: 'error', pending: 'warning', pending_verification: 'warning', draft: 'warning', unread: 'secondary' }
export default function StatusChip({ s }: { s: string }) { return <Chip size="small" label={s.replace('_', ' ')} color={c[s] ?? 'default'} sx={{ fontWeight: 800 }} /> }
