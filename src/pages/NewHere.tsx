import { Link } from 'react-router-dom'
import { Button, Card, Typography } from '@mui/material'
export default function NewHere() {
  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h3" fontWeight={800} gutterBottom>New here?</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>Services hold Sundays at 8:00 AM and 10:30 AM. Expect heartfelt worship, practical teaching and a warm welcome. Casual dress is fine.</Typography>
      <Button component={Link} to="/contact" variant="contained">Contact us</Button>
    </Card>
  )
}
