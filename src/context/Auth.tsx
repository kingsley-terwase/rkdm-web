import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../data/demo'
const Ctx = createContext<{ user: User | null; login: (u: User) => void; logout: () => void; can: (p: string) => boolean }>(
  { user: null, login: () => {}, logout: () => {}, can: () => false })
export const useAuth = () => useContext(Ctx)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const can = (p: string) => !!user && (!p || user.perms.includes('*') || user.perms.includes(p))
  return <Ctx.Provider value={{ user, login: setUser, logout: () => setUser(null), can }}>{children}</Ctx.Provider>
}
