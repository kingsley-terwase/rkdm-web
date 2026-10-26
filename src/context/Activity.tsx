import { createContext, useContext, useState, ReactNode } from 'react'
import { logSeed } from '../data/demo'
import { useAuth } from './Auth'
type Entry = typeof logSeed[number]
const Ctx = createContext<{ logs: Entry[]; log: (action: string, entity: string) => void }>({ logs: [], log: () => {} })
export const useActivity = () => useContext(Ctx)
export function ActivityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [logs, setLogs] = useState<Entry[]>(logSeed)
  const log = (action: string, entity: string) => setLogs(l => [
    { id: Date.now(), time: new Date().toISOString().slice(0, 16).replace('T', ' '), actor: user?.name ?? 'Visitor', action, entity, ip: '102.89.10.1' }, ...l])
  return <Ctx.Provider value={{ logs, log }}>{children}</Ctx.Provider>
}
