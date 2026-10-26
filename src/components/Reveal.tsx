import { ReactNode } from 'react'
import { Grow } from '@mui/material'
export default function Reveal({ children, i = 0 }: { children: ReactNode; i?: number }) {
  return <Grow in timeout={500 + i * 150}><div style={{ height: '100%' }}>{children}</div></Grow>
}
