import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as Mui } from '@mui/material/styles'
import { makeTheme } from '../theme'
const Ctx = createContext({ dark: false, toggle: () => {} })
export const useTheme = () => useContext(Ctx)
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('theme') === 'dark' } catch { return false } })
  useEffect(() => { try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch { /* ignore */ } }, [dark])
  const theme = useMemo(() => makeTheme(dark ? 'dark' : 'light'), [dark])
  return <Ctx.Provider value={{ dark, toggle: () => setDark(d => !d) }}><Mui theme={theme}><CssBaseline />{children}</Mui></Ctx.Provider>
}
