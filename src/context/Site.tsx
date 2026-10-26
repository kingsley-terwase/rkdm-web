import { createContext, useContext, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { slides as s0 } from '../data/slides'
import { gallery } from '../data/demo'
import { branches as b0 } from '../data/branches'

export type Slide = (typeof s0)[number]
type Album = Omit<(typeof gallery)[number], 'imgs'> & { imgs: string[] }
type Branch = (typeof b0)[number]

interface SiteContextValue {
  slides: Slide[]
  setSlides: Dispatch<SetStateAction<Slide[]>>
  albums: Album[]
  setAlbums: Dispatch<SetStateAction<Album[]>>
  branches: Branch[]
  setBranches: Dispatch<SetStateAction<Branch[]>>
  pages: Record<string, string>
  setPages: Dispatch<SetStateAction<Record<string, string>>>
}

interface SiteProviderProps {
  children: ReactNode
}

export const clean = (html: string): string => {
  const d = new DOMParser().parseFromString(html, 'text/html')
  d.querySelectorAll('script,style,iframe,object,embed').forEach(n => n.remove())
  d.body.querySelectorAll('*').forEach(el =>
    Array.from(el.attributes).forEach(a => {
      if (/^on/i.test(a.name) || (/^(href|src)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) {
        el.removeAttribute(a.name)
      }
    }),
  )
  return d.body.innerHTML
}

const Ctx = createContext<SiteContextValue | null>(null)

export const useSite = (): SiteContextValue => {
  const context = useContext(Ctx)
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider')
  }
  return context
}

const pages0: Record<string, string> = {
  privacy: '<h2>Privacy Policy</h2><p>RKDM collects only the personal data it needs, records your consent, and lets you export or delete your data in line with the Nigeria Data Protection Act 2023.</p>',
  terms: '<h2>Terms of Use</h2><p>By using this site you agree to use it lawfully and respectfully. Payments are confirmed by the server and recorded.</p>',
  welcome: '<h2>Welcome to RKDM</h2><p>We are a family of believers set on fire by the Word and led by the Holy Spirit. <b>You are welcome here.</b></p>',
}

export function SiteProvider({ children }: SiteProviderProps) {
  const [slides, setSlides] = useState<Slide[]>(s0)
  const [albums, setAlbums] = useState<Album[]>(gallery.map(g => ({ ...g, imgs: [] })))
  const [branches, setBranches] = useState<Branch[]>(b0)
  const [pages, setPages] = useState<Record<string, string>>(pages0)

  return (
    <Ctx.Provider value={{ slides, setSlides, albums, setAlbums, branches, setBranches, pages, setPages }}>
      {children}
    </Ctx.Provider>
  )
}