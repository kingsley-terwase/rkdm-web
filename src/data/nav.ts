export interface NavItem { label: string; to?: string; items?: string[][] }
export const nav: NavItem[] = [
  // { label: 'Home', to: '/' },
  { label: 'About', items: [['Our Story', '/p/genesis'], ['Mandate', '/p/mandate'], ['Mission', '/p/mission'], ['Vision', '/p/vision'], ['Goal', '/p/goal'], ['Leadership', '/about']] },
  { label: 'Events', items: [['Programs & Calendar', '/events'], ['Gallery', '/gallery']] },
  { label: 'Visit Us', items: [['New Here?', '/new-here'], ['Locate a Branch', '/branches'], ['Foreign Desk', '/p/foreign-desk'], ['Within Nigeria', '/p/within-nigeria'], ['Contact', '/contact']] },
  { label: 'Media', items: [['Sermons & Resources', '/resources'], ['Download Centre', '/resources']] },
  { label: 'Community', items: [['Ministries', '/ministries'], ['Church Membership', '/register'], ['Welfare', '/p/welfare'], ['Home Church', '/p/home-church'], ['Testimonies', '/p/testimonies'], ['Prayer Request', '/p/prayer']] },
]
