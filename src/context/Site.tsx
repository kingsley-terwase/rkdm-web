import { createContext, useContext, useState, ReactNode } from 'react'
import { slides as s0 } from '../data/slides'
import { gallery } from '../data/demo'
import { branches as b0 } from '../data/branches'
export type Slide = typeof s0[number]
export const clean = (html: string) => {
  const d = new DOMParser().parseFromString(html, 'text/html')
  d.querySelectorAll('script,style,iframe,object,embed').forEach(n => n.remove())
  d.body.querySelectorAll('*').forEach(el => [...el.attributes].forEach(a => {
    if (/^on/i.test(a.name) || (/^(href|src)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) el.removeAttribute(a.name)
  }))
  return d.body.innerHTML
}
const Ctx = createContext<any>(null)
export const useSite = () => useContext(Ctx)
const pages0: Record<string, string> = {
  privacy: '<h2>Privacy Policy</h2><p>RKDM collects only the personal data it needs, records your consent, and lets you export or delete your data in line with the Nigeria Data Protection Act 2023.</p>',
  terms: '<h2>Terms of Use</h2><p>By using this site you agree to use it lawfully and respectfully. Payments are confirmed by the server and recorded.</p>',
  welcome: '<h2>Welcome to RKDM</h2><p>We are a family of believers set on fire by the Word and led by the Holy Spirit. <b>You are welcome here.</b></p>',
}
export function SiteProvider({ children }: { children: ReactNode }) {
  const [slides, setSlides] = useState(s0)
  const [albums, setAlbums] = useState(gallery.map(g => ({ ...g, imgs: [] as string[] })))
  const [branches, setBranches] = useState(b0)
  const [pages, setPages] = useState(pages0)
  return <Ctx.Provider value={{ slides, setSlides, albums, setAlbums, branches, setBranches, pages, setPages }}>{children}</Ctx.Provider>
}
