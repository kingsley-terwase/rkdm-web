import { ReactNode } from 'react'
import { CalendarRegular, DataBarVerticalRegular, DocumentRegular, HistoryRegular, ImageRegular, LibraryRegular, MailInboxRegular, MailRegular, MoneyRegular, PeopleRegular, SettingsRegular, ShieldRegular, TagRegular } from '@fluentui/react-icons'
import CrudPage from '../components/CrudPage'
import Overview from './Overview'
import Settings from './Settings'
import ContentEditor from './ContentEditor'
import HeroManager from './HeroManager'
import GalleryManager from './GalleryManager'
import BranchesAdmin from './BranchesAdmin'
import { ImageMultipleRegular, LocationRegular } from '@fluentui/react-icons'
import AdminsPage from "./AdminsPage"
import Newsletter from './Newsletter'
import ActivityPage from './ActivityPage'
import { admins, categories, events, gallery, members, messages, payments, resources, sections, subscribers, naira } from '../data/demo'
export interface Area { path: string; label: string; perm: string; icon: ReactNode; el: ReactNode }
const pay = payments.map(p => ({ receipt: p.ref, payer: p.name, category: p.cat, amount: naira(p.amount, p.cur), status: p.status, date: p.date }))
const ev = events.map(e => ({ title: e.title, when: e.date, venue: e.venue, registered: `${e.reg}/${e.cap}`, status: 'published' }))
const res = resources.map(r => ({ title: r.title, type: r.type, price: r.price ? naira(r.price) : 'Free', status: 'published' }))
const gal = gallery.map(g => ({ title: g.title, photos: g.count, status: 'published' }))
export const areas: Area[] = [
  { path: '', label: 'Overview', perm: '', icon: <DataBarVerticalRegular />, el: <Overview /> },
  { path: 'content', label: 'Page content', perm: 'content.manage', icon: <DocumentRegular />, el: <ContentEditor /> },
  { path: 'hero', label: 'Hero slides', perm: 'content.manage', icon: <ImageMultipleRegular />, el: <HeroManager /> },
  { path: 'branches', label: 'Branches', perm: 'content.manage', icon: <LocationRegular />, el: <BranchesAdmin /> },
  { path: 'gallery', label: 'Gallery', perm: 'gallery.manage', icon: <ImageRegular />, el: <GalleryManager /> },
  { path: 'resources', label: 'Resources', perm: 'resources.manage', icon: <LibraryRegular />, el: <CrudPage title="Resources" perm="resources.manage" rows={res} /> },
  { path: 'events', label: 'Events', perm: 'events.manage', icon: <CalendarRegular />, el: <CrudPage title="Events & registrations" perm="events.manage" rows={ev} exportable /> },
  { path: 'categories', label: 'Categories', perm: 'categories.manage', icon: <TagRegular />, el: <CrudPage title="Categories" perm="categories.manage" rows={categories} /> },
  { path: 'members', label: 'Members', perm: 'members.view', icon: <PeopleRegular />, el: <CrudPage title="Members" perm="members.view" rows={members} exportable /> },
  { path: 'payments', label: 'Payments', perm: 'payments.view', icon: <MoneyRegular />, el: <CrudPage title="Payments & giving" perm="payments.view" rows={pay} noAdd exportable /> },
  { path: 'messages', label: 'Messages', perm: 'messages.manage', icon: <MailInboxRegular />, el: <CrudPage title="Contact messages" perm="messages.manage" rows={messages} noAdd /> },
  { path: 'newsletter', label: 'Newsletter', perm: 'newsletter.manage', icon: <MailRegular />, el: <Newsletter /> },
  { path: 'subscribers', label: 'Subscribers', perm: 'subscribers.manage', icon: <PeopleRegular />, el: <CrudPage title="Subscribers" perm="subscribers.manage" rows={subscribers} exportable /> },
  { path: 'admins', label: 'Admins', perm: 'admins.manage', icon: <ShieldRegular />, el: <AdminsPage /> },
  { path: 'activity', label: 'Activity log', perm: '', icon: <HistoryRegular />, el: <ActivityPage /> },
  { path: 'settings', label: 'Settings', perm: 'settings.manage', icon: <SettingsRegular />, el: <Settings /> },
]
