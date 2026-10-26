export type Role = 'member' | 'admin' | 'super_admin'
export interface User { name: string; role: Role; perms: string[]; label: string }
export const USERS: User[] = [
  { label: 'Member', name: 'Grace Adeyemi', role: 'member', perms: [] },
  { label: 'Content Editor', name: 'Tunde Bello', role: 'admin', perms: ['content.manage', 'resources.manage', 'gallery.manage'] },
  { label: 'Finance Officer', name: 'Ngozi Eze', role: 'admin', perms: ['payments.view', 'payments.export', 'payments.refund'] },
  { label: 'Super Admin', name: 'Pastor Dele', role: 'super_admin', perms: ['*'] },
]
export const payments = [
  { ref: 'RKDM-2026-000123', name: 'Grace Adeyemi', cat: 'Tithe', amount: 50000, cur: 'NGN', status: 'successful', date: '2026-10-18' },
  { ref: 'RKDM-2026-000122', name: 'Guest', cat: 'Building Project', amount: 120000, cur: 'NGN', status: 'successful', date: '2026-10-17' },
  { ref: 'RKDM-2026-000121', name: 'Samuel Okon', cat: 'Resource: Faith Series 3', amount: 3500, cur: 'NGN', status: 'pending', date: '2026-10-17' },
  { ref: 'RKDM-2026-000120', name: 'Ruth Musa', cat: 'Offering', amount: 15000, cur: 'NGN', status: 'failed', date: '2026-10-15' },
  { ref: 'RKDM-2026-000119', name: 'Daniel Cole', cat: 'Seed', amount: 100, cur: 'USD', status: 'refunded', date: '2026-10-12' },
]
export const events = [
  { id: 1, title: 'Night of Fire Prayer', date: 'Fri 30 Oct, 9:00 PM', venue: 'Main Auditorium', reg: 182, cap: 300 },
  { id: 2, title: 'Kingdom Leaders Summit', date: 'Sat 7 Nov, 10:00 AM', venue: 'Abuja Center', reg: 96, cap: 100 },
  { id: 3, title: 'Youth Dominion Camp', date: 'Fri 20 Nov, 4:00 PM', venue: 'Online', reg: 54, cap: 500 },
]
export const resources = [
  { id: 1, title: 'Faith Series 3', type: 'Video', price: 0 },
  { id: 2, title: 'Walking in Dominion', type: 'Audio', price: 2500 },
  { id: 3, title: 'The Royal Priesthood (eBook)', type: 'Book', price: 3500 },
]
export const members = [
  { name: 'Grace Adeyemi', email: 'grace@mail.com', joined: '2026-01-12', status: 'active' },
  { name: 'Samuel Okon', email: 'sam@mail.com', joined: '2026-09-30', status: 'active' },
  { name: 'Ruth Musa', email: 'ruth@mail.com', joined: '2026-10-14', status: 'pending_verification' },
]
export const monthly = [40, 55, 48, 70, 62, 90, 75, 88, 60, 95, 80, 100]
export const naira = (n: number, c = 'NGN') => (c === 'NGN' ? '₦' : '$') + n.toLocaleString()
export const pastEvents = [{ id: 4, title: 'Easter Revival', date: 'Sun 5 Apr, 9:00 AM', venue: 'Main Auditorium', reg: 300, cap: 300 }]
export const categories = [
  { name: 'Sermons', type: 'resource', status: 'active' }, { name: 'Conferences', type: 'event', status: 'active' },
  { name: 'Tithe', type: 'giving', status: 'active' }, { name: 'Building Project', type: 'giving', status: 'active' },
  { name: 'General', type: 'contact_subject', status: 'active' },
]
export const messages = [
  { name: 'Peter A.', email: 'peter@mail.com', subject: 'Prayer', status: 'unread' },
  { name: 'Mary K.', email: 'mary@mail.com', subject: 'General', status: 'read' },
]
export const subscribers = [
  { email: 'ada@mail.com', name: 'Ada', status: 'confirmed', source: 'footer' },
  { email: 'bode@mail.com', name: 'Bode', status: 'pending', source: 'home' },
  { email: 'chi@mail.com', name: 'Chi', status: 'unsubscribed', source: 'import' },
]
export const admins = [
  { name: 'Tunde Bello', email: 'tunde@rkdm.org', preset: 'Content Editor', status: 'active' },
  { name: 'Ngozi Eze', email: 'ngozi@rkdm.org', preset: 'Finance Officer', status: 'active' },
]
export const sections = [
  { title: 'Home hero', page: 'home', status: 'published' }, { title: 'Mission', page: 'about', status: 'published' },
  { title: 'Leadership', page: 'about', status: 'draft' }, { title: 'Privacy Policy', page: 'legal', status: 'published' },
]
export const gallery = [
  { id: 1, title: 'Easter Service', count: 24, c: '#1546d6' }, { id: 2, title: 'Youth Camp', count: 18, c: '#f97316' },
  { id: 3, title: 'Baptism Sunday', count: 12, c: '#16a34a' }, { id: 4, title: 'Leaders Summit', count: 30, c: '#f5b301' },
]
export const ministries = [
  { name: 'Youth Dominion', leader: 'Pst. Ada Obi', time: 'Sat 4:00 PM' }, { name: 'Women of Fire', leader: 'Pst. Ruth Dele', time: 'Wed 5:00 PM' },
  { name: 'Men of Valour', leader: 'Pst. Sam Eze', time: 'Thu 6:00 PM' }, { name: 'Children Kingdom', leader: 'Sis. Joy Bello', time: 'Sun 10:30 AM' },
]
export const leaders = [{ name: 'Pastor Dele A.', title: 'Senior Pastor' }, { name: 'Pst. Mrs Dele', title: 'Co-Pastor' }, { name: 'Elder Tayo O.', title: 'Admin Head' }]
export const newsletters = [{ subject: 'October Update', audience: 'All confirmed', recipients: 412, status: 'sent' }]
export const logSeed = [{ id: 1, time: '2026-10-18 09:12', actor: 'Ngozi Eze', action: 'payment.export', entity: 'Payments CSV', ip: '102.89.23.4' },
  { id: 2, time: '2026-10-17 15:40', actor: 'Tunde Bello', action: 'resource.update', entity: 'Faith Series 3', ip: '102.89.45.9' }]
