import { ReactNode } from 'react'
import { Card, Typography } from '@mui/material'
import { ShieldErrorRegular } from '@fluentui/react-icons'
import { useAuth } from '../context/Auth'
import { useActivity } from '../context/Activity'
import { useEffect } from 'react'
export default function Guard({ perm, children }: { perm: string; children: ReactNode }) {
  const { can } = useAuth()
  const { log } = useActivity()
  const ok = can(perm)
  useEffect(() => { if (!ok) log('permission.denied', perm) }, [ok]) // eslint-disable-line
  if (ok) return <>{children}</>
  return (
    <Card sx={{ p: 5, textAlign: 'center' }}>
      <ShieldErrorRegular fontSize={56} color="#dc2626" />
      <Typography variant="h5" fontWeight={800}>403 · Access denied</Typography>
      <Typography color="text.secondary">You need “{perm}”. This attempt was written to the activity log.</Typography>
    </Card>
  )
}
