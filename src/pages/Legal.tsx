import { Box, Card, Typography } from '@mui/material'
import { useSite } from '../context/Site'
export default function Legal({ title, k }: { title: string; k?: string }) {
  const { pages } = useSite()
  return (
    <Card sx={{ p: 4 }}>
      {k && pages[k] ? <Box dangerouslySetInnerHTML={{ __html: pages[k] }} sx={{ '& h2': { mt: 0 } }} />
        : <><Typography variant="h4" fontWeight={800} gutterBottom>{title}</Typography><Typography color="text.secondary">The page you are looking for is not available. Use the menu to find what you need.</Typography></>}
    </Card>
  )
}
