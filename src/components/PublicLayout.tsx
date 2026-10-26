import { Outlet, useLocation } from 'react-router-dom'
import { Container } from '@mui/material'
import SiteHeader from './SiteHeader'
import Footer from './Footer'
import FloatingWidgets from './FloatingWidgets'
import PageBanner from './PageBanner'
const titles: Record<string, string> = { '/about': 'About Us', '/ministries': 'Ministries', '/resources': 'Sermons & Resources', '/events': 'Programs & Calendar',
  '/gallery': 'Gallery', '/branches': 'Locate a Branch', '/contact': 'Contact Us', '/give': 'Give Online', '/new-here': 'New Here?', '/privacy': 'Privacy Policy', '/terms': 'Terms of Use' }
export default function PublicLayout() {
  const t = titles[useLocation().pathname]
  return (
    <>
      <SiteHeader />
      {t && <PageBanner title={t} />}
      <Container maxWidth="lg" sx={{ pt: t ? 5 : 3 }}><Outlet /></Container>
      <Footer />
      <FloatingWidgets />
    </>
  )
}
