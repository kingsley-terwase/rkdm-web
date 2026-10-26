import { ReactNode } from 'react'
import { Box, Card } from '@mui/material'
export const Tile = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
  <Card onClick={onClick} sx={{ p: 2.5, height: '100%', cursor: onClick ? 'pointer' : 'default', transition: '.25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>{children}</Card>)
export const CardGrid = ({ children }: { children: ReactNode }) => (
  <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))' }}>{children}</Box>)
