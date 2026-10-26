const d = (n: number) => Date.now() + n * 864e5
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=70`
export const stock = [u('1438232992991-995b7058bbb3'), u('1507692049790-de58290a4334'), u('1504052434569-70ad5836ab65'), u('1519491050282-cf00c82424b4'), u('1473177104440-ffee2f376098')]
export const slides = [
  { tag: 'Annual Convention', title: 'Night of Fire & Glory', sub: 'Seven days of power, healing and the Word with international ministers.', date: 'Mon 2 – Sun 8 Nov', at: d(11), cta: 'Register now', to: '/events', img: stock[0], c: '#1546d6' },
  { tag: 'This Sunday', title: 'Sunday Celebration Service', sub: '8:00 AM & 10:30 AM. Join us in person or online.', date: 'Every Sunday', at: d(3), cta: 'Plan your visit', to: '/new-here', img: stock[1], c: '#f97316' },
  { tag: 'Special Program', title: 'Kingdom Leaders Summit', sub: 'Equipping leaders to walk in dominion in business, ministry and society.', date: 'Sat 7 Nov', at: d(16), cta: 'See details', to: '/events', img: stock[3], c: '#0b1b5c' },
  { tag: 'Giving', title: 'Building Project: Lay a Brick', sub: 'Partner with us to raise a house of prayer for the nations.', date: 'Ongoing', at: d(30), cta: 'Give now', to: '/give', img: stock[2], c: '#f5b301' },
]
export const bg = (img: string, c = '#1546d6') => `url(${img}) center/cover, linear-gradient(135deg,${c},#0b1b5c)`
